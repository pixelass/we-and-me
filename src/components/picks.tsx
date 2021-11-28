import { QueryKey } from "@/constants/query-key";
import { useQueryState } from "@/hooks/query-state";

import { decodeJSON, encodeJSON } from "@/utils/hash";
import ClearIcon from "@mui/icons-material/Clear";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { TextField } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import shuffle from "lodash.shuffle";
import take from "lodash.take";
import React, { useMemo } from "react";

const Picks = () => {
	const [pickSize, setPickSize] = useQueryState(QueryKey.pickSize, {
		parse: Number.parseInt,
		fallback: 1,
	});
	const [people] = useQueryState(QueryKey.people, {
		parse: decodeJSON,
		serialize: encodeJSON,
		fallback: useMemo(() => [], []),
	});
	const [picked, setPicked] = useQueryState<string[]>(QueryKey.picks, {
		parse: decodeJSON,
		serialize: encodeJSON,
		fallback: useMemo(() => [] as string[], []),
	});
	const isDisabled = people.length < 3;

	return (
		<Card>
			<CardHeader
				title="Picks"
				action={
					<>
						<IconButton
							disabled={isDisabled}
							aria-label="run"
							color="primary"
							onClick={() => {
								void setPicked(take(shuffle(people), pickSize));
							}}
						>
							<PlayArrowIcon />
						</IconButton>
						<IconButton
							aria-label="clear"
							color="inherit"
							onClick={() => {
								void setPicked(null);
							}}
						>
							<ClearIcon />
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
							valueLabelDisplay="on"
							disabled={isDisabled}
							defaultValue={pickSize}
							min={1}
							max={6}
							onChangeCommitted={(event_, value) => {
								if (value !== pickSize) {
									void setPickSize(value as number);
								}
							}}
						/>
						<TextField
							disabled={isDisabled}
							type="number"
							value={pickSize}
							sx={{ width: 100 }}
							InputProps={{
								inputProps: {
									min: 1,
									max: 6,
								},
							}}
							onChange={event_ => {
								const value = Number.parseInt(event_.target.value, 10);
								if (value !== pickSize) {
									void setPickSize(value);
								}
							}}
						/>
					</Stack>
				</AccordionDetails>
			</Accordion>
			<Accordion disableGutters elevation={0}>
				<AccordionSummary expandIcon={<ExpandMoreIcon />}>
					<Typography>People {picked.length > 0 && `(${picked.length})`}</Typography>
				</AccordionSummary>
				<AccordionDetails>
					{picked.sort().map((person, personIndex) => {
						return (
							<ListItem key={personIndex} sx={{ py: 0, minHeight: 24 }}>
								{person}
							</ListItem>
						);
					})}
				</AccordionDetails>
			</Accordion>
		</Card>
	);
};

export default Picks;
