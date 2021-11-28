import copyToClipboard from "copy-to-clipboard";
import { useCallback } from "react";

export const useCopyToClipboard = () => {
	const copy = useCallback((value: string) => {
		copyToClipboard(value);
	}, []);

	return { copy };
};
