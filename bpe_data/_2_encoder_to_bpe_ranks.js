const fs = require('fs');
const path = require('path');
let now = Date.now()

// let files = [
//   "encoder_p50k_base.json",
//   // "encoder_cl100k_base.json"
// ]

let encoder = require("./unicode_encoder_p50k_base.json")

let ents = Object.entries(encoder);


// const bpe_file = fs.readFileSync(path.join(__dirname, './vocab.bpe'), 'utf-8');
//
// const lines = bpe_file.split('\n');


// bpe_merges = [tuple(merge_str.split()) for merge_str in bpe_data.split("\n")[1:-1]]


// const bpe_merges = lines.slice(1, lines.length - 1).map(x => {
//   return x.split(/(\s+)/).filter(function(e) { return e.trim().length > 0; });
// }); // vlean data already done

const range = (x, y) => {
  const res = Array.from(Array(y).keys()).slice(x)
  return res
}

const dictZip = (x, y) => {
  const result = {};
  x.map((_, i) => { result[x[i]] = y[i]; });
  return result;
};


// It is safe to precompute bpe_ranks as it is not expected to change at runtime. bpe_ranks is created by mapping the bpe_merges array to an array of sequential integers, and this mapping does not depend on any runtime variables. bpe_ranks is a constant object and can be safely used without incurring any performance overhead.
const bpe_ranks = dictZip(ents, range(0, ents.length))
console.log("Built bpe_ranks  in ", Date.now()-now, "ms")

fs.writeFileSync('./bpe_ranks_50k.js', `module.exports = ${JSON.stringify(bpe_ranks)};`);
