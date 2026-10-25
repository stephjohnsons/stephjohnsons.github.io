<template>
  <main class="atlas-page">
    <section class="atlas-intro">
      <div class="eyebrow">A MUSICAL ATLAS · 2018—PRESENT</div>
      <h2>Places That <em>Music</em><br class="desktop-break"> Took Me</h2>
      <p class="intro-copy">A living constellation of performances, collaborations and the places that connect them.</p>
      <div class="atlas-stats">
        <div><strong>{{ mappedPlaces.length }}</strong><span>PLACES</span></div>
        <div><strong>{{ visibleProjects.length }}</strong><span>PROJECTS</span></div>
        <div><strong>{{ totalYears }}</strong><span>YEARS OF MUSIC</span></div>
      </div>
    </section>

    <section class="atlas-controls" aria-label="Archive filters">
      <label class="search-box">
        <span>⌕</span>
        <input v-model="search" type="search" placeholder="Find a project, place or collaborator">
      </label>
      <select v-model="selectedType" aria-label="Filter by project type">
        <option value="">All disciplines</option>
        <option v-for="type in allTypes" :key="type" :value="type">{{ type }}</option>
      </select>
      <select v-model="selectedYear" aria-label="Filter by year">
        <option value="">All years</option>
        <option v-for="year in allYears" :key="year" :value="String(year)">{{ year }}</option>
      </select>
      <button class="reset-button" @click="resetFilters">Reset</button>
    </section>

    <section class="atlas-workspace">
      <div class="map-panel">
        <div class="map-heading">
          <div><span class="eyebrow">01 / GEOGRAPHY</span><h3>The world, in sound.</h3></div>
          <span class="map-hint">SELECT A STAR TO EXPLORE</span>
        </div>
        <div class="map-canvas">
          <svg class="world-map" viewBox="0 0 1000 500" role="img" aria-label="Stylised world map with interactive performance locations">
            <defs>
              <pattern id="atlas-grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(211,198,158,.07)" stroke-width="1"/>
              </pattern>
              <radialGradient id="star-glow">
                <stop offset="0" stop-color="#f0dca4" stop-opacity=".38"/>
                <stop offset="1" stop-color="#f0dca4" stop-opacity="0"/>
              </radialGradient>
            </defs>
            <rect width="1000" height="500" fill="url(#atlas-grid)"/>
            <g class="latitude-lines">
              <path v-for="y in [100,150,200,250,300,350,400]" :key="y" :d="`M 0 ${y} Q 500 ${y + 22} 1000 ${y}`"/>
              <path d="M500 0 Q430 250 500 500"/><path d="M500 0 Q570 250 500 500"/>
            </g>
            <g class="landmass">
              <path d="M72 95 L106 64 163 50 206 66 226 91 270 98 294 130 278 154 249 160 237 187 211 198 197 228 170 235 155 213 130 201 118 169 90 154 78 124Z"/>
              <path d="M225 242 L254 250 278 280 291 320 278 355 264 396 243 437 225 414 222 377 204 344 204 307 189 279 199 255Z"/>
              <path d="M399 86 L432 66 466 76 482 95 467 116 441 115 422 133 399 119Z"/>
              <path d="M442 139 L474 126 517 136 546 159 557 190 541 218 531 255 510 292 489 319 469 292 456 256 437 230 430 196 415 169Z"/>
              <path d="M476 79 L525 55 585 51 628 64 660 83 705 83 742 101 791 111 822 140 809 163 779 166 758 187 722 181 696 203 662 191 641 166 610 158 582 134 548 125 526 104 493 106Z"/>
              <path d="M660 210 L692 205 716 224 710 246 684 252 664 237Z"/>
              <path d="M748 273 L783 256 826 266 855 289 843 318 811 333 782 315 758 304Z"/>
              <path d="M865 348 L882 337 898 351 891 371 873 370Z"/>
              <path d="M320 100 L333 91 344 105 336 124 322 119Z"/>
              <path d="M360 128 L370 120 381 133 375 148 364 143Z"/>
            </g>
            <g class="map-connections">
              <path v-for="edge in visibleEdges" :key="edge.key" :d="edge.path" />
            </g>
            <g v-for="place in mappedPlaces" :key="place.key" class="place-node" :class="{ selected: selectedPlace?.key === place.key, muted: selectedPlace && selectedPlace.key !== place.key }" @click="selectPlace(place)" @keydown.enter="selectPlace(place)" tabindex="0" role="button" :aria-label="`Explore ${place.name}`">
              <circle class="star-halo" :cx="projectPoint(place.coords).x" :cy="projectPoint(place.coords).y" r="26" fill="url(#star-glow)"/>
              <circle class="star-ring" :cx="projectPoint(place.coords).x" :cy="projectPoint(place.coords).y" r="8"/>
              <circle class="star-core" :cx="projectPoint(place.coords).x" :cy="projectPoint(place.coords).y" r="3.5"/>
              <text v-if="place.key === selectedPlace?.key || mappedPlaces.length < 8" :x="projectPoint(place.coords).x + 12" :y="projectPoint(place.coords).y - 12">{{ place.name }}</text>
            </g>
          </svg>
          <div v-if="!mappedPlaces.length" class="empty-map">
            <span class="eyebrow">THE CONSTELLATION IS WAITING</span>
            <p>No mapped locations match these filters. Try resetting them, or add a city to a project record.</p>
          </div>
          <div class="map-legend"><span class="legend-dot"></span> Performance location <span class="legend-line"></span> Shared project route</div>
        </div>
        <div class="place-strip">
          <button v-for="place in mappedPlaces" :key="place.key" :class="{ active: selectedPlace?.key === place.key }" @click="selectPlace(place)">
            <span>{{ place.country }}</span><strong>{{ place.name }}</strong><small>{{ place.projects.length }} {{ place.projects.length === 1 ? 'project' : 'projects' }}</small>
          </button>
        </div>
      </div>

      <aside class="detail-panel">
        <template v-if="selectedPlace">
          <div class="detail-topline"><span class="eyebrow">02 / PLACE NOTE</span><span class="place-index">{{ String(mappedPlaces.findIndex(p => p.key === selectedPlace.key) + 1).padStart(2, '0') }}</span></div>
          <p class="place-country">{{ selectedPlace.country }}</p>
          <h3 class="place-title">{{ selectedPlace.name }}<span>.</span></h3>
          <p class="place-summary">{{ selectedPlace.projects.length }} archived {{ selectedPlace.projects.length === 1 ? 'project' : 'projects' }} connected to this place.</p>
          <div class="detail-rule"></div>
          <div class="project-list">
            <article v-for="project in selectedPlace.projects" :key="project.id" class="project-entry">
              <div class="project-meta"><span>{{ displayDate(project.year) }}</span><span v-if="project.type?.length">{{ project.type[0] }}</span></div>
              <h4>{{ project.organisation }}</h4>
              <p v-if="project.description">{{ project.description }}</p>
              <a v-if="project.link" :href="project.link" target="_blank" rel="noopener noreferrer" class="project-link">{{ project.linkText || 'Explore project' }} <span>↗</span></a>
              <div v-if="project.collaborators?.length" class="credits"><span>WITH</span>{{ project.collaborators.join(' · ') }}</div>
              <div v-if="project.recording" class="media-links"><a :href="project.recording" target="_blank" rel="noopener noreferrer">↗ Listen / watch</a></div>
            </article>
          </div>
          <div class="detail-footnote">The map follows the places recorded in the project archive. Additional credits and media appear when available.</div>
        </template>
        <div v-else class="detail-empty">
          <span class="eyebrow">02 / DISCOVER</span>
          <h3>Every place<br>has a story.</h3>
          <p>Select a star on the map to discover the projects, people and performances connected to it.</p>
        </div>
      </aside>
    </section>

    <section class="archive-note">
      <span class="eyebrow">AN OPEN ARCHIVE</span>
      <p>Not just where a performance happened, but the people, sounds and shared work that made the journey matter.</p>
      <RouterLink to="/projects">Browse the full project archive <span>↗</span></RouterLink>
    </section>
    <p v-if="loadError" class="load-error">The project archive could not be loaded. Please try again later.</p>
  </main>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useProjectStore } from '@/stores/projects'
