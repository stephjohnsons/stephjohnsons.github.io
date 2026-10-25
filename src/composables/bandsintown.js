const API_URL = 'https://rest.bandsintown.com/artists/Stephen%20Johnson-Tseu/events'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const DAY_MS = 24 * 60 * 60 * 1000

// Upcoming events, or null if they couldn't be loaded
export const fetchEvents = async () => {
  const appId = import.meta.env.VITE_BANDSINTOWN_APP_ID
  if (!appId) return null

  try {
    const res = await fetch(`${API_URL}?app_id=${appId}`)
    if (!res.ok) {
      console.error('Failed to fetch events:', res.status)
      return null
    }
    return await res.json()
  } catch (err) {
    console.error('Error fetching events:', err)
    return null
  }
}

// Bandsintown datetimes are local ("2026-11-13T20:00:00"), so read the parts as written
const parse = (datetime) => {
  const [date, time = ''] = datetime.split('T')
  const [y, m, d] = date.split('-').map(Number)
  return { date: new Date(y, m - 1, d), time: time.slice(0, 5) }
}

const dayLabel = (date) => `${date.getDate()} ${MONTHS[date.getMonth()]}`

const rangeLabel = (start, end) => {
  if (start.getTime() === end.getTime()) return dayLabel(start)
  if (start.getMonth() === end.getMonth()) return `${start.getDate()}–${dayLabel(end)}`
  return `${dayLabel(start)} – ${dayLabel(end)}`
}

// Group consecutive nights of the same show (same title and venue, at most
// two days apart) into one run, e.g. three nights → "13–15 Nov".
export const groupRuns = (events) => {
  const runs = []

  for (const event of events || []) {
    const { date, time } = parse(event.datetime)
    const title = event.title || ''
    const key = `${title}|${event.venue?.name || ''}|${event.venue?.city || ''}`
    const night = {
      id: event.id,
      date,
      time,
      label: `${WEEKDAYS[date.getDay()]} ${dayLabel(date)}`,
      shortLabel: `${WEEKDAYS[date.getDay()]} ${date.getDate()}`,
      ticketUrl: event.offers?.[0]?.url || null,
      url: event.url
    }

    const last = runs[runs.length - 1]

    if (last && last.groupKey === key && (date - last.end) / DAY_MS <= 2) {
      last.nights.push(night)
      last.end = date
    } else {
      runs.push({
        groupKey: key,
        title,
        venue: event.venue?.name || '',
        location: event.venue?.location || '',
        city: event.venue?.city || '',
        description: event.description || '',
        start: date,
        end: date,
        nights: [night]
      })
    }
  }

  for (const run of runs) {
    run.key = run.groupKey + '|' + run.nights[0].id
    run.dateLabel = rangeLabel(run.start, run.end)
    // Some events have no title in Bandsintown; fall back to the venue
    run.displayTitle = run.title || run.venue || 'Concert'
    run.showVenue = !!run.venue && run.venue !== run.displayTitle
    run.ticketUrl = run.nights.find((n) => n.ticketUrl)?.ticketUrl || null
    run.url = run.nights[0].url
  }

  return runs
}
