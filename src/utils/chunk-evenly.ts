const chunkEvenly = <T>(array: T[], proposedSize: number) => {
	const parts = Math.ceil(array.length / proposedSize);
	const result: T[][] = [];
	for (let i = parts; i > 0; i--) {
		result.push(array.splice(0, Math.ceil(array.length / i)));
	}

	return result;
};

export default chunkEvenly;
