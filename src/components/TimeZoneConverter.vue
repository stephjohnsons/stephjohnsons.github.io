<template>
  <div class="container py-4">
    <div class="row mb-3">
      <div class="col-md-6">
        <label class="form-label">Your Time Zone</label>
        <input type="text" class="form-control" :value="localZone" disabled />
      </div>
      <div class="col-md-6">
        <label class="form-label">Target Time Zone</label>
        <select v-model="targetZone" class="form-select">
          <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
        </select>
      </div>
    </div>

    <div class="row mb-3">
      <div class="col-md-6">
        <label class="form-label">Your Location Time</label>
        <input type="datetime-local" v-model="localTime" class="form-control" />
      </div>
      <div class="col-md-6">
        <label class="form-label">Target Local Time</label>
        <input type="text" class="form-control" :value="targetTimeEn" readonly />
        <input type="text" class="form-control" :value="targetTimeZh" readonly />
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

function filterCityTimezones(timezones) {
  return timezones.filter(zone => /\/[a-zA-Z]+$/.test(zone));
}

function removeRegionFromTimezones(timezones) {
  return timezones.map(zone => {
    const parts = zone.split('/');
    return parts[parts.length - 1];
  });
}

function sortedTimezones(timezones) {
  return timezones.sort((a, b) => a.localeCompare(b));
}

const cityTimezones = filterCityTimezones(zones);
const cities = sortedTimezones(removeRegionFromTimezones(cityTimezones));

const targetZone = ref('UTC');
const localZone = moment.tz.guess();

const localTime = ref(moment().format('YYYY-MM-DDTHH:mm')); // datetime-local needs "T" format

// English target time
const targetTimeEn = computed(() => {
  if (!localTime.value) return '';
  return moment.tz(localTime.value, localZone)
    .clone().tz(targetZone.value)
    .locale('en')
    .format('DD MMM YYYY, HH:mm');
});

// Chinese target time
const targetTimeZh = computed(() => {
  if (!localTime.value) return '';
  return moment.tz(localTime.value, localZone)
    .clone().tz(targetZone.value)
    .locale('zh-cn')
    .format('YYYY年M月DD日, HH:mm');
});
</script>