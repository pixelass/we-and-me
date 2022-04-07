import { MarkdownIcon } from "@/components/icons";
import { QueryKey } from "@/constants/query-key";
import { useQueryState } from "@/hooks/query-state";
import chunkEvenly from "@/utils/chunk-evenly";
import { decodeJSON, encodeJSON } from "@/utils/hash";
import ClearIcon from "@mui/icons-material/Clear";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { TextField } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListSubheader from "@mui/material/ListSubheader";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import copyToClipboard from "copy-to-clipboard";
import shuffle from "lodash.shuffle";
import React, { useMemo } from "react";

const createMarkdownList = (roomName: string, rooms: string[][]) => {
	return rooms
		.map((room, roomIndex) =>
			[
				`* ${roomName}-${roomIndex + 1}`,
				room.map(person => `    * ${person}`).join("\n"),
			].join("\n")
		)
		.join("\n");
};

const Rooms = () => {
	const [size, setSize] = useQueryState(QueryKey.roomSize, {
		parse: Number.parseInt,
		fallback: 2,
	});
	const [rooms, setRooms] = useQueryState<string[][]>(QueryKey.rooms, {
		parse: decodeJSON,
		serialize: encodeJSON,
		fallback: useMemo(() => [] as string[][], []),
	});
	const [options] = useQueryState<string[]>(QueryKey.options, {
		parse: decodeJSON,
		serialize: encodeJSON,
		fallback: useMemo(() => [] as string[], []),
	});
	const [people] = useQueryState<string[]>(QueryKey.people, {
		parse: decodeJSON,
		serialize: encodeJSON,
		fallback: useMemo(() => [] as string[], []),
	});
	const [roomName] = useQueryState(QueryKey.roomName, {
		fallback: "Room",
	});
	const isDisabled = people.length < 3;
	return (
		<Card>
			<CardHeader
				title="Rooms"
				action={
					<>
						<IconButton
							disabled={isDisabled}
							aria-label="run"
							color="primary"
							onClick={() => {
								void setRooms(chunkEvenly(shuffle(people), size));
							}}
						>
							<PlayArrowIcon />
						</IconButton>
						<IconButton
							aria-label="clear"
							color="inherit"
							onClick={() => {
								void setRooms(null);
							}}
						>
							<ClearIcon />
						</IconButton>
						<IconButton
							aria-label="copy as markdown"
							color="inherit"
							onClick={() => {
								copyToClipboard(createMarkdownList(roomName, rooms));
							}}
						>
							<MarkdownIcon />
						</IconButton>
					</>
				}
			/>
			<Accordion disableGutters elevation={0}>
				<AccordionSummary expandIcon={<ExpandMoreIcon />}>
					<Typography>Settings</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Stack direction="row" spacing={3} alignItems="center">
						<Slider
							key={size}
							valueLabelDisplay="on"
							disabled={isDisabled}
							min={2}
							max={Math.max(3, Math.ceil(options.length / 2))}
							defaultValue={size}
							onChangeCommitted={(event_, value) => {
								if (value !== size) {
									void setSize(value as number);
								}
							}}
						/>
						<TextField
							disabled={isDisabled}
							type="number"
							value={size}
							sx={{ width: 100 }}
							InputProps={{
								inputProps: {
									min: 2,
									max: 6,
								},
							}}
							onChange={event_ => {
								const value = Number.parseInt(event_.target.value, 10);
								if (value !== size) {
									void setSize(value);
								}
							}}
						/>
					</Stack>
				</AccordionDetails>
			</Accordion>
			<Accordion disableGutters elevation={0}>
				<AccordionSummary expandIcon={<ExpandMoreIcon />}>
					<Typography>
						Breakout rooms {rooms.length > 0 && `(${rooms.length})`}
					</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Box sx={{ display: "flex", flexWrap: "wrap" }}>
						{rooms.map((room, roomIndex) => {
							return (
								<List
									key={roomIndex}
									dense
									sx={{
										width: {
											xs: "100%",
											sm: "50%",
										},
									}}
									subheader={
										<ListSubheader component="div">
											{[roomName, roomIndex + 1].join("-")} ({room.length})
										</ListSubheader>
									}
								>
									{room.sort().map((person, personIndex) => {
										return (
											<ListItem
												key={personIndex}
												sx={{ py: 0, minHeight: 24 }}
											>
												{person}
											</ListItem>
										);
									})}
								</List>
							);
						})}
					</Box>
				</AccordionDetails>
			</Accordion>
		</Card>
	);
};

export default Rooms;
