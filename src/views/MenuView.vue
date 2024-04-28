<template>
  <div class="h-100 text-center my-5">
    <nav class="d-flex flex-column fs-3 my-3" v-for="(item, index) of pageLinks" :key="item.name">
      <Transition name="slide-fade" appear>
        <RouterLink :to="{ path: item.link }" :style="{ transitionDelay: `${index * 0.05}s` }" @mouseover="rotateArrow"
          @mouseleave="resetArrow">
          <span>{{ item.name }}</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" fill="currentColor"
            class="bi bi-arrow-right-short" viewBox="0 0 16 16"
            style=" transform: rotate(-45deg); transition: 0.2s ease;">
            <path fill-rule="evenodd"
              d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8" />
          </svg>
        </RouterLink>
      </Transition>
    </nav>

    <p class="text-body-secondary fs-7 p-2 mb-0">
      Socials:
    </p>
    <div class="d-flex flex-column flex-sm-row align-items-center justify-content-center">
      <SocialIcons />
    </div>

    <p class="text-body-secondary fs-8 p-2 mt-4">
      2018 - 2024 © All rights reserved. <br />
      Do not replicate or use any parts of the site without permission.
    </p>
  </div>
</template>

<script setup>
import { pageLinks } from '@/components/data/pages.js'
import { RouterLink } from 'vue-router'
import SocialIcons from '@/components/SocialIcons.vue'

const rotateArrow = (event) => {
  event.currentTarget.querySelector('.bi-arrow-right-short').style.transform = 'rotate(0deg)';
}

const resetArrow = (event) => {
  event.currentTarget.querySelector('.bi-arrow-right-short').style.transform = 'rotate(-45deg)';
}
</script>

<style scoped>
nav {
  height: 80%;
}

p {
  margin: 0;
}

nav>a {
  color: #19191A !important;
  transition: 200ms cubic-bezier(.29, .57, .94, .61);
  text-decoration: underline;
}

nav>a.bi-arrow-right {
  translate: rotate(90deg);
}

nav>a:hover {
  background-position: 0 100%;
  background-repeat: repeat;
  transition: 200ms cubic-bezier(.29, .57, .94, .61);
  border-bottom: none;
  text-decoration: none;
  cursor: default;
}

a>span:hover {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg id='squiggle-link' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:ev='http://www.w3.org/2001/xml-events' viewBox='0 0 10 18'%3E%3Cstyle type='text/css'%3E.squiggle%7Banimation:shift .5s linear infinite;%7D@keyframes shift %7Bfrom %7Btransform:translateX(-10px);%7Dto %7Btransform:translateX(0);%7D%7D%3C/style%3E%3Cpath fill='none' stroke='black' stroke-width='1.2' class='squiggle' d='M0,17.5 c 2.5,0,2.5,-1.5,5,-1.5 s 2.5,1.5,5,1.5 c 2.5,0,2.5,-1.5,5,-1.5 s 2.5,1.5,5,1.5' /%3E%3C/svg%3E");
  padding-bottom: 2px;
  cursor: pointer;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>