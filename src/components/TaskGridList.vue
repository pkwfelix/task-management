<template>
    <div>
        <TaskCard v-for="task in tasksFiltered" :taskObj="task" class="mb-2"></TaskCard>
    </div>
</template>

<script setup>
import { defineProps, computed } from "vue";
import { storeToRefs } from 'pinia'
import { useTaskStore } from '@/store/task';
import { useAppStore } from '@/store/app';
import TaskCard from '@/components/TaskCard';
import { useDate } from 'vuetify/labs/date'

const date = useDate()
const taskStore = useTaskStore();
const appStore = useAppStore();
const props = defineProps({
    taskStatus: String
})
const dateCompare = (dateInput, dateSearch) => {
    if (!dateInput)
        return false
    return date.format(dateInput, 'fullDateWithWeekday') == date.format(dateSearch, 'fullDateWithWeekday');
}
const tasksFiltered =  computed(()=> {
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
        });
    } else {
        return taskStore.getTaskbyStatus(props.taskStatus);
    }
});
</script>