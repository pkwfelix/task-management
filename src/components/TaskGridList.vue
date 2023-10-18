<template>
    <div>
        <draggable 
        class="v-card" 
        :group="{ name: 'tasks' }"
        :animation="200" ghost-class="ghost-card"
        v-model="tasksFiltered"
        itemKey="index"
        @change="log($event, props.taskStatus)">
            <template #item="{element, index}">
                <TaskCard :taskObj="element" class="mb-2"></TaskCard>
            </template>
        </draggable>
    </div>
</template>
<style scoped>
.ghost-card {
  opacity: 0.4;
  background: #F7FAFC;
  border: 1px solid #283593 ;
}
</style>
<script setup>
import draggable from 'vuedraggable'
import { defineProps, computed } from "vue";
import { storeToRefs } from 'pinia'
import { useTaskStore } from '@/store/task';
import { useAppStore } from '@/store/app';
import TaskCard from '@/components/TaskCard';
import { useDate } from 'vuetify/labs/date'

const date = useDate()
const taskStore = useTaskStore();
const { tasks } = storeToRefs(taskStore);
const appStore = useAppStore();
const props = defineProps({
    taskStatus: String
})
const dateCompare = (dateInput, dateSearch) => {
    if (!dateInput)
        return false
    return date.format(dateInput, 'fullDateWithWeekday') == date.format(dateSearch, 'fullDateWithWeekday');
}
const tasksFiltered = computed({
    get() {
        if (appStore.search) {
            return taskStore.getTaskbyStatus(props.taskStatus).filter(task => {
                if (appStore.search.title && !task.title.toLowerCase().includes(appStore.search.title.toLowerCase())) {
                    return false;
                }
                if (appStore.search.description && !task.description.toLowerCase().includes(appStore.search.description.toLowerCase())) {
                    return false;
                }
                if (appStore.search.label && !task.label.includes(appStore.search.label.toLowerCase())) {
                    return false;
                }
                if (appStore.search.eta && !dateCompare(task.eta, appStore.search.eta)) {
                    return false;
                }
                return true;
            }).sort((a, b) => a.order > b.order ? 1 : -1);
        } else {
            return taskStore.getTaskbyStatus(props.taskStatus).sort((a, b) => a.order > b.order ? 1 : -1);
        }
    },
    set(newValue) {
        console.log(newValue);
        tasks.value = newValue;
    }
});
function log(evt, status) {
    if (evt.added && evt.added.status !== status) {
        taskStore.changeStatus(evt.added.element.id, status)
    }
}
function onMove(evt) {
    if (evt.dragged) {
        // taskStore.changeOrderInCol(evt.draggedContext, evt.relatedContext.list)
    }
}
function onEnd(evt) {
    // console.log(evt)
}
</script>
