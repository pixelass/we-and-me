import create from "zustand";

export interface StoreModel {
	countdown: number;
	modal: boolean;
	drawer: boolean;
	team: string;
	roomName: string;
	setCountDown(countdown: number): void;
	setModal(modal: boolean): void;
	setDrawer(drawer: boolean): void;
	setTeam(team: string): void;
	setRoomName(team: string): void;
}

export const useStore = create<StoreModel>(set => ({
	countdown: 0,
	setCountDown(countdown) {
		set({ countdown });
	},
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
