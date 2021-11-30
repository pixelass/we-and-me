import success from "@/assets/audio/success.mp3";
import { usePubnubMessaging, userId } from "@/hooks/pubnub-messaging";
import { useRafLoop } from "@/hooks/raf-loop";
import { useUpdate } from "@/hooks/update";
import { getTime } from "@/utils/time";
import styled from "@emotion/styled";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import React, { useCallback, useState } from "react";
import { useSound } from "use-sound";

export const CountdownInput = styled.input`
	width: 1.5em;
	min-width: 0;
	border: 0;
	appearance: none;
	background: none;
	color: currentColor;
	font-family: monospace;
	font-size: 1em;
	text-align: center;

	&:focus {
		outline: 0;
		box-shadow: 0 0 0 2px;
	}

	&[type="number"] {
		/* stylelint-disable */
		-moz-appearance: textfield;
		/* stylelint-enable */

		&::-webkit-inner-spin-button,
		&::-webkit-outer-spin-button {
			margin: 0;
			appearance: none;
		}
	}
`;

export const CountdownDisplay = styled.div`
	display: flex;
	justify-content: center;
	margin: auto;
	font-size: 3em;
`;
const latency = 500;
const Countdown = () => {
	const [duration, setDuration] = useState(10_000);
	const [time, setTime] = useState(duration);
	const [start, setStart] = useState(Date.now());
	const [play] = useSound(success);
	const [channel, setChannel] = useState("");
	const [joined, setJoined] = useState(false);
	const [host, setHost] = useState<string | null>(null);
	const [hosting, setHosting] = useState(false);

	const { broadcast } = usePubnubMessaging({
		channel: joined ? channel : null,
		onMessage: useCallback(
			message => {
				if (userId === message.senderId) {
					return;
				}

				const diff = Date.now() - message.timestamp;
				switch (message.action.type) {
					case "host":
						setHost(message.action.payload.host);
						break;
					case "counter":
						if (host) {
							if (message.action.payload.time - diff <= 0) {
								setHost(null);
								setTime(duration);
								play();
							} else {
								setTime(Math.max(0, message.action.payload.time - diff + latency));
							}
						}

						break;
					default:
						break;
				}
			},
			[play, duration, host]
		),
	});

	const update = useUpdate();

	const [loopStop, loopStart, isActive] = useRafLoop(() => {
		const now = Date.now();
		const remainder = start - now;
		setTime(Math.max(0, remainder + latency));
		if (Math.ceil(time / 100) !== Math.ceil(remainder / 100)) {
			broadcast({
				action: { type: "counter", payload: { time: Math.max(0, remainder) } },
				timestamp: now,
			});
		}

		if (remainder <= 0) {
			broadcast({
				action: { type: "counter", payload: { time: 0, host: null } },
				timestamp: now,
			});
			setHosting(false);
			setTime(duration);
			loopStop();
			play();
			update();
		}
	}, false);

	const { mm, ss } = getTime(time);

	const hosted = Boolean(host);

	return (
		<Card>
			<CardContent>
				<Stack spacing={2}>
					<TextField
						disabled={joined}
						label="Channel"
						value={channel}
						onChange={event_ => {
							setChannel(event_.target.value);
						}}
					/>
					<Stack direction="row">
						<Button
							onClick={() => {
								const nextJoined = !joined;
								setJoined(nextJoined);
								if (!nextJoined) {
									setHost(null);
								}
							}}
						>
							{joined ? "Leave" : "Join"}
						</Button>
						<Button
							disabled={hosted}
							onClick={() => {
								const nextHosting = !hosting;
								broadcast({
									action: {
										type: "host",
										payload: {
											host: nextHosting ? userId : null,
										},
									},
									timestamp: Date.now(),
								});
								setHosting(nextHosting);
							}}
						>
							{hosting ? "Stop" : "Host"}
						</Button>
					</Stack>
					<CountdownDisplay>
						<CountdownInput
							type="number"
							value={mm}
							disabled={hosted || isActive()}
							onChange={event_ => {
								const s = Math.max(0, Number.parseInt(ss, 10) * 1000);
								const m = Math.max(
									0,
									(Number.parseInt(event_.target.value, 10) % 60) * 60 * 1000
								);
								setTime(m + s);
								setDuration(m + s);
							}}
						/>
						:
						<CountdownInput
							type="number"
							value={ss}
							disabled={hosted || isActive()}
							onChange={event_ => {
								const m = Math.max(0, Number.parseInt(mm, 10) * 60 * 1000);
								const s = Math.max(
									0,
									(Number.parseInt(event_.target.value, 10) % 60) * 1000
								);
								setTime(m + s);
								setDuration(m + s);
							}}
						/>
					</CountdownDisplay>
				</Stack>

				<CardActions sx={{ justifyContent: "center" }}>
					<IconButton
						disabled={hosted}
						onClick={() => {
							if (isActive()) {
								loopStop();
							} else {
								const now = Date.now();
								setStart(now + time);
								loopStart();
							}

							update();
						}}
					>
						{isActive() ? <PauseIcon /> : <PlayArrowIcon />}
					</IconButton>
					<IconButton
						disabled={hosted}
						onClick={() => {
							loopStop();
							setTime(duration);
						}}
					>
						<StopIcon />
					</IconButton>
				</CardActions>
			</CardContent>
		</Card>
	);
};

export default Countdown;
