import generate from "@/utils/id";

export const QueryKey = {
	rooms: generate(),
	roomSize: generate(),
	picks: generate(),
	pickSize: generate(),
	people: generate(),
	options: generate(),
	handshakes: generate(),
	roomName: generate(),
};
