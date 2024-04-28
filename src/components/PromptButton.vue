<template>
  <a
    class="btn btn-warning px-2 py-0 d-flex align-items-center"
    :href="link"
    role="button"
  >
    <YouTube v-if="text === 'Video'" class="me-2" /> 
    <Archive v-else class="me-2" />
    {{ text }}
  </a>
</template>

<script setup>
import YouTube from '@/assets/youtube.svg';
import Archive from '@/assets/archive.svg';
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  link: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
});
</script>