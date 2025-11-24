<template>
  <div class="file-browser">
    <h2>Folder Files</h2>
    <ul>
      <li v-for="file in files" :key="file.id">
        <a v-if="file.mimeType === 'application/pdf' || file.mimeType.includes('image')" :href="file.webContentLink"
          target="_blank" rel="noopener noreferrer">
          {{ file.name }}
        </a>
        <span v-else>{{ file.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const files = ref([]);
const backend = import.meta.env.VITE_TEMPLATE_BACKEND_API_URL;

import { fetchDriveFiles } from '../components/data/drive.js';

async function showFiles() {
  const files = await fetchDriveFiles();
  files.forEach(file => {
    console.log(file.name, file.webViewLink, file.webContentLink);
  });
}

showFiles();

onMounted(async () => {
  try {
    const res = await fetch(`${backend}/drive/files`);
    const data = await res.json();
    files.value = data;
  } catch (err) {
    console.error('Failed to fetch files', err);
  }
});
</script>

<style scoped>
.file-browser {
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid #ccc;
  padding: 1rem;
}
</style>
