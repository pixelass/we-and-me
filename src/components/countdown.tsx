import success from "@/assets/audio/success.mp3";
import { useRafLoop } from "@/hooks/raf-loop";
import { useUpdate } from "@/hooks/update";
import { getTime } from "@/utils/time";
import styled from "@emotion/styled";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import React, { useState } from "react";
import { useSound } from "use-sound";

const CountdownInput = styled.input`
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

const CountdownDisplay = styled.div`
	display: flex;
	justify-content: center;
	margin: auto;
	font-size: 3em;
`;

const Countdown = () => {
	const [duration, setDuration] = useState(0);
	const [time, setTime] = useState(duration);
	const [start, setStart] = useState(Date.now());
	const [play] = useSound(success);
	const [loopStop, loopStart, isActive] = useRafLoop(() => {
		const now = Date.now();
		const remainder = start - now;
		setTime(Math.max(0, remainder));
		if (remainder <= 0) {
			loopStop();
			play();
			update();
		}
	}, false);
	const { mm, ss } = getTime(time);
	const update = useUpdate();
	return (
		<Card>
			<CardContent>
				<CountdownDisplay>
					<CountdownInput
						type="number"
						value={mm}
						disabled={isActive()}
						aria-label="miinutes"
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
						disabled={isActive()}
						aria-label="seconds"
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
				<CardActions sx={{ justifyContent: "center" }}>
					<IconButton
						aria-label={isActive() ? "Stop" : "Start"}
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
						aria-label="Stop"
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
