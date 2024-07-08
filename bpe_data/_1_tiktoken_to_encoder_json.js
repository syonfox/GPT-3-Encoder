const fs = require('fs');

let debug = 100

let unicodeEscape = true;

function escapeSpecialCharacters(str) {
    return JSON.stringify(str, (key, value) => {
        if (typeof value === 'string') {
            return value.replace(/[\u007F-\uFFFF]/g, (char) => {
                return '\\u' + ('0000' + char.charCodeAt(0).toString(16)).slice(-4);
            });
        }
        return value;
    });
}

function escapeNonAlphaNumericAndJSONChars(input) {


    return input.replace(/[^a-zA-Z1-9",{}]/g, (char) => {
        // Check if the character is within the JSON object characters
        if ('"{}[]'.includes(char)) {
            return char; // Keep JSON characters as-is
        }
        // Convert the character to a Unicode escape sequence
        return `\\u${('0000' + char.charCodeAt(0).toString(16)).slice(-4)}`;
    });
}

// const originalString = 'Hello, ☺️ World! { "key": "value" }';
// const escapedString = escapeNonAlphaNumericAndJSONChars(originalString);
//
// console.log('Original String:', originalString);
// console.log('Escaped String:', escapedString);


// const fs = require('fs');
const readline = require('readline');

function readFileAndCreateObject(filePath) {
    return new Promise((resolve, reject) => {
        const dataObject = {};
        const readStream = readline.createInterface({
            input: fs.createReadStream(filePath),
            terminal: false,
        });

        readStream.on('line', (line) => {
            // Process each line in the file
            const [b64, token] = line.split(" ");
            const key = Buffer.from(b64, 'base64').toString('utf8');
            const value = parseInt(token, 10);

            if (isNaN(value)) {
                console.error(`Invalid token: ${token}`);
            } else {
                dataObject[key] = value;
            }
        });

        readStream.on('close', () => {
            resolve(dataObject);
        });

        readStream.on('error', (error) => {
            reject(error);
        });
    });
}

//
// // Example usage:

function JSON_stringify(s, emit_unicode) {
    var json = JSON.stringify(s);
    return emit_unicode ? json : json.replace(/[\u007f-\uffff]/g,
        function (c) {
            return '\\u' + ('0000' + c.charCodeAt(0).toString(16)).slice(-4);
        }
    );
}

function writeJSONFile(filePath, data, emit_unicode) {
    try {
        // Convert the data object to a JSON string

        let json = JSON.stringify(data,
            null, 0); // The `null, 2` parameters format the JSON with indentation for readability.

        // json = emit_unicode ?
        //
        //     : json
        // );

        if (emit_unicode) {
            // json = escapeNonAlphaNumericAndJSONChars(json)
            json = json.replace(/[^\x21-\x7E]/g, function (chr) {
                return "\\u" + ("0000" + chr.charCodeAt(0).toString(16)).substr(-4)
            })

            // json = json.replace(/[\u0020-\uffff]/g,
            //      function (c) {
            //          return '\\u' + ('0000' + c.charCodeAt(0).toString(16)).slice(-4);
            //      }
        }

        // function jsonEscapeUTF(s) {return s.replace(/[^\x20-\x7F]/g, x => "\\u" + ("000"+x.codePointAt(0).toString(16)).slice(-4))}
        // if(emit_unicode) {
        //     json = jsonEscapeUTF(json)
        // }

        // Write the JSON string to the file
        fs.writeFileSync(filePath, json, 'utf8');

        console.log('JSON file has been written successfully.');
    } catch (error) {
        console.error('Error writing JSON file:', error);
        // Handle the error gracefully in your application
    }
}


let files = [
    "p50k_base",
    // "cl100k_base"
]

files.forEach(async f => {
    const filePath = `./raw_tiktoken/${f}.tiktoken`; // Replace with the path to your file
    const outPath = `./encoder_${f}.json`
    console.log("converting: ", f)
    const result = await readFileAndCreateObject(filePath);

    writeJSONFile(outPath, result)

    if (unicodeEscape) {
        const outPath = `./unicode_encoder_${f}.json`
        // const unicodeResult = convertObjectToUnicodeString(result);
        writeJSONFile(outPath, result, true)


    }
})

