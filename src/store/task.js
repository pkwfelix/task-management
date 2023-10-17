import { defineStore } from "pinia";

export const useTaskStore = defineStore({
	id: 'Tasks',
	state: () => ({
		tasks: [],
        id: 0,
        order: 0,
        search: {
            title: '',
            description: '',
            label: '',
            eta: null
        }
	}),
    getters: {
        getTaskbyStatus: (state) => (status) => state.tasks.filter(task => task.status === status)
    },
    actions: {
        addTask(item) {
            this.tasks.push({
                ...item,
                id: this.id++,
            });
        },
        deleteTodo(id) {
            this.tasks = this.tasks.filter((task) => {
                return task.id !== id;
            });
        },
        changeStatus(id, status) {
            this.tasks.find((task) => {
                if (task.id === id) {
                    task.status = status;
                }
            })
        },
    }
})