<template>
    <v-menu v-model="isDatePickerOpen">
        <template v-slot:activator="{ props }">
            <v-text-field
                :label="label"
                :model-value="formattedDate"
                readonly
                v-bind="props"
                hide-details
                variant="underlined"
                append-inner-icon="mdi-calendar"
            ></v-text-field>
        </template>
        <v-date-picker v-model="selectedDate" hide-actions title="" format="YYYY-MM-DD">
            <template v-slot:header></template>
        </v-date-picker>
    </v-menu>
  </template>
  
<script setup>
import { ref, computed, watch, defineProps, defineEmits } from "vue";
const { label, modelValue } = defineProps([
    "label",
    "modelValue",
]);
const emit = defineEmits("update:modelValue");

const isDatePickerOpen = ref(false);
const selectedDate = ref(modelValue);

const formattedDate = computed(() => {
    return selectedDate.value ? new Date(selectedDate.value).toDateString() : "";
});

watch(modelValue, (newDate) => {
    selectedDate.value = newDate;
});

watch(selectedDate, (newDate) => {
    emit("update:modelValue", newDate);
});
</script>