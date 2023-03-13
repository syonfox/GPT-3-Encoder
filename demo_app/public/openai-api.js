//TODO 1: GET YOUR OPENAI API KEY from https://beta.openai.com/account/api-keys

//TODO 2a: RUN THE FOLLOWING COMMAND IN YOUR DEVELOPER CONSOLE FIRST:
//         localStorage.setItem("openAI", "YOUR_OPENAI_API_KEY");
const API_KEY = localStorage.getItem("openAI");

//TODO 2b: OPTIONALLY, YOU CAN DELETE THE PREVIOUS LINE AND HARD-CODE YOUR API KEY WITH:
//const API_KEY = "YOUR_OPENAI_API_KEY";

const MIN_CHARS = 0;
let promptSpan, charSpan;

//Get the Light or Dark stylesheet depending on time of day.
getStylesheet();

/*
This code is listening for when the DOM (Document Object Model) has finished loading, and then it performs several actions.
It assigns two variables, "promptSpan" and "charSpan", to elements on the page by their id.
Then it adds an event listener to "promptSpan" that listens for input and runs the "countCharacters" function.
It also sets the inner text of "charSpan" to the value of "MIN_CHARS", which is assumed to be a constant, and it converts that value to a string.
It also sets up an event listener on a select element with id "engines" to store the selected engine in the browser's local storage when the selection changes.
And retrieves the value of the selected engine from the local storage when the page refreshes.
*/
document.addEventListener("DOMContentLoaded", function () {

    promptSpan = document.getElementById("prompt");
    promptSpan.addEventListener("input", countCharacters);

    charSpan = document.getElementById("charCount");
    charSpan.innerText = MIN_CHARS.toString();

    //ENSURES THAT THE ENGINE SELECTED IS KEPT ON A PAGE REFRESH
    const enginesList = document.getElementById("engines");
    const OPENAI_API_ENGINE = "OPENAI_API_ENGINE";
    enginesList.addEventListener('change', (event) => {
        let currentEngine = event.target.value;
        localStorage.setItem(OPENAI_API_ENGINE, currentEngine);
    });
    if (localStorage.getItem(OPENAI_API_ENGINE)) {
        enginesList.value = localStorage.getItem(OPENAI_API_ENGINE);
    }

    typeSentence("🤖 Hello, how can I help? 🤖", promptSpan, '', false, 100)
        .then(afterTyping => promptSpan.innerHTML = "");

});

/*
This function is counting the number of characters entered in the "promptSpan" element,
and then updating all elements with the "counter" attribute to reflect the number of characters entered.
If the number of characters entered is greater than 280 (the Twitter character limit),
the text color of all "counter" elements is set to red. If the number of characters entered is less than or equal to 280,
the text color of all "counter" elements is set to black if no dark css is found otherwise it's set to white.
Finally, it sets the inner text of "charSpan" to the number of characters entered.
 */
function countCharacters() {
    //Twitter character limit for reference
    const MAX_COUNTER = 280;

    let numOfCharsEntered = promptSpan.innerText.length.toString();
    let spans = document.querySelectorAll("span[name='counter']");
    for (let i = 0; i < spans.length; i++) {
        if (numOfCharsEntered > MAX_COUNTER) {
            spans[i].style.color = "red";
        } else {
            let darkCSS = document.getElementById("darkCSS");
            if (darkCSS == null) {
                spans[i].style.color = "black";
            } else {
                spans[i].style.color = "white";
            }
        }
    }
    charSpan.innerText = numOfCharsEntered;
}

/*
This function is making an asynchronous API call to the OpenAI API to get completions based on the text entered in the "prompt" element and the engine selected in the "engines" element.
The function is first clearing any previous response and receipt by calling the clearResponseAndReceipt() function.
It then retrieves the values of "prompt" and "engines" elements and checks if they are not empty or whitespace.
If both of them have values, it makes a POST request to the OpenAI API with the specified headers, including the API key and a JSON body containing the model, prompt, temperature and max_tokens.
If the response is not ok, it logs the error and types the error message on the response element.
If the response is ok, it converts the response to json and calls the createResponse() function to create the response and types it on the response element.
If an error occurs, it logs the error.
If either prompt or engine is empty or whitespace, it types a message asking the user to enter a prompt and select an engine on the response element.
 */
