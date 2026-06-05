<template>
  <div
    class="border-bottom d-flex gap-3 mb-3"
    v-if="admin"
  >
    <button
      class="btn border-0 rounded-0"
      :class="!showMacroManager && 'border-bottom border-2 border-warning'"
      @click="showMacroManager = false"
    >
      Macros
    </button>

    <button
      class="btn border-0 rounded-0"
      :class="showMacroManager && 'border-bottom border-2 border-warning'"
      @click="showMacroManager = true"
    >
      Manage
    </button>
  </div>
  <div
    v-if="!showMacroManager && !rrAuth"
    class="gap-3"
    :class="{ 'dark-mode': ui.isDark }"
  >
    <h5 class="fw-normal">Macro</h5>
  </div>
  <div
    class="d-flex flex-col gap-2 mb-2"
    v-if="!showMacroManager && !rrAuth"
  >
    <div class="position-relative w-100 position-relative">
      <div class="macro-wrapper">
        <div class="mb-2">
          <textarea
            ref="macroTextarea"
            v-model="macro"
            class="form-control no-resize"
            rows="1"
            @input="onInput"
            @keydown="handleNumberSelect"
            @keydown.left.prevent="highlightPrev"
            @keydown.right.prevent="highlightNext"
            @keydown.enter.prevent="selectHighlighted"
          />
        </div>
        <div
          v-if="showList"
          class="macro-bar d-flex rounded flex-wrap align-items-center gap-2"
        >
          <span
            v-for="(item, i) in filteredMacros"
            :key="item"
            :class="['macro-item d-flex align-items-center gap-2 px-2 py-1 rounded', { active: i === highlightedIndex }]"
            @mousedown.prevent="insertMacro(item)"
          >
            <div class="macro-number">
              {{ i + 1 }}
            </div>

            <div class="macro-text d-flex flex-column">
              <div :class="[
                'macro-label',
                { active: i === highlightedIndex }
              ]">
                {{ macroRegistry[item].label }}
              </div>

              <div class="macro-key me-1 small">
                {{ item }}
              </div>
            </div>
          </span>
        </div>

        <div class="row g-2">
          <div class="col-4">
            <label class="form-label small">
              Remarks
            </label>

            <textarea
              v-model="remark"
              class="form-control form-control-sm"
              rows="6"
              readonly
            />
          </div>
          <div class="col-4">
            <label class="form-label small">
              English
            </label>
            <textarea
              v-model="englishText"
              class="form-control form-control-sm"
              rows="6"
              readonly
            />
          </div>
          <div class="col-4">
            <label class="form-label small">
              Chinese
            </label>
            <textarea
              v-model="chineseText"
              class="form-control form-control-sm"
              rows="6"
              readonly
            />
          </div>

        </div>
      </div>
    </div>
  </div>

  <MacroManager v-if="showMacroManager" />
  <MacroLineRemover v-if="!showMacroManager" />
  <Notes v-if="admin" />
</template>

<script setup>
import { ref, watch, computed, onMounted } from "vue";
import { useUIStore } from "@/stores/ui";
import { useMacroStateStore } from "@/stores/macroState";
import MacroManager from "./MacroManager.vue";
import MacroLineRemover from "./MacroLineRemover.vue";
import Notes from "./RegulatoryResponseNotes.vue";
import backend from '@/composables/backend';

defineProps({
  admin: {
    type: Boolean,
  },
  rrAuth: {
    type: Boolean,
  },
});

const showMacroManager = ref(false);
const ui = useUIStore();
const macro = ref("");
const englishText = ref('')
const chineseText = ref('')
const remark = ref("");

const macroTextarea = ref(null);
const showList = ref(false);
const highlightedIndex = ref(0);
const macroState = useMacroStateStore()

const macroRegistry = ref({});
const macros = computed(() => Object.keys(macroRegistry.value));

const filteredMacros = computed(() => {
  const match = macro.value
    .slice(0, macroTextarea.value?.selectionStart || 0)
    .match(/-([\w-]*)$/);

  if (!match) return macros.value;

  const query = match[1].toLowerCase();

  return macros.value
    .map((m) => ({
      value: m,
      score: Math.max(
        fuzzyScore(query, m.slice(1)),
        fuzzyScore(query, macroRegistry.value[m].label.toLowerCase())
      ),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.value);
});

function fuzzyScore(query, target) {
  if (!query) return 1;

  let score = 0;
  let tIndex = 0;

  for (const char of query) {
    const found = target.indexOf(char, tIndex);
    if (found === -1) return 0;
    score += 2; // matched character
    if (found === tIndex) score += 1; // consecutive bonus
    tIndex = found + 1;
  }

  // shorter targets rank higher
  return score - target.length * 0.01;
}

function onInput(e) {
  const cursor = e.target.selectionStart;
  const textBefore = macro.value.slice(0, cursor);

  showList.value = /-\w*$/.test(textBefore);

  highlightedIndex.value = 0;
}

function insertMacro(selected) {
  const item = macroRegistry.value[selected]

  remark.value = item.remark || ''
  englishText.value = item.text_en || ''
  chineseText.value = item.text_cn || ''

  macro.value = ''
  showList.value = false

  macroTextarea.value?.focus()
}

function highlightNext() {
  if (!showList.value) return;
  highlightedIndex.value = (highlightedIndex.value + 1) % filteredMacros.value.length;
}

function highlightPrev() {
  if (!showList.value) return;
  highlightedIndex.value =
    (highlightedIndex.value - 1 + filteredMacros.value.length) %
    filteredMacros.value.length;
}

function selectHighlighted() {
  if (!showList.value) return
  const selected = filteredMacros.value[highlightedIndex.value]
  insertMacro(selected)
  macro.value = ''
  showList.value = false
}

const formattedText = computed(() => formatText(preformattedText.value));

async function fetchMacros() {
  const res = await fetch(`${backend}/rr/macros?domain=${macroState.domain}`);
  const data = await res.json();

  const registry = {};

  data.forEach((m) => {
    registry[m.macro] = {
      label: m.label,
      category: m.category,
      remark: m.remark,
      text_en: m.text_en,
      text_cn: m.text_cn
    }
  });

  return registry;
}

onMounted(async () => {
  macroRegistry.value = await fetchMacros();
});

watch(
  () => macroState.domain,
  async () => {
    macroRegistry.value = await fetchMacros()
  }
)
</script>

<style scoped>
.macro-wrapper {
  position: relative;
}

.macro-bar {
  border: 1px solid #ddd;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(6px);
  margin: 0.5rem 0rem;
  padding: 0.5rem;
  max-height: 9.5rem;
  overflow-y: auto;
}

.macro-item {
  background: var(--bs-tertiary-bg);
  min-width: 140px;
  cursor: pointer;
}

.macro-number {
  background: #e5e7eb;
  border-radius: 4px;
  font-size: 0.7rem;
  padding: 1px 4px;
}

.macro-text {
  line-height: 1.1;
}

.macro-label {
  color: #666;
  font-size: 0.8rem;
}

.macro-item.active {
  background: var(--bs-secondary-bg);
  color: black;
}

.dark-mode .macro-bar {
  background: rgba(43, 43, 43, 0.6);
  backdrop-filter: blur(6px);
  border-color: #444;
}

.dark-mode .macro-item {
  background: #3a3a3a;
  color: #888;
}

.dark-mode .macro-item.active {
  background: #ffc107;
  color: #444;
}

.dark-mode .macro-label {
  color: #f2f2f2;
  font-size: 0.8rem;
}

.dark-mode .macro-label.active {
  color: black;
  font-size: 0.8rem;
}

.no-resize {
  resize: none;
}
</style>
