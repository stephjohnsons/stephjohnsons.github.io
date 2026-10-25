<template>
  <div class="about">
    <h2 class="mb-0 d-none d-md-block">Past Musical Projects and Concerts</h2>
    <h3 class="mb-0 d-block d-md-none">Past Musical Projects and Concerts</h3>
    <p
      v-if="projects.loaded"
      class="text-muted small"
    >
      {{ projects.projects.length }} projects since {{ firstYear }} · most recent first
    </p>

    <div
      v-if="projects.loaded"
      class="d-flex flex-wrap align-items-center gap-1 row-gap-2 my-2"
    >
      <button
        class="btn btn-outline-success btn-sm d-flex align-items-center"
        :class="{ 'active': ongoingFilter }"
        :aria-pressed="ongoingFilter"
        @click="ongoingFilter = !ongoingFilter"
      >
        <Ongoing class="me-1" />
        Ongoing only
      </button>
      <button
        class="btn btn-sm btn-outline-dark ms-auto"
        v-if="!editMode"
        @click="showAuth = true"
      >
        Edit
      </button>
      <button
        v-if="editMode"
        class="btn btn-success btn-sm ms-auto"
        @click="createProject"
      >
        + Add Event
      </button>
    </div>

    <!-- Password modal overlay -->
    <div
      v-if="showAuth"
      class="auth-overlay"
    >
      <div class="auth-box">
        <h5>Enter password to edit</h5>
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="form-control mb-3"
          @keyup.enter="unlock"
        />
        <div class="d-flex gap-2">
          <button
            class="btn btn-primary btn-sm"
            @click="unlock"
          >Unlock</button>
          <button
            class="btn btn-secondary btn-sm"
            @click="showAuth = false"
          >Cancel</button>
        </div>
      </div>
    </div>
    <hr>

    <div v-if="!projects.loaded">Loading projects...</div>
    <template v-else>
      <div class="d-flex align-items-center mb-1">
        <p
          v-if="!groups.length"
          class="text-muted mb-0"
        >No projects match these filters.</p>
        <button
          v-if="groups.length > 1 && !filtersActive"
          class="btn btn-sm btn-link text-dark ms-auto px-0"
          @click="toggleAll"
        >
          {{ allOpen ? 'Collapse all' : 'Expand all' }}
        </button>
      </div>

      <!-- Ongoing first, then one foldable group per year (most recent open) -->
      <section
        v-for="group in groups"
        :key="group.key"
        class="t-acc year-group border-bottom"
        :data-open="String(isOpen(group.key))"
      >
        <button
          type="button"
          class="t-acc-head d-flex align-items-baseline w-100 text-start py-3"
          :aria-expanded="String(isOpen(group.key))"
          :aria-controls="`projects-${group.key}`"
          @click="toggleGroup(group.key)"
        >
          <h4 class="mb-0">{{ group.label }}</h4>
          <span class="text-muted small ms-2">
            {{ group.projects.length }} {{ group.projects.length === 1 ? 'project' : 'projects' }}
          </span>
          <span class="t-acc-chevron ms-auto align-self-center">
            <svg viewBox="0 0 16 16"><path d="M4 6.5L8 10.5L12 6.5" /></svg>
          </span>
        </button>

        <div
          :id="`projects-${group.key}`"
          class="t-acc-panel"
        >
          <div
            class="t-acc-panel-inner"
            :inert="!isOpen(group.key)"
          >
            <article
              v-for="project in group.projects"
              :key="project.id"
              class="project-row pb-3"
            >
              <div class="d-flex flex-wrap align-items-center gap-2">
                <h5 class="mb-0">{{ project.organisation }}</h5>
                <Link
                  v-if="project.link"
                  :link="project.link"
                  :text="project.linkText"
                />
                <button
                  v-if="editMode"
                  class="btn btn-sm btn-outline-secondary ms-auto"
                  @click="editProject(project)"
                >
                  Edit
                </button>
              </div>
              <p class="mb-1 text-muted small">
                {{ formatDate(project.year) }} · {{ project.location }}
                <span>{{ getFlagEmoji(project.cc) }}</span>
              </p>

              <p
                v-if="project.description"
                class="mb-1 description"
                :class="{ clamped: !expanded.has(project.id) }"
                :data-id="project.id"
              >{{ project.description }}</p>
              <button
                v-if="overflowing.has(project.id)"
                class="btn btn-link btn-sm p-0 read-more"
                @click="toggleExpanded(project.id)"
              >
                {{ expanded.has(project.id) ? 'Show less' : 'Read more' }}
              </button>

              <div
                v-if="project.type?.length"
                class="d-flex flex-row gap-1 ms-n1 mt-2"
              >
                <span
                  v-for="(type, index) in project.type"
                  :key="index"
                  :class="getClass(type)"
                  class="btn btn-sm fw-normal ms-n1 disable-pointer fs-smaller"
                >
                  {{ type }}
                </span>
              </div>
            </article>
          </div>
        </div>
      </section>
    </template>

    <div
      v-if="showModal"
      class="modal-overlay"
    >
      <div class="modal-box">

        <h5 class="mb-3">
          {{ isEditing ? 'Edit Project' : 'Add Project' }}
        </h5>

        <input
          v-model="form.title"
          class="form-control mb-2 bg-warning-subtle"
          placeholder="Title"
        />

        <textarea
          v-model="form.description"
          class="form-control mb-2 bg-warning-subtle"
          placeholder="Description"
        />

        <div class="row g-1 mb-2">
          <div class="col">
            <input
              v-model.number="form.start_year"
              type="number"
              class="form-control bg-warning-subtle"
              placeholder="Start Year"
            >
          </div>
          <div class="col">
            <input
              v-model.number="form.start_month"
              type="number"
              class="form-control"
              placeholder="Month"
            >
          </div>
          <div
            class="col flex-grow-0 m-auto"
            v-if="!form.is_ongoing"
          >
            -
          </div>
          <div
            class="col"
            v-if="!form.is_ongoing"
          >
            <input
              v-model.number="form.end_year"
              type="number"
              class="form-control"
              placeholder="End Year"
            >
          </div>
          <div
            class="col col-3"
            v-if="!form.is_ongoing"
          >
            <input
              v-model.number="form.end_month"
              type="number"
              class="form-control"
              placeholder="Month"
            >
          </div>
        </div>
        <div class="form-check mb-2">
          <input
            class="form-check-input"
            type="checkbox"
            v-model="form.is_ongoing"
            id="ongoingCheck"
          >
          <label
            class="form-check-label"
            for="ongoingCheck"
          >
            Ongoing project
          </label>
        </div>

        <div class="row g-1 mb-2">
          <div class="flex m-auto">
            <span class="fw-bold">Location</span>
          </div>
          <div class="col col-9">
            <input
              v-model="form.location"
              class="form-control bg-warning-subtle"
              placeholder="Location"
            >
          </div>
          <div class="col col-3">
            <input
              v-model="form.country_code"
              class="form-control bg-warning-subtle"
              placeholder="Country Code"
            >
          </div>
        </div>

        <div class="row g-1">
          <div class="flex m-auto">
            <span class="fw-bold">Link</span>
          </div>
          <div class="col">
            <input
              v-model="form.link"
              class="form-control mb-2"
              placeholder="Link"
            >
          </div>
          <div class="col">
            <input
              v-model="form.link_text"
              class="form-control mb-3"
              placeholder="Link Text"
            >
          </div>
        </div>

        <!-- TYPES -->
        <label class="fw-bold mb-1">Types</label>
        <div class="mb-3 types-box">
          <div
            v-for="type in typeStore.types"
            :key="type.id"
          >
            <input
              type="checkbox"
              :value="type.id"
              v-model="form.types"
            />
            {{ type.name }}
          </div>
        </div>

        <div class="d-flex justify-content-end gap-2">
          <button
            class="btn btn-secondary btn-sm"
            @click="closeModal"
          >Cancel</button>
          <button
            class="btn btn-primary btn-sm"
            @click="saveProject"
          >
            {{ isEditing ? 'Update' : 'Save' }}
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue';
import Link from '@/components/PromptButton.vue';
import { getFlagEmoji } from "@/components/data/flag.js";
import Ongoing from '@/assets/active.svg';
import { useProjectStore } from '@/stores/projects'
import { useProjectTypesStore } from '@/stores/projectTypes'
import backend from '@/composables/backend'
import { authFetch, login } from '@/composables/auth'

