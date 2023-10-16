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
		<DatePicker
			label="Estimated Date"
			v-model="search.eta"
		></DatePicker>
		<v-btn
			:loading="loading"
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
import DatePicker from '@/components/common/DatePickerField';
const taskStore = useTaskStore();
const { search } = storeToRefs(taskStore);
</script>