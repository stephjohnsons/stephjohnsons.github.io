<template>
  <h5 class="mb-2 fw-normal">
    Simplified and Traditional Chinese Converter
  </h5>
  <div class="d-flex gap-2 mb-2">
    <textarea v-model="simplified" rows="5" class="form-control" placeholder="Simplified Chinese"></textarea>
    <textarea v-if="!hideTw" :value="traditional" rows="5" class="form-control" placeholder="Traditional Chinese"
      readonly></textarea>
  </div>
  <div class="d-flex gap-2 mb-2">
    <button class="btn btn-sm btn-outline-primary" @click="templates.opening">开头</button>
    <button class="btn btn-sm btn-outline-primary" @click="templates.quickOpening">开窗</button>
    <button class="btn btn-sm btn-outline-info" @click="templates.educate.probe">探测</button>
    <button class="btn btn-sm btn-outline-info" @click="templates.educate.followup">跟进</button>
    <button class="btn btn-sm btn-outline-success" @click="templates.reso.G">房客</button>
    <button class="btn btn-sm btn-outline-success" @click="templates.reso.H">房东</button>
    <button class="btn btn-sm btn-outline-success" @click="templates.reso.M">多笔</button>
    <button class="btn btn-sm btn-outline-secondary" @click="templates.pickup">接听</button>
    <button class="btn btn-sm btn-outline-secondary" @click="templates.noPickup">未接</button>
    <button class="btn btn-sm btn-outline-danger" @click="templates.educate.delay">迟回</button>
    <button class="btn btn-sm btn-outline-danger" @click="templates.sorry">抱歉</button>
    <button class="btn btn-sm btn-outline-danger" @click="templates.educate.waiting">等待</button>
    <button class="btn btn-sm btn-outline-secondary" @click="templates.closing.p">待处理</button>
  </div>
  <div class="d-flex gap-2 mb-2">
    <button class="btn btn-sm btn-outline-secondary" @click="templates.educate.fapiao">发票</button>
    <button class="btn btn-sm btn-outline-secondary" @click="templates.educate.feedback">反馈</button>
    <button class="btn btn-sm btn-outline-secondary" @click="templates.educate.international">国际</button>
    <button class="btn btn-sm btn-outline-secondary" @click="templates.educate.defender">屏蔽</button>
    <button class="btn btn-sm btn-outline-secondary" @click="templates.search">搜索</button>
    <button class="btn btn-sm btn-outline-secondary" @click="templates.educate.aircover">诶卡</button>
    <button class="btn btn-sm btn-outline-danger" @click="templates.closing.zh1; hideTw = true">结一</button>
    <button class="btn btn-sm btn-outline-danger" @click="templates.closing.zh2; hideTw = true">结二</button>
    <button class="btn btn-sm btn-outline-danger" @click="templates.closing.tw1; hideTw = true">結壹</button>
    <button class="btn btn-sm btn-outline-danger" @click="templates.closing.tw2; hideTw = true">結贰</button>
    <button class="btn btn-sm btn-outline-info" @click="templates.symbols">符号</button>
    <button class="btn btn-sm btn-outline-primary" @click="help(); hideTw = true">帮助</button>
    <button class="btn btn-sm btn-outline-primary" @click="lead(); hideTw = true">主管</button>
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
const hideTw = ref(false);

let converter = null;

// ZH > TW converter
onMounted(async () => {
  converter = await OpenCC.ConverterFactory(Locale.from.cn, Locale.to.tw);;
});

watch(simplified, (newVal) => {
  if (converter) {
    traditional.value = converter(newVal);
  }
});

// Fetch API
const allTemplates = {
  direct: [
    'opening', 'quickOpening', 'noPickup', 'pickup',
    'sorry', 'search', 'symbols',
    'resoG', 'resoH', 'multipleReso'
  ],
  parametric: {
    educate: [
      'aircover', 'delay', 'defender', 'followup', 'feedback',
      'probe', 'fapiao', 'waiting', 'international'
    ],
    reso: ['G', 'H', 'M'],
    closing: ['p', 'zh1', 'zh2', 'tw1', 'tw2']
  }
};

const fetchTemplate = async (endpoint) => {
  const res = await fetch(`${backend}/${endpoint}`);
  const json = await res.json();
  simplified.value = json.text;
};

const fetchSubtemplates = async (type, template) => {
  try {
    const res = await fetch(`${backend}/${type}?type=${template}`);
    const json = await res.json();
    simplified.value = json.text;
  } catch (err) {
    console.error('Fetch failed:', err);
  }
};

const templates = {};

// Unhides TW text area if hideTw = true
const callWithUnhide = (fn) => {
  if (hideTw.value) hideTw.value = false;
  return fn();
};

allTemplates.direct.forEach(name => {
  templates[name] = () => callWithUnhide(() => fetchTemplate(name));
});

Object.entries(allTemplates.parametric).forEach(([type, names]) => {
  templates[type] = {};
  names.forEach(name => {
    if (type !== 'closing') {
      templates[type][name] = () => callWithUnhide(() => fetchSubtemplates(type, name));
    } else {
      templates[type][name] = () => fetchSubtemplates(type, name);
    }
  });
});

const help = () => {
  simplified.value = '【Help Needed】\n问题描述：\nSurvey：Yes/No\nPotential：Promoter/Detractor\n期待解决方案：\n个案链接：\n预订链接：\n相关个案：';
};

const lead = () => {
  simplified.value = '【主管通话】\n问题描述：\n用户为什么想与主管交谈：\n用户期望的结果是什么：\n已提供的选项或替代解决方案：\n个案链接：\n预订链接：\n相关个案：';
};
</script>

<style scoped>
textarea {
  resize: none;
}
</style>