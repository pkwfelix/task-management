<template>
    <v-container with-background  style="max-width:1200px">
        <v-row>
            <v-col
                v-for="taskCol in tasks"
                :key="taskCol.type"
                cols="12"
                sm="4"
            >
                <v-sheet 
                class="pa-2"
                width="100%"
                rounded="rounded">
                    <h4 class="text-center font-weight-bold mb-4">{{ getTaskTypeTitle(taskCol.type) }}</h4>
                    <TaskGridList :taskCol="taskCol" />
                </v-sheet>
            </v-col>
        </v-row>
    </v-container>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import TaskGridList from '@/components/TaskGridList.vue'
import { useAppStore } from '@/store/app';
import { useTaskStore } from '@/store/task';
const appStore = useAppStore();
const taskStore = useTaskStore();
const { taskStatuses } = storeToRefs(appStore);
const { tasks } = storeToRefs(taskStore);

const getTaskTypeTitle = (type) => {
    return taskStatuses.value.find((taskStatus) => taskStatus.value == type).title
}
</script>