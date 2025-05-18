import { defineStore } from 'pinia'
import { ref } from 'vue'
import moment from 'moment'

export const useAlarmStore = defineStore('alarm', () => {
  const alarms = ref([
    { id: 0, time: '10:25', repeat: true, label: 'Start of Shift' },
    { id: 1, time: '19:55', repeat: true, label: 'EOS Busy' }
  ])

  const addAlarm = (time, repeat = false, label = '') => {
    alarms.value.push({ time, repeat, label })
  }

  const removeAlarm = (index) => {
    alarms.value.splice(index, 1)
  }

  const checkAlarms = () => {
    const now = moment().format('HH:mm')
    alarms.value.forEach((alarm, index) => {
      if (alarm.time === now) {
        alert(`⏰ ${alarm.label || 'Alarm'} at ${alarm.time}`)
        if (!alarm.repeat) {
          removeAlarm(index)
        }
      }
    })
  }

  return { alarms, addAlarm, removeAlarm, checkAlarms }
})
