<template>
  <div v-if="loading" class="loading-bar" :style="{ width: progress + '%' }" :class="{ 'dark-mode': ui.isDark }"></div>
  <div class="d-flex flex-row gap-3" :class="{ 'dark-mode': ui.isDark }">
    <h5 class="fw-normal">
      Converter
    </h5>
    <p class="my-auto d-flex gap-2 justify-content-center">
      <select class="text-sm mb-2" v-model="lang">
        <option value="cn" default>中文</option>
        <option value="en">英文</option>
      </select>
      <select class="text-sm mb-2" v-model="name">
        <option value="st" default>小桀</option>
        <option value="kx">可欣</option>
        <option value="jf">小苏</option>
        <option value="ly">丽亚</option>
      </select>
      <select class="text-sm mb-2" v-model="domain">
        <option value="cn" default>.cn</option>
        <option value="com">.com</option>
      </select>
      <button class="btn btn-sm btn-outline-secondary mb-2"
        @click="hideTw = false; simplified = ''; traditional = '';">清<span class="d-none d-sm-inline">空</span></button>
    </p>
    <button class="btn btn-sm btn-outline-dark ms-auto mb-2" @click="ui.toggleDark()">
      {{ ui.isDark ? '☼' : '☾' }}
    </button>
  </div>
  <div class="d-flex gap-2 mb-2">
    <div class="position-relative w-100">
      <textarea v-model="simplified" rows="5" class="form-control" placeholder="Simplified Chinese"></textarea>

      <button v-if="!cnCopied"
        class="position-absolute top-0 end-0 btn btn-outline-success px-2 py-1 rounded small me-2 mt-1"
        @click="copyToCnClipboard" style="z-index: 1000;">
        Copy
      </button>
      <button v-if="cnCopied" class="position-absolute top-0 end-0 btn btn-success px-2 py-1 rounded small me-2 mt-1"
        style="z-index: 1000;">
        Copied!
      </button>
    </div>
    <div v-if="!hideTw && lang === 'cn'" class="position-relative w-100">
      <textarea :value="traditional" rows="5" class="form-control" placeholder="Traditional Chinese"
        readonly></textarea>

      <button v-if="!twCopied"
        class="position-absolute top-0 end-0 btn btn-outline-success px-2 py-1 rounded small me-2 mt-1"
        @click="copyToTwClipboard" style="z-index: 1000;">
        Copy
      </button>
      <button v-if="twCopied" class="position-absolute top-0 end-0 btn btn-success px-2 py-1 rounded small me-2 mt-1"
        style="z-index: 1000;">
        Copied!
      </button>
    </div>
  </div>
  <div v-if="lang === 'cn'" class="d-flex flex-row">
    <div class="d-flex flex-column w-50">
      <div class="d-flex gap-2 mb-2 flex-wrap bg-row rounded-3 me-auto" :class="{ 'dark-mode': ui.isDark }">
        <div class="d-flex gap-2 flex-wrap">
          <span class="mx-2 my-auto">开头</span>
          <button class="btn btn-sm btn-outline-secondary" @click="templates.opening[name]()">开头</button>
          <button class="btn btn-sm btn-outline-secondary" @click="templates.reso.G">预订</button>
          <button class="btn btn-sm btn-outline-secondary" @click="templates.reso.M">多笔</button>
          <span class="mx-2 my-auto">检查</span>
          <button class="btn btn-sm btn-outline-secondary" @click="templates.reso.checkpointGuest">检客</button>
          <button class="btn btn-sm btn-outline-secondary" @click="templates.reso.checkpointHost">检东</button>
        </div>
        <div class="d-flex gap-2 flex-wrap">
          <span class="mx-2 my-auto">通话</span>
          <button class="btn btn-sm btn-outline-secondary" @click="templates.opening.pickup">接听</button>
          <button class="btn btn-sm btn-outline-secondary" @click="templates.opening.noPickup">未接</button>
          <button class="btn btn-sm btn-outline-secondary" @click="templates.educate.ghost">被鬼</button>
          <span class="mx-2 my-auto">帮助</span>
          <button class="btn btn-sm btn-warning" @click="templates.educate.help(); hideTw = true">帮助</button>
          <button class="btn btn-sm btn-warning" @click="templates.educate.lead(); hideTw = true">主管</button>
        </div>
      </div>
      <div class="d-flex gap-2 mb-2 flex-wrap">
        <span class="mx-2 my-auto">消息</span>
        <button class="btn btn-sm btn-outline-secondary" @click="templates.educate.delay">迟回</button>
        <button class="btn btn-sm btn-warning" @click="templates.educate.noReply">未回</button>
        <button class="btn btn-sm btn-outline-secondary" @click="templates.educate.probe">探测</button>
        <button class="btn btn-sm btn-outline-secondary" @click="templates.educate.followup">跟进</button>
        <button class="btn btn-sm btn-outline-secondary" @click="templates.reso.waitingResponse">待处</button>
        <button class="btn btn-sm btn-warning" @click="templates.educate.meantime">期间</button>
        <button class="btn btn-sm btn-outline-secondary" @click="templates.educate.sorry">抱歉</button>
        <button class="btn btn-sm btn-outline-secondary" @click="templates.educate.waiting">等待</button>
        <button class="btn btn-sm btn-outline-secondary" @click="templates.educate.duplicate">重复</button>
        <button class="btn btn-sm btn-outline-secondary" @click="templates.educate.bug">漏洞</button>
      </div>
      <div class="d-flex gap-2 mb-2 flex-wrap bg-row rounded-3 me-auto w-100" :class="{ 'dark-mode': ui.isDark }">
        <span class=" mx-2 my-auto">教育</span>
        <button class="btn btn-sm btn-outline-secondary" @click="templates.educate.photography">摄影</button>
        <button class="btn btn-sm btn-outline-secondary" @click="templates.educate.report">举报</button>
        <button class="btn btn-sm btn-outline-secondary" @click="templates.educate.fapiao">发票</button>
        <button class="btn btn-sm btn-outline-secondary" @click="templates.educate.feedback">反馈</button>
        <button class="btn btn-sm btn-warning" @click="templates.educate.international">国际</button>
        <button class="btn btn-sm btn-outline-secondary" @click="templates.educate.specify">指定</button>
        <button class="btn btn-sm btn-outline-secondary" @click="templates.educate.defender">屏蔽</button>
        <button class="btn btn-sm btn-outline-secondary" @click="templates.educate.instantBook">闪订</button>
        <button class="btn btn-sm btn-outline-secondary" @click="templates.reso.hostUnhappyReview">评价</button>
        <button class="btn btn-sm btn-outline-secondary" @click="templates.educate.refundDisabled">到账</button>
        <button class="btn btn-sm btn-outline-secondary" @click="templates.educate.search">搜索</button>
        <button class="btn btn-sm btn-outline-secondary" @click="templates.educate.payout">收款</button>
        <button class="btn btn-sm btn-outline-secondary" @click="templates.educate.repeat">反复</button>
        <button class="btn btn-sm btn-outline-secondary" @click="templates.educate.robotCBG">协商</button>
        <button class="btn btn-sm btn-outline-secondary" @click="templates.educate.listingViews">浏览</button>
      </div>
    </div>
    <div class="d-flex mb-2 flex-wrap ms-2 w-50 h-50">
      <div class="d-flex gap-2 mb-2 flex-wrap">
        <div class="d-flex gap-2 flex-wrap bg-row rounded-3 me-auto w-100" :class="{ 'dark-mode': ui.isDark }">
          <span class="mx-2 my-auto">填充 </span>
          <button class="btn btn-sm btn-outline-secondary" @click="templates.educate.couponFillin">礼金</button>
          <button class="btn btn-sm btn-outline-secondary" @click="templates.educate.refundFillin">退款</button>
          <button class="btn btn-sm btn-outline-secondary" @click="templates.educate.payoutFillin">收款</button>
          <button class="btn btn-sm btn-outline-secondary" @click="templates.educate.rebookingFillin">重订</button>
        </div>
        <div class="d-flex gap-2 flex-wrap">
          <span class="mx-2 my-auto">十分</span>
          <button class="btn btn-sm btn-outline-secondary" @click="templates.reso.upcomingTrip">即将</button>
          <button class="btn btn-sm btn-outline-secondary" @click="templates.reso.register">绑定</button>
          <button class="btn btn-sm btn-outline-secondary" @click="templates.reso.complimentHost">房东</button>
          <button class="btn btn-sm btn-outline-secondary" @click="templates.reso.complimentGuest">房客</button>
          <button class="btn btn-sm btn-outline-secondary" @click="templates.educate.aircoverHost">保H</button>
          <button class="btn btn-sm btn-outline-secondary" @click="templates.educate.aircoverGuest">保G</button>
        </div>
        <div class="d-flex gap-2 flex-wrap  bg-row rounded-3 me-auto w-100" :class="{ 'dark-mode': ui.isDark }">
          <span class="mx-2 my-auto">备注</span>
          <button class="btn btn-sm btn-warning" @click="templates.reso.loss">损失</button>
          <button class="btn btn-sm btn-warning" @click="double(); hideTw = true">双票</button>
          <button class="btn btn-sm btn-warning" @click="templates.educate.rTwo">啊二</button>
          <button class="btn btn-sm btn-warning" @click="symbol(); hideTw = true">符号</button>
          <button class="btn btn-sm btn-warning" @click="numbering(); hideTw = true">号码</button>
        </div>
      </div>
      <div class="d-flex gap-2 mb-2 flex-wrap">
        <button class="btn btn-sm btn-outline-primary" @click="templates.reso.requestDocs">文件</button>
        <button class="btn btn-sm btn-outline-primary" @click="templates.reso.countryHumid">告知</button>
        <button class="btn btn-sm btn-outline-primary" @click="templates.reso.hostUnresponsive">没回</button>
        <span class="mx-2 my-auto">房东</span>
        <button class="btn btn-sm btn-outline-secondary" @click="templates.reso.hSolution">符合</button>
        <button class="btn btn-sm btn-outline-secondary" @click="templates.reso.reviews">评价</button>
      </div>
      <div class="d-flex flex-wrap gap-2 mb-2">
        <span class="mx-2 my-auto">房客</span>
        <button class="btn btn-sm btn-outline-secondary" @click="templates.reso.gConsole">安抚</button>
        <button class="btn btn-sm btn-outline-secondary" @click="templates.reso.rba">重新</button>
        <button class="btn btn-sm btn-outline-success" @click="templates.reso.gSolution">符合</button>
        <button class="btn btn-sm btn-warning" @click="templates.reso.notQualified">不符</button>
        <button class="btn btn-sm btn-outline-secondary" @click="templates.reso.informPayout">收款</button>
      </div>
      <div class="d-flex gap-2 flex-wrap bg-row rounded-3 me-auto w-100" :class="{ 'dark-mode': ui.isDark }">
        <span class="mx-2 my-auto">结束</span>
        <button class="btn btn-sm btn-outline-secondary" @click="templates.closing.zh1(); hideTw = true">简一</button>
        <button class="btn btn-sm btn-outline-secondary" @click="templates.closing.zh2(); hideTw = true">简二</button>
        <button class="btn btn-sm btn-warning" @click="templates.closing.tw1(); hideTw = true">繁壹</button>
        <button class="btn btn-sm btn-warning" @click="templates.closing.tw2(); hideTw = true">繁贰</button>
        <button class="btn btn-sm btn-outline-secondary" @click="templates.reso.checkEmail">检查</button>
        <button class="btn btn-sm btn-outline-secondary" @click="templates.closing.p">待处</button>
      </div>
    </div>
  </div>
  <div v-if="lang === 'en'">
    <div class="d-flex gap-2 mb-2">
      <button class="btn btn-sm btn-outline-secondary" @click="templates.english[name]()">开头</button>
      <button class="btn btn-sm btn-outline-secondary" @click="templates.english.nova">翻译</button>
      <button class="btn btn-sm btn-outline-secondary" @click="templates.english.resoG">房客</button>
      <button class="btn btn-sm btn-outline-secondary" @click="templates.english.resoH">房东</button>
      <button class="btn btn-sm btn-outline-secondary" @click="templates.english.hc">HC</button>
      <button class="btn btn-sm btn-outline-secondary" @click="templates.english.thanks">谢谢</button>
      <button class="btn btn-sm btn-outline-secondary" @click="templates.english.instantBook">闪订</button>
      <button class="btn btn-sm btn-outline-secondary" @click="templates.english.report">举报</button>
      <button class="btn btn-sm btn-outline-secondary" @click="templates.english.international">国际</button>
      <button class="btn btn-sm btn-outline-secondary" @click="templates.english.rebooking">重订</button>
      <button class="btn btn-sm btn-outline-secondary" @click="templates.english.defenderBlock">屏蔽</button>
      <button class="btn btn-sm btn-outline-secondary" @click="templates.english.closing">结束</button>
    </div>
    <div class="d-flex gap-2 mb-2">
      <span class="mx-2 my-auto">AirCover</span>
      <button class="btn btn-sm btn-warning" @click="templates.english.aircoverG">房客</button>
      <button class="btn btn-sm btn-warning" @click="templates.english.aircoverH">房东</button>
      <button class="btn btn-sm btn-outline-secondary" @click="templates.english.pickup">接听</button>
      <button class="btn btn-sm btn-outline-secondary" @click="templates.english.noPickup">未接</button>
      <button class="btn btn-sm btn-outline-secondary" @click="templates.english.ghosted">被鬼</button>
      <button class="btn btn-sm btn-outline-secondary" @click="templates.english.coupon">礼金</button>
      <button class="btn btn-sm btn-outline-secondary" @click="templates.english.refund">退款</button>
      <button class="btn btn-sm btn-outline-secondary" @click="symbol(); hideTw = true">符号</button>
      <button class="btn btn-sm btn-warning" @click="help(); hideTw = true">帮助</button>
      <button class="btn btn-sm btn-warning" @click="lead(); hideTw = true">主管</button>
    </div>
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
import { allTemplates } from './data/templates';

