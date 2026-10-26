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

    <div class="row g-4 cards-row">
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
          @mouseenter="shuffleFan(run)"
          @focusin="onFocusIn($event, run)"
        >
          <div
            v-for="(night, i) in run.nights.slice(1, 4)"
            :key="night.id"
            class="stack-layer gcard rounded-4"
            :class="[`layer-${i + 1}`, fanSide(run, i)]"
            :style="fanStyle(run, i)"
            aria-hidden="true"
          >
            <span class="layer-label">{{ night.shortLabel }}</span>
          </div>

          <div class="card-front gcard rounded-4 p-3 h-100 d-flex flex-column">
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
import { ref, computed, watch, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { fetchEvents, groupRuns } from '@/composables/bandsintown'

const events = ref([])

onMounted(async () => {
  events.value = (await fetchEvents()) || []
})

const runs = computed(() => groupRuns(events.value))

// Each hover fans the extra nights out differently: every card goes to a
// random side, 0.1–0.4cm out, with a matching small random tilt.
const fans = ref({})

const random = (min, max) => min + Math.random() * (max - min)

const shuffleFan = (run) => {
  if (run.nights.length < 2) return

  fans.value = {
    ...fans.value,
    [run.key]: run.nights.slice(1, 4).map(() => {
      const side = Math.random() < 0.5 ? -1 : 1
      return {
        side,
        cm: Math.round(random(0.1, 0.4) * 100) / 100,
        deg: Math.round(random(2, 7) * 10) / 10
      }
    })
  }
}

// Keyboard focus moving between buttons inside the same card shouldn't re-shuffle
const onFocusIn = (event, run) => {
  if (!event.currentTarget.contains(event.relatedTarget)) shuffleFan(run)
}

watch(runs, (list) => list.forEach(shuffleFan))

const fanStyle = (run, i) => {
  const fan = fans.value[run.key]?.[i]
  if (!fan) return {}
  return {
    '--fan-x': `${fan.side * fan.cm}cm`,
    '--fan-rot': `${fan.side * fan.deg}deg`
  }
}

// The date label sits on whichever side the card fans to, so it peeks out
const fanSide = (run, i) => {
  const side = fans.value[run.key]?.[i]?.side ?? (i % 2 === 0 ? -1 : 1)
  return side < 0 ? 'fan-left' : 'fan-right'
}
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

/* Gradient outline: a gradient painted on the border box, card colour on the padding box */
.gcard {
  border: 1px solid transparent;
  background:
    linear-gradient(rgb(248, 248, 248), rgb(248, 248, 248)) padding-box,
    linear-gradient(135deg, rgba(251, 188, 0, 0.6), #dedcdc 45%, #c4c2c2) border-box;
}

.card-front {
  position: relative;
  z-index: 1;
  box-shadow:
    0 1px 2px rgba(38, 37, 38, 0.06),
    0 6px 16px rgba(38, 37, 38, 0.08);
  transition:
    transform var(--duration-fast) var(--ease-smooth-out),
    box-shadow var(--duration-fast) var(--ease-smooth-out);
}

.stack {
  transition:
    filter var(--duration-fast) var(--ease-smooth-out),
    opacity var(--duration-fast) var(--ease-smooth-out);
}

/* Resting: the extra nights sit just behind, like a small pile of cards */
.stack-layer {
  position: absolute;
  inset: 0;
  box-shadow: 0 2px 6px rgba(38, 37, 38, 0.06);
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

/* Hover / keyboard focus: fan the extra nights out up to 0.4cm, randomly */
@media (hover: hover) {
  /* Any hovered card lifts, and the other cards fade to grey */
  .stack:hover,
  .stack:focus-within {
    z-index: 2;
  }

  .stack:hover .card-front,
  .stack:focus-within .card-front {
    transform: translateY(-4px);
    box-shadow:
      0 2px 4px rgba(38, 37, 38, 0.08),
      0 12px 28px rgba(38, 37, 38, 0.14);
  }

  .cards-row:has(.stack:hover, .stack:focus-within) .stack:not(:hover):not(:focus-within) {
    filter: grayscale(1);
    opacity: 0.5;
  }

  /* Distance, side and tilt are randomised per hover in the script */
  .stack.is-stacked:hover .stack-layer,
  .stack.is-stacked:focus-within .stack-layer {
    transform: translateX(var(--fan-x, 0)) rotate(var(--fan-rot, 0deg));
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
  .stack,
  .card-front,
  .stack-layer,
  .layer-label {
    transition: none !important;
  }
}
</style>
