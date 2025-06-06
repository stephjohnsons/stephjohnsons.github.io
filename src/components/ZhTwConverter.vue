<template>
  <div v-if="loading" class="loading-bar" :style="{ width: progress + '%' }" :class="{ 'dark-mode': ui.isDark }"></div>
  <div class="d-flex flex-row gap-3" :class="{ 'dark-mode': ui.isDark }">
    <h5 class="fw-normal">
      Converter
    </h5>
    <p class="my-auto d-flex gap-2 justify-content-center">
      <select class="text-sm mb-2" v-model="lang">
        <option value="cn" default>中</option>
        <option value="en">英</option>
      </select>
      <select class="text-sm mb-2" v-model="name">
        <option value="st" default>桀</option>
        <option value="kx">欣</option>
        <option value="jf">苏</option>
        <option value="ly">亚</option>
      </select>
      <button class="btn btn-sm btn-outline-danger mb-2"
        @click="hideTw = false; simplified = ''; traditional = '';">清空</button>
    </p>
    <button class="btn btn-sm btn-outline-dark ms-auto mb-2" @click="ui.toggleDark()">
      {{ ui.isDark ? '☼' : '☾' }}
    </button>
  </div>
  <div class="d-flex gap-2 mb-2">
    <textarea v-model="simplified" rows="5" class="form-control" placeholder="Simplified Chinese"></textarea>
    <textarea v-if="!hideTw && lang === 'cn'" :value="traditional" rows="5" class="form-control"
      placeholder="Traditional Chinese" readonly></textarea>
  </div>
  <div v-if="lang === 'cn'" class="d-flex gap-2 mb-2">
    <button class="btn btn-sm btn-dark" disabled>开头</button>
    <button class="btn btn-sm btn-outline-secondary" @click="templates.opening[name]()">开头</button>
    <button class="btn btn-sm btn-outline-secondary" @click="templates.reso.G">房客</button>
    <button class="btn btn-sm btn-outline-secondary" @click="templates.reso.H">房东</button>
    <button class="btn btn-sm btn-outline-secondary" @click="templates.reso.M">多笔</button>
    <button class="btn btn-sm btn-dark" disabled>通话</button>
    <button class="btn btn-sm btn-outline-secondary" @click="templates.pickup">接听</button>
    <button class="btn btn-sm btn-outline-secondary" @click="templates.noPickup">未接</button>
    <button class="btn btn-sm btn-outline-danger" @click="templates.educate.ghost">被鬼</button>
    <button class="btn btn-sm btn-outline-secondary" @click="templates.educate.coupon">礼金</button>
    <button class="btn btn-sm btn-outline-secondary" @click="templates.educate.refundDisabled">退款还未到账</button>
    <button class="btn btn-sm btn-outline-secondary" @click="templates.educate.payout">收款</button>
    <button class="btn btn-sm btn-primary" disabled>帮助</button>
    <button class="btn btn-sm btn-outline-primary" @click="templates.educate.help; hideTw = true">帮助</button>
    <button class="btn btn-sm btn-outline-primary" @click="templates.educate.lead; hideTw = true">主管</button>
  </div>
  <div v-if="lang === 'cn'" class="d-flex gap-2 mb-2">
    <button class="btn btn-sm btn-dark" disabled>忽悠</button>
    <button class="btn btn-sm btn-outline-secondary" @click="templates.educate.delay">迟回</button>
    <button class="btn btn-sm btn-outline-primary" @click="templates.educate.noReply">未回</button>
    <button class="btn btn-sm btn-outline-secondary" @click="templates.educate.probe">探测</button>
    <button class="btn btn-sm btn-outline-secondary" @click="templates.educate.followup">跟进</button>
    <button class="btn btn-sm btn-outline-secondary" @click="templates.educate.upcomingTrip">即将</button>
    <button class="btn btn-sm btn-outline-secondary" @click="templates.reso.waitingResponse">待处</button>
    <button class="btn btn-sm btn-outline-secondary" @click="templates.educate.meantime">期间</button>
    <button class="btn btn-sm btn-outline-secondary" @click="templates.sorry">抱歉</button>
    <button class="btn btn-sm btn-outline-secondary" @click="templates.educate.waiting">等待</button>
    <button class="btn btn-sm btn-outline-secondary" @click="templates.educate.duplicate">重复</button>
    <button class="btn btn-sm btn-outline-secondary" @click="templates.educate.refund">退款</button>
    <button class="btn btn-sm btn-outline-secondary" @click="templates.educate.bug">漏洞</button>
    <button class="btn btn-sm btn-dark" disabled>检查</button>
    <button class="btn btn-sm btn-outline-secondary" @click="templates.reso.checkpointGuest">检客</button>
    <button class="btn btn-sm btn-outline-secondary" @click="templates.reso.checkpointHost">检东</button>
  </div>
  <div v-if="lang === 'cn'" class="d-flex gap-2 mb-2">
    <button class="btn btn-sm btn-dark" disabled>教育</button>
    <button class="btn btn-sm btn-outline-secondary" @click="templates.educate.photography">摄影</button>
    <button class="btn btn-sm btn-outline-secondary" @click="templates.educate.report">举报</button>
    <button class="btn btn-sm btn-outline-secondary" @click="templates.educate.fapiao">发票</button>
    <button class="btn btn-sm btn-outline-secondary" @click="templates.educate.feedback">反馈</button>
    <button class="btn btn-sm btn-outline-secondary" @click="templates.educate.international">国际</button>
    <button class="btn btn-sm btn-outline-secondary" @click="templates.educate.defender">屏蔽</button>
    <button class="btn btn-sm btn-outline-secondary" @click="templates.educate.specify">指定</button>
    <button class="btn btn-sm btn-outline-secondary" @click="templates.search">搜索</button>
    <button class="btn btn-sm btn-outline-secondary" @click="templates.educate.instantBook">闪订</button>
    <button class="btn btn-sm btn-outline-warning" @click="symbol(); hideTw = true">符号</button>
    <button class="btn btn-sm btn-outline-warning" @click="numbering(); hideTw = true">号码</button>
    <button class="btn btn-sm btn-outline-secondary" @click="templates.educate.repeat">反复</button>
    <button class="btn btn-sm btn-outline-secondary" @click="templates.educate.robotCBG">房客取消协商</button>
    <button class="btn btn-sm btn-outline-secondary" @click="templates.reso.register">绑定</button>
  </div>
  <div v-if="lang === 'cn'" class="d-flex gap-2 mb-2">
    <button class="btn btn-sm btn-primary" disabled>保障</button>
    <button class="btn btn-sm btn-outline-primary" @click="templates.educate.aircoverHost">房东</button>
    <button class="btn btn-sm btn-outline-primary" @click="templates.educate.aircoverGuest">房客</button>
    <button class="btn btn-sm btn-danger" disabled>结束</button>
    <button class="btn btn-sm btn-outline-danger" @click="templates.closing.zh1(); hideTw = true">结一</button>
    <button class="btn btn-sm btn-outline-danger" @click="templates.closing.zh2(); hideTw = true">结二</button>
    <button class="btn btn-sm btn-outline-danger" @click="templates.closing.tw1(); hideTw = true">結壹</button>
    <button class="btn btn-sm btn-outline-danger" @click="templates.closing.tw2(); hideTw = true">結贰</button>
    <button class="btn btn-sm btn-outline-secondary" @click="templates.reso.checkEmail">检查</button>
    <button class="btn btn-sm btn-outline-danger" @click="templates.closing.p">Pen</button>
    <button class="btn btn-sm btn-dark" disabled>备注</button>
    <button class="btn btn-sm btn-warning" @click="templates.reso.loss">损失</button>
    <button class="btn btn-sm btn-warning" @click="double(); hideTw = true">双票</button>
    <button class="btn btn-sm btn-warning" @click="rTwo()">啊二</button>
  </div>
  <div v-if="lang === 'en'" class="d-flex gap-2 mb-2">
    <button class="btn btn-sm btn-outline-secondary" @click="templates.english[name]()">开头</button>
    <button class="btn btn-sm btn-outline-secondary" @click="templates.english.nova">翻译</button>
    <button class="btn btn-sm btn-outline-secondary" @click="templates.english.resoG">房客</button>
    <button class="btn btn-sm btn-outline-secondary" @click="templates.english.resoH">房东</button>
    <button class="btn btn-sm btn-outline-secondary" @click="templates.english.hc">HC</button>
    <button class="btn btn-sm btn-outline-secondary" @click="templates.english.thanks">谢谢</button>
    <button class="btn btn-sm btn-outline-secondary" @click="templates.english.instantBook">闪订</button>
    <button class="btn btn-sm btn-outline-secondary" @click="templates.english.report">举报</button>
    <button class="btn btn-sm btn-outline-secondary" @click="templates.english.international">国际</button>
    <button class="btn btn-sm btn-outline-secondary" @click="symbol(); hideTw = true">符号</button>
  </div>
  <div v-if="lang === 'en'" class="d-flex gap-2 mb-2">
    <button class="btn btn-sm btn-primary" disabled>保障</button>
    <button class="btn btn-sm btn-outline-primary" @click="templates.english.aircoverG">房客</button>
    <button class="btn btn-sm btn-outline-primary" @click="templates.english.aircoverH">房东</button>
    <button class="btn btn-sm btn-outline-secondary" @click="templates.english.noPickup">未接</button>
    <button class="btn btn-sm btn-outline-danger" @click="templates.english.ghosted">被鬼</button>
    <button class="btn btn-sm btn-outline-secondary" @click="templates.english.coupon">礼金</button>
    <button class="btn btn-sm btn-outline-secondary" @click="templates.english.refund">退款</button>
    <button class="btn btn-sm btn-outline-primary" @click="help(); hideTw = true">帮助</button>
    <button class="btn btn-sm btn-outline-primary" @click="lead(); hideTw = true">主管</button>
    <button class="btn btn-sm btn-outline-danger" @click="templates.english.closing">结束</button>
  </div>

  <TranslationPrompt />
  <TelephoneNumbers />
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import * as OpenCC from 'opencc-js/core';
import * as Locale from 'opencc-js/preset';
import TranslationPrompt from './TranslationPrompt.vue';
import TelephoneNumbers from './TelephoneNumbers.vue';
import { useUIStore } from '@/stores/ui';

