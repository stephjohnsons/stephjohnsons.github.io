<template>
  <div class="d-flex flex-column">
    <h2 class="mb-1">Blog</h2>
    <p class="text-muted small fst-italic">
      Powered by <a href="https://wordpress.com/">WordPress</a>
    </p>
    <div v-if="loading" class="d-flex justify-content-start">
      <Loading />
    </div>
    <div v-else v-for="post in posts.posts" :key="post.id">
      <h4 class="mb-0 fw-normal" id="post-title">{{ post.title }}</h4>
      <div class="d-flex mb-0 text-muted small ">
        <p class="me-1">
          Published on
          {{ shortenDate(post.date) }}.
          {{ shortenMonth(post.date) }},
          {{ readableTime(post.date) }}
        </p>
      </div>

      <p v-html="post.content"></p>
      <hr />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { shortenMonth, shortenDate, readableTime } from '@/components/data/datetime.js';
import Loading from '@/components/LoadingSpinner.vue';

const loading = ref(true);
const wordpressAPI = "https://public-api.wordpress.com/rest/v1.1/sites/md215.wordpress.com/posts/";
const posts = ref([]);

onMounted(async () => {
  try {
    const response = await fetch(wordpressAPI);
    if (response.ok) {
      const data = await response.json();
      posts.value = data;
      loading.value = false;
    } else {
      console.error('Failed to fetch blog posts:', response.status);
    }
  } catch (error) {
    console.error('Error fetching blog posts:', error);
  }
});
</script>

<style scoped>
#post-title {
  position: relative;
  display: inline-block;
}

#post-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 10%;
  right: -5%;
  height: 40%;
  background-color: rgb(252, 192, 14);
  z-index: -1;
  transition: 100ms cubic-bezier(.29, .57, .94, .61);
}

#post-title:hover::after {
  position: absolute;
  left: -5%;
  background-color: rgb(252, 192, 14);
}
</style>