<template>
  <div class="student-page w-100">
    <div
      v-if="loading"
      class="placeholder-glow"
    >
      <h3 class="mb-3"><span class="placeholder col-4 rounded"></span></h3>
      <div class="row g-3">
        <div class="col-12 col-md-6"><span class="placeholder w-100 rounded-4" style="height: 120px"></span></div>
        <div class="col-12 col-md-6"><span class="placeholder w-100 rounded-4" style="height: 120px"></span></div>
      </div>
    </div>

    <p v-else-if="error">{{ error }}</p>

    <template v-else-if="me">
      <div class="d-flex flex-wrap align-items-center gap-2 mb-1">
        <h3 class="mb-0">Hi, {{ firstName }}.</h3>
        <span
          v-if="me.semester"
          class="badge text-bg-warning"
        >Semester {{ me.semester }}</span>
        <div class="ms-auto d-flex gap-2">
          <button
            class="btn btn-sm btn-outline-dark"
            @click="showChangePassword = !showChangePassword"
          >Change password</button>
          <button
            class="btn btn-sm btn-outline-dark"
            @click="logout"
          >Log out</button>
        </div>
      </div>
      <p class="text-secondary mb-4">Updated on {{ longDate(me.updated_at) }}</p>

      <div
        v-if="showChangePassword"
        class="stat-card border rounded-4 p-3 mb-4"
      >
        <SetPassword :require-current="true" />
      </div>

      <div class="row g-3 mb-2 align-items-start">
        <div class="col-12 col-md-6">
          <div class="stat-card border rounded-4 p-3">
            <small class="text-secondary d-block">Remaining</small>
            <div class="stat-num">{{ hm(remaining) }}</div>
            <div
              class="progress mt-2"
              style="height: 8px"
            >
              <div
                class="progress-bar bg-success"
                :style="{ width: Math.min(pct, 100) + '%' }"
              ></div>
            </div>
            <small class="font-monospace text-secondary">{{ pct }}% of {{ hm(me.total_minutes) }} complete</small>
          </div>
        </div>
        <div class="col-12 col-md-6">
          <button
            type="button"
            class="stat-card stat-button border rounded-4 p-3 w-100 text-start"
            :class="{ 'stat-open': showLessons }"
            :aria-expanded="showLessons"
            @click="showLessons = !showLessons"
          >
            <div class="d-flex align-items-center">
              <small class="text-secondary">Attended</small>
              <small class="ms-auto text-secondary">
                {{ showLessons ? 'Hide lessons' : 'View lessons' }}
                <i
                  class="bi"
                  :class="showLessons ? 'bi-chevron-up' : 'bi-chevron-down'"
                ></i>
              </small>
            </div>
            <div class="stat-num">{{ hm(me.attended_minutes) }}</div>
            <small class="font-monospace text-secondary">
              {{ me.attended_minutes }} mins · {{ me.lessons.length }} {{ me.lessons.length === 1 ? 'lesson' : 'lessons' }}
            </small>
          </button>

          <Transition name="fade">
            <div
              v-if="showLessons"
              class="mt-2"
            >
              <p
                v-if="!me.lessons.length"
                class="text-secondary px-1"
              >No lessons yet this semester.</p>
              <table
                v-else
                class="table w-100 mb-0 lessons-table"
              >
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Duration</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="l in me.lessons"
                    :key="l.class_date + l.duration"
                  >
                    <td>{{ longDate(l.class_date) }}</td>
                    <td class="font-monospace">{{ l.duration }} mins</td>
                    <td class="text-end">
                      <span
                        v-if="l.absent"
                        class="badge text-bg-light border"
                      >Absent</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Transition>
        </div>
      </div>

      <h4 class="mt-4 mb-2">Repertoire</h4>
      <div class="stat-card border rounded-4 p-3 mb-4">
        <p
          v-if="!repertoireGroups.length"
          class="text-secondary mb-0"
        >No repertoire assigned yet.</p>
        <div
          v-for="(group, i) in repertoireGroups"
          :key="i"
          class="mb-2"
        >
          <small
            v-if="group.title"
            class="text-secondary d-block"
          >{{ group.title }}</small>
          <div
            v-for="(line, j) in group.lines"
            :key="j"
          >{{ line }}</div>
        </div>
      </div>

      <h4 class="mb-3">Lesson journal</h4>
      <p
        v-if="!me.notes.length"
        class="text-secondary"
      >No remarks yet this semester.</p>
      <div
        v-else
        class="timeline"
      >
        <div
          v-for="(n, i) in me.notes"
          :key="i"
          class="entry"
        >
          <div class="dot"></div>
          <div class="d-flex align-items-baseline gap-2">
            <span class="fw-medium">{{ longDate(n.created_at) }}</span>
            <span
              v-if="lessonOn(n.created_at)"
              class="font-monospace text-secondary small"
            >{{ lessonOn(n.created_at).duration }} mins</span>
          </div>
          <p
            class="mt-1 mb-0 note-text"
            style="white-space: pre-line"
          >{{ n.note }}</p>
        </div>
      </div>

      <div class="border-top pt-4 mt-4">
        <ClassPolicy />
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import backend from '@/composables/backend'
import { authFetch, logout } from '@/composables/auth'
import ClassPolicy from '../ClassPolicy.vue'
import SetPassword from './SetPassword.vue'

