<template>
  <div class="d-flex flex-column">
    <h2>Biography</h2>
    <div class="d-flex flex-row gap-1 mt-1 mb-2">
      <button :class="buttonClass('English')" @click="switchLanguage('English')">
        English
      </button>
      <button :class="buttonClass('Chinese')" @click="switchLanguage('Chinese')">
        中文
      </button>
      <!-- <button 
        :class="buttonClass('Malay')"
        @click="switchLanguage('Malay')"
      >
        B. Malaysia
      </button> -->
    </div>
    <div v-for="(paragraph, index) in bioText" :key="index">
      <p :class="{ 'fs-7 text-muted': isLastParagraph(index) }">
        {{ paragraph }}
      </p>
    </div>
    <hr />
    <h3>Personal Statement</h3>
    <p>
      At a young age, I was always fascinated by art and languages. Growing up in a trilingual and multicultural
      environment gave me first-hand experience in understanding how different aspects of society come together to
      achieve a common goal.
      Then, as I grew older, I slowly understood that all art reflects the state of our society, culture, and aesthetic
      values. This philosophy is something that I value and share with others in my performances and teachings.
      I was formally trained back home in Malaysia but was exposed to the international music scene when I was 16. For
      the years following, I would travel to international stages across Europe, Asia, and the U.S. All these
      opportunities enabled awareness and answers to my longstanding social identity-related questions.
      With my additional training with various teachers, I have also learnt to think outside of the box as a classical
      musician and teacher. My work focuses on magnifying the integration of music and society and communicating art
      comprehensibly and responsibly to my audiences.
      <br><br>
      <strong>Mission</strong><br>
      I curate musical performances that reflects and resonates with people.
      Art should be relatable and sustainable.
      And with that, I currently design projects with constructive strategies for developing audiences,
      designing concerts, and educating the next generation of artists.
      <br><br>
      <strong>Vision | Goals</strong><br>
      I aim to create performances with more social relevance that would alter the stereotype of elitism in classical
      music. As this task is far too great for one person's ability, I wish to educate and gather an artistic hive-mind
      with the same desire, and then continuously generate creative sparks through our artistic interactions.
    </p>
    <p class="fs-7 text-muted">Last edited Oct 2022. Do not use or amend without permission. </p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { biographies } from "@/components/data/biographies.js";

const currentLanguage = ref('English');

const bioText = computed(() => biographies[currentLanguage.value]);

function switchLanguage(language) {
  currentLanguage.value = language;
}

function isLastParagraph(index) {
  return index === bioText.value.length - 1;
}

function buttonClass(language) {
  return [
    'btn',
    'btn-sm',
    'border-1',
    currentLanguage.value === language ? 'btn-warning' : 'btn-outline-dark'
  ];
}
</script>

<style scoped>
body {
  background-color: #BEFAFD;
}
</style>
