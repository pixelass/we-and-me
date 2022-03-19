import { roundRobin } from "@/utils/round-robin";
import { useCallback, useMemo, useState } from "react";

export const useRoundRobin = (names: string[]) => {
	const [rounds, setRounds] = useState<string[][][] | null>(null);
	const generate = useCallback(() => {
		setRounds(roundRobin(names));
	}, [names]);
	return useMemo(() => ({ rounds, generate }), [rounds, generate]);
};
