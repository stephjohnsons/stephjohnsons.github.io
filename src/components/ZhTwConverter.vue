<template>
  <div v-if="loading" class="loading-bar" :style="{ width: progress + '%' }"></div>
  <div class="d-flex flex-row gap-3">
    <h5 class="fw-normal">
      Converter
    </h5>
    <p class="my-auto">
      <select class="text-sm mb-2" v-model="name">
        <option value="st" default>Step</option>
        <option value="kx">KX</option>
      </select>
    </p>
  </div>
  <div class="d-flex gap-2 mb-2">
    <textarea v-model="simplified" rows="5" class="form-control" placeholder="Simplified Chinese"></textarea>
    <textarea v-if="!hideTw" :value="traditional" rows="5" class="form-control" placeholder="Traditional Chinese"
      readonly></textarea>
  </div>
  <div class="d-flex gap-2 mb-2">
    <button class="btn btn-sm btn-outline-primary" @click="templates.opening[name]()">开头</button>
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
    <button class="btn btn-sm btn-outline-danger" @click="templates.closing.zh1(); hideTw = true">结一</button>
    <button class="btn btn-sm btn-outline-danger" @click="templates.closing.zh2(); hideTw = true">结二</button>
    <button class="btn btn-sm btn-outline-danger" @click="templates.closing.tw1(); hideTw = true">結壹</button>
    <button class="btn btn-sm btn-outline-danger" @click="templates.closing.tw2(); hideTw = true">結贰</button>
    <button class="btn btn-sm btn-outline-info" @click="symbol(); hideTw = true">符号</button>
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

const loading = ref(false);
const progress = ref(0);
let progressInterval = null;

const startLoading = () => {
  loading.value = true;
  progress.value = 0;
  progressInterval = setInterval(() => {
    if (progress.value < 90) {
      progress.value += 2; // Simulate progress
    }
  }, 50);
};

const stopLoading = () => {
  clearInterval(progressInterval);
  progress.value = 100;
  setTimeout(() => {
    loading.value = false;
    progress.value = 0;
  }, 300); // Smooth finish
};

const simplified = ref('')
const traditional = ref('')
const backend = import.meta.env.VITE_TEMPLATE_BACKEND_API_URL;
const hideTw = ref(false);
const name = ref('st')

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
    'noPickup', 'pickup',
    'sorry', 'search', 'symbols',
    'resoG', 'resoH', 'multipleReso'
  ],
  parametric: {
    opening: [
      'st', 'kx', 'quick'
    ],
    educate: [
      'aircover', 'delay', 'defender', 'followup', 'feedback',
      'probe', 'fapiao', 'waiting', 'international'
    ],
    reso: ['G', 'H', 'M'],
    closing: ['p', 'zh1', 'zh2', 'tw1', 'tw2']
  }
};

const fetchTemplate = async (endpoint) => {
  startLoading();
  try {
    const res = await fetch(`${backend}/${endpoint}`);
    const json = await res.json();
    simplified.value = json.text;
  } catch (err) {
    console.error('Fetch failed:', err);
  } finally {
    stopLoading();
  }
};

const fetchSubtemplates = async (type, template) => {
  startLoading();
  try {
    const res = await fetch(`${backend}/${type}?type=${template}`);
    const json = await res.json();
    if (type === 'opening') {
      return json;
    } else {
      simplified.value = json.text;
    }
  } catch (err) {
    console.error('Fetch failed:', err);
    return { text: '' };
  } finally {
    stopLoading();
  }
};

const templates = {};

// Unhides TW text area if hideTw = true
const callWithUnhide = async (fn) => {
  startLoading();
  try {
    if (hideTw.value) hideTw.value = false;
    return await fn();
  } finally {
    stopLoading();
  }
};

allTemplates.direct.forEach(name => {
  templates[name] = () => callWithUnhide(() => fetchTemplate(name));
});

Object.entries(allTemplates.parametric).forEach(([type, names]) => {
  templates[type] = {};
  names.forEach(name => {
    if (type === 'opening') {
      templates[type][name] = () => {
        callWithUnhide(async () => {
          const openingMessage = await fetchSubtemplates(type, name);
          const openWindow = await fetchSubtemplates(type, 'quick');
          simplified.value = `${openingMessage.text}\n\n${openWindow.text}`;
        });
      };
    } else if (type !== 'closing') {
      templates[type][name] = () => callWithUnhide(() => fetchSubtemplates(type, name));
    } else {
      templates[type][name] = () => callWithUnhide(() => fetchSubtemplates(type, name));
    }
  });
});

const help = () => {
  simplified.value = '【Help Needed】\n问题描述：\nSurvey：Yes/No\nPotential：Promoter/Detractor\n期待解决方案：\n个案链接：\n预订链接：\n相关个案：';
};

const lead = () => {
  simplified.value = '【主管通话】\n问题描述：\n用户为什么想与主管交谈：\n用户期望的结果是什么：\n已提供的选项或替代解决方案：\n个案链接：\n预订链接：\n相关个案：';
};

const symbol = () => {
  simplified.value = "「__xx__」『__xx__』\n ⬤ ● ‣ ▼ ✓ ⛌ ◆";
}
</script>

<style scoped>
textarea {
  resize: none;
}

.loading-bar {
  position: fixed;
  top: 0;
  left: 0;
  height: 6px;
  background-color: #fd890d;
  transition: width 0.2s ease;
  z-index: 9999;
}
</style>