const me = ref(null)
const loading = ref(true)
const error = ref('')
const showLessons = ref(false)
const showChangePassword = ref(false)

onMounted(async () => {
  try {
    const res = await authFetch(`${backend}/me`)
    if (!res.ok) throw new Error()
    me.value = await res.json()
  } catch {
    error.value = 'Could not load your page. Please refresh, or log out and in again.'
  } finally {
    loading.value = false
  }
})

// "Wan Yee Xuen (Hilary)" → Hilary, "He Jiajia" → He Jiajia, "Cammy Ong" → Cammy
const firstName = computed(() => {
  const name = me.value?.name || ''
  const english = name.match(/\(([^)]+)\)/)
  if (english) return english[1].trim()
  return name
})

const remaining = computed(() => Math.max((me.value?.total_minutes || 0) - (me.value?.attended_minutes || 0), 0))
const pct = computed(() =>
  me.value?.total_minutes ? Math.round((me.value.attended_minutes / me.value.total_minutes) * 100) : 0
)

// Repertoire is free text; "--Title--" lines start a new group
const repertoireGroups = computed(() => {
  const groups = []
  let current = null

  for (const raw of (me.value?.repertoire || '').split('\n')) {
    const line = raw.trim()
    const heading = line.match(/^-{2,}\s*(.+?)\s*-{2,}$/)

    if (heading) {
      current = { title: heading[1], lines: [] }
      groups.push(current)
    } else if (line) {
      if (!current) {
        current = { title: '', lines: [] }
        groups.push(current)
      }
      current.lines.push(line)
    }
  }

  return groups.filter((g) => g.lines.length || g.title)
})

const toDate = (d) => (/^\d{4}-\d{2}-\d{2}$/.test(d) ? new Date(d + 'T00:00:00') : new Date(d))
const longDate = (d) => toDate(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
const dayKey = (d) => {
  const x = toDate(d)
  return `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, '0')}-${String(x.getDate()).padStart(2, '0')}`
}
const lessonOn = (d) => me.value.lessons.find((l) => l.class_date === dayKey(d))

const hm = (m) => {
  const h = Math.floor(m / 60)
  const r = m % 60
  if (!h) return `${r}m`
  return r ? `${h}h ${r}m` : `${h}h`
}
</script>

<style scoped>
.stat-card {
  background: rgb(248, 248, 248);
}

.stat-button {
  color: inherit;
  transition:
    transform 160ms ease,
    box-shadow 160ms ease;
}

.stat-button:hover,
.stat-open {
  transform: translateY(-2px);
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.08);
}

.stat-open {
  border-color: #262526 !important;
}

.stat-num {
  font-size: 2rem;
  font-weight: 600;
  line-height: 1.2;
}

.lessons-table {
  border-radius: 1rem;
  overflow: hidden;
}

.timeline {
  border-left: 2px solid #dedcdc;
  padding-left: 1.25rem;
  margin-left: 0.4rem;
}

.entry {
  position: relative;
  padding-bottom: 1.4rem;
}

.dot {
  position: absolute;
  left: calc(-1.25rem - 7px);
  top: 0.45rem;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #262526;
}

.note-text {
  color: #4a484a;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 160ms ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
