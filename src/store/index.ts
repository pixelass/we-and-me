import create from "zustand";

export interface StoreModel {
	modal: boolean;
	drawer: boolean;
	team: string;
	roomName: string;
	setModal(modal: boolean): void;
	setDrawer(drawer: boolean): void;
	setTeam(team: string): void;
	setRoomName(team: string): void;
}

export const useStore = create<StoreModel>(set => ({
	modal: false,
	setModal(modal) {
		set({ modal });
	},
	drawer: false,
	setDrawer(drawer) {
		set({ drawer });
	},
	team: "",
	setTeam(team) {
		set({ team });
	},
	roomName: "",
	setRoomName(roomName) {
		set({ roomName });
	},
}));
