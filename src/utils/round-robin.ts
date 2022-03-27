/**
 * Implements a round-robin tournament algorithm. {@see https://en.wikipedia.org/wiki/Round-robin_tournament}
 * @param items
 */
import shuffle from "lodash.shuffle";

export const roundRobin = <T>(items: T[]): T[][][] => {
	const filled = items.length % 2 ? [...items, null] : items;
	const iterations = filled.length - 1;
	const a = filled;
	const b = filled.splice(Math.floor(filled.length / 2)).reverse();
	const rounds: T[][][] = [];
	if (a.length > 1 && b.length > 0) {
		for (let i = 0; i < iterations; i++) {
			rounds.push([[...a], [...b]]);
			const fixed = a.shift();
			a.unshift(b.shift());
			b.push(a.pop());
			a.unshift(fixed);
		}
	}

	return rounds;
};

interface SimpleSort {
	(a: number, b: number): number;
	(a: string, b: string): number;
}

interface GetTournament {
	(rounds: number[][][], sort?: SimpleSort): number[][][];
	(rounds: string[][][], sort?: SimpleSort): string[][][];
	<T>(rounds: T[][][], sort: (a: T, b: T) => number): T[][][];
}

const simpleSort: SimpleSort = <T>(a: T, b: T) => (a > b ? 1 : a < b ? -1 : 0);

export const getTournament: GetTournament = <T>(
	rounds: T[][][],
	sort?: (a: T, b: T) => number
): T[][][] => {
	return rounds.map(([a, b]) =>
		shuffle(
			a
				.map((item, index) => {
					switch (typeof item) {
						case "string":
							return ([item, b[index]].filter(Boolean) as unknown as string[]).sort(
								simpleSort
							);
						case "number":
							return ([item, b[index]].filter(Boolean) as unknown as number[]).sort(
								simpleSort
							);
						default:
							return [item, b[index]].filter(Boolean).sort(sort);
					}
				})
				.filter(group => group.length > 1) as T[][]
		)
	);
};
