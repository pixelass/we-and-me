import grey from "@mui/material/colors/grey";
import pink from "@mui/material/colors/pink";
import teal from "@mui/material/colors/teal";
import createTheme from "@mui/material/styles/createTheme";

export const light = createTheme({
	palette: {
		primary: {
			main: teal[800],
		},
		secondary: {
			main: grey[700],
		},
	},
	typography: {
		fontFamily: "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\""
	}
});

export const dark = createTheme({
	palette: {
		mode: "dark",
		primary: {
			main: teal[200],
		},
		secondary: {
			main: grey[300],
		},
	},
	typography: {
		fontFamily: "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\""
	}
});
