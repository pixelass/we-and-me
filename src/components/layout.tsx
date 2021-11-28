import Header from "@/components/header";
import Settings from "@/components/settings";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import React, { ReactNode } from "react";

interface Props {
	children?: ReactNode;
}

const Layout = ({ children }: Props) => {
	// Drawer
	// const drawer = useStore(state => state.drawer);
	// const setDrawer = useStore(state => state.setDrawer);
	// const handleDrawerToggle = () => {
	// 	setDrawer(!drawer);
	// };
	// const drawerContent = (
	// 	<>
	// 		<Toolbar sx={{ color: "secondary.main" }}>
	// 			<Logo />
	// 		</Toolbar>
	// 		<Divider />
	// 		<List component="div">
	// 			<ListItem
	// 				button
	// 				onClick={() => {
	//					console.log("click")
	// 				}}
	// 			>
	// 				<ListItemIcon>
	// 					<SettingsIcon color="inherit" />
	// 				</ListItemIcon>
	// 				<ListItemText primary="Settings" />
	// 			</ListItem>
	// 		</List>
	// 	</>
	// );

	return (
		<Box sx={{ display: "flex", flexGrow: 1 }}>
			<Header />
			{/* <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}> */}
			{/*	/!* The implementation can be swapped with js to avoid SEO duplication of links. *!/ */}
			{/*	<Drawer */}
			{/*		variant="temporary" */}
			{/*		open={drawer} */}
			{/*		onClose={handleDrawerToggle} */}
			{/*		ModalProps={{ */}
			{/*			keepMounted: true, // Better open performance on mobile. */}
			{/*		}} */}
			{/*		sx={{ */}
			{/*			display: { xs: "block", sm: "none" }, */}
			{/*			"& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth }, */}
			{/*		}} */}
			{/*	> */}
			{/*		{drawerContent} */}
			{/*	</Drawer> */}
			{/*	<Drawer */}
			{/*		variant="permanent" */}
			{/*		sx={{ */}
			{/*			display: { xs: "none", sm: "block" }, */}
			{/*			"& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth }, */}
			{/*		}} */}
			{/*		open */}
			{/*	> */}
			{/*		{drawerContent} */}
			{/*	</Drawer> */}
			{/* </Box> */}
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					p: 3,
					// Drawer
					// width: { sm: `calc(100% - ${drawerWidth}px)` },
				}}
			>
				<Toolbar />
				{children}
			</Box>
			<Settings />
		</Box>
	);
};

export default Layout;
