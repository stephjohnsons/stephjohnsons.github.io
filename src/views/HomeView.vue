<template>
  <main>
    <h2 class="mb-2">{{ greeting }}, you.</h2>

    <div class="image-container position-relative">
      <img src="/imgs/recital-2016.jpeg" :alt="homeDescription.alt" class="home-image">
      <div class="anti-caption">
        <p>Hover me 👈🏻</p>
      </div>
      <div class="caption">
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

    <p class="mt-3 mb-1">
      Stephen, a cellist based in Kuala Lumpur, Malaysia,
      brings over {{ yearsOfExperience }} years of experience to
      his performances and music teaching.
      He also has a keen interest in software development and enjoys reading.
    </p>
    <p>
      <RouterLink :to="{ path: pageLinks[1].link }" class="text-muted">
        read more here
      </RouterLink>
    </p>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { homeDescription } from '@/images/description.js';
import { pageLinks } from '@/components/data/pages.js'
import { RouterLink } from 'vue-router'

const greeting = ref("");

const date = ref(new Date());
const hour = ref(date.value.getHours());

const yearsOfExperience = computed(() => {
  return date.value.getFullYear() - 2006 - 1
})

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
/* .home-image {
  position: absolute;
  left: calc(-35% + 12vw);
}

@media (min-width: 992px) {
  .home-image {
    left: calc(-25% + 15vw);
  }
} */

/* 
 */
.image-container {
  display: inline-block;
  position: relative;
}

.home-image {
  width: 100%;
  display: block;
}

.anti-caption,
.caption {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  color: rgba(255, 255, 255);
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  opacity: 0.8;
  transition: opacity 0.5s ease;
}

.caption {
  background-color: rgba(0, 0, 0, 0.2);
  opacity: 0;
}

.image-container:hover {
  .caption {
    opacity: 1;
  }

  .anti-caption {
    opacity: 0;
  }
}

@media (min-width: 992px) {
  .home-image {
    left: calc(-25% + 15vw);
  }
}
</style>