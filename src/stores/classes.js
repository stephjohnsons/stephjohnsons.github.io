import { defineStore } from 'pinia'

export const useClassStore = defineStore('classStore', {
  state: () => ({
    lessonList: {}, // structure: { '2025-05': [...], '2025-09': [...] }
    loading: false
  }),

  getters: {
    getLessonsBySemester: (state) => (semester) => {
      return state.lessonList[semester] || []
    }
  },

  actions: {
    async fetchLessons(backend) {
      this.loading = true
      try {
        const res = await fetch(`${backend}/classes`)
        if (!res.ok) throw new Error('Failed to fetch lessons')
        const data = await res.json()

        const grouped = {}
        for (const cls of data) {
          const sem = cls.semester || 'unknown'
          if (!grouped[sem]) grouped[sem] = []
          grouped[sem].push(cls)
        }

        // Sort by class_date within each semester
        for (const sem in grouped) {
          grouped[sem].sort((a, b) => new Date(a.class_date) - new Date(b.class_date))
        }

        this.lessonList = grouped
      } catch (err) {
        console.error('Error fetching lessons:', err)
      } finally {
        this.loading = false
      }
    }
  }
})
