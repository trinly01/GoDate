<template>
  <go-date v-model="date" label="Date:"/>
  <div style="padding: 1em">
    v-model = {{ date }}
  </div>
</template>

<script setup lang="ts">
const date = ref<string>('');
</script>