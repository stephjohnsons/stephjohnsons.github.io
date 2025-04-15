<template>
  <h5 class="mt-4 mb-2 fw-normal">
    Time Zone Converter
  </h5>
  <div class="d-flex gap-2">
    <div class="w-20">
      <div>
        <label class="form-label">Time Zone</label>
        <input type="text" class="form-control" :value="localZone" disabled />
      </div>
      <div class="mt-2">
        <input type="datetime-local" v-model="localTime" class="form-control" />
        <input type="text" class="form-control mt-1" :value="localTimeZh" readonly />
      </div>
    </div>

    <div class="w-30">
      <div>
        <label class="form-label">{{ timeDiffOne }}</label>
        <select v-model="targetZoneOne" class="form-select">
          <option v-for="zone in zones" :key="zone" :value="zone">{{ zone }}</option>
        </select>
      </div>
      <div class="mt-2">
        <input type="text" class="form-control" :value="targetTimeOneEn" readonly />
        <input type="text" class="form-control mt-1" :value="targetTimeOneZh" readonly />
      </div>
    </div>

    <div class="w-30">
      <div>
        <label class="form-label">{{ timeDiffTwo }}</label>
        <select v-model="targetZoneTwo" class="form-select">
          <option v-for="zone in zones" :key="zone" :value="zone">{{ zone }}</option>
        </select>
      </div>
      <div class="mt-2">
        <input type="text" class="form-control" :value="targetTimeTwoEn" readonly />
        <input type="text" class="form-control mt-1" :value="targetTimeTwoZh" readonly />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import moment from 'moment-timezone';
import 'moment/locale/zh-cn';
import 'moment/locale/en-gb';

const zones = moment.tz.names();

const localZone = moment.tz.guess();
const localTime = ref(moment().tz(localZone).format('YYYY-MM-DDTHH:mm'));

const targetZoneOne = ref('UTC');
const targetZoneTwo = ref('UTC');

/** Reusable formatter */
function formatTime(targetZoneRef, locale, formatStr) {
  return computed(() => {
    if (!localTime.value) return '';
    return moment.tz(localTime.value, localZone)
      .tz(targetZoneRef.value)
      .locale(locale)
      .format(formatStr);
  });
}

const localTimeZh = formatTime(ref(localZone), 'zh-cn', 'YYYY年M月DD日, HH:mm');
const targetTimeOneEn = formatTime(targetZoneOne, 'en', 'DD MMM YYYY, HH:mm');
const targetTimeOneZh = formatTime(targetZoneOne, 'zh-cn', 'YYYY年M月DD日, HH:mm');
const targetTimeTwoEn = formatTime(targetZoneTwo, 'en', 'DD MMM YYYY, HH:mm');
const targetTimeTwoZh = formatTime(targetZoneTwo, 'zh-cn', 'YYYY年M月DD日, HH:mm');

const klZone = 'Asia/Kuala_Lumpur';

function getOffsetDiff(targetZoneRef) {
  return computed(() => {
    const now = moment();
    const klOffset = now.tz(klZone).utcOffset();
    const targetOffset = now.tz(targetZoneRef.value).utcOffset();
    const diff = (targetOffset - klOffset) / 60;

    if (diff === 0) return 'Same time as KL';
    const hours = Math.abs(diff);
    const direction = diff > 0 ? 'ahead' : 'behind';
    return `${hours} hour${hours !== 1 ? 's' : ''} ${direction}`;
  });
}

const timeDiffOne = getOffsetDiff(targetZoneOne);
const timeDiffTwo = getOffsetDiff(targetZoneTwo);
</script>
