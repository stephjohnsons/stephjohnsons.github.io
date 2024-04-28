<template>
  <p class="mb-0">
    <a href="" onclick="Calendly.initPopupWidget({ url: 'https://calendly.com/info-gvb/30min' }); return false;">
      {{ props.text }} <br>
    </a>
  </p>
  <p class="text-muted small fst-italic">Powered by
    <a href="https://calendly.com" target="_blank">
      Calendly</a>.
    Subject to scheduling availability.
  </p>
</template>

<script setup>
const props = defineProps({
  text: {
    type: String,
    required: true
  }
})
</script>