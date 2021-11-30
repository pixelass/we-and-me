import { padStart } from "@/utils/string";

export const getTime = (ms: number) => {
	const m = Math.floor(ms / 60_000);
	const s = Math.floor((ms % 60_000) / 1000);

	return {
		mm: padStart(s === 60 ? m + 1 : m, 2),
		ss: padStart(s % 60, 2),
	};
};