async function openAI_API_Completions() {
    //Cache DOM elements to avoid unnecessary DOM traversals
    let promptElem = document.getElementById('prompt');
    let engineElem = document.getElementById("engines");
    let responseElem = document.getElementById("response");
    clearResponseAndReceipt();
    let promptText = promptElem.textContent.trim();
    let engine = engineElem.value.trim();

    if (promptText && engine) {
        try {
            const response = await fetch('https://api.openai.com/v1/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + API_KEY
                },
                body: JSON.stringify({
                    'model': engine,
                    'prompt': promptText,
                    'temperature': 0,
                    'max_tokens': 1000,
                    'top_p': 1,
                    'frequency_penalty': 1.2,
                    'presence_penalty': 0
                })
            });

            if (!response.ok) {
                console.error("HTTP ERROR: " + response.status + "\n" + response.statusText);
                typeSentence("HTTP ERROR: " + response.status, responseElem);
            } else {
                const data = await response.json();
                typeSentence(createResponse(data), responseElem, data, true);
            }
        } catch (error) {
            console.error("ERROR: " + error);
        }
    } else {
        await typeSentence("Please enter a prompt and select an engine", responseElem);
    }
}

//SET TOP EXAMPLES
const TOP_EXAMPLES = [
    'Convert movie titles into emoji.\r\nBack to the Future: 👨👴🚗🕒 \r\nBatman: 🤵🦇 \r\nTransformers: 🚗🤖 \r\nStar Wars:',
    'Decide whether a Tweet\'s sentiment is positive, neutral, or negative\r\nTweet: "I loved the new Batman movie!"\r\nSentiment:',
    'Translate the following into Spanish:\r\nIs Artificial Intelligence the Future?',
    'Correct this to standard English:\r\nI be not wantin any satisfaction',
    'The OpenAI API can be applied to virtually any task that involves understanding or generating natural language or code. We offer a spectrum of models with different levels of power suitable for different tasks, as well as the ability to fine-tune your own custom models. These models can be used for everything from content generation to semantic search and classification.\r\nTl;dr',
];

/*
This function is setting an example prompt based on the provided index by updating the textContent of the 'prompt' element with the example from the TOP_EXAMPLES array specified by the exampleIndex parameter.
It first clears the previous prompt by calling the clearAll() function.
Then it updates the textContent of the 'prompt' element with the example from the TOP_EXAMPLES array specified by the exampleIndex parameter.
Finally, it calls the countCharacters() function to update the character count.
 */
function setExample(exampleIndex) {
    clearAll();
    document.getElementById('prompt').textContent = TOP_EXAMPLES[exampleIndex];
    countCharacters();
}

/*
This code is creating an array of examples, each containing an emoji, a title, and an onclick function.
It then uses a for loop to iterate through the examples array, creating a new "span" element for each example,
setting the "name", "title", and "onclick" attributes, and setting the innerHTML to the example's emoji.
The newly created span elements are then appended to the element with the id "topExamples".
This will create a list of clickable emojis with title and onclick function that are associated with the element with the id "topExamples".
 */
const topExamples = document.getElementById("topExamples");

/*
var examples = [
    { emoji: "&#127916;", title: "Movie to Emoji", onclick: "setExample(0)" },
    { emoji: "&#128566;", title: "Tweet Sentiment", onclick: "setExample(1)" },
    { emoji: "&#128483;", title: "Spanish Translator", onclick: "setExample(2)" },
    { emoji: "&#127891;", title: "Grammar Check", onclick: "setExample(3)" },
    { emoji: "&#9986;", title: "TL;DR", onclick: "setExample(4)" }
];

for (var i = 0; i < examples.length; i++) {
    var example = document.createElement("span");
    example.setAttribute("name", "example");
    example.setAttribute("title", examples[i].title);
    example.setAttribute("onclick", examples[i].onclick);
    example.innerHTML = examples[i].emoji;
    topExamples.appendChild(example);
}
*/

