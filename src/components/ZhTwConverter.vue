<template>
  <h5 class="mb-2 fw-normal">
    Simplified and Traditional Chinese Converter
  </h5>
  <div class="d-flex gap-2 mb-2">
    <textarea v-model="simplified" rows="5" class="form-control" placeholder="Simplified Chinese"></textarea>
    <textarea :value="traditional" rows="5" class="form-control" placeholder="Traditional Chinese" readonly></textarea>
  </div>
  <div class="d-flex gap-2 mb-2">
    <button class="btn btn-sm btn-outline-primary" @click="templates.opening">开头</button>
    <button class="btn btn-sm btn-outline-primary" @click="templates.quickOpening">开窗</button>
    <button class="btn btn-sm btn-outline-primary" @click="templates.probe">探测</button>
    <button class="btn btn-sm btn-outline-success" @click="templates.resoG">房客</button>
    <button class="btn btn-sm btn-outline-success" @click="templates.resoH">房东</button>
    <button class="btn btn-sm btn-outline-success" @click="templates.multipleReso">多笔</button>
    <button class="btn btn-sm btn-outline-secondary" @click="templates.pickup">接听</button>
    <button class="btn btn-sm btn-outline-secondary" @click="templates.noPickup">未接</button>
    <button class="btn btn-sm btn-outline-danger" @click="delay">迟回</button>
    <button class="btn btn-sm btn-outline-danger" @click="templates.sorry">抱歉</button>
    <button class="btn btn-sm btn-outline-danger" @click="templates.waiting">等待</button>
  </div>
  <div class="d-flex gap-2 mb-2">
    <button class="btn btn-sm btn-outline-secondary" @click="templates.fapiao">发票</button>
    <button class="btn btn-sm btn-outline-secondary" @click="templates.defender">屏蔽</button>
    <button class="btn btn-sm btn-outline-secondary" @click="templates.search">搜索</button>
    <button class="btn btn-sm btn-outline-secondary" @click="templates.aircover">诶卡</button>
    <button class="btn btn-sm btn-outline-danger" @click="closingZh">结语</button>
    <button class="btn btn-sm btn-outline-danger" @click="closingTw">結語</button>
    <button class="btn btn-sm btn-outline-info" @click="templates.symbols">符号</button>
  </div>

  <TranslationPrompt />
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import * as OpenCC from 'opencc-js/core';
import * as Locale from 'opencc-js/preset';
import TranslationPrompt from './TranslationPrompt.vue';

const simplified = ref('')
const traditional = ref('')
const backend = import.meta.env.VITE_TEMPLATE_BACKEND_API_URL;

let converter = null;

onMounted(async () => {
  converter = await OpenCC.ConverterFactory(Locale.from.cn, Locale.to.tw);;
});

watch(simplified, (newVal) => {
  if (converter) {
    traditional.value = converter(newVal);
  }
});

const fetchTemplate = async (endpoint) => {
  const res = await fetch(`${backend}/${endpoint}`);
  const json = await res.json();
  simplified.value = json.text;
};

const templateNames = [
  'opening', 'quickOpening', 'noPickup', 'pickup', 'fapiao',
  'sorry', 'waiting', 'defender', 'search', 'aircover',
  'resoG', 'resoH', 'multipleReso'
];

const templates = {};
templateNames.forEach(name => {
  templates[name] = () => fetchTemplate(name);
});

const closingZh = () => fetchTemplate('closingZh');
const closingTw = () => fetchTemplate('closingTw');
</script>

<style scoped>
textarea {
  resize: none;
}
</style>