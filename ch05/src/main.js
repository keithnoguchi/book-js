// Chapter 5: Higher Order Functions

function repeat(n, action) {
	for (let i = 0; i < n; i++) {
		action(i);
	}
}

repeat(10, console.log);
