<template>
  <h5 class="my-2 fw-normal">
    Time Zone Converter
  </h5>
  <div class="d-flex gap-2">
    <div class="w-50">
      <div>
        <label class="form-label">Your Time Zone</label>
        <input type="text" class="form-control" :value="localZone" disabled />
      </div>
      <div>
        <label class="form-label">Your Location Time</label>
        <input type="datetime-local" v-model="localTime" class="form-control" />
        <input type="text" class="form-control mt-1" :value="localTimeZh" readonly />
      </div>
    </div>

    <div class="w-50">
      <div>
        <label class="form-label">Target Time Zone</label>
        <select v-model="targetZone" class="form-select">
          <option v-for="zone in zones" :key="zone" :value="zone">{{ zone }}</option>
        </select>
      </div>
      <div>
        <label class="form-label">Target Local Time</label>
        <input type="text" class="form-control" :value="targetTimeEn" readonly />
        <input type="text" class="form-control mt-1" :value="targetTimeZh" readonly />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import moment from 'moment-timezone';
import 'moment/locale/zh-cn'; // Chinese locale
import 'moment/locale/en-gb'; // English GB (or use 'en' for US style)

const zones = moment.tz.names();

const targetZone = ref('UTC');
const localZone = moment.tz.guess();

const localTime = ref(moment().format('YYYY-MM-DDTHH:mm')); // datetime-local needs "T" format

const targetTimeEn = computed(() => {
  if (!localTime.value) return '';
  return moment.tz(localTime.value, localZone)
    .clone().tz(targetZone.value)
    .locale('en')
    .format('DD MMM YYYY, HH:mm');
});

const localTimeZh = computed(() => {
  if (!localTime.value) return '';
  return moment.tz(localTime.value, localZone)
    .clone().locale('zh-cn')
    .format('YYYY年M月DD日, HH:mm');
});

const targetTimeZh = computed(() => {
  if (!localTime.value) return '';
  return moment.tz(localTime.value, localZone)
    .clone().tz(targetZone.value)
    .locale('zh-cn')
    .format('YYYY年M月DD日, HH:mm');
});
</script>