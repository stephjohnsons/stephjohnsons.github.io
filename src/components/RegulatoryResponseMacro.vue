<template>
  <div class="border-bottom d-flex gap-3 mb-3">

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
      Manage Macros
    </button>

  </div>
  <div
    v-if="!showMacroManager"
    class="gap-3"
    :class="{ 'dark-mode': ui.isDark }"
  >
    <h5 class="fw-normal">
      Macro
    </h5>
  </div>
  <div
    class="d-flex flex-col gap-2 mb-2"
    v-if="!showMacroManager"
  >
    <div class="position-relative w-100 position-relative">
      <div class="macro-wrapper">
        <textarea
          ref="macroTextarea"
          v-model="macro"
          class="form-control"
          rows="4"
          @input="onInput"
          @keydown="handleNumberSelect"
          @keydown.left.prevent="highlightPrev"
          @keydown.right.prevent="highlightNext"
          @keydown.enter.prevent="selectHighlighted"
          placeholder="Type - to see available macros"
        />

        <div
          v-if="showList"
          class="macro-bar"
        >
          <span
            v-for="(item, i) in filteredMacros"
            :key="item"
            :class="['macro-item', { active: i === highlightedIndex }]"
            @mousedown.prevent="insertMacro(item)"
          >
            <div class="macro-number">
              {{ i + 1 }}
            </div>

            <div class="macro-text">
              <div class="macro-label">
                {{ macroRegistry[item].label }}
              </div>
              <div class="macro-key">
                {{ item }}
              </div>
            </div>
          </span>
        </div>
      </div>

    </div>
  </div>

  <MacroManager v-if="showMacroManager" />

  <div
    class="gap-3"
    :class="{ 'dark-mode': ui.isDark }"
  >
    <h5 class="fw-normal mt-2">
      Line Remover
    </h5>
  </div>
  <div class="d-flex flex-col gap-2 mb-2">

    <!-- Input macroTextarea -->
    <div class="position-relative w-50">
      <textarea
        v-model="preformattedText"
        class="form-control"
        rows="3"
        placeholder="Copy text here"
      />
    </div>

    <!-- Result macroTextarea -->
    <div class="position-relative w-100">
      <textarea
        :value="formattedText"
        class="form-control"
        rows="3"
        readonly
        placeholder="Formatted result"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted } from 'vue';
import { useUIStore } from '@/stores/ui';
import MacroManager from './MacroManager.vue';

const showMacroManager = ref(false)
const ui = useUIStore();
const macro = ref('')
const backend = import.meta.env.VITE_TEMPLATE_BACKEND_API_URL;
const preformattedText = ref('')

const macroTextarea = ref(null)
const showList = ref(false)
const highlightedIndex = ref(0)

const macroRegistry = ref({})
const macros = computed(() => Object.keys(macroRegistry.value))

const filteredMacros = computed(() => {
  const match = macro.value.slice(0, macroTextarea.value?.selectionStart || 0)
    .match(/-([\w-]*)$/)

  if (!match) return macros.value

  const query = match[1].toLowerCase()

  return macros.value
    .map(m => ({
      value: m,
      score: Math.max(
        fuzzyScore(query, m.slice(1)),
        fuzzyScore(query, macroRegistry.value[m].label.toLowerCase())
      )
    }))
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(item => item.value)
})

function fuzzyScore(query, target) {
  if (!query) return 1

  let score = 0
  let tIndex = 0

  for (const char of query) {
    const found = target.indexOf(char, tIndex)
    if (found === -1) return 0
    score += 2                  // matched character
    if (found === tIndex) score += 1  // consecutive bonus
    tIndex = found + 1
  }

  // shorter targets rank higher
  return score - target.length * 0.01
}

function onInput(e) {
  const cursor = e.target.selectionStart
  const textBefore = macro.value.slice(0, cursor)

  showList.value = /-\w*$/.test(textBefore)

  highlightedIndex.value = 0
}

function insertMacro(selected) {
  const el = macroTextarea.value
  const start = el.selectionStart

  const before = macro.value.slice(0, start)
  const after = macro.value.slice(start)

  const text = macroRegistry.value[selected].text

  const newBefore = before.replace(/-[\w-]*$/, text)

  macro.value = newBefore + after
  showList.value = false

  requestAnimationFrame(() => {
    const pos = newBefore.length
    el.setSelectionRange(pos, pos)
    el.focus()
  })
}

