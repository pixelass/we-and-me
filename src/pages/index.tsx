import Countdown from "@/components/countdown";
import Handshakes from "@/components/handshakes";
import Layout from "@/components/layout";
import People from "@/components/people";
import Picks from "@/components/picks";
import Rooms from "@/components/rooms";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { GetServerSideProps } from "next";
import React from "react";

const Page = () => {
	return (
		<Layout>
			<Stack
				spacing={2}
				sx={theme => ({ maxWidth: theme.breakpoints.values.lg, mx: "auto" })}
			>
				<Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
					<Box
						sx={theme => ({
							width: {
								xs: "100%",
								md: `calc((100% - ${theme.spacing(2)}) / 4 * 3)`,
							},
						})}
					>
						<People />
					</Box>
					<Box
						sx={theme => ({
							width: {
								xs: "100%",
								md: `calc((100% - ${theme.spacing(2)}) / 4)`,
							},
						})}
					>
						<Countdown />
					</Box>
					<Box
						sx={theme => ({
							width: {
								xs: "100%",
								lg: `calc((100% - ${theme.spacing(2)}) / 2)`,
							},
						})}
					>
						<Rooms />
					</Box>
					<Box
						sx={theme => ({
							width: {
								xs: "100%",
								lg: `calc((100% - ${theme.spacing(2)}) / 2)`,
							},
						})}
					>
						<Picks />
					</Box>
				</Box>
				<Handshakes />
			</Stack>
		</Layout>
	);
};

export default Page;

export const getServerSideProps: GetServerSideProps = async () => {
	return {
		props: {},
	};
};
