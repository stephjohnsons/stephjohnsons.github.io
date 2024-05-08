<template>
  <div class="d-flex flex-column">
    <h2>Teaching</h2>

    <!-- Teaching Bio -->
    <div v-for="(paragraph, index) in teachingBio" :key="index">
      <p :class="{ 'fs-7': index === teachingBio.length - 1 }">
        {{ paragraph }}
      </p>
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
            <ul>
              <li v-for="item in items" :key="item">{{ item }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Stuffs done -->
    <h3 class="mt-4 mb-2">Teaching Diary</h3>
    <div class="d-flex flex-wrap gap-3">
      <div class="d-flex flex-column custom-width">
        <h4>Cello Yoga</h4>
        <p class="mb-2">
          Live stream on Zoom + Instagram. <br />
          Jacob Shaw explaining the "cello yoga" daily routine and Q&A on 24th March 2020
          from Scandinavian Cello School in Stevns, Denmark to the class of Stephen Johnson-Tseu.
        </p>
        <div class="d-flex">
          <Link link="https://www.youtube.com/watch?v=hSYOXMHuUsA" text="Video" />
        </div>
      </div>

      <div class="d-flex flex-column custom-width">
        <h4>Jesselton Philharmonic Orchestra Broadcast</h4>
        <p class="mb-2">
          Jesselton Philharmonic Orchestra Family Programme is a live broadcast via ZOOM and stream LIVE on YouTube.
        </p>
        <div class="d-flex">
          <Link link="https://www.youtube.com/watch?v=xaVXcMYjgSw" text="Video" />
        </div>
      </div>

      <div class="d-flex flex-column custom-width">
        <h4>A short introduction to the cello</h4>
        <p class="mb-2">
          Guest speaker for the Malaysian Brass Outreach Project's Guest Series video.
          Recorded for Jul 2020.
        </p>
        <div class="d-flex">
          <Link link="https://www.youtube.com/watch?v=r9GTmInXLSo" text="Video" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Link from '@/components/PromptButton.vue';
import { reactive, onMounted } from 'vue';
import { teachingBio, teachingProfile } from "@/components/data/biographies.js";

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
body {
  background-color: #BEFAFD;
}

.accordion {
  --bs-accordion-color: var(--bs-warning-text-emphasis);
  --bs-accordion-active-bg: var(--bs-warning);

  .accordion-button:not(.collapsed)::after {
    -webkit-mask-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23aaaaaa'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
    background: var(--bs-warning-text-emphasis);
  }

  .accordion-button:not(.collapsed) {
    color: var(--bs-warning-text-emphasis);
  }
}

.custom-width {
  width: 45%;
}
</style>
