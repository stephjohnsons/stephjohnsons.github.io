<template>
  <div class="d-flex flex-column">
    <div class="w-100">
      <h2 class="mb-1">Upcoming Dates</h2>
      <p class="text-muted small fst-italic">
        Powered by <a href="https://www.bandsintown.com/">Bandsintown</a>
      </p>
    </div>
    <div v-if="loading" class="d-flex justify-content-start">
      <Loading />
    </div>
    <div v-else v-for="event in upcomingEvents" class="d-flex flex-row align-items-start py-4 border-bottom"
      :key="event.id">
      <div class="ms-0 justify-content-start">
        <h5 class="mb-1" id="item">
          <span class="fw-normal">
            {{ event.shortenDate }} {{ event.shortenMonth }} •
          </span>
          {{ event.time }}
        </h5>
        <div>
          <h4 class="mb-0 d-sm-none">{{ event.title }}</h4>
          <h3 class="mb-0 d-none d-sm-block">{{ event.title }}</h3>
          <h6 class="fw-normal mb-0">{{ event.venue.location }}</h6>
        </div>
        <p class="fst-italic mt-1 mb-2 text-muted">{{ truncateDescription(event.description, 12) }}</p>
        <div class="d-flex gap-2">
          <EventButton v-if="event.offers.length > 0" type="ticket" :link="event.offers[0].url" />
          <EventButton v-else type="ticket-disabled" />
          <EventButton v-if="event.url" button-type="secondary" type="info" :link="event.url" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { monthLookup } from '@/components/data/datetime.js';
import EventButton from '@/components/EventCTAButton.vue';
import Loading from '@/components/LoadingSpinner.vue';

const loading = ref(true);
const appId = import.meta.env.VITE_BANDSINTOWN_APP_ID;
const apiCallUrl = `https://rest.bandsintown.com/artists/Stephen%20Johnson-Tseu/events?app_id=${appId}`;
const rawEvents = ref([]);

onMounted(async () => {
  if (appId) {
    try {
      const response = await fetch(apiCallUrl);
      if (response.ok) {
        const data = await response.json();
        rawEvents.value = data;
        loading.value = false;
      } else {
        console.error('Failed to fetch events:', response.status);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
});

const upcomingEvents = computed(() => {
  return rawEvents.value.map(event => {
    const [date, timePart] = event.datetime.split('T');
    const shortenMonth = monthLookup[date.slice(5, 7)];
    const shortenDate = date.slice(8, 10);
    const time = timePart.slice(0, 5);

    return {
      ...event,
      shortenMonth,
      shortenDate,
      time,
    };
  });
});

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
</style>
