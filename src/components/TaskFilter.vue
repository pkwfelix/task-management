<template>
	<v-form validate-on="submit lazy" class="pa-4">
		<h6 class="text-h6 mb-3">Filter</h6>
		<v-text-field
			v-model="filterForm.title"
			:rules="rules"
			label="Title"
			clearable 
			variant="underlined"
			
		></v-text-field>
		<v-text-field
			v-model="filterForm.description"
			:rules="rules"
			label="Description"
			clearable 
			variant="underlined"
		></v-text-field>
		<v-text-field
			v-model="filterForm.label"
			:rules="rules"
			label="Label"
			clearable 
			variant="underlined"
		></v-text-field>
		<!-- <v-date-picker></v-date-picker> -->
		<VueDatePicker 
		v-model="filterForm.eta"
		:enable-time-picker="false"
		:month-change-on-scroll="false"
		:auto-apply="false"
		:format="format">
		</VueDatePicker>
    </v-form>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/store/app';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
const appStore = useAppStore();

const rules = [
];

const filterForm = ref({})

const format = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}
appStore.searchSet(filterForm.value);

</script>