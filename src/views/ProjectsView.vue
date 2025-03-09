<template>
  <div class="about">
    <h2 class="mb-0">Past Musical Projects and Concerts</h2>
    <p class="text-muted small">Sorted by starting year in descending order.</p>

    <div class="d-flex align-items-center gap-1 my-2">
      <span class="d-flex align-items-center fw-medium text-nowrap me-2">
        <Filter class="me-1" />
        Filter:
      </span>
      <div class="d-flex flex-wrap rounded-2 gap-1">
        <select class="form-select form-select-sm" @change="selectCategory($event.target.value)">
          <option value="">All Categories</option>
          <option v-for="category in projectTypes" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
      </div>
      <span class="d-flex align-items-center fw-medium text-nowrap ms-3 me-2">
        <Ongoing class="me-1" />
        Ongoing:
      </span>
      <button class="btn btn-outline-success btn-sm" :class="{ 'active': ongoingFilter }"
        @click="ongoingFilter = !ongoingFilter">
        Ongoing
      </button>
      <div class="d-none d-sm-flex flex-nowrap ms-auto">
        <button class="btn btn-outline-danger btn-sm" @click="clearFilter()">
          Clear all filters
        </button>
      </div>
    </div>
    <hr>

    <div v-for="project in filteredProjects" :key="project.description" class="mb-3">
      <p class="mb-0">{{ formatDate(project.year) }}</p>

      <div class="d-flex flex-row gap-1 align-items-center">
        <h5 class="mb-0">{{ project.organisation }}</h5>
        <Link class="ms-1" v-if="project.link" :link="project.link" :text="project.linkText" />
        <span v-if="project.ongoing" class="badge text-bg-success fw-light ms-1">
          Ongoing
        </span>
      </div>
      <p class="mb-1 text-muted">
        {{ project.location }}
        <span>{{ getFlagEmoji(project.cc) }}</span>
      </p>

      <p class="mb-2">{{ project.description }}</p>
      <div class="d-flex flex-row gap-1 ms-n1">
        <btn v-for="(type, index) in project.type" :key="index" :class="getClass(type)"
          class="btn btn-sm fw-normal ms-n1 disable-pointer fs-smaller">
          {{ type }}
        </btn>
      </div>

      <hr>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { projects, projectTypes } from "@/components/data/projects.js";
import Link from '@/components/PromptButton.vue';
import { getFlagEmoji } from "@/components/data/flag.js";
import Filter from '@/assets/filter.svg';
import Ongoing from '@/assets/active.svg';

const selectedCategory = ref('');
const ongoingFilter = ref(false);

const selectCategory = (category) => {
  if (selectedCategory.value === category) {
    selectedCategory.value = ''; // Unselect the category
  } else {
    selectedCategory.value = category; // Select the new category
  }
}

const filteredProjects = computed(() => {
  let filtered = sortProjects(projects);
  if (!selectedCategory.value) {
    filtered = projects;
  } else {
    filtered = projects.filter(project => project.type.includes(selectedCategory.value));
  }
  if (ongoingFilter.value) {
    filtered = filtered.filter(project => project.ongoing);
  }
  return filtered;
});

const clearFilter = () => {
  selectedCategory.value = '';
  ongoingFilter.value = false;
}

const getClass = (type) => {
  const classicalTypes = ['Chamber Music', 'Orchestra', 'Concerts', 'Recital'];
  const contemporaryTypes = ['Band', 'Musicals', 'Recordings'];
  const teachingTypes = ['Community', 'Teaching', 'Masterclass'];
  const curationTypes = ['Curation', 'Management', 'Projects', 'Tour'];
  const genres = ['Orchestra'];

  if (classicalTypes.includes(type)) {
    return 'btn-outline-success';
  } else if (contemporaryTypes.includes(type)) {
    return 'btn-outline-primary';
  } else if (curationTypes.includes(type)) {
    return 'btn-outline-danger';
  } else if (teachingTypes.includes(type)) {
    return 'btn-outline-info';
  } else if (genres.includes(type)) {
    return 'btn-outline-secondary';
  } else {
    return 'btn-outline-secondary';
  }
};

const parseProjectDate = (date) => {
  if (date.includes('-')) {
    const parts = date.split('-');

    if (parts[1] === 'present') {
      return { year: parseInt(parts[0]), month: 13, ongoing: true };
    }

    if (parts[1].length === 2) {
      return { year: parseInt(parts[0]), month: parseInt(parts[1]), ongoing: false };
    }

    return { year: parseInt(parts[0]), month: 0, endYear: parseInt(parts[1]), ongoing: false };
  }

  return { year: parseInt(date), month: 0, ongoing: false };
};


function sortProjects(array) {
  return array.slice().sort((a, b) => {
    const dateA = parseProjectDate(a.year);
    const dateB = parseProjectDate(b.year);

    const yearA = dateA.endYear || dateA.year;
    const yearB = dateB.endYear || dateB.year;

    return yearB - yearA || dateB.month - dateA.month;
  });
}


const formatDate = (year) => {
  const { year: startYear, month, endYear, ongoing } = parseProjectDate(year);

  if (ongoing) {
    return `${startYear}-present`;
  }

  if (endYear) {
    return `${startYear}-${endYear}`;
  }

  if (month === 0) {
    return `${startYear}`;
  }

  const monthNames = [
    '', 'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return `${startYear} ${monthNames[month]}`;
};
</script>

<style scoped>
body {
  background-color: #BEFAFD;
  overflow: scroll;
  scrollbar-color: var(--bs-warning);
}

.ms-n1 {
  margin-left: -0.1rem;
}

.disable-pointer {
  cursor: default;
}

.fs-smaller {
  font-size: 0.7rem;
}
</style>
