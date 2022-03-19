import shuffle from "lodash.shuffle";

const rotateItems = <T>([a, b]: T[][]) => {
	// A run rotates both arrays while one item stays fixed;
	// Remove the first item
	const [fixed] = a.splice(0, 1);
	// Rotate the arrays
	a.unshift(b.shift());
	b.push(a.pop());
	// Add the previously removed item back to its initial position
	a.unshift(fixed);
	return [a, b];
};

/**
 * Implements a round-robin tournament algorithm. {@see https://en.wikipedia.org/wiki/Round-robin_tournament}
 * @param group
 */
export const roundRobin = <T>(group: T[]) => {
	const rounds: T[][][] = [];
	// Clone the array before we split it
	const a = [...group];
	// Split the array into 2 equal parts.
	// When the length is odd
	// Then the first array has one extra item
	const b = a.splice(Math.ceil(group.length / 2));
	b.reverse();
	// Create a mutable array
	let groups = [a, b];
	// We need n - 1 iterations, where n is the length of the group
	for (let iteration = 0; iteration < group.length - 1; iteration++) {
		// Then create pairs for each round
		// And remove rounds with one item
		rounds.push(
			shuffle(
				groups[0]
					.map((item, index) => [item, groups[1][index]].filter(Boolean))
					.filter(item => item.length > 1)
			)
		);
		// For every iteration, rotate the items
		groups = rotateItems(groups);
	}

	return rounds;
};
