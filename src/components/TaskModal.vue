<template>
    <v-dialog
      v-model="taskModal"
      width="800"
    >
      <v-card>
        <v-card-title>
            {{ modalTitle }}
        </v-card-title>
        <v-card-text>
            <v-text-field 
                label="Title" 
                variant="outlined" 
                v-model="inputTitle">
            </v-text-field>
            <v-textarea 
                label="Description" 
                variant="outlined" 
                v-model="inputDescription">
            </v-textarea>
            <VueDatePicker 
            class="mb-4"
            v-model="inputEta"
            :month-change-on-scroll="false"
            :auto-apply="false"
            :format="format">
            </VueDatePicker>
            <FileUploadField @updateImage="updateImage" />
            <v-combobox
                chips
                multiple
                label="Label"
                hint="Hit Enter to insert multiple labels!"
                persistent-hint
                variant="outlined"
                v-model="inputLabel"
                :items="[]"
            ></v-combobox>
        </v-card-text>
        <v-card-actions class="justify-space-between">
            <v-btn color="secondary" @click="dialog = false">Close</v-btn>
            <v-btn color="primary" variant="elevated" @click="addNewTask">Create</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/store/app';
import { useTaskStore } from '@/store/task';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import FileUploadField from '@/components/common/FileUploadField';
const appStore = useAppStore();
const taskStore = useTaskStore();
const { taskModal } = storeToRefs(appStore);

const modalTitle = ref('New Task');

const format = (dt) => {
    const day = dt.getDate();
    const month = dt.getMonth() + 1;
    const year = dt.getFullYear();
    const hour = dt.getHours();
    const minute = dt.getMinutes();

    return `${day}/${month}/${year} ${hour}:${minute}`;
}

// Form Data
const inputTitle = ref('');
const inputDescription = ref('');
const inputEta = ref(new Date());
const inputLabel = ref([]);
const inputAttachment = ref([]);

function updateImage(obj) {
    inputAttachment.value = obj
}

function addNewTask() {
    taskStore.addTask({
        title: inputTitle.value,
        description: inputDescription.value,
        eta: inputEta.value,
        label: inputLabel.value,
        attachment: inputAttachment.value
    })
    taskModal.value = false;
}

</script>