import { defineStore } from "pinia";

export const useTaskStore = defineStore({   
	id: 'Tasks',
	state: () => ({
		tasks: [
            {
                type:'pending',
                list: [],
            },
            {
                type:'processing',
                list: [],
            },
            {
                type:'done',
                list: [],
            }
        ],
        id: 1,
        selectedTask: null,
	}),
    persist: true,
    getters: {
        getTaskbyStatus: (state) => (status) => state.tasks.filter(task => task.status == status),
        getTaskbyId: (state) => (taskId) => [].concat(...state.tasks.map(({list}) => list || [])).find(task => task.id == taskId),
    },
    actions: {
        addTask(item) {
            this.tasks.find((taskCol) => taskCol.type == item.status).list.push({
                ...item,
                id: this.id++,
            });
        },
        updateTask(item) {
            const allTasks = [].concat(...this.tasks.map(({list}) => list || []));
            const taskToUpdate = allTasks.find((task) => task.id == item.id);
        
            if (taskToUpdate) {
                if (item.status == taskToUpdate.status) {
                    Object.assign(taskToUpdate, item);
                } else {
                    const indexToRemove = this.tasks.find((taskCol) => taskCol.type == item.status).list.map(e => e.id).indexOf(item.id);
                    const taskColToUpdate = this.tasks.find((taskCol) => taskCol.type == taskToUpdate.status);
                    const taskColToAdd = this.tasks.find((taskCol) => taskCol.type == item.status);
                    
                    taskColToUpdate.list.splice(indexToRemove, 1);
                    taskColToAdd.list.push(taskToUpdate);
                    Object.assign(taskToUpdate, item);
                }
            }
        },
        deleteTodo(id) {
            const status = this.tasks.flatMap(({ list }) => list || []).find((task) => task.id == id)?.status;
            const index = this.tasks.find((taskCol) => taskCol.type == status).list.map(e => e.id).indexOf(id);
            this.tasks.find((taskCol) => taskCol.type == status).list.splice(index, 1);
        },
        changeStatus(obj, status) {
            const taskObj = this.tasks.find(task => task.type === status);
            
            if (taskObj) {
                taskObj.list.forEach(task => {
                    task.status = status;
                });
            }
        }
    }
})