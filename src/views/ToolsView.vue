<template>
  <div class="d-flex flex-column">
    <ZhTwConverter />
    <TimeZoneConverter />

    <p class="my-4">
      <a href="https://www.timeanddate.com/date/workdays.html">
        Business Day Calculator
      </a>
    </p>

    <CurrentTime />
  </div>
</template>

<script setup>
import ZhTwConverter from '@/components/ZhTwConverter.vue';
import TimeZoneConverter from '@/components/TimeZoneConverter.vue';
import CurrentTime from '@/components/CurrentTime.vue';
</script>
