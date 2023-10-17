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
        getTaskbyStatus: (state) => (status) => state.tasks.filter(task => task.status == status),
        getTaskbyId: (state) => (taskId) => state.tasks.find(task => task.id == taskId),
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
                if (task.id == item.id) {
                    console.log('123');
                    Object.assign(task, item)
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