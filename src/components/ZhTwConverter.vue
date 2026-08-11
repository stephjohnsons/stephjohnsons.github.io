<template>
  <LoadingProgressBar
    :loading="loading"
    :progress="progress"
    :is-dark="ui.isDark"
  />
  <div
    class="d-flex flex-row gap-3"
    :class="{ 'dark-mode': ui.isDark }"
  >
  <!-- existing template unchanged -->
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import * as OpenCC from 'opencc-js/core';
import * as Locale from 'opencc-js/preset';
import TranslationPrompt from './TranslationPrompt.vue';
import LoadingProgressBar from './LoadingProgressBar.vue';
import { useUIStore } from '@/stores/ui';
import { useMacroStateStore } from '@/stores/macroState';
import { allTemplates } from './data/templates';
import backend from '@/composables/backend';

defineProps({
  rrAuth: {
    type: Boolean
  }
})

const ui = useUIStore();
const loading = ref(false);
const simplified = ref('')
const traditional = ref('')
const hideTw = ref(false);
const name = ref('st')
const macroState = useMacroStateStore();
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

  simplified.value = simplified.value.replace(/"([^"]*)"/g, (_, text) => {
    return text === ''
      ? '「___text___」'
      : `「${text}」`;
  });
  simplified.value = simplified.value.replace(/'([^"]*)'/g, (_, text) => {
    return text === ''
      ? '« ___text___ »'
      : `« ${text} »`;
  });
  simplified.value = simplified.value.replace(/-yes/g, '✓');
  simplified.value = simplified.value.replace(/-no/g, '⛌');
  simplified.value = simplified.value.replace(/-hc/g, '▼');
  simplified.value = simplified.value.replace(/-card/g, '••••');
});

const fetchSubtemplates = async (type, template) => {
  startLoading();
  try {
    const res = ref('');
    if (type === 'opening') {
      res.value = await fetch(`${backend}/volume/${type}?type=${template}`);
    } else {
      res.value = await fetch(`${backend}/volume/${type}?type=${template}&domain=${macroState.domain}`);
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
          const reso = await fetchSubtemplates(type, 'reso');
          simplified.value = `${openingMessage.text}\n\n${reso.text}`;
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
    '∎ title ■ subtitle ▲ point title ※ note ▼幫助中心『__xx__』 GT / HT / UI\n◆ Between ・point form ‣ point form ⁃ point form /// PII ••••\n»»━━━◆ xx ◆━━━««\n💬 Interaction\n🌸 Summary\nCOR:  ★ ≈\nPreferred Language:  \n🍁⚫🚨🟢🌼🎀🗒✨🍀❓Issue\n————————————————————\n━━━━━━━━━━━━━━━━━━━━\n•———————————————————•\n'
}

const numbering = () => {
  simplified.value = '①\n②\n③\n④\n⑤\n⑥\n⑦\n⑧\n⑨\n⑩\n⑪\n⑫\n⑬\n⑭\n⑮\n⑯\n⑰\n⑱\n⑲\n⑳'
}

const double = () => {
  simplified.value = '»»━━━◆ UI ◆━━━««\nInitiator (G/H?): _who_\nShort Summary of Outcome/Next Steps:\n-\n⚠️ __Promises/Refunds_for_noting__'
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

.btn-grand {
  background-color: inherit;
  border-color: #00000000;
  color: #000;
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

textarea[readonly] {
  color: #7a7a7a;
}

.small {
  font-size: 0.75rem;
  transition: opacity 0.3s ease;
}

.overflow-y-scroll {
  overflow-y: scroll;
  max-height: 14.5rem;
  padding-right: 0.5rem;
}
</style>
