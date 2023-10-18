<template>
    <v-card
        class="mx-auto"
        max-width="368"
    >
        <v-card-item>
            <v-card-title class="text-subtitle-1">{{ taskObj.title }}</v-card-title>

            <v-card-subtitle v-if="taskObj.eta" >
                <v-icon 
                    icon="mdi-clock-outline">
                </v-icon>
                {{ etaFormatted }}
            </v-card-subtitle>
        </v-card-item>
        <v-card-text>
            <div 
                v-if="taskObj.description" 
                class="mb-4">
                Description:<br/>
                {{ descriptionTruncate }}
            </div>
            <div
                class="mb-4 text-subtitle-1"
                v-if="taskObj.attachment && taskObj.attachment.length > 0"
            >
                <v-icon size="sm" icon="mdi-paperclip"></v-icon>
                {{ taskObj.attachment.length }}
            </div>
            <div v-if="taskObj.label.length > 0">
                <v-chip 
                v-for="label in taskObj.label"
                size="x-small">
                    {{ label }}
                </v-chip>
            </div>
        </v-card-text>
        <v-card-actions class="justify-space-between">
            <v-btn
                color="grey"
                variant="plain"
                density="compact"   
                @click="deleteTask(taskObj.id)"
                icon="mdi-delete"
                size="small"
            >
            </v-btn>
            <v-btn
                color="deep-purple-lighten-2"
                variant="text"
                @click="editTask(taskObj.id)"
                prepend-icon="mdi-playlist-edit"
            >
                Edit
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup>
import { defineProps, computed } from "vue";
import { storeToRefs } from 'pinia'
import { useTaskStore } from '@/store/task';
import { useDate } from 'vuetify/labs/date'
import { useRouter } from 'vue-router';
import router from "@/router";

const taskStore = useTaskStore();

const props = defineProps({
    taskObj: Object
})

const date = useDate()

function truncateString(str, num) {
    if (str.length <= num) {
        return str
    }
    return str.slice(0, num) + '...'
}

const etaFormatted = computed(()=> {
    if (props.taskObj.eta) {
        return date.format(props.taskObj.eta, 'fullDateWithWeekday')
    } else {
        return null;
    }
}); 
const descriptionTruncate = computed(()=> truncateString(props.taskObj.description, 60));

function deleteTask(id) {
    taskStore.deleteTodo(id);
}
function editTask(id) {
    router.push('/t/' + id);
}
</script>