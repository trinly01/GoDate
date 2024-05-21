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
import { ref, computed } from 'vue';
import dayjs from 'dayjs';

type Props = {
  modelValue: string
  label?: string 
}

const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue']);

const locale = useI18n().getBrowserLocale();
console.log(locale)
const dateInput = ref<string>(props.modelValue);
const errorMsg = ref<string>('');

const dateFormat = computed(() => locale === 'en-US' ? 'MM/DD/YYYY' : 'DD/MM/YYYY');

const validateDate = (date: string): boolean => {
  const isValid = dayjs(date, dateFormat.value).format(dateFormat.value) === date;
  errorMsg.value = isValid ? '' : 'Invalid Date';
  return isValid;
};

const onInput = (event: Event): void => {
  const input = event.target as HTMLInputElement;
  const cleanedValue = input.value.replace(/\D/g, ''); // Remove non-digit characters
  let formattedValue = '';

  if (cleanedValue.length > 0) formattedValue += cleanedValue.substring(0, 2);
  if (cleanedValue.length > 2) formattedValue += '/' + cleanedValue.substring(2, 4);
  if (cleanedValue.length > 4) formattedValue += '/' + cleanedValue.substring(4, 8);

  dateInput.value = formattedValue;
  if (validateDate(formattedValue)) {
    emit('update:modelValue', dayjs(formattedValue, dateFormat.value).format('YYYY-MM-DD'));
  } else if (formattedValue.length < 10) {
    emit('update:modelValue', '')
  }
};

</script>

<style scoped>
.date-input-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1em;
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
