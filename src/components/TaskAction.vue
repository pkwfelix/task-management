<template>
    <v-container class="d-flex justify-space-between pa-4 pb-0">
        <v-btn 
            prepend-icon="mdi-text-search"
            outlined 
            @click="filterDrawer = !filterDrawer"
        >
            Search & Filter
        </v-btn>
        <v-btn
            prepend-icon="mdi-plus"
            color="indigo-darken-3"
            @click="taskModal = !taskModal"
       >
            New Task
        </v-btn>
    </v-container>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/store/app';
const appStore = useAppStore();
const { filterDrawer, taskModal } = storeToRefs(appStore);
</script>