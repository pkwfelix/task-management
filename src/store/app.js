// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
	state: () => ({
		filterDrawer: false,
		taskModal: false,
		alertMessage: null,
		search: {},
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
				title: 'Done',
				value: 'done'
			}
		]
	}),
	actions: {
        startAlertTimer(msg) {
            this.startAlertTimer = msg;
			setTimeout(() => {
				this.alertMessage = null;
			}, 3000);
        },
		searchSet(search) {
			this.search = search;
		},
	}
})
