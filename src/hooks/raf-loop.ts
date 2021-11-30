import { useCallback, useEffect, useMemo, useRef } from "react";

export type RafLoopReturns = [() => void, () => void, () => boolean];

export const useRafLoop = (
	callback: FrameRequestCallback,
	initiallyActive = true
): RafLoopReturns => {
	const raf = useRef<number | null>(null);
	const rafActivity = useRef<boolean>(false);
	const rafCallback = useRef(callback);
	rafCallback.current = callback;

	const step = useCallback((time: number) => {
		if (rafActivity.current) {
			rafCallback.current(time);
			raf.current = requestAnimationFrame(step);
		}
	}, []);

	const result = useMemo(
		() =>
			[
				() => {
					// Stop
					if (rafActivity.current) {
						rafActivity.current = false;
						if (raf.current) {
							cancelAnimationFrame(raf.current);
						}
					}
				},
				() => {
					// Start
					if (!rafActivity.current) {
						rafActivity.current = true;
						raf.current = requestAnimationFrame(step);
					}
				},
				(): boolean => rafActivity.current,
			] as RafLoopReturns,
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	useEffect(() => {
		if (initiallyActive) {
			result[1]();
		}

		return result[0];
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return result;
};
