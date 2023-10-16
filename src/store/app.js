// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
	state: () => ({
		filterDrawer: false,
		taskModal: false,
	}),
	action: {
        toggleDrawer() {
            this.filterDrawer != this.filterDrawer;
        },
	}
})
