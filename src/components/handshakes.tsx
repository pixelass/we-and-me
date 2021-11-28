import { QueryKey } from "@/constants/query-key";
import { useQueryState } from "@/hooks/query-state";
import { decodeJSON, encodeJSON } from "@/utils/hash";
import ClearIcon from "@mui/icons-material/Clear";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Typography from "@mui/material/Typography";
import isEqual from "lodash.isequal";
import shuffle from "lodash.shuffle";
import uniqWith from "lodash.uniqwith";
import React, { useMemo } from "react";

const Handshakes = () => {
	const [handshakes, setHandshakes] = useQueryState<string[][][]>(QueryKey.handshakes, {
		parse: decodeJSON,
		serialize: encodeJSON,
		fallback: useMemo(() => [] as string[][][], []),
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
				title="Handshakes"
				action={
					<>
						<IconButton
							disabled={isDisabled}
							aria-label="run"
							color="primary"
							onClick={() => {
								const middle = Math.floor(people.length / 2);
								const shuffledPeople = shuffle(people);
								const a = shuffledPeople.slice(0, middle);
								const b = shuffledPeople.slice(middle);

								const rounds: string[][][] = [];
								for (let i = 0; i < people.length - 1; i++) {
									const round: string[][] = [];
									for (let j = 0; j < middle; j++) {
										round.push([a[j], b[j]].sort());
									}

									const f = a.pop();
									const l = b.shift();
									a.unshift(l);
									b.push(f);
									rounds.push(shuffle(round));
								}

								if (people.length % 2 === 1) {
									const lastRound: string[][] = [];
									for (let i = 0; i < people.length - 1; i++) {
										const greeted = new Set(
											rounds
												.flat()
												.filter(group => group.includes(people[i]))
												.flatMap(([a, b]) => {
													return a === people[i] ? b : a;
												})
										);
										const notGreeted = people
											.filter(person => person !== people[i])
											.find(person => !greeted.has(person));
										if (notGreeted) {
											lastRound.push([people[i], notGreeted].sort());
										}
									}

									rounds.push(shuffle(uniqWith(lastRound, isEqual)));
								}

								void setHandshakes(rounds);
							}}
						>
							<PlayArrowIcon />
						</IconButton>
						<IconButton
							color="inherit"
							aria-label="clear"
							onClick={() => {
								void setHandshakes(null);
							}}
						>
							<ClearIcon />
						</IconButton>
					</>
				}
			/>

			<Accordion disableGutters elevation={0}>
				<AccordionSummary expandIcon={<ExpandMoreIcon />}>
					<Typography>
						Rounds {handshakes.length > 0 && `(${handshakes.length})`}
					</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Box sx={{ display: "flex", flexWrap: "wrap" }}>
						{handshakes.map((round, roundIndex) => {
							return (
								<List
									key={roundIndex}
									dense
									sx={{
										width: {
											xs: "100%",
											md: "50%",
											lg: `${100 / 3}%`,
										},
									}}
									subheader={
										<ListSubheader component="div">
											Round {roundIndex + 1}
										</ListSubheader>
									}
								>
									{round.map(([personA, personB], groupIndex) => {
										return (
											<ListItem
												key={groupIndex}
												sx={{ py: 0, minHeight: 24 }}
											>
												<ListItemText
													primary={`${personA} & ${personB}`}
													secondary={[roomName, groupIndex + 1].join("-")}
												/>
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

export default Handshakes;
