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
      <div class="px-1 d-flex flex-column">
        <div class="border border-2 border-black px-3 pt-1 rounded-3 text-center w-fixed">
          <h6 class="mt-1 mb-0 fw-normal">{{ event.shortenMonth }}</h6>
          <h4 class="mb-2">{{ event.shortenDate }}</h4>
        </div>
      </div>
      <div class="ms-2 justify-content-start">
        <h6 class="mb-0">{{ event.time }}</h6>
        <div>
          <h3 class="mb-0">{{ event.title }}</h3>
          <h6 class="fw-normal mb-0">{{ event.venue.location }}</h6>
        </div>
        <p class="fst-italic mt-1 mb-2">{{ truncateDescription(event.description, 12) }}</p>
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
import { months } from '@/components/data/month.js';
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

const monthLookup = months.reduce((acc, obj) => {
  const key = Object.keys(obj)[0];
  acc[key] = obj[key];
  return acc;
}, {});

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

console.log(upcomingEvents);
</script>

<style scoped>
body {
  background-color: #BEFAFD;
}

.w-fixed {
  width: 65px;
}
</style>