const editMode = ref(false)
const showAuth = ref(false)
const password = ref('')

const ongoingFilter = ref(false);

const projects = useProjectStore();
const typeStore = useProjectTypesStore()

const showModal = ref(false)
const isEditing = ref(false)
const editingId = ref(null)


const form = ref({
  title: '',
  description: '',
  start_year: null,
  start_month: null,
  end_year: null,
  end_month: null,
  location: '',
  country_code: '',
  link: '',
  link_text: '',
  types: []
})

onMounted(() => {
  if (!projects.loaded) projects.fetchProjects();
  if (!typeStore.loaded) typeStore.fetchTypes()
})

const firstYear = computed(() =>
  Math.min(...projects.projects.map(project => parseProjectDate(project.year).year))
);

const filteredProjects = computed(() => {
  let filtered = sortProjects(projects.projects);

  if (ongoingFilter.value) {
    filtered = filtered.filter(project => project.ongoing);
  }

  return filtered;
});

const filtersActive = computed(() => ongoingFilter.value);

// Ongoing projects first, then finished ones grouped by the year they ended
const groups = computed(() => {
  const ongoing = filteredProjects.value.filter(project => project.ongoing);
  const byYear = new Map();

  for (const project of filteredProjects.value) {
    if (project.ongoing) continue;
    const { year, endYear } = parseProjectDate(project.year);
    const groupYear = endYear || year;
    if (!byYear.has(groupYear)) byYear.set(groupYear, []);
    byYear.get(groupYear).push(project);
  }

  return [
    ...(ongoing.length ? [{ key: 'ongoing', label: 'Ongoing', projects: ongoing }] : []),
    ...[...byYear].map(([year, list]) => ({ key: String(year), label: String(year), projects: list }))
  ];
});

