import { bitly } from "@/configs/bitly";
import { BitlyLink } from "bitly/dist/types";
import { useEffect, useState } from "react";

export const useBitly = url => {
	const [data, setData] = useState<null | BitlyLink>(null);
	const [error, setError] = useState<null | Error>(null);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		async function init() {
			setError(null);
			setLoading(true);
			try {
				const result = await bitly.shorten(url);
				setData(result);
			} catch (error_: unknown) {
				setError(error_ as Error);
			} finally {
				setLoading(false);
			}
		}

		if (url) {
			void init();
		}
	}, [url]);
	return { loading, data, error };
};
