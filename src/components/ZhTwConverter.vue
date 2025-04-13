<template>
  <h5 class="mb-2 fw-normal">
    Simplified and Traditional Chinese Converter
  </h5>
  <div class="d-flex gap-2 mb-2">
    <textarea v-model="simplified" rows="5" class="form-control" placeholder="Simplified Chinese"></textarea>
    <textarea :value="traditional" rows="5" class="form-control" placeholder="Traditional Chinese" readonly></textarea>
  </div>
  <div class="d-flex gap-2 mb-2">
    <button class="btn btn-sm btn-outline-secondary" @click="opening">开头</button>
    <button class="btn btn-sm btn-outline-secondary" @click="pickup">接听</button>
    <button class="btn btn-sm btn-outline-secondary" @click="noPickup">未接听</button>
    <button class="btn btn-sm btn-outline-secondary" @click="reso">Reso</button>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import * as OpenCC from 'opencc-js/core';
import * as Locale from 'opencc-js/preset';

const simplified = ref('');
const traditional = ref('');
let converter = null;

onMounted(async () => {
  converter = await OpenCC.ConverterFactory(Locale.from.cn, Locale.to.tw);;
});

watch(simplified, (newVal) => {
  if (converter) {
    traditional.value = converter(newVal);
  }
});

const opening = () => {
  simplified.value = '__xx__，您好。感谢您选择爱彼迎。我是您的专属社区支持代表小桀 (Stephen T.)';
};

const pickup = () => {
  simplified.value = '非常感谢您的时间来接听我的来电。如刚刚所说，__xx__';
};

const noPickup = () => {
  simplified.value = '您好，刚刚尝试以【__xx__】号码就__xx__问题给您致电，但是未能接通。如果打扰您，这边深感抱歉。';
};

const reso = () => {
  simplified.value = '您在我们平台上有一笔预定，详情如下：\n\n 预定代码：__reso__ \n 入住日期：__checkin__ \n 退房日期：__checkout__ \n 房东名字：__host__ \n\n';
};
</script>

<style scoped>
textarea {
  resize: none;
}
</style>