// Ongoing and the two most recent years start open; filtering opens everything
const openGroups = ref(null);

const defaultOpen = () => {
  const keys = groups.value.map(group => group.key);
  const yearKeys = keys.filter(key => key !== 'ongoing').slice(0, 2);
  return new Set(['ongoing', ...yearKeys]);
};

const isOpen = (key) => {
  if (filtersActive.value) return true;
  return (openGroups.value || defaultOpen()).has(key);
};

const toggleGroup = (key) => {
  const next = new Set(openGroups.value || defaultOpen());
  next.has(key) ? next.delete(key) : next.add(key);
  openGroups.value = next;
};

const allOpen = computed(() => groups.value.every(group => isOpen(group.key)));

const toggleAll = () => {
  openGroups.value = allOpen.value ? new Set() : new Set(groups.value.map(group => group.key));
};

// Long descriptions show two lines until "Read more". Whether a description
// is actually cut off depends on the screen width, so measure it.
const expanded = ref(new Set());
const overflowing = ref(new Set());

const measureDescriptions = () => {
  const next = new Set(expanded.value);
  document.querySelectorAll('.description.clamped[data-id]').forEach(el => {
    if (el.scrollHeight > el.clientHeight + 1) next.add(el.dataset.id);
  });
  overflowing.value = next;
};

watch(groups, () => nextTick(measureDescriptions), { immediate: true });
onMounted(() => window.addEventListener('resize', measureDescriptions));
onUnmounted(() => window.removeEventListener('resize', measureDescriptions));

const toggleExpanded = (id) => {
  const next = new Set(expanded.value);
  next.has(id) ? next.delete(id) : next.add(id);
  expanded.value = next;
};

const unlock = async () => {
  if (await login(password.value) === 'admin') {
    editMode.value = true
    showAuth.value = false
    password.value = ''
  } else {
    alert('Incorrect password. Please try again.')
  }
}

const createProject = () => {
  isEditing.value = false
  editingId.value = null

  form.value = {
    title: '',
    description: '',
    start_year: null,
    start_month: null,
    end_year: null,
    end_month: null,
    location: '',
    country_code: '',
    link: '',
    link_text: '',
    types: [],
    is_ongoing: false
  }

  showModal.value = true
}

const editProject = (project) => {
  isEditing.value = true
  editingId.value = project.id

  form.value = {
    title: project.organisation,
    description: project.description,
    start_year: parseInt(project.year),
    start_month: project.start_month ?? null,
    end_year: project.end_year ?? null,
    end_month: project.end_month ?? null,
    is_ongoing: project.ongoing,
    location: project.location,
    country_code: project.cc,
    link: project.link,
    link_text: project.linkText,
    types: project.typeIds || []
  }

  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

const saveProject = async () => {
  const url = editingId.value
    ? `${backend}/projects/${editingId.value}`
    : `${backend}/projects`

  const method = editingId.value ? 'PATCH' : 'POST'

  const res = await authFetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form.value)
  })

  if (res.ok) {
    showModal.value = false
    await projects.fetchProjects()
  } else {
    alert('Save failed')
  }
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

    if (yearA !== yearB) {
      return yearB - yearA;
    }

    return dateB.month - dateA.month;
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

.project-row + .project-row {
  border-top: 1px solid rgba(38, 37, 38, 0.08);
  padding-top: 1rem;
}

.description.clamped {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.read-more {
  color: #262526;
  text-decoration: underline;
}

.disable-pointer {
  cursor: default;
}

.fs-smaller {
  font-size: 0.7rem;
}

.auth-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.auth-box {
  background: white;
  padding: 1.4rem;
  border-radius: 8px;
  width: 40vw;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.modal-box {
  background: white;
  padding: 24px;
  border-radius: 0.5rem;
  width: 70vw;
  max-height: 80vh;
  overflow: auto;
}

.types-box {
  max-height: 20vh;
  overflow: auto;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background: rgba(255, 193, 7, 0.25);
}

.ms-negative-1 {
  margin-left: -1rem;
}
</style>
