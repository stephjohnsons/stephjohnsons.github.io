<template>
  <main>
    <div class="d-flex flex-column-reverse flex-lg-row align-items-lg-center my-5 py-2 py-lg-5">
      <div class="image-container d-flex">
        <img src="/imgs/recital-2016.jpeg" :alt="homeDescription.alt" class="home-image">
        <div class="caption d-flex flex-column justify-content-center align-items-start position-absolute">
          <p class="mb-0 fw-bold">
            {{ homeDescription.event }}
            <span class="fw-normal">({{ homeDescription.year }})</span>
          </p>
          <p class="mb-0">{{ homeDescription.venue }}</p>
          <p class="mb-2 small">Photo by:
            <i>{{ homeDescription.photographer }}</i>
          </p>
        </div>
      </div>
      <div class="mt-2 ms-lg-4">
        <h2 class="mb-1">{{ greeting }}, you.</h2>
        <p class="mb-1">
          Stephen, a cellist based in Kuala Lumpur, Malaysia,
          brings over {{ yearsOfExperience }} years of experience to
          his performances and music teaching.
          He also has a keen interest in software development and enjoys reading.
        </p>
        <p class="d-flex flex-row">
          <RouterLink :to="{ path: pageLinks[1].children[0].link }" class="text-muted">musician bio</RouterLink>
          <RouterLink :to="{ path: pageLinks[3].link }" class="text-muted ms-3">developer bio</RouterLink>
          <RouterLink :to="{ path: pageLinks[2].link }" class="text-muted ms-3">teaching bio</RouterLink>
        </p>
      </div>
    </div>
    <div class="border-top py-3">
      <h3 class="mb-0">Latest posts</h3>
      <p class="text-muted fst-italic">
        For more posts, please visit my
        <a href="https://www.instagram.com/stephjohnsons/">Instagram</a>.
        Powered by <a href="http://elfsight.com">Elfsight</a>.
      </p>
      <div class="d-flex">
        <InstagramEmbed />
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { homeDescription } from '@/images/description.js';
import { pageLinks } from '@/components/data/pages.js'
import { RouterLink } from 'vue-router'

import InstagramEmbed from '@/components/InstagramEmbed.vue';

const greeting = ref("");

const yearsOfExperience = computed(() => {
  return date.value.getFullYear() - 2006
})

const date = ref(new Date());
const hour = ref(date.value.getHours());

function greetUser() {
  if (hour.value < 12) {
    greeting.value = "good morning";
  } else if (hour.value < 18) {
    greeting.value = "good afternoon";
  } else {
    greeting.value = "good evening";
  };
}

onMounted(() => {
  greetUser();
});
</script>

<style scoped>
.image-container {
  position: relative;
  max-height: 300px;
  min-width: 40vw;
}

.home-image {
  width: 100%;
  max-height: 300px;
  object-fit: cover;
}

.caption {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  color: rgba(255, 255, 255);
  padding: 10px;
  transition: opacity 0.5s ease;
  background-color: rgba(0, 0, 0, 0.2);
  opacity: 0;
}

.image-container:hover {
  .caption {
    opacity: 1;
  }
}

.text-muted:hover {
  color: #262526 !important;
}

@media (min-width: 992px) {
  .home-image {
    left: calc(-25% + 15vw);
  }
}
</style>