import { useProjectTypesStore } from '@/stores/projectTypes'

const projectsStore = useProjectStore()
const typeStore = useProjectTypesStore()
const search = ref('')
const selectedType = ref('')
const selectedYear = ref('')
const selectedPlaceKey = ref('')
const loadError = ref(false)

// Coordinates are used only when a project location matches a known city.
// Add more aliases as the archive grows; unmatched locations remain in the project archive.
const cityIndex = [
  { names: ['kuala lumpur', 'kl', 'petaling jaya', 'shah alam', 'malaysia'], name: 'Kuala Lumpur', country: 'Malaysia', coords: [101.6869, 3.139], countryCode: 'MY' },
  { names: ['london'], name: 'London', country: 'United Kingdom', coords: [-0.1276, 51.5072], countryCode: 'GB' },
  { names: ['berlin'], name: 'Berlin', country: 'Germany', coords: [13.405, 52.52], countryCode: 'DE' },
  { names: ['frankfurt'], name: 'Frankfurt', country: 'Germany', coords: [8.6821, 50.1109], countryCode: 'DE' },
  { names: ['gdansk', 'gdańsk'], name: 'Gdańsk', country: 'Poland', coords: [18.6466, 54.352], countryCode: 'PL' },
  { names: ['aomori'], name: 'Aomori', country: 'Japan', coords: [140.7406, 40.8222], countryCode: 'JP' },
  { names: ['tokyo'], name: 'Tokyo', country: 'Japan', coords: [139.6917, 35.6895], countryCode: 'JP' },
  { names: ['osaka'], name: 'Osaka', country: 'Japan', coords: [135.5023, 34.6937], countryCode: 'JP' },
  { names: ['singapore'], name: 'Singapore', country: 'Singapore', coords: [103.8198, 1.3521], countryCode: 'SG' },
  { names: ['sydney'], name: 'Sydney', country: 'Australia', coords: [151.2093, -33.8688], countryCode: 'AU' },
  { names: ['melbourne'], name: 'Melbourne', country: 'Australia', coords: [144.9631, -37.8136], countryCode: 'AU' },
  { names: ['new york'], name: 'New York', country: 'United States', coords: [-74.006, 40.7128], countryCode: 'US' },
  { names: ['los angeles'], name: 'Los Angeles', country: 'United States', coords: [-118.2437, 34.0522], countryCode: 'US' },
  { names: ['paris'], name: 'Paris', country: 'France', coords: [2.3522, 48.8566], countryCode: 'FR' },
  { names: ['vienna'], name: 'Vienna', country: 'Austria', coords: [16.3738, 48.2082], countryCode: 'AT' },
  { names: ['hong kong'], name: 'Hong Kong', country: 'Hong Kong', coords: [114.1694, 22.3193], countryCode: 'HK' },
  { names: ['taipei'], name: 'Taipei', country: 'Taiwan', coords: [121.5654, 25.033], countryCode: 'TW' }
]

