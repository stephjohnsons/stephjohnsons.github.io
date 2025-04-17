<template>
  <h5 class="mb-2 fw-normal">
    Simplified and Traditional Chinese Converter
  </h5>
  <div class="d-flex gap-2 mb-2">
    <textarea v-model="simplified" rows="5" class="form-control" placeholder="Simplified Chinese"></textarea>
    <textarea :value="traditional" rows="5" class="form-control" placeholder="Traditional Chinese" readonly></textarea>
  </div>
  <div class="d-flex gap-2 mb-2">
    <button class="btn btn-sm btn-outline-primary" @click="opening">开头</button>
    <button class="btn btn-sm btn-outline-primary" @click="quickOpening">开窗口</button>
    <button class="btn btn-sm btn-outline-primary" @click="probe">Probe</button>
  </div>
  <div class="d-flex gap-2 mb-2">
    <button class="btn btn-sm btn-outline-secondary" @click="resoG">预订G</button>
    <button class="btn btn-sm btn-outline-secondary" @click="resoH">预订H</button>
    <button class="btn btn-sm btn-outline-secondary" @click="multipleReso">多个订单</button>
  </div>
  <div class="d-flex gap-2 mb-2">
    <button class="btn btn-sm btn-outline-secondary" @click="pickup">接听</button>
    <button class="btn btn-sm btn-outline-secondary" @click="noPickup">未接听</button>
    <span class="mx-2"></span>
    <button class="btn btn-sm btn-outline-danger" @click="delay">迟回复</button>
    <button class="btn btn-sm btn-outline-secondary" @click="sorry">抱歉</button>
    <button class="btn btn-sm btn-outline-secondary" @click="waiting">等待</button>
  </div>
  <div class="d-flex gap-2 mb-2">
    <button class="btn btn-sm btn-outline-primary" @click="closingZh">结束</button>
    <button class="btn btn-sm btn-outline-danger" @click="closingTw">結束</button>
    <span class="mx-2"></span>
    <button class="btn btn-sm btn-outline-primary" @click="symbols">符号</button>
  </div>

  <TranslationPrompt />
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import * as OpenCC from 'opencc-js/core';
import * as Locale from 'opencc-js/preset';
import TranslationPrompt from './TranslationPrompt.vue';

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
  simplified.value = '__xx__，您好。感谢您选择爱彼迎。我是您的专属社区支持代表小桀 (Stephen T.)。';
};

const quickOpening = () => {
  simplified.value = '__xx__，您好。感谢您选择爱彼迎。我是您的专属社区支持代表小桀 (Stephen T.)。 \n\n 您可以通过此消息窗口与我继续联系。如后续您需要与我通话，这里也麻烦您在此告知我。';
};

const pickup = () => {
  simplified.value = '非常感谢您的时间来接听我的来电。如刚刚所说，__xx__';
};

const noPickup = () => {
  simplified.value = '您好，刚刚尝试以【__xx__】号码就__xx__问题给您致电，但是未能接通。如果打扰您，这边深感抱歉。';
};

const delay = () => {
  simplified.value = '由于最近咨询量比较多，所以非常抱歉未能第一时间回复您，还请您见谅。';
};

const probe = () => {
  simplified.value = '为了更好的协助您，请问您是否可以提供更具体的信息，又或者您是否方便通话？我们可以根据您方便的时间段安排通话。';
};

const sorry = () => {
  simplified.value = '很抱歉得知您有这样的体验，这肯定不是爱彼迎想要给到您的。';
};

const waiting = () => {
  simplified.value = '非常感谢您在此问题上的耐心等待。感谢您对爱彼迎的支持与信任。祝您工作生活一切顺利，未来的日子，爱彼迎继续做您忠实的旅伴。';
};

const resoG = () => {
  simplified.value = '您在我们平台上有一笔预订，详情如下：\n\n预订代码：__reso__\n入住日期：2025年xx月xx日\n退房日期：2025年xx月xx日 \n房东名字：__host__ \n\n感谢您就__xx__问题与我们联系。 \n\n期待您的回复。';
};

const resoH = () => {
  simplified.value = '您在我们平台上有一笔预订，详情如下：\n\n预订代码：__reso__\n入住日期：2025年xx月xx日\n退房日期：2025年xx月xx日 \n房客名字：__guest__ \n\n感谢您就__xx__问题与我们联系。 \n\n期待您的回复。';
};

const multipleReso = () => {
  simplified.value = '1. 【__reso__】，入住时间：2025年?月?日-，房客：__guest__ \n2.【__reso__】，入住时间：2025年?月?日-，房客：__guest__';
};

function clearSimplified() {
  simplified.value = '';
}

const closingZh = () => {
  clearSimplified.then(
    traditional.value = '如果没有其他问题的话，我也先不打扰您了，您可以在稍后的系统自动讯息中点击「不，我没事了」。 \n\n如果之后您在使用爱彼迎的过程中遇到任何的问题，请随时与我们沟通，能够倾听您的疑虑，为您提供解决方案，是我们莫大的荣幸。 \n【获取协助或联络爱彼迎】\nairbnb.cn/help/article/1542\n\n感谢您选择爱彼迎。如果后续有任何问题，您可以随时联络我们，我们一定竭诚为您服务。'
  );
};

const closingTw = () => {
  clearSimplified.then(
    traditional.value = '如果沒有其他問題的話，我也先不打擾您了，您可以在稍後的系統自動訊息中點擊「不，我沒事了」。\n\n如果之後您在使用愛彼迎的過程中遇到任何的問題，請隨時與我們溝通，能夠傾聽您的疑慮，為您提供解決方案，是我們莫大的榮幸。\n【獲取協助或聯絡愛彼迎】\nairbnb.com.tw/help/article/1542\n\n感謝您選擇愛彼迎。如果後續有任何問題，您可以隨時聯絡我們，我們一定竭誠為您服務。'
  );
};

const symbols = () => {
  simplified.value = '「__xx__」『__xx__』\n ⬤ ● ‣ ▼ ※';
};
</script>

<style scoped>
textarea {
  resize: none;
}
</style>