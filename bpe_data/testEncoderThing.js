let e1 = require("./encoderMapToTokens")

let e2 = require("./unicode_encoder_p50k_base.json")

let l1 = Object.entries(e1).length
let l2 = Object.entries(e2).length

console.assert(l1 == l2, `${l1} != ${l2}`)

// for (let i = 0; i < ; i++) {
//
// }




// return;

Object.entries(e1).forEach(e => {

    let key = e[0]
    let val = e[1]

    let val2 = e2[key]
    console.assert(typeof val2 !== "undefined", "e2 key dose not exist", key,"  ", val, "<1|2>", val2 )
    console.assert(val2 == val, "e1 val not == e2 val ", key,"  ",val,  "<1|2>", val2)

    if(val2 != val) {

        e2["i"]
        console.log("todo fix; ", e)

    }

})