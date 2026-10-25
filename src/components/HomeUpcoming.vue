<template>
  <section
    v-if="runs.length"
    class="home-upcoming mb-5"
  >
    <div class="d-flex align-items-baseline mb-3">
      <h3 class="mb-0">Upcoming</h3>
      <RouterLink
        to="/dates"
        class="ms-auto see-all text-nowrap"
      >All dates →</RouterLink>
    </div>

    <div class="row g-4">
      <div
        v-for="run in runs.slice(0, 3)"
        :key="run.key"
        class="col-12 col-md-4"
      >
        <!-- Repeated nights render as a stack of cards that fans out on hover -->
        <div
          class="stack h-100"
          :class="{ 'is-stacked': run.nights.length > 1 }"
          tabindex="-1"
        >
          <div
            v-for="(night, i) in run.nights.slice(1, 4)"
            :key="night.id"
            class="stack-layer border rounded-4"
            :class="[`layer-${i + 1}`, i % 2 === 0 ? 'fan-left' : 'fan-right']"
            aria-hidden="true"
          >
            <span class="layer-label">{{ night.shortLabel }}</span>
          </div>

          <div class="card-front border rounded-4 p-3 h-100 d-flex flex-column">
            <div class="date-label mb-2">
              <span>{{ run.dateLabel }}</span>
              <span
                v-if="run.nights.length > 1"
                class="shows text-secondary small ms-2"
              >{{ run.nights.length }} shows</span>
            </div>
            <h5 class="fw-semibold mb-1">{{ run.displayTitle }}</h5>
            <p class="text-secondary mb-3 small">
              <template v-if="run.showVenue">{{ run.venue }} · </template>{{ run.city }}
            </p>
            <div class="mt-auto d-flex gap-2">
              <a
                v-if="run.ticketUrl"
                :href="run.ticketUrl"
                target="_blank"
                class="btn btn-sm btn-warning"
              >Tickets</a>
              <span
                v-else
                class="btn btn-sm btn-secondary disabled"
              >Coming soon</span>
              <a
                v-if="run.url"
                :href="run.url"
                target="_blank"
                class="btn btn-sm btn-outline-dark"
              >Info</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { fetchEvents, groupRuns } from '@/composables/bandsintown'

const events = ref([])

onMounted(async () => {
  events.value = (await fetchEvents()) || []
})

const runs = computed(() => groupRuns(events.value))
</script>

<style scoped>
.home-upcoming {
  padding-top: 0.5rem;
}

.see-all {
  color: #262526;
}

.stack {
  position: relative;
  isolation: isolate;
  outline: none;
}

.card-front,
.stack-layer {
  background: rgb(248, 248, 248);
}

.card-front {
  position: relative;
  z-index: 1;
  transition: transform var(--duration-fast) var(--ease-smooth-out);
}

/* Resting: the extra nights sit just behind, like a small pile of cards */
.stack-layer {
  position: absolute;
  inset: 0;
  transform-origin: 50% 100%;
  transition: transform var(--duration-fast) var(--ease-smooth-out);
}

.layer-1 {
  z-index: -1;
  transform: translate(6px, 6px);
}

.layer-2 {
  z-index: -2;
  transform: translate(12px, 12px);
}

.layer-3 {
  z-index: -3;
  transform: translate(18px, 18px);
}

.layer-label {
  position: absolute;
  top: 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  opacity: 0;
  transition: opacity var(--duration-quick) var(--ease-out);
}

.fan-left .layer-label {
  left: 0.75rem;
}

.fan-right .layer-label {
  right: 0.75rem;
}

/* Hover / keyboard focus: fan the extra nights out ~1cm+ (40px) to each side */
@media (hover: hover) {
  .stack.is-stacked:hover,
  .stack.is-stacked:focus-within {
    z-index: 2;
  }

  .stack.is-stacked:hover .card-front,
  .stack.is-stacked:focus-within .card-front {
    transform: translateY(-4px);
  }

  .stack.is-stacked:hover .layer-1,
  .stack.is-stacked:focus-within .layer-1 {
    transform: translateX(-40px) rotate(-5deg);
  }

  .stack.is-stacked:hover .layer-2,
  .stack.is-stacked:focus-within .layer-2 {
    transform: translateX(40px) rotate(5deg);
  }

  .stack.is-stacked:hover .layer-3,
  .stack.is-stacked:focus-within .layer-3 {
    transform: translateX(-72px) rotate(-9deg);
  }

  .stack.is-stacked:hover .layer-label,
  .stack.is-stacked:focus-within .layer-label {
    opacity: 1;
  }
}

.date-label > span:first-child {
  position: relative;
  font-weight: 600;
  z-index: 0;
}

.date-label > span:first-child::after {
  content: '';
  position: absolute;
  left: -2px;
  right: -4px;
  bottom: 0;
  height: 40%;
  background: rgba(251, 188, 0, 0.7);
  z-index: -1;
}

@media (prefers-reduced-motion: reduce) {
  .card-front,
  .stack-layer,
  .layer-label {
    transition: none !important;
  }
}
</style>
