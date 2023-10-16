<template>
    <v-container with-background>
        <v-row>
            <v-col
                v-for="taskStatus in taskStatuses"
                :key="taskStatus.value"
                cols="12"
                sm="4"
            >
                <v-sheet 
                class="pa-2"
                width="100%"
                rounded="rounded">
                    <h4 class="text-center font-weight-bold mb-4">{{ taskStatus.title }}</h4>
                    <TaskGridList :taskStatus="taskStatus.value" />
                </v-sheet>
            </v-col>
        </v-row>
    </v-container>
</template>
<script setup>
import TaskGridList from '@/components/TaskGridList.vue'
const taskStatuses = [
    {
        title: 'Pending',
        value: 'pending'
    },
    {
        title: 'Processing',
        value: 'processing'
    },
    {
        title: 'Completed',
        value: 'completed'
    }
]
</script>

<style lang="scss" scoped>

</style>