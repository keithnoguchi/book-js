// A chess board
//
// # Examples
//
// ```
// $ yarn dev ch02/src/main.js
//  # # # #
// # # # #
//  # # # #
// # # # #
//  # # # #
// # # # #
//  # # # #
// # # # #
// ```

const size = 8;

const half = size / 2;
const pattern = [' #'.repeat(half), '# '.repeat(half)];

for (let i = 0; i < half; i++) {
	console.log(pattern[0]);
	console.log(pattern[1]);
}
