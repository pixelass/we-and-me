/**
 * {@see https://eslint.org/docs/user-guide/configuring/rules}
 */
module.exports = {
	extends: ["xo-react", "prettier"],
	ignores: ["public", "*.config.js", "next-env.d.ts", "types/*.d.ts"],
	plugins: ["prettier"],
	env: ["browser", "node"],
	overrides: [
		{
			files: "**/*.{ts,tsx}",
			rules: {
				"@typescript-eslint/consistent-type-assertions": [
					1,
					{
						assertionStyle: "as",
						objectLiteralTypeAssertions: "allow-as-parameter",
					},
				],
				"react/prop-types": 0,
				"react/display-name": 0,
				"arrow-body-style": 0,
				"import/extensions": [
					1,
					{
						js: "never",
						jsx: "never",
						ts: "never",
						tsx: "never",
						css: "always",
						json: "always",
						mp3: "always",
					},
				],
			},
		},
	],
	prettier: true,
	rules: {
		"unicorn/prefer-node-protocol": 0,
		"import/order": 0,
		"unicorn/no-array-reduce": 1,
		"react/no-array-index-key": 1,
		"@typescript-eslint/no-base-to-string": 1,
		"@typescript-eslint/restrict-template-expressions": 1,
		"unicorn/prefer-object-from-entries": 1,
		"prettier/prettier": 0,
		"@typescript-eslint/no-loop-func": 1,
	},
};
