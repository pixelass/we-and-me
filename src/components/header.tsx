import Logo from "@/components/logo";
import { useStore } from "@/store";
import SettingsIcon from "@mui/icons-material/Settings";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import React from "react";

const Header = () => {
	const setModal = useStore(state => state.setModal);
	return (
		<AppBar
			position="fixed"
			color="default"
			sx={
				{
					// Drawer
					// width: { sm: `calc(100% - ${drawerWidth}px)` },
					// ml: { sm: `${drawerWidth}px` },
				}
			}
		>
			<Toolbar>
				<Logo />
				<Box sx={{ flexGrow: 1 }} />
				<IconButton
					color="inherit"
					size="large"
					aria-label="Settings"
					edge="end"
					onClick={() => {
						setModal(true);
					}}
				>
					<SettingsIcon color="inherit" />
				</IconButton>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
