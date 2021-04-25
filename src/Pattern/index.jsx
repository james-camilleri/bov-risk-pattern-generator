import React from 'react'

import { Circle, Connector } from './svg-shapes'
import {
  padArray,
  randomBetween,
  randomIntBetween,
  shuffleArray
} from './utils'

const ROW_HEIGHT = 100
const COLUMN_WIDTH = 33.333
const COLUMN_MID = COLUMN_WIDTH / 2
const MIN_DIAMETER = COLUMN_WIDTH * 0.5
const MIN_RADIUS = MIN_DIAMETER / 2
const MAX_DIAMETER = COLUMN_WIDTH * 0.8
const MAX_RADIUS = MAX_DIAMETER / 2

function generateRow ({ columns, maxCircles, minCircles }) {
  let freeColumns = columns + 1 // +1 column for last graph spacing.

  const circleCounts = []
  // Greedily generate the number of circles per graph.
  while (freeColumns >= maxCircles) {
    const circleCount = randomIntBetween(minCircles, maxCircles)
    circleCounts.push(circleCount)
    freeColumns -= circleCount + 1 // Add extra column for spacing.
  }

  // Empty columns left at the end of the row, try to re-allocate.
  if (freeColumns !== 0) {
    for (let i = 0; i < circleCounts.length; i++) {
      const circleCount = circleCounts[i]
      const availableCircles = maxCircles - circleCount

      if (!availableCircles) continue
      if (!freeColumns) break

      const circlesToAdd = Math.min(availableCircles, freeColumns)
      circleCounts[i] += circlesToAdd
      freeColumns -= circlesToAdd
    }

    // Shuffle array to avoid weighting of larger graphs at the start.
    shuffleArray(circleCounts)
  }

  return generateCircleAttributes(circleCounts)
}

function generateCircleAttributes (circleCounts) {
  let startColumn = 0

  return circleCounts.map(count => {
    const circleAttributes = Array(count).fill().map((_, i) => {
      const cx = (startColumn * COLUMN_WIDTH) + (i * COLUMN_WIDTH) + COLUMN_MID
      const cy = randomBetween(0 + MAX_RADIUS, ROW_HEIGHT - MAX_RADIUS)
      const r = randomBetween(MIN_RADIUS, MAX_RADIUS)

      // TODO: Add colours.
      const fill = 'black'

      return { cx, cy, r, fill }
    })

    startColumn += count + 1

    // Pad to a fixed size for smooth animation.
    return padArray(circleAttributes, 15)
  })
}

export const Pattern = (props) => {
  const {
    columns,
    maxCircles,
    minCircles,
    rows
  } = props

  const patternRows = Array(rows)
    .fill()
    .map(() => generateRow({ columns, maxCircles, minCircles }))

  const width = columns * COLUMN_WIDTH
  const height = rows * (ROW_HEIGHT + COLUMN_WIDTH) - COLUMN_WIDTH

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      xmlns='http://www.w3.org/2000/svg'
    >
      {patternRows.map((row, i) => {
        const startY = (ROW_HEIGHT + COLUMN_WIDTH) * i

        return row.map((circles, j) => {
          const points = circles
            .map(({ cx, cy }) => `${cx},${cy + startY}`)
            .join(' ')

          return (
            <React.Fragment key={`${i}-${j}`}>
              <Connector points={points} />
              {circles.map((circleProps, k) => {
                const cy = circleProps.cy + startY

                return (
                  <Circle key={`${i}-${j}-${k}`} {...circleProps} cy={cy} />
                )
              })}
            </React.Fragment>
          )
        })
      })}
    </svg>
  )
}
