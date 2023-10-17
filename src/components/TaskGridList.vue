<template>
    <div>
        <TaskCard v-for="task in tasksFiltered" :taskObj="task" class="mb-2"></TaskCard>
    </div>
</template>

<script setup>
import { defineProps, computed } from "vue";
import { storeToRefs } from 'pinia'
import { useTaskStore } from '@/store/task';
import TaskCard from '@/components/TaskCard';

const taskStore = useTaskStore();
const props = defineProps({
    taskStatus: String
})
const tasksFiltered =  computed(()=>taskStore.getTaskbyStatus(props.taskStatus));
</script>