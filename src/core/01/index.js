import createBitGetter from "../../lib/bitAccessor/bitAccessor.js";


const bitGetter = createBitGetter(new Uint8Array([0b1110, 0b1101]));

console.log(bitGetter.get(0, 1)) // 1
console.log(bitGetter.get(1, 1)); // 0

console.log(bitGetter.set(0, 1, 0)); //
console.log(bitGetter.get(0, 1));    // 0
