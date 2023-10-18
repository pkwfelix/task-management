<template>
    <div>
        <draggable 
        class="v-card" 
        :group="{ name: 'tasks' }"
        :animation="200" ghost-class="ghost-card"
        v-model="tasksFiltered"
        itemKey="index"
        @change="changeStatus($event, props.taskCol.type)">
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
import { useTaskStore } from '@/store/task';
import { useAppStore } from '@/store/app';
import TaskCard from '@/components/TaskCard';
import { useDate } from 'vuetify/labs/date'

const date = useDate()
const taskStore = useTaskStore();
const appStore = useAppStore();
const props = defineProps({
    taskStatus: String,
    taskCol: Object
})
const dateCompare = (dateInput, dateSearch) => {
    if (!dateInput)
        return false
    return date.format(dateInput, 'fullDateWithWeekday') == date.format(dateSearch, 'fullDateWithWeekday');
}
const tasksFiltered = computed({
    get() {
        if (appStore.search) {
            return props.taskCol.list.filter(task => {
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
            });
        } else {
            return props.taskCol.list;
        }
    },
    set(newValue) {
        taskStore.tasks.find((taskCol) => taskCol.type == props.taskCol.type).list = newValue;
    }
});
function changeStatus(evt, status) {
    if (evt.added) {
        taskStore.changeStatus(evt.added.element, status)
    }
}
</script>
