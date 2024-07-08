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

let e1 = require("./encoderMapToTokens")
let ee1 = Object.entries(e1);
let r1 = Object.fromEntries(ee1.map(e=>[e[1], e[0]]));

function readFileAndCreateObject(filePath) {
    try {
        // Read the file synchronously to ensure we process it sequentially
        const fileData = fs.readFileSync(filePath, 'utf8');

        const  lines = fileData.replace("\r", "").split('\n');

        const dataObject = {};


        // Process the base64-encoded numbers and create key-value pairs
        for (let i = 1; i < lines.length; i += 2) {
            let line = lines[i]

            let [b64, token] = line.split(" ");
            const buf = Buffer.from(b64, 'base64');

            const key = Array.from(buf)
                .map(c=>String.fromCharCode(c)).join()


            const value = parseInt(token)
                let val2 = e1[key]
            if(!val2) {
                let k1 =  r1[value]
                console.log("rtv ", k1, " ",escapeSpecialCharacters(k1) )
                console.log("no match found", key, value, line);

            }

            dataObject[key] = value;
        }

        // Return the header and the created object
        return { header, data: dataObject };
    } catch (error) {
        console.error('Error reading and processing the file:', error);
        return null; // Handle the error gracefully in your application
    }
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

