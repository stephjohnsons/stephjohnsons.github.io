<template>
  <div class="mt-2">
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="toggleTranslation" v-model="showTranslation" />
      <label class="form-check-label" for="toggleTranslation">
        Show Translation
      </label>
    </div>

    <div v-if="showTranslation" class="mt-3 d-flex">
      <div class="me-3">
        <label for="languageSelect" class="form-label me-2">Select Language</label>
        <select id="languageSelect" class="form-select-sm" v-model="selectedLanguage">
          <option value="">-- Choose --</option>
          <option value="ja">Japanese</option>
          <option value="ko">Korean</option>
          <option value="th">Thai</option>
          <option value="vi">Vietnamese</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="it">Italian</option>
          <option value="ru">Russian</option>
          <option value="es">Spanish</option>
        </select>
      </div>

      <div class="w-50 ms-0">
        <label class="form-labe me-2">Translation</label>
        <input v-if="selectedLanguage && translation" type="text" :value="translation" class="form-control-sm" readonly
          ref="translationBox" />
        <button v-if="selectedLanguage && translation" class="btn btn-outline-secondary btn-sm ms-2"
          @click="copyToClipboard">
          Copy
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
const showTranslation = ref(false);
const selectedLanguage = ref('');
const translationBox = ref(null);

const translations = {
  ko: "※ 이 메시지는 자동으로 번역되었습니다.",
  vi: "※ Tin nhắn này đã được dịch tự động.",
  de: "※ Diese Nachricht wurde automatisch übersetzt.",
  fr: "※ Ce message a été traduit automatiquement.",
  th: "※ ข้อความนี้ได้รับการแปลโดยอัตโนมัติ",
  it: "※ Questo messaggio è stato tradotto automaticamente.",
  es: "※ Este mensaje fue traducido automáticamente.",
  ja: "※ このメッセージは自動的に翻訳されました。",
  ru: "※ Это сообщение было переведено автоматически."
};

const translation = computed(() => translations[selectedLanguage.value] || '');

const copyToClipboard = () => {
  if (translationBox.value) {
    navigator.clipboard.writeText(translationBox.value.value);
  }
};
</script>