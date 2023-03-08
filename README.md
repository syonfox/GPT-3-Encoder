# GPToken is an expanded project based on the original 
<a href="https://www.npmjs.com/package/gpt-3-encoder">
  <img src="https://img.shields.io/npm/v/gpt-3-encoder.svg" alt="npm version">
</a>


New
<a href="https://www.npmjs.com/package/gptoken">
<img src="https://img.shields.io/npm/v/gptoken.svg" alt="npm version">
</a>

[![JSDocs](https://img.shields.io/badge/JS%20Docs-Read%20them%20maybe-brightgreen)](https://syonfox.github.io/GPT-3-Encoder/)

Also check out the browser demo [browser demo](https://syonfox.github.io/GPT-3-Encoder/browser.html)

[![GitHub last commit](https://img.shields.io/github/last-commit/syonfox/GPT-3-Encoder)](https://github.com/syonfox/GPT-3-Encoder/commits)
[![example workflow](https://github.com/latitudegames/GPT-3-Encoder/actions/workflows/node.js.yml/badge.svg)](https://github.com/syonfox/GPT-3-Encoder/actions)
[![github](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/syonfox/GPT-3-Encoder/tree/GPToken)


# TLDR
```
npm install gptoken
const gptoken = require('gptoken')

let tokens = gptoken.encode("hello world, we all share a goal of life")
console.log("Tokens: ", tokens);
console.log("TokenStats: ", JSON.stringify(gptoken.tokenStats(tokens)));

//or browser demo
firefox ../node_modules/gptoken/browser.html
```

# Fork Purpose 
 I have created this to add general gpt helper functionality as well as creat a compleat pakage.

 The plan is to clean up and stabilize this original implementation. 

 I would like to then make this usefully for other models and features.

# Roadmap 
  Improved performance
  More utilities function.

  More research on how to interact with GPT models.

  Add a simple elagent openai api integration so this can be a minimal frontend and backend base.

# Intro

Javascript library for encoding and decoding text using Byte Pair Encoding (BPE), as used in GPT-2 and GPT-3 models by
OpenAI. This is a fork of the original python implementation by OpenAI, which can be found here.

This fork includes additional features such as the countTokens and tokenStats functions, as well as updated
documentation.

## Installation

To install with npm:

```
npm install gptoken
or old
npm install @syonfox/GPT3-encoder

```

# Overview 

The main interface is defined in `index.js or index.d.ts`

The code is in `Encoder.js`

The Encoding data/ maps are in the bpe_data directory this is loaded by Encoder to perfrom the conversion.

There are useful scripts defined in `pakage.json`

The tests are using `jest` and are defined in `Encoder.test.js`

docs are built using jsdoc `npm run doc` and we need to `cp browser.* docs/` after build so demo works on github pages 

There are 2 demos one using nodejs `npm run demo` 
and one using the browserify version in a html page `npm run browser`


## Usage


Compatible with Node >= 12

To use the library in your project, import it as follows:

```js
const gptoken = require('gptoken');
```

## TODO add nextjs browser node and react examples for browser ejs node and other syntax

### Additional Features (check out the docs :)

In addition to the original `encoding` and `decoding` functions, this fork includes the following additional features:
`countTokens(text: string): number`

This function returns the number of tokens in the provided text, after encoding it using BPE.
`tokenStats(text: string): object`

This function returns an object containing statistics about the tokens in the provided text, after encoding it using
BPE. The returned object includes the following properties:

- `count`: the total number of tokens in the text.
- `unique`: the number of unique tokens in the text.
- `frequencies`: an object containing the frequency of each token in the text.
- `postions`: an object mapping tokens to positions in the encoded string
- `tokens`: same as the output to tokens

- Compatibility

This library is compatible with both Node.js and browser environments, we have used webpack to build /dist/bundle.js 1.5 MB including the data. A compiled version for both environments is included in the package.
Credits

This library was created as a fork of the original GPT-3-Encoder library by latitudegames.

## Example

See browser.html and demo.js
Note you may need to include it from the appropriate place in node modules / npm package name

```js

import {encode, decode, countTokens, tokenStats} from "gptoken"
//or note you might need @syonfox/gpt-3-encoder if thats what you npm install
const {encode, decode, countTokens, tokenStats} = require('gptoken')

const str = 'This is an example sentence to try encoding out on!'
const encoded = encode(str)
console.log('Encoded this string looks like: ', encoded)

console.log('We can look at each token and what it represents')
for (let token of encoded) {
    console.log({token, string: decode([token])})
}

//example count tokens usage
if (countTokens(str) > 5) {
    console.log("String is over five tokens, inconcevable");
}

const decoded = decode(encoded)
console.log('We can decode it back into:\n', decoded)

```

## Developers

I have added som other examples to the examples folder.
Please take a look at package.json for how to do stuff

```sh
//the original repo
git clone https://github.com/syonfox/GPT-3-Encoder.git

cd GPT-3-Encoder

npm install # install dev deps (docs tests build)

npm run test # run tests
npm run docs # build docs

npm run build # builds it for the browser
npm run browser # launches demo in firefox
npm run demo # runs node.js demo


less Encoder.js # the main code is here

firefox ./docs/index.html # view docs locally

npm publish --access public # dev publish to npm



```

Performance 

Built bpe_ranks  in  100 ms

// using js loading (probably before cache)
Loaded encoder  in  121 ms
Loaded bpe_ranks  in  91 ms

// using fs loading
Loaded encoder  in  32 ms
Loaded bpe_ranks  in  44 ms

//back to js loading
Loaded encoder  in  35 ms
Loaded bpe_ranks  in  40 ms


## todo

More stats that work well with this token representation.

Clean up and keep it simple.

Here are some additional suggestions for improving the GPT-3 Encoder:

- Add more unit tests to ensure the correctness and reliability of the code. This can be particularly important for the
  encode and decode functions, which are the main functions of the encoder.
- Add more documentation and examples to help users understand how to use the encoder and integrate it into their own
  projects. This could include additional JSDoc comments, as well as additional documentation in the README file and/or
  GitHub Pages.
- Consider adding support for other languages and character sets. Currently, the encoder only supports ASCII characters,
  but there may be a demand for support for other languages and character sets.
- Explore potential optimizations and performance improvements for the encode and decode functions. Some ideas might
  include using faster data structures (such as a hash map or a trie), implementing more efficient algorithms, or using
  multi-threading or web workers to take advantage of multiple cores or processors.
- Consider adding support for other models or use cases. For example, you could add support for other OpenAI models (
  such as GPT-2 or GPT-3) or for other applications of BPE encoding (such as machine translation or natural language
  processing).

