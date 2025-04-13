<template>
  <div class=" fs-4">
    <h2>{{ currentTime }}</h2>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import moment from 'moment';

const currentTime = ref(moment().format('HH:mm:ss'));

let interval;

onMounted(() => {
  interval = setInterval(() => {
    currentTime.value = moment().format('HH:mm:ss');
  }, 1000);
});

onUnmounted(() => {
  clearInterval(interval);
});
</script>

<style scoped>
h2 {
  color: black;
}
</style>