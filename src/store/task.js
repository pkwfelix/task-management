import { defineStore } from "pinia";

export const useTaskStore = defineStore({   
	id: 'Tasks',
	state: () => ({
		tasks: [],
        id: 1,
        selectedTask: null,
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
                if (task.id == id) {
                    task.status = status;
                }
            })
        },
        // changeOrderInCol(movedTask, tasksList) {
        //     console.log(tasksList.length);
        //     tasksList.forEach((taskInList , index) => {
        //         this.tasks.find((task) => {
        //             if (task.id == taskInList.id) {
        //                 task.order = index;
        //                 console.log('name:'+task.title + ', index:'+index);
        //             }
        //         })
        //     })
        // },
    }
})