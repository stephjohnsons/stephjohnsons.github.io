<template>
  <div class="fs-4 pt-2">
    <h2
      class="fw-light"
      id="clock"
    >{{ currentTime }}</h2>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import moment from 'moment';
import { useUIStore } from '@/stores/ui';

const currentTime = ref(moment().format('HH:mm:ss'));
const ui = useUIStore();

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
.dark-mode #clock {
  color: #fd890d;
}
</style>