const normalise = value => String(value ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim()
const rawProjects = computed(() => projectsStore.projects || [])
const allTypes = computed(() => [...new Set(rawProjects.value.flatMap(project => project.type || []))].sort())
const allYears = computed(() => [...new Set(rawProjects.value.flatMap(project => {
  const matches = String(project.year || '').match(/\d{4}/g) || []
  return matches.map(Number)
}))].sort((a, b) => b - a)
const visibleProjects = computed(() => rawProjects.value.filter(project => {
  const query = normalise(search.value)
  const searchable = normalise([project.organisation, project.location, project.description, ...(project.type || []), ...(project.collaborators || [])].join(' '))
  const yearMatch = !selectedYear.value || String(project.year || '').includes(selectedYear.value)
  return (!query || searchable.includes(query)) &&
    (!selectedType.value || (project.type || []).includes(selectedType.value)) &&
    yearMatch
}))
const mappedPlaces = computed(() => {
  const grouped = new Map()
  for (const project of visibleProjects.value) {
    const location = normalise(project.location)
    const match = cityIndex.find(city => city.names.some(alias => location === alias || location.includes(alias)))
    if (!match) continue
    const key = match.name
    if (!grouped.has(key)) grouped.set(key, { ...match, key, projects: [] })
    grouped.get(key).projects.push(project)
  }
  return [...grouped.values()].map(place => ({
    ...place,
    projects: place.projects.sort((a, b) => String(b.year || '').localeCompare(String(a.year || '')))
  })).sort((a, b) => a.name.localeCompare(b.name))
})
const totalYears = computed(() => {
  const years = visibleProjects.value.flatMap(project => (String(project.year || '').match(/\d{4}/g) || []).map(Number))
  return years.length ? Math.max(...years) - Math.min(...years) + 1 : 0
})
const selectedPlace = computed(() => mappedPlaces.value.find(place => place.key === selectedPlaceKey.value) || null)
const projectPlaceEdges = computed(() => {
  const edges = []
  for (let i = 0; i < mappedPlaces.value.length; i++) {
    for (let j = i + 1; j < mappedPlaces.value.length; j++) {
      const a = mappedPlaces.value[i]
      const b = mappedPlaces.value[j]
      const shared = a.projects.some(pa => b.projects.some(pb => pa.id === pb.id))
      if (shared) edges.push({ key: `${a.key}-${b.key}`, a, b })
    }
  }
  return edges
})
const visibleEdges = computed(() => projectPlaceEdges.value.map(edge => {
  const a = projectPoint(edge.a.coords)
  const b = projectPoint(edge.b.coords)
  return { ...edge, path: `M ${a.x} ${a.y} Q ${(a.x + b.x) / 2} ${Math.min(a.y, b.y) - 35} ${b.x} ${b.y}` }
}))
function projectPoint(coords) {
  const [lon, lat] = coords
  return { x: (lon + 180) / 360 * 1000, y: (90 - lat) / 180 * 500 }
}
function selectPlace(place) {
  selectedPlaceKey.value = place.key
}
function resetFilters() {
  search.value = ''
  selectedType.value = ''
  selectedYear.value = ''
}
function displayDate(value) {
  return String(value || '').replace('present', 'Present')
}
onMounted(async () => {
  try {
    if (!projectsStore.loaded) await projectsStore.fetchProjects()
    if (!typeStore.loaded) await typeStore.fetchTypes()
    if (projectsStore.projects.length && !selectedPlaceKey.value) {
      const first = mappedPlaces.value[0]
      if (first) selectedPlaceKey.value = first.key
    }
  } catch (error) {
    console.error('Unable to load musical atlas', error)
    loadError.value = true
  }
})
</script>

<style scoped>
.atlas-page {
  --atlas-bg: #101211;
  --atlas-panel: #171a18;
  --atlas-line: rgba(218, 207, 173, .16);
  --atlas-ink: #eee9dc;
  --atlas-muted: #9c9b90;
  --atlas-gold: #d8c18a;
  margin: -1rem -0.5rem 0;
  padding: clamp(1.2rem, 3vw, 3.5rem);
  background: var(--atlas-bg);
  color: var(--atlas-ink);
  min-height: 100vh;
  font-family: Georgia, 'Times New Roman', serif;
}
.atlas-intro { max-width: 1250px; margin: 0 auto 2.2rem; }
.eyebrow { font: 600 .62rem/1.4 'Sora', sans-serif; letter-spacing: .19em; color: var(--atlas-gold); }
.atlas-intro h2 { font-size: clamp(2.8rem, 7vw, 6.5rem) !important; font-weight: 400; letter-spacing: -.055em; line-height: .98; margin: 1.25rem 0 1rem; }
.atlas-intro h2 em { color: var(--atlas-gold); font-weight: 400; }
.intro-copy { max-width: 520px; color: #b7b5a9; font: 300 .94rem/1.8 'Sora', sans-serif; }
.atlas-stats { display: flex; gap: clamp(1.6rem, 5vw, 4.5rem); margin-top: 2rem; padding-top: 1.2rem; border-top: 1px solid var(--atlas-line); width: fit-content; }
.atlas-stats div { display: grid; gap: .25rem; }
.atlas-stats strong { font-size: 1.7rem; font-weight: 400; color: var(--atlas-ink); }
.atlas-stats span { font: 500 .56rem 'Sora', sans-serif; letter-spacing: .16em; color: var(--atlas-muted); }
.atlas-controls { max-width: 1250px; margin: 0 auto 1rem; display: flex; flex-wrap: wrap; gap: .65rem; }
.search-box { flex: 1 1 280px; display: flex; gap: .65rem; align-items: center; background: #191c1a; border: 1px solid var(--atlas-line); padding: 0 .85rem; color: var(--atlas-gold); }
.search-box input { width: 100%; background: transparent; color: var(--atlas-ink); border: 0; outline: 0; padding: .8rem 0; font: .75rem 'Sora', sans-serif; }
.search-box input::placeholder { color: #777970; }
.atlas-controls select, .reset-button { border: 1px solid var(--atlas-line); background: #191c1a; color: #c8c5b9; padding: .7rem .8rem; font: .7rem 'Sora', sans-serif; border-radius: 0; }
.reset-button { cursor: pointer; }
.atlas-workspace { max-width: 1250px; margin: 0 auto; display: grid; grid-template-columns: minmax(0, 1.7fr) minmax(270px, .8fr); border: 1px solid var(--atlas-line); }
.map-panel { min-width: 0; background: radial-gradient(ellipse at 48% 42%, #202520 0%, #151815 68%); border-right: 1px solid var(--atlas-line); }
.map-heading { display: flex; align-items: end; justify-content: space-between; padding: 1.4rem 1.5rem .5rem; gap: 1rem; }
.map-heading h3 { margin: .5rem 0 0; font-size: 1.45rem !important; font-weight: 400; }
.map-hint { font: .52rem 'Sora', sans-serif; letter-spacing: .13em; color: #7d8077; text-align: right; }
.map-canvas { position: relative; padding: .5rem; min-height: 300px; }
.world-map { display: block; width: 100%; height: auto; overflow: visible; }
.latitude-lines path { fill: none; stroke: rgba(211,198,158,.09); stroke-width: .8; stroke-dasharray: 2 7; }
.landmass { fill: #30362e; stroke: #53594a; stroke-width: 1; opacity: .85; }
.map-connections path { fill: none; stroke: var(--atlas-gold); stroke-width: 1; stroke-dasharray: 3 5; opacity: .65; }
.place-node { cursor: pointer; outline: none; transition: opacity .2s ease; }
.place-node.muted { opacity: .32; }
.place-node:focus .star-ring, .place-node.selected .star-ring { stroke: #f6e7b8; stroke-width: 1.3; }
.star-ring { fill: none; stroke: #c9b77f; stroke-width: .7; }
.star-core { fill: #f3e6c1; }
.place-node text { fill: #e5d8ae; font: 11px 'Sora', sans-serif; letter-spacing: .03em; }
.map-legend { display: flex; align-items: center; gap: .5rem; color: #888b80; font: .56rem 'Sora', sans-serif; padding: 0 1rem 1rem; }
.legend-dot { width: 5px; height: 5px; background: var(--atlas-gold); border-radius: 50%; }
.legend-line { width: 22px; border-top: 1px dashed var(--atlas-gold); margin-left: .5rem; }
.empty-map { position: absolute; inset: 25% 12%; text-align: center; color: var(--atlas-muted); font: .75rem/1.7 'Sora', sans-serif; }
.empty-map p { max-width: 330px; margin: .7rem auto; }
.place-strip { display: flex; overflow-x: auto; border-top: 1px solid var(--atlas-line); }
.place-strip button { min-width: 120px; flex: 1; display: flex; flex-direction: column; text-align: left; gap: .25rem; padding: .8rem 1rem; border: 0; border-right: 1px solid var(--atlas-line); background: transparent; color: var(--atlas-ink); cursor: pointer; }
.place-strip button.active { background: rgba(216,193,138,.08); box-shadow: inset 0 2px var(--atlas-gold); }
.place-strip button span, .place-strip button small { font: .56rem 'Sora', sans-serif; color: var(--atlas-muted); }
.place-strip button strong { font-size: .95rem; font-weight: 400; }
.detail-panel { padding: 1.5rem; background: var(--atlas-panel); min-width: 0; }
.detail-topline { display: flex; justify-content: space-between; }
.place-index { color: #777c70; font: .65rem 'Sora', sans-serif; }
.place-country { margin: 2.4rem 0 .3rem; color: var(--atlas-muted); font: .65rem 'Sora', sans-serif; letter-spacing: .12em; text-transform: uppercase; }
.place-title { margin: 0; font-size: clamp(2.2rem, 4vw, 3.6rem) !important; font-weight: 400; letter-spacing: -.05em; overflow-wrap: anywhere; }
.place-title span { color: var(--atlas-gold); }
.place-summary { margin: .8rem 0 1.4rem; color: #aaa99e; font: .73rem/1.7 'Sora', sans-serif; }
.detail-rule { border-top: 1px solid var(--atlas-line); margin-bottom: 1.2rem; }
.project-entry { padding: 0 0 1.3rem; margin-bottom: 1.3rem; border-bottom: 1px solid var(--atlas-line); }
.project-meta { display: flex; justify-content: space-between; gap: .5rem; color: var(--atlas-gold); font: .55rem 'Sora', sans-serif; letter-spacing: .07em; text-transform: uppercase; }
.project-meta span:last-child { text-align: right; color: #99998e; }
.project-entry h4 { margin: .7rem 0 .5rem; font-size: 1.25rem !important; font-weight: 400; line-height: 1.3; }
.project-entry p { color: #a6a69a; font: .7rem/1.75 'Sora', sans-serif; }
.project-link, .archive-note a, .media-links a { color: var(--atlas-gold) !important; font: .68rem 'Sora', sans-serif; text-decoration: none; border-bottom: 1px solid rgba(216,193,138,.35); padding-bottom: .2rem; }
.project-link span, .archive-note a span { margin-left: .35rem; }
.credits { margin-top: .9rem; color: #c1bfb2; font: .65rem/1.7 'Sora', sans-serif; }
.credits span { display: block; color: var(--atlas-muted); font-size: .52rem; letter-spacing: .15em; margin-bottom: .2rem; }
.media-links { margin-top: .75rem; }
.detail-footnote { color: #777c72; font: .57rem/1.7 'Sora', sans-serif; margin-top: 1.2rem; }
.detail-empty { padding-top: 4rem; }
.detail-empty h3 { font-size: 2.7rem !important; font-weight: 400; line-height: 1.1; margin: 2rem 0 1rem; }
.detail-empty p { color: #9c9b90; font: .75rem/1.8 'Sora', sans-serif; }
.archive-note { max-width: 1250px; margin: 4rem auto 2rem; padding: 1.5rem 0; border-top: 1px solid var(--atlas-line); display: grid; grid-template-columns: 1fr 2fr auto; gap: 1.5rem; align-items: start; }
.archive-note p { color: #b8b6aa; max-width: 500px; font-size: 1.15rem; line-height: 1.6; margin: 0; }
.archive-note a { justify-self: end; margin-top: .3rem; }
.load-error { color: #d8a4a4; font: .75rem 'Sora', sans-serif; }
@media (max-width: 900px) {
  .atlas-workspace { grid-template-columns: 1fr; }
  .map-panel { border-right: 0; border-bottom: 1px solid var(--atlas-line); }
  .detail-panel { padding: 1.3rem; }
  .place-country { margin-top: 1.4rem; }
  .archive-note { grid-template-columns: 1fr; gap: .8rem; margin-top: 2.5rem; }
  .archive-note a { justify-self: start; }
}
@media (max-width: 560px) {
  .atlas-page { padding: 1.2rem .8rem; margin: -1rem -.5rem 0; }
  .desktop-break { display: none; }
  .atlas-intro h2 { font-size: 3.2rem !important; }
  .atlas-controls select { flex: 1; min-width: 0; }
  .map-heading { align-items: start; padding: 1rem .8rem .3rem; }
  .map-heading h3 { font-size: 1.2rem !important; }
  .map-hint { max-width: 100px; line-height: 1.6; }
  .map-canvas { padding: 0; min-height: 190px; }
  .map-legend { flex-wrap: wrap; font-size: .5rem; padding: .5rem .7rem .8rem; }
  .place-strip button { min-width: 108px; padding: .75rem; }
  .atlas-stats { gap: 1.7rem; }
  .atlas-stats strong { font-size: 1.4rem; }
}
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { scroll-behavior: auto !important; transition-duration: .01ms !important; animation-duration: .01ms !important; }
}
</style>
