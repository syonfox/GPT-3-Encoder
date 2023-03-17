// Fuck typescript :)
// https://github.com/openai/openai-python/blob/main/chatml.md
/**
 * THis is a nice way visualizing the similarities and differences between the different openai text compleation endpoints.
 * notice that edits is actually quite different from the other 2 in that you cant stream.
 * @type {Map<string, string[]>}
 */
// const fetch = require("node-fetch")
const path = require('path');
const streamOne = require('./streamOne');
const gptoken = require("gptoken");
const {Model, model_endpoint_compatibility, model_info, models, openai_pricing_map} = require('./openai_model_info');

// require('dotenv').config();

console.log(typeof fetch, fetch);
// import fetch from "node-fetch"

const invertedEndpointTextMap = new Map([
    ['model', ['completion', 'chat', 'edit']],  // The AI model to use for the API request
    ['temperature', ['completion', 'chat', 'edit']],  // Controls the "creativity" of the API response by setting the sampling temperature
    ['top_p', ['completion', 'chat', 'edit']],  // Controls the "diversity" of the API response by setting the probability mass to consider for each token
    ['logit_bias', ['completion', 'chat', 'edit']],  // Modifies the relative probability of different outputs
    ['n', ['completion', 'chat', 'edit']],  // The number of responses to generate
    ['user', ['completion', 'chat', 'edit']],  // Identifies the user making the API request
    ['frequency_penalty', ['completion', 'chat']],  // Controls the penalty for generating words that appear frequently in the prompt
    ['presence_penalty', ['completion', 'chat']],  // Controls the penalty for generating words that do not appear in the prompt
    ['max_tokens', ['completion', 'chat']],  // Limits the maximum number of tokens in the API response
    ['stream', ['completion', 'chat']],  // Generates the API response in chunks as they become available
    ['stop', ['completion', 'chat']],  // Stops generating the API response when certain conditions are met

    ['prompt', ['completion']],  // The prompt to use as input for the API request
    ['logprobs', ['completion']],  // Whether or not to include log probabilities in the API response
    ['echo', ['completion']],  // Whether or not to include the prompt in the API response
    ['best_of', ['completion']],  // The number of responses to generate, each with a different prompt
    ['suffix', ['completion']],  // Adds a suffix to each generated response

    ['messages', ['chat']],  // The message history to use for the API request (for chat only)

    ['input', ['edit']],  // The starting text to be edited (for edit only)
    ['instruction', ['edit']]  // The instruction for how to edit the text (for edit only)
]);

class Message {
    constructor(user, message, prev, next) {
        this.user = user;
        this.msg = message;
        this._next = prev || null;
        this._prev = next || null;
    }

    delta(delta) {

    }

    static create(obj) {
        let user, content;

        if (typeof obj === "string") {
            user = "user";
            content = obj;
        } else if (typeof obj === "object") {
            user = obj.user || "user";
            content = obj.msg || obj.message || obj.content || "";
        } else {
            throw new Error("AIIA:MESSAGE: Unacceptable type for Message.create only accepts string or obj{user(system|assistant|user), content|msg|message}")
        }

        return new Message(user, content);
    }

    toJson() {
        return [{user: this.user, content: this.msg}]
    }

}


class Chat {

    constructor(system, model, config) {

        this.msgs = new Messages();
        this.system = system;
        confg = config || {};
        this.model = model;
        this.config = config;
        this.config.history_length = config.history_length || 3;


    }

    getContext(newMsg) {
        let c = this.config.history_length || 3
        return [...this.system,...this.msgs.splice(this.msgs.length-c, c), newMsg];
    }



}

// The main input is the messages parameter. Messages must be an array of message objects, where each object has a role (either "system", "user", or "assistant") and content (the content of the message). Conversations can be as short as 1 message or fill many pages.

// Typically, a conversation is formatted with a system message first, followed by alternating user and assistant messages.

// The system message helps set the behavior of the assistant. In the example above, the assistant was instructed with "You are a helpful assistant."

// By extending the Array class, we get all of the built-in functionality of arrays, such as push(), pop(), shift(), unshift(), slice(), etc., as well as the ability to add our own custom methods to the class, which can be useful for adding functionality that is specific to our application.

class Messages extends Array {

