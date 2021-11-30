import { useReducer } from "react";

const updateReducer = (number: number): number => (number + 1) % 1_000_000;

export const useUpdate = (): (() => void) => {
	const [, update] = useReducer(updateReducer, 0);

	return update;
};
