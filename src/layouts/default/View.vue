<template>
  <v-main>
	<v-layout class="rounded rounded-md">
		<v-navigation-drawer
			width="300"
			v-model="filterDrawer"
			temporary>
			<TaskFilter />
		</v-navigation-drawer>

		<v-main class="d-flex justify-center bg-grey-lighten-4" style="min-height: 100dvh" >
    		<div class="w-100"><router-view /></div>
		</v-main>
	</v-layout>
  </v-main>
</template>

<script setup>
import TaskFilter from '@/components/TaskFilter.vue'
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/store/app';
const appStore = useAppStore();
const { filterDrawer } = storeToRefs(appStore);
</script>
