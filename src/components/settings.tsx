import { QueryKey } from "@/constants/query-key";
import { useQueryState, useQueryStates } from "@/hooks/query-state";
import { useStore } from "@/store";
import { decodeJSON, encodeJSON } from "@/utils/hash";
import { stringToArray } from "@/utils/to";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import React, { FC, useEffect, useMemo } from "react";

const Settings: FC = ({ children }) => {
	const modal = useStore(state => state.modal);
	const setModal = useStore(state => state.setModal);
	const team = useStore(state => state.team);
	const setTeam = useStore(state => state.setTeam);
	const roomName = useStore(state => state.roomName);
	const setRoomName = useStore(state => state.setRoomName);
	const [roomName_, setRoomName_] = useQueryState(QueryKey.roomName, {
		fallback: roomName,
	});

	const [, setState] = useQueryStates(
		{
			[QueryKey.people]: useMemo(() => [], []),
			[QueryKey.options]: useMemo(() => [], []),
			[QueryKey.rooms]: useMemo(() => [], []),
			[QueryKey.picks]: useMemo(() => [], []),
			[QueryKey.handshakes]: useMemo(() => [], []),
		},
		{
			serialize: {
				[QueryKey.people]: encodeJSON,
				[QueryKey.options]: encodeJSON,
				[QueryKey.rooms]: encodeJSON,
				[QueryKey.picks]: encodeJSON,
				[QueryKey.handshakes]: encodeJSON,
			},
			parse: {
				[QueryKey.people]: decodeJSON,
				[QueryKey.options]: decodeJSON,
				[QueryKey.rooms]: decodeJSON,
				[QueryKey.picks]: decodeJSON,
				[QueryKey.handshakes]: decodeJSON,
			},
		}
	);

	useEffect(() => {
		setRoomName(roomName_);
	}, [setRoomName, roomName_]);

	return (
		<Dialog
			fullWidth
			open={modal}
			onClose={() => {
				setModal(false);
			}}
		>
			<DialogTitle>Add your Team</DialogTitle>
			<DialogContent>
				<DialogContentText>Add all people in your team.</DialogContentText>
				<Stack mt={2} spacing={2}>
					<TextField
						multiline
						fullWidth
						label="Team"
						value={team}
						onChange={event_ => {
							setTeam(event_.target.value);
						}}
					/>
					<Button
						disableElevation
						color="primary"
						variant="contained"
						onClick={() => {
							const value = stringToArray(team);
							void setState({
								[QueryKey.people]: value,
								[QueryKey.options]: value,
								[QueryKey.rooms]: null,
								[QueryKey.picks]: null,
								[QueryKey.handshakes]: null,
							});
						}}
					>
						Save
					</Button>
				</Stack>
			</DialogContent>
			<DialogContent>
				<DialogContentText>Add your room name</DialogContentText>
				<Stack mt={2} spacing={2}>
					{children}
					<TextField
						multiline
						fullWidth
						label="Room name"
						value={roomName}
						onChange={event_ => {
							setRoomName(event_.target.value);
						}}
					/>
					<Button
						disableElevation
						color="primary"
						variant="contained"
						onClick={() => {
							void setRoomName_(roomName);
						}}
					>
						Save
					</Button>
				</Stack>
			</DialogContent>
			<DialogActions>
				<Button
					color="inherit"
					onClick={() => {
						setModal(false);
					}}
				>
					Close
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default Settings;