    /**
     * A function that construct an flat array of message objects.
     * @param args
     */
    static validateMessageArgs(...args) {
        let msgs = [];
        args.forEach(a => {
            if (Array.isArray(a)) {
                a.forEach(b => {
                    msgs.push(Message.create(b))
                })

            } else {
                msgs.push(Message.create(a));
            }

        })
    }

    push(...items) {
        const transformedItems = Messages.validateMessageArgs(...items);
        return super.push(...transformedItems);
    }

    splice(start, deleteCount, ...items) {
        const transformedItems = Messages.validateMessageArgs(...items);

        return super.splice(start, deleteCount, ...transformedItems);
    }

    concat(...items) {
        const transformedItems = Messages.validateMessageArgs(...items);

        return super.concat(...transformedItems);
    }


    unshift(...items) {
        const transformedItems = Messages.validateMessageArgs(...items);

        return super.unshift(...transformedItems);
    }

    fill(value, start = 0, end = this.length) {
        const transformedValue = Messages.validateMessageArgs(item)[0];
        return super.fill(transformedValue, start, end);
    }


    constructor(...args) {
        super();
        this.systemMsgs = []

        this.push(...args);


    }

    setSystemMsgs(msgs) {

        this.systemMsgs = msgs.filter(msg => msg.user === 'system').map(m => Message.create(m));
    }

    getSystemMessages() {
        return this.systemMsgs.slice();
    }

    async submit(numMessages = 1, includeSystem = false, onDataCallback, onDoneCallback) {
        const start = Math.max(this.length - numMessages, 0);
        const data = this.slice(start).filter(msg => includeSystem || msg.user !== 'system').map(msg => msg.toJson());

        // Add system messages to the submission data
        const systemMsgs = this.getSystemMessages();
        if (systemMsgs.length > 0 && includeSystem) {
            data.unshift(...systemMsgs.map(msg => msg.toJson()));
        }

        // this.toJson(numMessages, includeSystem)
        aiia.text.chat(this.model, data)
        // Use fetch() or another HTTP library to send the data to the server
        // ...
    }


// // Override the assignment (=) operator
//     static
//     get [Symbol.species]() {
//         return Array;
//     }

    getMessagesByUser(user) {
        // Returns an array of messages sent by the specified user
        return this.filter(m => m.user === "user")
    }

    getLastMessage() {
        return this[this.length - 1].toJson()
        // Returns the last message in the array
    }

    addMessage(user, message) {
        // Adds a new message to the end of the array
    }

    deleteMessage(index) {
        // Removes the message at the specified index from the array
    }

    /**
     * Convert to an array of messages for openai api
     * @param numMessages - optionaly limit to the last n messages
     * @param includeSystem - optionly include the system instructions set by setInstruction
     */
    toJson(numMessages, includeSystem = false) {

        numMessages = numMessages || this.length;
        const start = Math.max(this.length - numMessages, 0);
        const data = this.slice(start)
            .filter(msg => includeSystem || msg.user !== 'system')
            .map(msg => msg.toJson());

        // Add system messages to the submission data
        const systemMsgs = this.getSystemMessages();

        if (systemMsgs.length > 0 && includeSystem) {
            data.unshift(...systemMsgs.map(msg => msg.toJson()));
        }

// Returns an array of JSON objects representing each message in the array
    }
}


function constructPayload(model, other) {
    console.log("todo:)");
}


/**
 * Makes an HTTP request using fetch() and returns the response.
 * @param {string} path - The URL path or full URL to request.
 * @param {string} method - The HTTP method to use (e.g. GET, POST).
 * @param {Record<string, unknown>} [body] - The request body data as a JSON object.
 * @param {Partial<OpenAIRequestConfig>} [config] - Additional request configuration options.
 * @returns {Promise<Response>} - A Promise that resolves to the Response object from the server.
 * @throws {Error} - Throws an error if the API key is not provided or if the request fails.
 */
