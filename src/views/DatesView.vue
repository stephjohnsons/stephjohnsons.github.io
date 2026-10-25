<template>
  <div class="d-flex flex-column">
    <div class="w-100">
      <h3 class="mb-1 d-none d-md-block">Upcoming Dates</h3>
      <h4 class="mb-1 d-block d-md-none">Upcoming Dates</h4>
      <p class="text-muted small fst-italic">
        Powered by <a href="https://www.bandsintown.com/">Bandsintown</a>
      </p>
    </div>
    <div v-if="!runs.length && !loading">
      <h5 class="text-muted">There are no upcoming concerts!</h5>
      <p><a href="/" class="text-muted">Back to home</a>
      </p>
    </div>
    <div v-if="loading" class="d-flex justify-content-start">
      <Loading />
    </div>
    <!-- One entry per run: repeated nights of the same show are grouped -->
    <div v-else v-for="run in runs" class="d-flex flex-row align-items-start pt-3 pb-4 border-bottom"
      :key="run.key">
      <div class="ms-0 justify-content-start">
        <h5 class="mb-1 fs-6" id="item">
          <span class="fw-normal">{{ run.dateLabel }}</span>
          <template v-if="run.nights.length === 1"> • {{ run.nights[0].time }}</template>
          <template v-else> • {{ run.nights.length }} shows</template>
        </h5>
        <div>
          <h4 class="mb-0 d-sm-none">{{ run.displayTitle }}</h4>
          <h3 class="mb-0 d-none d-sm-block fs-4">{{ run.displayTitle }}</h3>
          <h6 class="fw-light mb-0 fs-6">
            <template v-if="run.showVenue">{{ run.venue }} · </template>{{ run.location }}
          </h6>
        </div>
        <p v-if="run.description" class="fst-italic mt-1 mb-2 text-muted fs-7">
          {{ truncateDescription(run.description, 30) }}
        </p>
        <div v-if="run.nights.length > 1" class="d-flex flex-wrap gap-2 mb-2 mt-1">
          <a v-for="night in run.nights" :key="night.id" :href="night.ticketUrl || night.url" target="_blank"
            class="night-pill border rounded-pill px-3 py-1 small">
            {{ night.label }} <span class="font-monospace text-secondary">{{ night.time }}</span>
          </a>
        </div>
        <div class="d-flex gap-2">
          <EventButton v-if="run.ticketUrl" type="ticket" :link="run.ticketUrl" />
          <EventButton v-else type="ticket-disabled" />
          <EventButton v-if="run.url" button-type="secondary" type="info" :link="run.url" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import EventButton from '@/components/EventCTAButton.vue';
import Loading from '@/components/LoadingSpinner.vue';
import { fetchEvents, groupRuns } from '@/composables/bandsintown';

const loading = ref(true);
const rawEvents = ref([]);

onMounted(async () => {
  const events = await fetchEvents();
  if (events) {
    rawEvents.value = events;
    loading.value = false;
  }
});

const runs = computed(() => groupRuns(rawEvents.value));

const truncateDescription = (description, maxWords) => {
  const words = description.split(' ');
  if (words.length > maxWords) {
    return words.slice(0, maxWords).join(' ') + '...';
  }
  return description;
}
</script>

<style scoped>
body {
  background-color: #BEFAFD;
}

.w-fixed {
  min-width: 60px;
  max-width: 60px;
}

#item {
  position: relative;
  display: inline-block;
}

#item::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 5%;
  right: -5%;
  height: 40%;
  background-color: rgba(251, 188, 0, 0.7);
  z-index: -1;
  transition: 100ms cubic-bezier(.29, .57, .94, .61);
}

.night-pill {
  color: #262526;
  text-decoration: none;
  background: rgb(248, 248, 248);
  transition: background-color var(--duration-quick, 150ms) var(--ease-out, ease-out);
}

.night-pill:hover {
  background: #fff;
}
</style>