/*
This function is clearing all the data on the page, it first clears the textContent of the 'prompt' element and sets it to an empty string.
Then it calls the countCharacters() function to update the character count.
Finally, it calls the clearResponseAndReceipt() function to clear the response and receipt data.
This function is useful to clear all the data on the page when user wants to start fresh.
 */
function clearAll() {
    document.getElementById('prompt').textContent = '';
    countCharacters();
    clearResponseAndReceipt();
}

/*
This function is used to clear the response and receipt data on the page, it sets the innerHTML of the elements with ids 'response' and 'receipt' to an empty string.
This function is typically called when the user wants to clear the previous generated response and receipt from the page.
 */
function clearResponseAndReceipt() {
    document.getElementById('response').innerHTML = '';
    document.getElementById('receipt').innerHTML = '';
}

/*
This function is removing the period(.) from the input json array.
It does this by iterating over the json array and checking if the element is a period.
If it is, it removes that element from the array using the splice method.
It then returns the modified json array.
This function is useful to remove the period from the end of the sentence to make it a complete sentence.
 */
function removePeriod(json) {
    json.forEach(function (element, index) {
        if (element === ".") {
            json.splice(index, 1);
        }
    });
    return json;
}

/*
This function is creating the response by processing the input json object.
It first creates an empty string variable named response.
It then calls the removePeriod() function to remove the period from the choices array of the json object.
It then checks if the choices array has at least one element, and if it does, it assigns the text of the first element of the choices array to the response variable.
Then it returns the response variable.
This function is typically used to create a response from the json object returned by the OpenAI API.
 */
function createResponse(json) {
    let response = "";
    let choices = removePeriod(json.choices);
    if (choices.length > 0) {
        response = json.choices[0].text
        //json.choices[0].index
        //json.choices[0].logprobs
        //json.choices[0].finish_reason
    }

    return response;
}

/*
This function is typing out a sentence on the specified element reference.
It first clears the inner text of the element reference passed as an argument.
It then splits the sentence into an array of letters and starts a loop that iterates over the letters array.
Within the loop, it waits for a specified delay (30ms) and then appends the current letter to the element reference.
Once the loop completes, if the isReceipt is set to true, it calls the createReceipt() function with the data passed as an argument to create a receipt and updates the innerHTML of the element with the id "receipt".
This function is typically used to create a typing effect on the page and can be used to type out both the response and receipt.
 */
async function typeSentence(sentence, elementReference, data, isReceipt = false, delay = 30) {
    elementReference.innerText = "";
    if (sentence === "HTTP ERROR: 401") {
        sentence += " — Please make sure that your Open AI API Key has been set properly.";
    }
    const letters = sentence.split("");
    //let delay = 30;
    let i = 0;
    while (i < letters.length) {
        await waitForMs(delay);
        elementReference.append(letters[i]);
        i++
    }

    if (isReceipt) {
        document.getElementById("receipt").innerHTML = createReceipt(data);
    }

    return;
}

/*
This function is a helper function that returns a promise that resolves after a specified number of milliseconds.
It takes one parameter, "ms", which is the number of milliseconds to wait before resolving the promise.
This function is typically used in conjunction with the await keyword to pause the execution of a function for a certain amount of time.
The returned promise can be awaited and will resolve after the specified number of milliseconds, allowing for a delay in the execution of the calling function.
 */
