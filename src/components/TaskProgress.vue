<template>
    <v-container with-background style="max-width:1200px">
        <v-progress-linear 
            v-model="progress.done" 
            :height="25"
            rounded>
            <template v-slot:default="{ value }">
                <strong>{{ Math.ceil(value) }}%</strong>
            </template>
        </v-progress-linear>
    </v-container>
</template>

<script setup>
import { useTaskStore } from '@/store/task';
const taskStore = useTaskStore();
import { computed } from 'vue';

const progress = computed(() => {
    return {
        total: taskStore.tasks.length,
        done: taskStore.tasks.filter(task => task.status == 'done').length / taskStore.tasks.length * 100,
    }
});
</script>