import Logo from "@/components/logo";
import { useBitly } from "@/hooks/bitly";
import { useCopyToClipboard } from "@/hooks/copy-to-clipboard";
import { useStore } from "@/store";
import SettingsIcon from "@mui/icons-material/Settings";
import ShareIcon from "@mui/icons-material/Share";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import React, { useEffect, useState } from "react";

const Header = () => {
	const setModal = useStore(state => state.setModal);
	const { copy } = useCopyToClipboard();
	const [url, setUrl] = useState<null | string>(null);
	const { data } = useBitly(url);
	useEffect(() => {
		if (data) {
			copy(data.link);
		}
	}, [data, copy]);
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
					aria-label="Share"
					onClick={() => {
						setUrl(window.location.href);
					}}
				>
					<ShareIcon color="inherit" />
				</IconButton>
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
