<template>
  <div class="d-flex flex-column">
    <h2 class="d-none d-md-block">Teaching</h2>
    <h3 class="d-block d-md-none">Teaching</h3>

    <!-- Teaching Bio -->
    <div v-for="(paragraph, index) in teachingBio" :key="index">
      <p :class="{ 'fs-7': index === teachingBio.length - 1 }">
        {{ paragraph }}
      </p>
    </div>

    <div class="mb-2">
      <p><a href="https://www.researchgate.net/profile/Stephen-Tseu">ResearchGate Profile</a></p>
    </div>



    <!-- Teaching Profile Accordion -->
    <div class="accordion" v-for="(items, category, idx) in teachingProfile" :key="category">
      <div class="accordion-item">
        <h2 class="accordion-header" :id="`heading${idx}`">
          <button class="accordion-button" type="button" :class="{ 'collapsed': !isActive[idx] }"
            data-bs-toggle="collapse" :data-bs-target="`#collapse${idx}`"
            :aria-expanded="isActive[idx] ? 'true' : 'false'" @click="toggle(idx)">
            <strong>{{ category }}</strong>
          </button>
        </h2>
        <div :id="`collapse${idx}`" class="accordion-collapse collapse" :class="{ 'show': isActive[idx] }"
          :aria-labelledby="`heading${idx}`" data-bs-parent="#accordionExample">
          <div class="accordion-body">
            <p v-for="item in items" :key="item" class="mb-0">
              <li>
                {{ item }}
              </li>
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Stuffs done -->
    <h3 class="mt-4 mb-2">Teaching Diary</h3>
    <div v-for="item in teachingDiary" :key="item.project" class="d-flex flex-column border-bottom py-2 my-2">
      <div class="d-inline-flex flex-row align-items-center">
        <h4 class="mb-0">{{ item.project }}</h4>
        <Link :link="item.link" text="Video" class="ms-auto ms-md-2 py-1 px-2 py-md-0" />
      </div>
      <p class="my-2">
        {{ item.description }}
      </p>
    </div>
  </div>
</template>

<script setup>
import Link from '@/components/PromptButton.vue';
import { reactive, onMounted } from 'vue';
import { teachingBio, teachingProfile } from "@/components/data/biographies.js";
import { teachingDiary } from "@/components/data/teachingDiary.js";

const isActive = reactive({});

const toggle = (index) => {
  isActive[index] = !isActive[index];
};

onMounted(() => {
  Object.keys(teachingProfile).forEach((key, index) => {
    isActive[index] = index === 0;
  });
});
</script>

<style scoped>
.accordion {
  --bs-accordion-bg: rgb(248, 248, 248);
  --bs-accordion-active-bg: var(--bs-warning);

  .accordion-button:not(.collapsed)::after {
    -webkit-mask-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23aaaaaa'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
    background: var(--bs-warning-text-emphasis);
  }
}

.custom-width {
  width: 45%;
}
</style>