const ui = useUIStore();
const loading = ref(false);
const simplified = ref('')
const traditional = ref('')
const backend = import.meta.env.VITE_TEMPLATE_BACKEND_API_URL;
const hideTw = ref(false);
const name = ref('st')
const lang = ref('cn')
const domain = ref('cn')
const progress = ref(0);
const cnCopied = ref(false);
const twCopied = ref(false);

const templates = {};

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

onMounted(async () => {
  converter = await OpenCC.ConverterFactory(Locale.from.cn, Locale.to.tw);
});

watch(simplified, (newVal) => {
  if (converter) {
    traditional.value = converter(newVal);
  }

  simplified.value = newVal.replace(/"([^"]*)"/g, '「$1」');
});

const fetchSubtemplates = async (type, template) => {
  startLoading();
  try {
    // opening then different res
    const res = ref('');
    if (type === 'opening') {
      res.value = await fetch(`${backend}/${type}?type=${template}`);
    } else {
      res.value = await fetch(`${backend}/${type}?type=${template}&domain=${domain.value}`);
    }
    const json = await res.value.json();
    if (type === 'opening') {
      return { text: json.text };
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

const callWithUnhide = async (fn) => {
  startLoading();
  try {
    if (hideTw.value) hideTw.value = false;
    return await fn();
  } finally {
    stopLoading();
  }
};

Object.entries(allTemplates).forEach(([type, names]) => {
  templates[type] = {};
  names.forEach(name => {
    if (type === 'opening') {
      templates[type][name] = () => {
        return callWithUnhide(async () => {
          const openingMessage = await fetchSubtemplates(type, name);
          const openWindow = await fetchSubtemplates(type, 'quick');
          if (name === 'pickup' || name === 'noPickup') {
            simplified.value = `${openingMessage.text}`;
          } else {
            simplified.value = `${openingMessage.text}\n\n${openWindow.text}`;
          }

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
  simplified.value =
    '「__xx__」>「__xx__」>「__xx__」>「__xx__」\n『__xx__』 ＜__action__＞\n▼幫助中心 ▲ ‣ ◆ Between ・ VISA ••••1234 \n※ Translation\n✓ ⛌'
}

const numbering = () => {
  simplified.value = '（1）\n（2）\n（3）\n（4）\n（5）\n（6）\n（7）\n（8）\n（9）\n（10）'
}

const double = () => {
  simplified.value = 'UI\nInitiator (G/H?): _who_\nShort Summary of Outcome/Next Steps:\n-\n⚠️ __Promises/Refunds_for_noting__'
}

const copyToCnClipboard = async () => {
  try {
    await navigator.clipboard.writeText(simplified.value);
    cnCopied.value = true;
    setTimeout(() => (cnCopied.value = false), 1500);
  } catch (err) {
    console.error('Failed to copy:', err);
  }
};

const copyToTwClipboard = async () => {
  try {
    await navigator.clipboard.writeText(traditional.value);
    twCopied.value = true;
    setTimeout(() => (twCopied.value = false), 1500);
  } catch (err) {
    console.error('Failed to copy:', err);
  }
};
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

.btn-grand {
  background-color: inherit;
  border-color: #00000000;
  color: #000;
}

.dark-mode .loading-bar {
  background-color: #874905;
}

.dark-mode .btn:hover {
  color: #fff;
}

.dark-mode .btn-warning {
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

.mx-custom {
  margin: auto 0.85rem;
}

.bg-row {
  background-color: #e3e3e3;
}

.dark-mode.bg-row {
  background-color: #292929;
}

.small {
  font-size: 0.75rem;
  transition: opacity 0.3s ease;
}
</style>