const ui = useUIStore();
const loading = ref(false);
const simplified = ref('')
const traditional = ref('')
const backend = import.meta.env.VITE_TEMPLATE_BACKEND_API_URL;
const hideTw = ref(false);
const name = ref('st')
const lang = ref('cn')
const progress = ref(0);

let progressInterval = null;
let converter = null;

const startLoading = () => {
  loading.value = true;
  progress.value = 0;
  progressInterval = setInterval(() => {
    if (progress.value < 90) {
      progress.value += 2;
    }
  }, 50);
};

const stopLoading = () => {
  clearInterval(progressInterval);
  progress.value = 100;
  setTimeout(() => {
    loading.value = false;
    progress.value = 0;
  }, 300);
};

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
      'st', 'kx', 'jf', 'ly', 'quick'
    ],
    english: [
      'st', 'kx', 'jf', 'ly',
      'resoG', 'resoH',
      'nova', 'hc', 'thanks', 'instantBook',
      'closing', 'aircoverG', 'aircoverh', 'noPickup', 'ghosted',
      'coupon', 'refund', 'report', 'international'
    ],
    educate: [
      'aircoverHost',
      'aircoverGuest', 'robotCBG',
      'delay', 'defender', 'payout',
      'followup', 'feedback', 'help', 'lead',
      'meantime', 'report', 'ghost',
      'probe', 'fapiao', 'views',
      'waiting', 'international',
      'specify', 'noReply', 'instantBook',
      'upcomingTrip', 'duplicate', 'repeat',
      'refundDisabled', 'coupon', 'refund', 'photography', 'bug'
    ],
    reso: [
      'G', 'H', 'M', 'waitingResponse', 'checkpointGuest', 'checkpointHost',
      'loss', 'checkEmail', 'register'
    ],
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

