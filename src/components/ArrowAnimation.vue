<template>
  <div class="arrow-container">
    <div class="arrow arrow-1">→</div>
    <div class="arrow arrow-2">→</div>
  </div>
</template>

<style scoped>
.arrow-container {
  position: relative;
  width: 300px;
  height: 100px;
  overflow: hidden;
}

.arrow {
  position: absolute;
  top: 0;
  font-size: 4rem;
  animation: slide 5s ease-in-out infinite;
}

.arrow-1 {
  animation-delay: 0s;
}

.arrow-2 {
  animation-delay: 2.5s;
}

@keyframes slide {
  0% {
    left: 0;
    opacity: 1;
  }

  20% {
    left: 80px;
    opacity: 0;
  }

  50% {
    left: -50px;
    opacity: 0;
  }

  70% {
    left: 0;
    opacity: 1;
  }

  100% {
    left: 0;
    opacity: 1;
  }
}
</style>