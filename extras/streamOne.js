// https://github.com/openai/openai-node/issues/18#issuecomment-1463774674
// import { Configuration, OpenAIApi } from 'openai';
// const OPENAI_API_KEY = 'sk-...';
// const configuration = new Configuration({ apiKey: OPENAI_API_KEY });
// const api = new OpenAIApi(configuration);
// type OtherOptions = {
//   maxTokens?: number;
//   temp?: number;
//   n?: number;
//   stop?: string | string[];
// }


const {modelToPrice} = require("./specDefs")

const gptoken = require("gptoken");

/**
 * INformation flow
 *
 * CLient msg -> server -> streamOne -> stream back to client
 * -> onDone Save to db
 * -> accept new message
 */


class TextCompletion {
    constructor(prompt, config) {

        this.done = false;
        streamOne()
    }


}

class TextChat {
    constructor(prompt, config) {

        this.done = false;
        streamOne()
    }

    _onToken() {

    }

    _onDone() {

    }

}

class Token {
    static INCLUDE_ROLE = true;

    /**
     * Represents all we can know about a token from a streamed response
     * {
     *   "text": "\n",
     *   "index": 0,
     *   "logprobs": {
     *     "tokens": [
     *       "\n"
     *     ],
     *     "token_logprobs": [
     *       -0.4092595
     *     ],
     *     "top_logprobs": null,
     *     "text_offset": [
     *       68
     *     ]
     *   },
     *   "finish_reason": null
     * }
     * @param choice
     */
    constructor(choice) {


        if (choice && choice.delta) {
            this._parseChat(choice)
        } else {
            this._parseCompletion(choice);
        }

        return this;
    }

    _parseCompletion(choice) {
        this.text = choice.text;
        this.token = gptoken.encode(this.text);
        this.choice = choice;
        this.log_index = choice.index;
        this.logprobs = choice.logprobs;

        this.text_offset = this.logprobs.text_offset[this.log_index];
        this.prob = this.logprobs.token_logprobs[this.log_index];
    }

    _parseChat(choice) {
        //chat only hase a small amount  of data

        this.text = "";
        if (choice.delta.role) {
            this.role = choice.delta.role;
            if (Token.INCLUDE_ROLE) {
                this.text = this.role + ": "
            }
        }


        if (choice.delta.content) {
            this.text += choice.delta.content;
        }

        this.choice = choice
    }

}

function estamateTokens(prompt, response_limit = 0) {
    return gptoken.countTokens(prompt) + response_limit
}


/**
 *
 * @param model - a model name
 * @param prompt - text prompt or array of messages (role, content) depending if you want to do chat completion or old style
 * @param onToken - a function on data recieved
 * @param onDone - on stream end or [DONE]
 * @param onError - error handle
 * @param otherOptions - override model options and som other stuff
 */
