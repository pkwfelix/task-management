import { defineStore } from "pinia";

export const useTaskStore = defineStore({   
	id: 'Tasks',
	state: () => ({
		tasks: [],
        id: 1,
        order: 0,
        search: {
            title: null,
            description: '',
            label: '',
            eta: null
        }
	}),
    persist: true,
    getters: {
        getTaskbyStatus: (state) => (status) => state.tasks.filter(task => task.status === status),
        getTaskbyId: (state) => (id) => state.tasks.find(task => task.id === id)
    },
    actions: {
        addTask(item) {
            this.tasks.push({
                ...item,
                id: this.id++,
            });
        },
        updateTask(item) {
            this.tasks.find((task) => {
                if (task.id === item.id) {
                    task.title = item.title;
                    task.description = item.description;
                    task.label = item.label;
                    task.eta = item.eta;
                    task.attachment = item.attachment;
                    task.status = item.status;
                }
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