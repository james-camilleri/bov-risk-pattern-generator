export function randomBetween (min, max) {
  return Math.random() * (max - min) + min
}

export function randomIntBetween (min, max) {
  return Math.floor(
    Math.random() * (Math.floor(max) - Math.ceil(min) + 1) + Math.ceil(min)
  )
}

// from https://bost.ocks.org/mike/shuffle/
export function shuffleArray (array) {
  let m = array.length
  let t
  let i

  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--)

    // And swap it with the current element.
    t = array[m]
    array[m] = array[i]
    array[i] = t
  }

  return array
}

export function padArray (array, size) {
  const missingItems = size - array.length
  const lastItem = { ...array[array.length - 1] }

  return [...array, ...Array(missingItems).fill(lastItem)]
}
