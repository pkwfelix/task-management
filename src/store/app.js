// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
	state: () => ({
		filterDrawer: false,
		taskModal: false,
		alertMessage: null
	}),
	action: {
        startAlertTimer(msg) {
            this.startAlertTimer = msg;
			setTimeout(() => {
				this.alertMessage = null;
			}, 3000);
        },
	}
})
