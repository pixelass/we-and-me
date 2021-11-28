import queryString from "query-string";

export const stringToArray = (value: string) =>
	value
		.split(",")
		.map(item => item.trim().replace(/\s+/g, " "))
		.filter(Boolean);

export const arrayToString = (array: string[]) =>
	array
		.map(item => item.trim().replace(/\s+/g, "+"))
		.filter(Boolean)
		.join(",");

export const array2dToString = (array2d: string[][]) =>
	queryString
		.stringify(
			{
				array2d,
			},
			{ arrayFormat: "comma" }
		)
		.split("array2d=")[1];
