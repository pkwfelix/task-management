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
                v-model="taskForm.title"
                >
            </v-text-field>
            <v-textarea 
                label="Description" 
                variant="outlined" 
                v-model="taskForm.description">
            </v-textarea>
           
            <VueDatePicker 
            class="mb-4"
            v-model="taskForm.eta"
            :month-change-on-scroll="false"
            :auto-apply="false"
            :format="format">
            </VueDatePicker>
            <v-combobox
                chips
                multiple
                label="Label"
                hint="Hit Enter to insert multiple labels!"
                persistent-hint
                variant="outlined"
                v-model="taskForm.label"
                :items="[]"
                class="mb-4"
            ></v-combobox>
            <v-select
            label="Status"
            v-model="taskForm.status"
            :items="taskStatuses"
            item-title="title"
            item-value="value"
            variant="outlined"
            ></v-select>
            <FileUploadField @updateImage="updateImage" :existingAttachment="taskForm.attachment"/>
            <v-row align="center" class="mb-4">
                <v-col>
                    <v-text-field
                        v-model="commentField"
                        label="Add a comment"
                        hide-details
                        variant="outlined"
                        density="compact"
                    ></v-text-field>
                </v-col>
                    <v-col cols="auto">
                        <v-btn color="primary" @click="addComment">Comment</v-btn>
                </v-col>
            </v-row>
            <v-timeline 
            side="end" 
            density="compact">
                <v-timeline-item
                v-for="comment in taskForm.comments"
                :key="comment.dt"
                size="xs-small"
                >
                    <div class="text-caption">
                        {{ comment.msg }}
                    </div>
                    <small class="text-grey me-4">{{(comment.dt)}}</small>
                </v-timeline-item>
            </v-timeline>
        </v-card-text> 
        <v-card-actions class="justify-space-between">
            <v-btn color="grey" @click="deleteTask" icon="mdi-delete"></v-btn>
            <div>
                <v-btn color="secondary" @click="dialog = false">Close</v-btn>
                <v-btn v-if="!props.taskObj.id" color="primary" variant="elevated" @click="addNewTask">Create</v-btn>
                <v-btn v-else color="primary" variant="elevated" @click="updateTask">Save</v-btn>
            </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/store/app';
import { useTaskStore } from '@/store/task';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import FileUploadField from '@/components/common/FileUploadField';
const appStore = useAppStore();
const taskStore = useTaskStore();
const { taskModal, taskStatuses } = storeToRefs(appStore);
import { useDate } from 'vuetify/labs/date'
const date = useDate()
// If taskObj exist as prop (edit)
const props = defineProps({
    taskObj: Object
})

const modalTitle = computed(() => {
    return props.taskObj && props.taskObj.id ? "Edit Task" : "Add New Task"
});

const format = (dt) => {
    const day = dt.getDate();
    const month = dt.getMonth() + 1;
    const year = dt.getFullYear();
    const hour = dt.getHours();
    const minute = dt.getMinutes();

    return `${day}/${month}/${year} ${hour}:${minute}`;
}

// Form Data
const initialTaskForm = () => ({
    title: "",
    description: "",
    eta: null,
    attachment: [],
    status: "pending",
    label: [],
    comments: []
});
const commentField = ref("");
const taskForm = reactive(initialTaskForm());
const resetTaskForm = () => Object.assign(taskForm, initialTaskForm(), commentField.value = "");
const editTaskForm = () => Object.assign(taskForm, props.taskObj);

watch(() => props.taskObj, () => {
    if (props.taskObj && props.taskObj.id) {
        editTaskForm();
    } else {
        resetTaskForm();
    }
})
function updateImage(obj) {
    taskForm.attachment = obj
}

function addNewTask() {
    taskStore.addTask({
        title: taskForm.title,
        description: taskForm.description,
        eta: taskForm.eta,
        label: taskForm.label,
        attachment: taskForm.attachment,
        status: taskForm.status,
        comments: taskForm.comments
    })
    resetTaskForm();
    taskModal.value = false;
}

function updateTask() {
    taskStore.updateTask({
        id: props.taskObj.id,
        title: taskForm.title,
        description: taskForm.description,
        eta: taskForm.eta,
        label: taskForm.label,
        attachment: taskForm.attachment,
        status: taskForm.status,
        comments: taskForm.comments
    })
    resetTaskForm();
    taskModal.value = false;
}

function deleteTask() {
    taskStore.deleteTodo(props.taskObj.id);
    resetTaskForm();
    taskModal.value = false;
}
function addComment() {
    taskForm.comments.push({
        msg: commentField.value,
        dt: new Date()
    });
    commentField.value = "";
}
function deleteComment(dt) {
    if (props.taskObj.id) {
        taskStore.addComment({
            taskId: props.taskObj.id,
            commentTime: dt
        })
    }
}
</script>