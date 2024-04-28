export const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

export const augTriad = (x) => {
  return [x, x + 4, x + 8]
}

export const majorTriad = (x) => {
  return [x, x + 4, x + 7]
}

export const minorTriad = (x) => {
  return [x, x + 3, x + 7]
}

export const dimTriad = (x) => {
  return [x, x + 3, x + 6]
}