function makeRequest(url, method, payload, fetchOptions, onDoneCallback) {
    if (url.includes("https")) {

        //use as is
    } else {
        url = aiia.init._endpoint + url;
    }
    console.log("Fetching...", method, ": ", url)
    return fetch(url, {
        method,
        body: payload ? JSON.stringify(payload) : undefined,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${aiia.init._apiKey}`,
        },
        ...fetchOptions,
    })
        .then((response) => response.json())
        .then((data) => {
            if (onDoneCallback) {
                onDoneCallback(data, payload, method);
            }
            return data;
        })
        .catch((error) => {
            console.error(error);
        });
}

/**
 * Streams an HTTP request to OpenAI and calls a callback function for each chunk of data received.
 * @param {string} url - The URL to request.
 * @param {string} method - The HTTP method to use (e.g. GET, POST).
 * @param {Record<string, unknown>} payload - The request payload data as a JSON object.
 * @param {function} onDataCallback - A function to call for each chunk of data received.
 * @param {function} onDoneCallback - A function to call when the request is complete.
 * @throws {Error} - Throws an error if the API key is not provided or if the request fails.
 */
function streamRequest(url, method, payload, onDataCallback, onDoneCallback) {
    fetch(url, {
        method,
        body: payload ? JSON.stringify(payload) : undefined,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${aiia.apiKey}`,

        },
    })
        .then((response) => {
            const reader = response.body.getReader();
            let decoder = new TextDecoder();
            let buffer = "";

            reader
                .read()
                .then(function processText({done, value}) {
                    if (done) {
                        if (onDoneCallback) {
                            onDoneCallback();
                        }
                        return;
                    }

                    buffer += decoder.decode(value, {stream: true});
                    const lines = buffer.split("\n");
                    buffer = lines.pop();

                    for (const line of lines) {
                        if (onDataCallback) {
                            onDataCallback(JSON.parse(line));
                        }
                    }

                    return reader.read().then(processText);
                })
                .catch((error) => {
                    console.error(error);
                });
        })
        .catch((error) => {
            console.error(error);
        });
}

function loadList() {
    //get all openai models

    function findFineTunableModels(models) {
        return models.filter(model => {
            const fineTuningPermission = model.permission.find(permission => permission.allow_fine_tuning === true);
            return fineTuningPermission !== undefined;
        });
    }

    function getModelIds(models) {
        return models.map(model => model.id);
    }


    let url = aiia.init._endpoint + "/v1/models"
    aiia.model._list_request = aiia.util.makeRequest(
        url, 'get', undefined, {},
        data => {

            let models = data.data
            console.log("Fine tuning Models: ", getModelIds(findFineTunableModels(models)));
            aiia.model._list = models;

        })
}

function setModel(model) {
    //get all openai models
    //todo validate it has all paramaters defined or set to our sain defaults.
    console.log("AIIA: model Set to ", model.model);
    aiia.model._model = model;
}

function getModel() {
    return aiia.model._model;

}

function textChat(model, msgs, onData, onDone) {

}

function textCompleate(model, msgs, onData, onDone) {

}

function textEdit(model, msgs, onData, onDone) {

}

const aiiaProfile = {
    model: 'davinci',
    temperature: 0.7,
    top_p: 0.9,
    // logit_bias: {'life': 2, 'death': -2}, // todo use tokenizer to convert strings to tokens
    n: 1,
    user: 'endpoint-aiia',
    frequency_penalty: 0.5,
    presence_penalty: 0.5,
    max_tokens: 1024,
    stream: false,
    stop: null,
};

let defaultModel = new Model(aiiaProfile);

//an object this is our map we can then tab tab interpolate the thing we want to do.
let aiia = {
    init: {
        openai: function (apiKey, endpoint = "https://api.openai.com") {
            aiia.init._apiKey = apiKey;
            aiia.init._endpoint = endpoint;
            aiia.model.loadList()
        }

    },
    model: {
        loadList,
        set: setModel,
        get: getModel,
        default: defaultModel
    },
    text: {
        chat: textChat,
        complete: textCompleate,
        edit: textEdit,
        newConversation: {}
    },
    image: {
        create: {},
        edit: {},
        variation: {}
    },
    util: {
        makeRequest, // returns a response Obect

        streamRequest, // for text chat and compleation accepts an event listener to
    }


}

// aiia.init.openai(process.env.OPENAI_API_KEY, "https://api.openai.com");

aiia.model.set(defaultModel)

module.exports = aiia;
// export default aiia;

// [openai] -> [nodejs] -> [gun] -> [browser]

// aiia.text.chat.createUser()
// aiia.text.chat.post(model, msgs,)
// aiia.text.chat.createSeasion()
// aiia.text.chat.getSeasion()
// aiia.text.chat.closeSeasion()
//
// aiia.text.edit.createUser()
// aiia.text.edit.post()
// aiia.text.chat.createSeasion()
// aiia.text.chat.getSeasion()
// aiia.text.chat.closeSeasion()