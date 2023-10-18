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
    let total = [].concat(...taskStore.tasks.map(({list}) => list || [])).length;
    let done = taskStore.tasks.find(taskCol => taskCol.type == 'done').list.length
    return {
        total: total,
        done: done / total * 100,
    }
});
</script>