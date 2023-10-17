<template>
    <v-menu v-model="isDatePickerOpen">
        <template v-slot:activator="{ props }">
            <v-text-field
                :label="label"
                :model-value="formattedDate"
                readonly
                v-bind="props"
                :variant="variant"
                append-inner-icon="mdi-calendar"
            ></v-text-field>
        </template>
        <v-date-picker v-model="selectedDate" hide-actions title="">
            <template v-slot:header></template>
        </v-date-picker>
    </v-menu>
</template>
  
<script setup>
import { useDate } from 'vuetify/labs/date'

const date = useDate()

import { ref, computed, watch, defineProps, defineEmits } from "vue";
const { label, variant, modelValue } = defineProps([
    "label",
    "variant",
    "modelValue",
]);
const emit = defineEmits("update:modelValue");

const isDatePickerOpen = ref(false);
const selectedDate = ref(modelValue);

const formattedDate = computed(() => {
    return selectedDate.value ? date.format(selectedDate.value, 'fullDateWithWeekday') : "";
});

watch(modelValue, (newDate) => {
    selectedDate.value = newDate;
});

</script>