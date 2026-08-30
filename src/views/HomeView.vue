<template>
  <main>
    <div class="home-hero d-flex flex-column-reverse flex-lg-row align-items-lg-center my-5 py-2 py-lg-5">
      <div class="image-container">
        <img
          src="/imgs/recital-2016.jpeg"
          :alt="homeDescription.alt"
          class="home-image"
        >

        <div class="caption d-flex d-xl-none flex-column justify-content-center align-items-start position-absolute">
          <p class="mb-0 fw-bold">
            {{ homeDescription.event }}
            <span class="fw-normal">({{ homeDescription.year }})</span>
          </p>

          <p class="mb-0">
            {{ homeDescription.venue }}
          </p>

          <p class="mb-2 small">
            Photo by:
            <i>{{ homeDescription.photographer }}</i>
          </p>
        </div>
      </div>

      <div class="home-text mt-2 ms-lg-4">
        <div class="d-none d-xl-flex flex-column justify-content-center align-items-start text-gray">
          <p class="mb-0 fw-bold">
            {{ homeDescription.event }}
            <span class="fw-normal">({{ homeDescription.year }})</span>
          </p>

          <p class="mb-0">
            {{ homeDescription.venue }}
          </p>

          <p class="mb-2 small">
            Photo by:
            <i>{{ homeDescription.photographer }}</i>
          </p>
        </div>
        <h2 class="mb-2">{{ greeting }}, you.</h2>

        <p class="mb-1">
          Stephen, a cellist based in Kuala Lumpur, Malaysia,
          brings over {{ yearsOfExperience }} years of experience to
          his performances and music teaching.
          He also has a keen interest in software development and enjoys reading.
        </p>

        <p
          class="d-flex flex-row mt-xl-3"
          :class="{ 'dark-mode': ui.isDark }"
        >
          <RouterLink
            :to="{ path: pageLinks[1].link }"
            class="text-muted fs-xl"
          >
            musician bio
          </RouterLink>

          <RouterLink
            :to="{ path: pageLinks[5].link }"
            class="text-muted ms-3 fs-xl"
          >
            teaching bio
          </RouterLink>
        </p>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { homeDescription } from '@/images/description.js';
import { pageLinks } from '@/components/data/pages.js'
import { RouterLink } from 'vue-router'
import { useUIStore } from '@/stores/ui'

const ui = useUIStore();

// import InstagramEmbed from '@/components/InstagramEmbed.vue';

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
  width: 100%;
}

.home-image {
  width: 100%;
  max-height: 300px;
  object-fit: cover;
}

.caption {
  inset: 0;
  color: white;
  padding: 10px;
  transition: opacity 0.5s ease;
  background-color: rgba(0, 0, 0, 0.2);
  opacity: 0;
}

.image-container:hover .caption {
  opacity: 1;
}

.text-muted:hover {
  color: #262526 !important;
}


/* =========================================================
   XL
   ========================================================= */

@media (min-width: 1200px) {

  .home-hero {
    position: relative;
    width: 100vw;
    min-height: 500px;

    /* Break out of Bootstrap's container */
    margin-left: calc(50% - 50vw) !important;

    padding: 0 !important;
  }

  /* -----------------------------------------
     Full-page image
     ----------------------------------------- */

  .image-container {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }

  .home-image {
    width: 100%;
    height: 100%;
    max-height: none;
    object-fit: cover;
  }


  /* -----------------------------------------
     Gray gradient overlay
     ----------------------------------------- */

  .image-container::after {
    content: "";
    position: absolute;
    inset: 0;

    background: linear-gradient(to right,
        rgba(0, 0, 0, 0.75) 0%,
        rgba(23, 23, 23, 0.55) 25%,
        rgba(54, 54, 54, 0.2) 55%,
        rgba(70, 70, 70, 0) 100%);

    pointer-events: none;
    z-index: 1;
  }


  /* -----------------------------------------
     Main greeting/text
     ----------------------------------------- */

  .home-text {
    position: relative;
    z-index: 3;

    width: 400px;

    /* Move text onto image */
    margin-left: 8vw !important;
    margin-right: 0;

    color: white;
  }


  /* -----------------------------------------
     Links
     ----------------------------------------- */

  .home-text .text-muted {
    color: white !important;
  }

  .home-text .text-muted:hover {
    color: white !important;
  }

  .text-gray {
    color: rgba(255, 255, 255, 0.452)
  }

  a:hover {
    border-bottom: none;
    text-decoration: none;
    background-image: url("data:image/svg+xml;charset=utf8,%3Csvg id='squiggle-link' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:ev='http://www.w3.org/2001/xml-events' viewBox='0 0 10 18'%3E%3Cstyle type='text/css'%3E.squiggle%7Banimation:shift .5s linear infinite;%7D@keyframes shift %7Bfrom %7Btransform:translateX(-10px);%7Dto %7Btransform:translateX(0);%7D%7D%3C/style%3E%3Cpath fill='none' stroke='white' stroke-width='1.4' class='squiggle' d='M0,17.5 c 2.5,0,2.5,-1.5,5,-1.5 s 2.5,1.5,5,1.5 c 2.5,0,2.5,-1.5,5,-1.5 s 2.5,1.5,5,1.5' /%3E%3C/svg%3E") !important;
  }

  .fs-xl {
    font-size: 1.3rem;
  }
}
</style>