const symbol = () => {
  simplified.value = "「__xx__」>「__xx__」>「__xx__」>「__xx__」\n『__xx__』 ＜__action__＞\n▼幫助中心 ▲ ‣ ◆ Between ・ VISA ••••1234 \n※ Translation\n✓ ⛌";
}

const numbering = () => {
  simplified.value = "（1）\n（2）\n（3）\n（4）\n（5）\n（6）\n（7）\n（8）";
}

const double = () => {
  simplified.value = "UI\nInitiator (G/H?): _who_\nShort Summary of Outcome/Next Steps:"
}

const rTwo = () => {
  simplified.value = '理解用户的问题\n主要发生的问题：\n主要诉求（离开房源或继续留宿？）：\n是否已就此问题联系房东：\n房东是否有尝试解决问题：\n受影响的天数（准确日期）：\n发生问题时的证明文件（照片、视频等）：\n目前是否已离开房源（离开的准确日期）：';
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

.dark-mode .loading-bar {
  background-color: #874905;
}

.dark-mode .btn:hover {
  color: #fff;
}

.dark-mode .btn-outline-danger {
  color: #c71d1d;
  border-color: #c71d1d;
}

.dark-mode .btn-outline-primary {
  color: #0E6EFD;
  border-color: #0E6EFD;
}

.btn-warning {
  color: #d87308;
  background-color: #fd890d00;
  border-color: #d87308;

  &:hover {
    background-color: #d87308;
    border-color: #d87308;
    color: #000;
  }
}

.dark-mode .btn-warning {
  color: #fd890d;
  border-color: #fd890d;

  &:hover {
    background-color: #fd890d;
    border-color: #fd890d;
    color: #000;
  }
}
</style>