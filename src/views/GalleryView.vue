<template>
  <div class="gallery">
    <h2>Gallery</h2>

    <h3>Photos</h3>
    <div class="photo-grid d-flex flex-wrap gap-2 justify-content-around">
      <div v-for="(desc, index) in descriptions" :key="index" class="photo-container text-start">
        <img :src="getImgSrc(desc.image)" :alt="desc.alt" class="photo">
        <div class="caption">
          <p class="mb-0 fw-bold">
            {{ desc.event }}
            <span class="fw-normal">({{ desc.year }})</span>
          </p>
          <p class="mb-0">{{ desc.venue }}</p>
          <p class="mb-2 small">Photo by:
            <a v-if="desc.photographerLink" :href="desc.photographerLink" class="fst-italic" target="_blank"
              rel="noopener noreferrer">
              {{ desc.photographer }}
            </a>
            <i v-else>{{ desc.photographer }}</i>
          </p>
        </div>
      </div>
    </div>
    <hr>
  </div>
</template>

<script setup>
// import { computed } from 'vue';
import { descriptions } from '@/images/description.js';

const getImgSrc = (imageName) => {
  return `/imgs/${imageName}`;
};
</script>

<style scoped>
body {
  background-color: #BEFAFD;
}

h3 {
  font-weight: normal;
}

a {
  text-decoration: underline;
  color: white;
}

a:hover {
  text-decoration: none;
}

.photo-container {
  position: relative;
  width: calc(9rem + 12vw);
  height: calc(9rem + 12vh);
  overflow: hidden;
}

@media (max-width: 575.98px) {
  .photo-container {
    width: 100%;
    height: calc(9rem + 12vh);
  }
}

.photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease;
}

.caption {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.7);
  color: black;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.photo-container:hover .caption {
  opacity: 1;
}

.fs-7 {
  font-size: 0.7rem;
}
</style>
