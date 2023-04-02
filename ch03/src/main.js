// Do +5 or *3 algorithm

function findSolution(target) {
	function find(current, history) {
		if (current == target) {
			return history;
		} else if (current > target) {
			return null;
		} else {
			return (
				find(current + 5, `(${history} + 5)`) ||
				find(current * 3, `(${history} * 3)`)
			);
		}
	}
	return find(1, '1');
}

const answers = [
	null,
	'1',
	null,
	'(1 * 3)',
	null,
	null,
	'(1 + 5)',
	null,
	'((1 * 3) + 5)',
	'((1 * 3) * 3)'
];

for (let target = 0; target < 10; target++) {
	const solution = findSolution(target);
	console.log(`${target}: ${solution}`);

	// better assert is needed...
	if (solution != answers[target]) process.exit(1);
}