function highlightNext() {
  if (!showList.value) return
  highlightedIndex.value =
    (highlightedIndex.value + 1) % filteredMacros.value.length
}

function highlightPrev() {
  if (!showList.value) return
  highlightedIndex.value =
    (highlightedIndex.value - 1 + filteredMacros.value.length) %
    filteredMacros.value.length
}

function selectHighlighted() {
  if (!showList.value) return
  insertMacro(filteredMacros.value[highlightedIndex.value])
}


function formatText(text) {
  const paragraphs = text.split(/\n{2,}/)

  const processed = paragraphs.map(p => {
    const lines = p.split("\n").map(l => l.trim())
    const signatureLines = /^(Best|regards|sincerely|thanks|thank you)[,]?$/i
    let result = []

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i]

      while (true) {
        const next = lines[i + 1]
        if (!next) break

        const endsSentence = /[.!?]"?$/.test(line)

        if (!endsSentence) {
          line += " " + next
          i++
        } else {
          break
        }
      }

      if (signatureLines.test(line)) {
        result.push(line)
        continue
      }

      result.push(line)
    }

    return result.join(" ")
  })

  let output = processed.join("\n\n")

  // 🔧 ensure numbered lists start on new lines
  output = output.replace(/\s+(\d+\.\s)/g, "\n$1")
  output = output.replace(/\s+([・\-*•]\s)/g, "\n$1")
  output = output.replace(/Best regards,\s+Liam T\./g, "Best regards,\nLiam T.")
  output = output.replace(/Best,\s+Liam T\./g, "Best,\nLiam T.")
  output = output.replace(/Best regards,\s+Liam/g, "Best regards,\nLiam T.")
  output = output.replace(/Best,\s+Liam/g, "Best,\nLiam T.")
  output = output.replace(/Thanks for understanding,\s+Liam T\./g, "Thanks for understanding,\nLiam T.")
  output = output.replace(/(?<!^)(（\d+）)/g, "\n$1")
  output = output.replace(/[:：]\s*(?=(www\.|[a-zA-Z0-9-]+\.[a-zA-Z]{2,}))/g, ": \n")
  output = output.replace(/\bwww\./g, "")
  output = output.replace(/72|48/g, (match) => {
    if (match === "72") return "48"
    if (match === "48") return "24"
  })

  return output.trim()
}

const formattedText = computed(() => formatText(preformattedText.value))

async function fetchMacros() {
  const res = await fetch(`${backend}/rr/macros`)
  const data = await res.json()

  const registry = {}

  data.forEach(m => {
    registry[m.macro] = {
      label: m.label,
      category: m.category,
      text: m.text
    }
  })

  return registry
}

onMounted(async () => {
  macroRegistry.value = await fetchMacros()
})

watch(macro, (val) => {
  const match = val.match(/(-[\w-]+)$/)
  if (!match) return

  const key = match[1]

  if (macroRegistry.value[key]) {
    const text = macroRegistry.value[key].text
    macro.value = val.replace(key, text)
  }
})
</script>

<style scoped>
textarea {
  resize: none;
}

.macro-wrapper {
  position: relative;
}

.macro-popup {
  position: absolute;
  left: 0;
  bottom: 100%;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  list-style: none;
  padding: 4px;
  margin: 6px 0;
  width: 180px;
  max-height: 160px;
  overflow-y: auto;
  z-index: 1000;
}

.macro-popup li {
  padding: 6px 10px;
  cursor: pointer;
}

.macro-bar {
  margin-top: 6px;
  padding: 4px 6px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: white;
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  /* wraps if too many */
  align-items: center;
  z-index: 1000;
}

.macro-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  border-radius: 8px;
  cursor: pointer;
  background: #f4f4f4;
  min-width: 140px;
}

.macro-number {
  background: #e5e7eb;
  border-radius: 4px;
  font-size: 0.7rem;
  padding: 1px 4px;
}

.macro-text {
  display: flex;
  flex-direction: column;
  line-height: 1.1;
}

.macro-key {
  margin-right: 6px;
  font-size: 0.8rem;
}

.macro-label {
  color: #666;
  font-size: 0.8rem;
}

.macro-item.active {
  background: #dbeafe;
}

.dark-mode .macro-bar {
  background: #2b2b2b;
  border-color: #444;
}

.dark-mode .macro-item {
  background: #3a3a3a;
}

.dark-mode .macro-item.active {
  background: #0e6efd;
  color: white;
}

.macro-popup li.active,
.macro-popup li:hover {
  background: #f2f2f2;
}
</style>