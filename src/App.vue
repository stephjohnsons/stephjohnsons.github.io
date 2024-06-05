<template>
  <header class="d-flex flex-wrap m-3 px-3 pt-0 sticky-top border-bottom z-3">
    <a href="/" id="no-deco" class="d-flex align-items-center">
      <h1 class="fw-light py-2 mb-1" id="no-deco">
        Stephen
        <span class="fw-medium">Johnson-Tseu</span>
      </h1>
    </a>

    <a class="hamburger ms-auto my-auto" :class="{ 'hamburger--active': showMenu }"
      @click.prevent="showMenu = !showMenu" @onclick="rememberScrollPosition">
      <span class="hamburger_line"></span>
      <span class="hamburger_line"></span>
      <span class="hamburger_line"></span>
    </a>
  </header>

  <!-- Fixed router view as per suggested in console -->
  <RouterView v-slot="{ Component }">
    <Transition name="slide-fade" appear>
      <Component :is="Component" v-if="!showMenu" class="mx-4 mb-2 px-2" id="router" />
    </Transition>
  </RouterView>
  <Transition name="slide-fade" appear>
    <MenuView v-if="showMenu" class="mx-4 mb-2 px-2" id="menu" />
  </Transition>
</template>

<script setup>
import { ref, watch, } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import MenuView from '@/views/MenuView.vue'

const showMenu = ref(false);
const route = useRoute();

const title = ref(document.title);
window.addEventListener("blur", () => {
  document.title = "Come back 😭";
});

window.addEventListener("focus", () => {
  document.title = title.value;
});

const removeMenu = () => {
  showMenu.value = false;
}

watch(() => route.path, () => {
  removeMenu();
});
</script>

<style>
header {
  position: sticky;
  color: #19191A;
  background-color: rgb(255, 255, 255, 0.4);
  backdrop-filter: blur(4px);
}

#no-deco {
  color: #19191A;
  text-decoration: none;
}

li>a,
p>a {
  color: #19191A !important;
  transition: 200ms cubic-bezier(.29, .57, .94, .61);
  text-decoration: underline;
}

li>a:hover,
p>a:hover {
  background-position: 0 100%;
  background-repeat: repeat;
  transition: 200ms cubic-bezier(.29, .57, .94, .61);
}

li>a:hover {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg id='squiggle-link' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:ev='http://www.w3.org/2001/xml-events' viewBox='0 0 10 18'%3E%3Cstyle type='text/css'%3E.squiggle%7Banimation:shift .5s linear infinite;%7D@keyframes shift %7Bfrom %7Btransform:translateX(-10px);%7Dto %7Btransform:translateX(0);%7D%7D%3C/style%3E%3Cpath fill='none' stroke='black' stroke-width='0.8' class='squiggle' d='M0,17.5 c 2.5,0,2.5,-1.5,5,-1.5 s 2.5,1.5,5,1.5 c 2.5,0,2.5,-1.5,5,-1.5 s 2.5,1.5,5,1.5' /%3E%3C/svg%3E");
}

p>a:hover {
  border-bottom: none;
  text-decoration: none;
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg id='squiggle-link' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:ev='http://www.w3.org/2001/xml-events' viewBox='0 0 10 18'%3E%3Cstyle type='text/css'%3E.squiggle%7Banimation:shift .5s linear infinite;%7D@keyframes shift %7Bfrom %7Btransform:translateX(-10px);%7Dto %7Btransform:translateX(0);%7D%7D%3C/style%3E%3Cpath fill='none' stroke='black' stroke-width='1.4' class='squiggle' d='M0,17.5 c 2.5,0,2.5,-1.5,5,-1.5 s 2.5,1.5,5,1.5 c 2.5,0,2.5,-1.5,5,-1.5 s 2.5,1.5,5,1.5' /%3E%3C/svg%3E");
  padding-bottom: 3px;
}

.fs-7 {
  font-size: 0.8rem;
  font-style: italic;
}

.fs-8 {
  font-size: 0.6rem;
}

.hamburger {
  display: inline-flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  width: 30px;
  height: 20px;
  cursor: pointer;
  transition: all 0.4s ease-in-out;
}

.hamburger--active {
  transition: all 0.4s ease-in-out;

  span:nth-child(1) {
    transform: rotate(45deg) translate(6px, 7px);
  }

  span:nth-child(2) {
    visibility: hidden;
    transition: opacity 0.7s ease-in-out;
  }

  span:nth-child(3) {
    transform: rotate(-45deg) translate(6px, -7px);
  }
}

.hamburger_line {
  display: block;
  width: 100%;
  height: 2px;
  background: #333;
  transition: all 0.4s ease-in-out;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.2s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

#router .slide-fade-leave-from {
  transition: all 0.1s ease-out;
  transform: translateX(-20px);
}

#menu .slide-fade-enter-from {
  transition-delay: 0.4s;
}

#router .slide-fade-enter-from {
  transition: none;
  transition-delay: 0.2s;
}
</style>