<template>
	<v-form validate-on="submit lazy" @submit.prevent="submit" class="pa-4">
		<h6 class="text-h6 mb-3">Filter</h6>
		<v-text-field
			v-model="search.title"
			:rules="rules"
			label="Title"
			clearable 
			variant="underlined"
			
		></v-text-field>
		<v-text-field
			v-model="search.description"
			:rules="rules"
			label="Description"
			clearable 
			variant="underlined"
		></v-text-field>
		<v-text-field
			v-model="search.label"
			:rules="rules"
			label="Label"
			clearable 
			variant="underlined"
		></v-text-field>
		<!-- <v-date-picker></v-date-picker> -->
		<VueDatePicker 
		v-model="search.eta"
		:enable-time-picker="false"
		:month-change-on-scroll="false"
		:auto-apply="false"
		:format="format">
		</VueDatePicker>
		<v-btn
			type="submit"
			block
			class="mt-2"
			text="Search"
			color="indigo-darken-3"
		></v-btn>
    </v-form>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useTaskStore } from '@/store/task';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
const taskStore = useTaskStore();
const { search } = storeToRefs(taskStore);

const rules = [
];

const format = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

function submit () {
	console.log('test');
}
</script>