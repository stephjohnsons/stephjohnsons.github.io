<template>
  <div :class="{ 'dark-mode': ui.isDark }">
    <h5 class="fw-normal mt-2">
      Line Remover
    </h5>

    <div class="d-flex flex-row gap-2 mb-2">
      <textarea
        v-model="preformattedText"
        class="form-control"
        rows="4"
        placeholder="Copy text here"
      />

      <textarea
        :value="formattedText"
        class="form-control"
        rows="4"
        readonly
        placeholder="Formatted result"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useUIStore } from "@/stores/ui";

const preformattedText = ref('')
const ui = useUIStore();

const formattedText = computed(
  () => formatText(preformattedText.value)
)

function formatText(text) {
  const paragraphs = text.split(/\n{2,}/);

  const processed = paragraphs.map((p) => {
    const lines = p.split("\n").map((l) => l.trim());
    const signatureLines = /^(Best|regards|sincerely|thanks|thank you)[,]?$/i;
    let result = [];

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];

      while (true) {
        const next = lines[i + 1];
        if (!next) break;

        const endsSentence = /[.!?]"?$/.test(line);

        if (!endsSentence) {
          line += " " + next;
          i++;
        } else {
          break;
        }
      }

      if (signatureLines.test(line)) {
        result.push(line);
        continue;
      }

      result.push(line);
    }

    return result.join(" ");
  });

  let output = processed.join("\n\n");

  // 🔧 ensure numbered lists start on new lines
  output = output.replace(/\s+(\d+\.\s)/g, "\n$1");
  output = output.replace(/\s+([・\-*•]\s)/g, "\n$1");
  output = output.replace(/Best regards,\s+Liam T\./g, "Best regards,\nLiam");
  output = output.replace(/Best,\s+Liam T\./g, "Best,\nLiam");
  output = output.replace(/Best regards,\s+Liam/g, "Best regards,\nLiam");
  output = output.replace(/Best,\s+Liam/g, "Best,\nLiam");
  output = output.replace(/Thanks,\s+Liam T\./g, "Thanks,\nLiam");
  output = output.replace(
    /Thanks for understanding,\s+Liam T\./g,
    "Thanks for understanding,\nLiam"
  );
  output = output.replace(/(?<!^)(（\d+）)/g, "\n$1");
  output = output.replace(/[:：]\s*(?=(www\.|[a-zA-Z0-9-]+\.[a-zA-Z]{2,}))/g, ": \n");
  output = output.replace(/\bwww\./g, "");
  output = output.replace(/72|48/g, (match) => {
    if (match === "72") return "48";
    if (match === "48") return "24";
  });

  return output.trim();
}
</script>