<template>
  <div class="d-flex flex-column">
    <h2 class="d-none d-md-block">Teaching</h2>
    <h3 class="d-block d-md-none">Teaching</h3>

    <!-- Teaching Bio -->
    <div
      v-for="(paragraph, index) in teachingBio"
      :key="index"
    >
      <p :class="{ 'fs-7': index === teachingBio.length - 1 }">
        {{ paragraph }}
      </p>
    </div>

    <div class="mb-4">
      <p>
        <a href="https://www.researchgate.net/profile/Stephen-Tseu">
          ResearchGate Profile
        </a>
      </p>
    </div>


    <h3 class="mb-2">Teaching Appointments</h3>
    <p>Click on each card to see the subjects taught.</p>
    <!-- Loading -->
    <div v-if="loading">
      Loading...
    </div>

    <!-- Swipe Cards -->
    <div
      v-else
      class="teaching-cards d-flex overflow-auto"
    >
      <div
        v-for="appointment in appointments"
        :key="appointment.id"
        class="teaching-card border rounded-4 p-3 me-3 flex-shrink-0"
      >
        <small class="text-secondary d-block mb-1">
          {{ formatYears(appointment) }}
        </small>

        <h5
          class="fw-bold mb-2 custom-overflow-hidden"
          :class="{
            expanded: expandedCard === appointment.id
          }"
          @click="toggleCardTitle(appointment.id)"
        >
          {{ appointment.institutions?.name }}
        </h5>

        <p>
          {{ appointment.role }}
        </p>
        <Transition name="fade">
          <div v-if="expandedCard === appointment.id">
            <p
              v-for="subject in appointment.subjects"
              :key="subject"
              class="mb-0 text-muted"
            >
              • {{ subject }}
            </p>
          </div>
        </Transition>
      </div>
    </div>

    <!-- Stuffs done -->
    <h3 class="mt-4 mb-2">Teaching Diary</h3>
    <div
      v-for="item in teachingDiary"
      :key="item.project"
      class="d-flex flex-column border-bottom py-2 my-2"
    >
      <div class="d-inline-flex flex-row align-items-center">
        <h4 class="mb-0">
          {{ item.project }}
        </h4>

        <Link
          :link="item.link"
          text="Video"
          class="ms-auto ms-md-2 py-1 px-2 py-md-0"
        />
      </div>

      <p class="my-2">
        {{ item.description }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

import Link from '@/components/PromptButton.vue'

import backend from '@/composables/backend'

import { teachingBio } from '@/components/data/biographies.js'
import { teachingDiary } from '@/components/data/teachingDiary.js'

const appointments = ref([])
const loading = ref(true)

const expandedCard = ref(null)


const toggleCardTitle = (id) => {
  expandedCard.value =
    expandedCard.value === id
      ? null
      : id
}

const fetchAppointments = async () => {
  try {
    const response = await fetch(`${backend}/appointments`)

    if (!response.ok) {
      throw new Error('Failed to fetch appointments')
    }

    appointments.value = await response.json()
  }

  catch (err) {
    console.error(err)
  }

  finally {
    loading.value = false
  }
}

const formatYears = (appointment) => {
  if (appointment.is_current) {
    return `${appointment.start_year} - Present`
  }

  if (appointment.end_year) {
    return `${appointment.start_year} - ${appointment.end_year}`
  }

  return appointment.start_year
}

onMounted(() => {
  fetchAppointments()
})
</script>

<style scoped>
.teaching-cards {
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  align-items: flex-start;
}

.teaching-cards::-webkit-scrollbar {
  display: none;
}

.teaching-card {
  width: 16rem;
  min-height: 140px;

  background: rgb(248, 248, 248);

  scroll-snap-align: start;

  transition:
    transform 160ms ease,
    box-shadow 160ms ease,
    height 160ms ease;
}

.teaching-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.08);
}

.custom-overflow-hidden {
  cursor: pointer;
  overflow: hidden;
  transition: all 160ms ease;
}

.custom-overflow-hidden:not(.expanded) {
  display: -webkit-box;

  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.custom-overflow-hidden:not(.expanded):hover {
  opacity: 0.8;
}

@media (max-width: 768px) {
  .teaching-card {
    width: 85%;
  }
}
</style>