function waitForMs(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

/*
This function creates a receipt of the data provided by the json object.
It first commented out the code that creates a table that includes various details such as Completion ID, Object Type, Prompted At, Engine Used, Prompt Tokens, Completion Tokens, Total Tokens, and Total Cost.
It utilizes the setRow() function to create table rows and convertEpochToDateTime() and calculateCost() functions to format the data.
Now it returns the total cost of the request, it uses the calculateCost() function to calculate the cost of the request based on the model and the total_tokens used.
This function is typically used to create a receipt of the request that can be displayed on the page.
 */
function createReceipt(json) {
    /*let table = "<table border='1'>";
    table += "<tr style='background-color: orangered; color: white; text-align: left'><th>Name</th><th>Value</th></tr>";
    table += setRow("Completion ID", json.id);
    table += setRow("Object Type", json.object);
    table += setRow("Prompted At", convertEpochToDateTime(json.created));
    table += setRow("Engine Used", json.model);
    table += setRow("Prompt Tokens", json.usage.prompt_tokens, true);
    table += setRow("Completion Tokens", json.usage.completion_tokens, true);
    table += setRow("Total Tokens", json.usage.total_tokens, true);
    table += setRow("Total Cost", "$" + calculateCost(json.model, json.usage.total_tokens));
    table += "</table>";
    return table;*/

    let model = json.model;
    let promptTokens = json.usage.prompt_tokens;
    let completionTokens = json.usage.completion_tokens;
    let totalTokens = json.usage.total_tokens;
    return "<hr/><div><span>" + model + " </span><span style='font-family: Poppins; font-weight: bolder;'>RECEIPT</span></div><br/><div style='font-family: Poppins'>Total Tokens: <span style='font-family: Orbitron'>" + totalTokens +
        "</span></div><br/>$" + calculateCost(json.model, totalTokens);
}

/*
This function is used to create a row of a table that displays name and value of the data.
It takes three parameters: name, value, and setWordCount.
If setWordCount is set to true, it calculates the approximate number of words based on the assumption that there are 0.75 tokens per word and adds it to the description.
Then it returns an HTML string that represents a table row containing the name and description.
This function is typically used by the createReceipt() function to create rows of the receipt table.
 */
function setRow(name, value, setWordCount) {
    let description = value;
    if (setWordCount === true) {
        description = value + " (~" + +Math.round(value * 0.75) + " words)";
    }
    return "<tr><td>" + name + "</td><td>" + description + "</td></tr>";
}

/*
This function is used to calculate the cost of the request based on the engine used and the number of tokens used.
It takes three parameters: engineName, totalTokens, and wordCount.
It first sets totalCost to 0 and declares constant variables for the prices per 1000 tokens for each engine.
Then it calculates the price per token by dividing totalTokens by 1000.
Next it checks the value of engineName and multiplies the pricePerToken with the corresponding constant variable of the engine and assigns the result to totalCost.
If the wordCount is set to true, it calculates the approximate number of words based on the assumption that there are 0.75 tokens per word.
Finally, it returns the total cost with fixed decimal places.
This function is typically used by the createReceipt() function to calculate the cost of the request.
 */
function calculateCost(engineName, totalTokens, wordCount = false) {
    let totalCost = 0;
    //Prices per 1000 tokens
    const DAVINCI_PRICE = 0.02;
    const CURIE_PRICE = 0.002;
    const BABBAGE_PRICE = 0.0005;
    const ADA_PRICE = 0.0004;
    const CODEX_PRICE = 0;

    let pricePerToken = totalTokens / 1000;
    if (engineName === "text-davinci-003") {
        totalCost = DAVINCI_PRICE * pricePerToken;
    } else if (engineName === "text-curie-001") {
        totalCost = CURIE_PRICE * pricePerToken;
    } else if (engineName === "text-babbage-001") {
        totalCost = BABBAGE_PRICE * pricePerToken;
    } else if (engineName === "text-ada-001") {
        totalCost = ADA_PRICE * pricePerToken;
    } else if (engineName === "code-davinci-002") {
        totalCost = CODEX_PRICE * pricePerToken;
    }

    return totalCost.toFixed(10);
}

/*
This function is used to convert the provided epoch time in seconds to a human-readable date and time string.
It takes one parameter, "epoch" which is the time in seconds since the Unix epoch.
It first creates a new Date object by multiplying the epoch time by 1000 to convert it from seconds to milliseconds.
Then it returns a string representation of the date and time in the local time zone format using the toLocaleString() method.
This function is typically used by the createReceipt() function to format the date and time of the request.
 */
function convertEpochToDateTime(epoch) {
    let date = new Date(epoch * 1000);
    return date.toLocaleString();
}

/*
This function is used to determine the text color of the time based on the current time of the day.
It creates a variable "color" and sets it to "dark".
Then it creates a new Date object and uses the getHours method to get the current hour.
Then it checks if the current hour is between 6am and 7pm (inclusive) and sets the color variable to "light" if true.
Finally, it returns the color variable, which will be "dark" if it's nighttime, and "light" if it's daytime.
This function is typically used to set the text color of the time on the page to be easily readable against the background color.
 */
function getTimeColor() {
    let color = "dark";
    var currentTime = new Date().getHours();
    if (6 <= currentTime && currentTime < 19) {
        color = "light";
    }

    return color;
}

/*
This function is used to determine the appropriate stylesheet to use based on the current time of the day.
It creates two constants, CSS_LIGHT and CSS_DARK, which are the HTML link tags for the light and dark stylesheets.
Then it calls the getTimeColor() function to determine the text color of the time.
If the text color is black, it means it's daytime and writes the CSS_LIGHT link tag to the document, otherwise, it writes the CSS_DARK link tag to the document.
This way, the page will have a light theme during the day and a dark theme during the night.
This function is typically called on page load to apply the appropriate stylesheet to the page.
 */
function getStylesheet() {
    const CSS_LIGHT = "<link id='lightCSS' rel='stylesheet' href='./light.css' type='text/css'>";
    const CSS_DARK = "<link id='darkCSS' rel='stylesheet' href='./dark.css' type='text/css'>";
    let timeColor = getTimeColor();
    if (timeColor === "light") {
        document.write(CSS_LIGHT);
    } else {
        document.write(CSS_DARK);
    }
    setGitHubImageAndLogo(timeColor);
}

/*
This function takes in a parameter "timeColor" and uses it to determine the source of the image for the HTML element with the ID "gh-img".
If "timeColor" is equal to "dark", the source of the image is set to "../images/github-mark-white.png", and if it's not, the source is set to "../images/github-mark.png".
This function is likely used to switch the image source depending on the time of day or user preferences.
 */
function setGitHubImageAndLogo(timeColor) {
    let ghImg = document.getElementById("gh-img");
    let logoImg = document.getElementById("logo");
    ghImg.src = "";
    if (timeColor === "dark") {
        ghImg.src = "../images/github-mark-white.png";
        logoImg.src = "../images/sopmac-ai-white.png";
    } else {
        ghImg.src = "../images/github-mark.png";
        logoImg.src = "../images/sopmac-ai-black.png";
    }
}

/*
This function is used to switch between the light and dark stylesheets based on the current stylesheet.
It first checks if the darkCSS element exists in the document using the getElementById method and assigns the result to the variable "darkCSS", and then check if the lightCSS element exists in the document using the getElementById method and assigns the result to the variable "lightCSS".
If darkCSS variable is null, it means that the dark stylesheet is not currently being used, so it removes the light stylesheet link element and sets the new stylesheet link with the id "darkCSS" and path "./dark.css" using the setSheet function.
If lightCSS variable is null, it means that the light stylesheet is not currently being used, so it removes the dark stylesheet link element and sets the new stylesheet link with the id "lightCSS" and path "./light.css" using the setSheet function.
Next, we call setGitHubImageAndLogo() to set the src attribute of the GitHub logo image based on time of day.
Finally, it calls the countCharacters() function to update the characters count.
This function is typically used when the user wants to switch between the light and dark themes manually.
 */
function switchStylesheet() {
    let darkCSS = document.getElementById("darkCSS");
    let lightCSS = document.getElementById("lightCSS");
    let newColor = "light";

    if (darkCSS == null) {
        document.getElementById("lightCSS").remove();
        setSheet("darkCSS", "./dark.css");
        newColor = "dark";
    } else if (lightCSS == null) {
        document.getElementById("darkCSS").remove();
        setSheet("lightCSS", "./light.css");
    }
    setGitHubImageAndLogo(newColor);
    countCharacters();
}

/*
This function is used to set a new stylesheet link element with a provided id and href.
It takes two parameters, "id" and "href", which are the id and href attributes of the link element.
It first creates a new link element using the createElement method and assigns it to the variable "sheet".
Then it sets the rel, id, href, and type attributes of the link element using the corresponding properties of the "sheet" variable.
Finally, it appends the link element to the body of the document using the appendChild method.
This function is typically used to set a new stylesheet link element when the user switches between the light and dark themes.
 */
function setSheet(id, href) {
    var sheet = document.createElement('link');
    sheet.rel = "stylesheet";
    sheet.id = id;
    sheet.href = href;
    sheet.type = "text/css";
    document.body.appendChild(sheet);
}