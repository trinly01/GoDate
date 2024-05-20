<template>
  <div class="date-input-container">
    <label v-if="props.label" for="date-input" class="input-label">{{ props.label }}</label>
    <input ref="goDate" v-model="dateInput" :placeholder="dateFormat" @input="onInput" class="date-input"
      aria-label="Date Input"
      :aria-invalid="errorMsg !== '' ? 'true' : 'false'"
      :aria-describedby="errorMsg !== '' ? 'error-msg' : ''"
    />
    <span v-if="errorMsg" class="error-msg" id="error-msg">{{ errorMsg }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import dayjs from 'dayjs';

type Props = {
  modelValue: string
  label?: string 
}

const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue']);

const locale = ref<string>('en-US');
const dateInput = ref<string>(props.modelValue);
const errorMsg = ref<string>('');

const dateFormat = computed(() => locale.value === 'en-US' ? 'MM/DD/YYYY' : 'DD/MM/YYYY');

const validateDate = (date: string): boolean => {
  const isValid = dayjs(date, dateFormat.value).format(dateFormat.value) === date;
  errorMsg.value = isValid ? '' : 'Invalid Date';
  return isValid;
};

const onInput = (event: Event): void => {
  const input = event.target as HTMLInputElement;
  const cleanedValue = input.value.replace(/\D/g, ''); // Remove non-digit characters
  let formattedValue = '';

  if (locale.value === 'en-US') {
    if (cleanedValue.length > 0) formattedValue += cleanedValue.substring(0, 2);
    if (cleanedValue.length > 2) formattedValue += '/' + cleanedValue.substring(2, 4);
    if (cleanedValue.length > 4) formattedValue += '/' + cleanedValue.substring(4, 8);
  } else {
    if (cleanedValue.length > 0) formattedValue += cleanedValue.substring(0, 2);
    if (cleanedValue.length > 2) formattedValue += '/' + cleanedValue.substring(2, 4);
    if (cleanedValue.length > 4) formattedValue += '/' + cleanedValue.substring(4, 8);
  }

  dateInput.value = formattedValue;
  if (validateDate(formattedValue)) {
    emit('update:modelValue', formattedValue);
  }
};

watch(() => props.modelValue, (newVal) => {
  dateInput.value = newVal;
  validateDate(newVal);
});

onMounted(() => {
  locale.value = navigator.language;
});
</script>

<style scoped>
.date-input-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.input-label {
  margin-bottom: 0.5em;
  color: #333;
}

.date-input {
  padding: 0.5em;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1em;
  color: #333;
}

.error-msg {
  color: red;
  margin-top: 0.5em;
  font-size: 0.875em;
}
</style>
