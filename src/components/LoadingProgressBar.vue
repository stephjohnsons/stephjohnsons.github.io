<template>
  <div
    v-if="loading"
    class="loading-bar"
    :style="{ width: `${progress}%` }"
    :class="{ 'dark-mode': isDark }"
  ></div>
</template>

<script setup>
defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  progress: {
    type: Number,
    default: 0
  },
  isDark: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.loading-bar {
  position: fixed;
  top: 0;
  left: 0;
  height: 6px;
  background-color: #fd890d;
  transition: width 0.2s ease;
  z-index: 9999;
}

.dark-mode.loading-bar {
  background-color: #874905;
}
</style>
