// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
	state: () => ({
		filterDrawer: false,
		taskModal: false,
		alertMessage: null,
		taskStatuses: [
			{
				title: 'Pending',
				value: 'pending'
			},
			{
				title: 'Processing',
				value: 'processing'
			},
			{
				title: 'Completed',
				value: 'completed'
			}
		]
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
