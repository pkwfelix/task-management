<template>
	<TaskProgress />
	<TaskAction />
	<TaskGrid />
	<TaskModal :taskObj="taskObj" />
</template>
<script setup>
import TaskProgress from '@/components/TaskProgress.vue'
import TaskAction from '@/components/TaskAction.vue'
import TaskGrid from '@/components/TaskGrid.vue'
import TaskModal from '@/components/TaskModal.vue'
import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted, watch } from 'vue';
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/store/app';
import { useTaskStore } from '@/store/task';
const appStore = useAppStore();
const taskStore = useTaskStore();
const { taskModal } = storeToRefs(appStore);
// Routes
const route = useRoute();
const router = useRouter();
onMounted(() => checkTaskIdRoute(route.params.taskId));
watch(route, () => checkTaskIdRoute(route.params.taskId));
watch(taskModal, (newVal) => {
	if (!newVal) {
		router.replace({ 
			path: '/',
		})
		taskObj.value = {};
	}
})
const taskObj = ref({});
function checkTaskIdRoute() {
	if (route.params.taskId) {
		taskModal.value = true;
		taskObj.value = taskStore.getTaskbyId(route.params.taskId);
	}
}

</script>