async function streamOne(model, prompt, onToken, onDone, onError, otherOptions) {

    // verify model and get price
    const price = modelToPrice[model];
    //todo check if model is chat or completion
    if (price === undefined) throw new Error('Unknown model: ' + model);


    // set options
    otherOptions = otherOptions || {};
    let max_tokens = otherOptions.maxTokens || 250;
    let temperature = otherOptions.temp || 0.5;// 0 to 1
    let top_p = otherOptions.topP || 0.8 // 0 to 1
    let n = otherOptions.n || 1; // not sure this working with stream
    let logprobs = otherOptions.logProbs || 0; // 0 - 5
    let best_of = otherOptions.bestOf || n; // not sure this working with stream
    let stop = otherOptions.stop || null; //string or array  Optional  Defaults to null  Up to 4 sequences where the API will stop generating further tokens. The returned text will not contain the stop sequence.
    let frequency_penalty = 0.2;
    let presence_penalty = 0.1;
    let endpoint = otherOptions.endpoint || "/v1/completions"

    let isChatMode = Array.isArray(prompt);
    let message = {role: "assistant", content: ""};
    ;
    let body;
    if (isChatMode) {
        endpoint = '/v1/chat/completions';
        console.log("Executing in chat mode and will return the new message/ delta objects")

        body = JSON.stringify({
            model,
            messages: prompt,
            max_tokens,
            temperature,
            n,
            // best_of,
            // logprobs,
            stop,
            frequency_penalty,
            presence_penalty,
            stream: true
        })
    } else {

        body = JSON.stringify({
            model,
            prompt,
            max_tokens,
            temperature,
            n,
            best_of,
            logprobs,
            stop,
            frequency_penalty,
            presence_penalty,
            stream: true
        })
    }

    // create stream
    let now = Date.now();
    const fetchPromise = fetch(`https://api.openai.com${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: body,
    }).catch(e => {
        //catch network error/ fetch bugs
        console.error("Fetch Error: What is wrong? ", e);
        onError(e);
    });


    //handel response
    const response = await fetchPromise;

    const reader = response.body.getReader();
    const decoder = new TextDecoder();


    // keep track of tokens
    // let full_text = prompt; // in c we could make this a buffer of size prompt + limit
    // and insert tokend by index for max performance.
    let tokens = []
    // let concat = '';

    let completionTokenCount = 0;

    // read  stream
    let gotReaderDone = false;
    let gotDoneMessage = false;
    console.debug("ttfb(", Date.now() - now, ")... openai-processing-time: ", response.headers.get("openai-processing-ms"))

    while (true) {
        // get next chunk
        const {done, value} = await reader.read();
        if (done) {
            gotReaderDone = true;
            break;
        }
        const text = decoder.decode(value);

        // console.log(text);
        // split chunk into lines
        // todo: there's probs a better way to do this idk seems ok.
        const lines = text.split('\n').filter(line => line.trim() !== '');
        // console.log("Number of tokens in chuck: ", lines.length);
        for (const line of lines) {
            // remove the data: prefix
            const lineMessage = line.replace(/^data: /, '');

            // if we got the done message, stop
            if (lineMessage === '[DONE]') {
                gotDoneMessage = true;
                break; // return;
            }

            // try to parse the line as JSON, and if it works, get the token and call the callback
            try {
                const parsed = JSON.parse(lineMessage);
                const choice = parsed.choices[0];

                //completion.addToken(choice);


                // if()
                let myToken = new Token(choice);
                if (isChatMode) {
                    if (choice.delta.role) {
                        message.role = choice.delta.role;
                    }
                    if (choice.delta.content) {
                        message.content += choice.delta.content
                    }
                } else {
                    message.content += myToken.text;
                }


                if (myToken.text) {
                    completionTokenCount++; // tokens.length??
                }
                tokens.push(myToken);

                // concat += myToken.text;
                // if(isChatMode) {
                onToken(myToken, message, parsed, response);
                // } else {
                //     onToken(myToken.text, myToken, parsed, response);
                // }
            } catch (error) {
                // todo: handle error better -- retry? inform caller?
                console.error(`Could not JSON parse stream message`, {text, lines, line, lineMessage, error});
                try {
                    let errorInfo = JSON.parse(text);
                    console.error(`Error info`, errorInfo);
                    if (errorInfo.message) return onError(errorInfo.message);
                    if (errorInfo.error.message) return onError(errorInfo.error.message);
                } catch (error) {
                    console.error("Failed to parse error response from stream.")
                    // ignore if we cant read the error
                }
            }
        }
        if (gotDoneMessage) break;
    }
    const fullCount = estamateTokens(prompt + message.content)
    const cost = completionTokenCount / 1000 * price;
    const fullCost = fullCount / 1000 * price;

    console.log(` Streamed ${completionTokenCount} tokens. $${cost} ... full cost with prompt(${fullCount}): $${fullCost}`);

    console.log("Full req+res token count: ",);


    onDone(prompt, message, tokens, fullCost, response);

    return message;
}

streamOne.modelToPrice = modelToPrice;


/**
 * A test function to ask gpt for a quote / example usage
 * @returns {Promise<void>}
 */
streamOne.test = async function () {
    function onToken(text, token, parsed, response) {
        if (token.role) {
            console.log(token.content);
        } else
            console.log("Got Token: ", text, token.prob, token.text_offset);

    }

    function onDone(prompt, data, tokens, cost, response) {
        console.log("Got Data: ", data)
        if (typeof prompt !== "string") {
            //then we probably have an array of messages
            let s = ""
            prompt.forEach(m => {
                s += m.role + ": " + m.content + "\n";
            })
            prompt = s;
        }
        let fulltext = prompt + data;
        console.log(fulltext)

        console.log("full text token count: ", gptoken.countTokens(fulltext))
    }

    function onError(err) {
        console.error("Got Error:)");
    }

    let data = await streamOne("text-davinci-002",
        "What is the inspirational quote of the day in one sentence? \n QOTD: ",
        onToken, onDone, onError, {stop: ['.'], logProbs: 3});

    let data2 = await streamOne("gpt-3.5-turbo",
        [{role: "user", content: "What is the inspirational quote of the day in one sentence? \n QOTD: "}],
        onToken, onDone, onError, {endpoint: "/v1/chat/completions", logProbs: 3});


    //You can't be a real country unless you have a beer and an airline- it helps if you have some kind of a football team, or some nuclear weapons, but at the very least you need a beer

    // console.log("Data Resolved:", data2);
}
module.exports = streamOne;

/**
 *
 * Hola Mi Amie,
 *
 * Today I will tell you all you need to know about text completion streaming
 *
 * each token is returned on at a time. you have the option to select a different word theoretically
 * to do this turn on logprobs: 3-5 max and then you can offer an editing on a per word bases after compleation.
 *
 * each chunk is returned as data: {... choices: [{text, index, logprobs}]}
 * Each choice looks like not this info we want is
 * text: choice[0].text
 * prob: choice[0].logprobs.token_logprobs[0]
 * full_text_offset: logprobs.text_offset[0]
 *
 */
