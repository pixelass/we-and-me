import { QueryKey } from "@/constants/query-key";
import { useQueryState, useQueryStates } from "@/hooks/query-state";
import { decodeJSON, encodeJSON } from "@/utils/hash";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import React, { useMemo } from "react";

const People = () => {
	const [options] = useQueryState<string[]>(QueryKey.options, {
		parse: decodeJSON,
		serialize: encodeJSON,
		fallback: useMemo(() => [] as string[], []),
	});

	const [, setState] = useQueryStates(
		{
			[QueryKey.people]: useMemo(() => [], []),
			[QueryKey.rooms]: useMemo(() => [], []),
			[QueryKey.handshakes]: useMemo(() => [], []),
			[QueryKey.picks]: useMemo(() => [], []),
			[QueryKey.pickSize]: 1,
			[QueryKey.roomSize]: 2,
		},
		{
			serialize: {
				[QueryKey.people]: encodeJSON,
				[QueryKey.rooms]: encodeJSON,
				[QueryKey.handshakes]: encodeJSON,
				[QueryKey.picks]: encodeJSON,
			},
			parse: {
				[QueryKey.people]: decodeJSON,
				[QueryKey.rooms]: decodeJSON,
				[QueryKey.handshakes]: decodeJSON,
				[QueryKey.picks]: decodeJSON,
				[QueryKey.pickSize]: Number.parseInt,
				[QueryKey.roomSize]: Number.parseInt,
			},
		}
	);

	const [people] = useQueryState<string[]>(QueryKey.people, {
		parse: decodeJSON,
		serialize: encodeJSON,
		fallback: useMemo(() => [] as string[], []),
	});
	const isDisabled = options.length < 3;

	return (
		<Card>
			<CardContent>
				<Stack spacing={2}>
					<Autocomplete
						fullWidth
						multiple
						disableCloseOnSelect
						disabled={isDisabled}
						id="tags-standard"
						options={options}
						getOptionLabel={option => option}
						value={people}
						renderInput={parameters => (
							<TextField
								{...parameters}
								helperText="Add or remove people"
								label={`Team (${people.length} / ${options.length})`}
								placeholder="Search…"
							/>
						)}
						onChange={(event_, value) => {
							void setState({
								[QueryKey.people]: value,
								[QueryKey.rooms]: null,
								[QueryKey.picks]: null,
								[QueryKey.handshakes]: null,
								[QueryKey.pickSize]: null,
								[QueryKey.roomSize]: null,
							});
						}}
					/>

					<Stack direction="row" spacing={1}>
						<Button
							disableElevation
							disabled={isDisabled}
							variant="contained"
							color="primary"
							onClick={() => {
								void setState({
									[QueryKey.people]: options,
									[QueryKey.rooms]: null,
									[QueryKey.picks]: null,
									[QueryKey.handshakes]: null,
									[QueryKey.pickSize]: null,
									[QueryKey.roomSize]: null,
								});
							}}
						>
							Select all
						</Button>
						<Button
							disableElevation
							color="inherit"
							onClick={() => {
								void setState({
									[QueryKey.people]: null,
									[QueryKey.rooms]: null,
									[QueryKey.picks]: null,
									[QueryKey.handshakes]: null,
									[QueryKey.pickSize]: null,
									[QueryKey.roomSize]: null,
								});
							}}
						>
							Clear
						</Button>
					</Stack>
				</Stack>
			</CardContent>
		</Card>
	);
};

export default People;
