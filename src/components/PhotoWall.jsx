import { useEffect, useMemo, useState } from 'react'
import { PHOTO_WALL } from '../data'
import styles from '../styles/PhotoWall.module.css'

const getColumnCount = (width) => {
  if (width <= 640) {
    return 2
  }

  if (width <= 1024) {
    return 3
  }

  return 4
}

const ORIENTATION_WEIGHT = {
  portrait: 3,
  landscape: 1,
  square: 2,
}

const getPhotoWeight = (orientation) => ORIENTATION_WEIGHT[orientation] ?? 2

const isValidSequence = (column) => {
  for (let i = 2; i < column.length; i += 1) {
    if (
      column[i].orientation === column[i - 1].orientation &&
      column[i - 1].orientation === column[i - 2].orientation
    ) {
      return false
    }
  }

  return true
}

const findInsertIndex = (column, photo) => {
  for (let index = column.length; index >= 0; index -= 1) {
    const trial = [...column]
    trial.splice(index, 0, photo)
    if (isValidSequence(trial)) {
      return index
    }
  }

  return -1
}

const getColumnHeight = (column) =>
  column.reduce((total, photo) => total + getPhotoWeight(photo.orientation), 0)

const getHeightSpread = (columns) => {
  const heights = columns.map(getColumnHeight)
  const min = Math.min(...heights)
  const max = Math.max(...heights)
  return max - min
}

const distributeColumns = (photos, columnCount) => {
  const columns = Array.from({ length: columnCount }, () => [])

  const weightedPhotos = [...photos].sort((a, b) => getPhotoWeight(b.orientation) - getPhotoWeight(a.orientation))

  weightedPhotos.forEach((photo) => {
    const candidates = Array.from({ length: columnCount }, (_, index) => index)

    let selected = null
    let bestScore = Number.POSITIVE_INFINITY

    candidates.forEach((columnIndex) => {
      if (findInsertIndex(columns[columnIndex], photo) < 0) {
        return
      }

      const trialColumns = columns.map((column) => [...column])
      trialColumns[columnIndex].push(photo)

      const spread = getHeightSpread(trialColumns)
      const targetHeight = getColumnHeight(trialColumns[columnIndex])
      const score = spread * 10 + targetHeight

      if (score < bestScore) {
        bestScore = score
        selected = columnIndex
      }
    })

    if (selected === null) {
      selected = candidates.reduce((best, current) => {
        const bestHeight = getColumnHeight(columns[best])
        const currentHeight = getColumnHeight(columns[current])
        return currentHeight < bestHeight ? current : best
      }, candidates[0])
    }

    const insertIndex = findInsertIndex(columns[selected], photo)
    if (insertIndex >= 0) {
      columns[selected].splice(insertIndex, 0, photo)
    } else {
      columns[selected].push(photo)
    }
  })

  const hasLargeSpread = () => getHeightSpread(columns) > 2

  while (hasLargeSpread()) {
    const heights = columns.map(getColumnHeight)
    const currentSpread = Math.max(...heights) - Math.min(...heights)
    let tallestIndex = 0
    let shortestIndex = 0

    heights.forEach((height, index) => {
      if (height > heights[tallestIndex]) {
        tallestIndex = index
      }
      if (height < heights[shortestIndex]) {
        shortestIndex = index
      }
    })

    const tallest = columns[tallestIndex]
    const shortest = columns[shortestIndex]
    let moved = false

    for (let i = tallest.length - 1; i >= 0; i -= 1) {
      const candidate = tallest[i]
      const insertIndex = findInsertIndex(shortest, candidate)
      if (insertIndex < 0) {
        continue
      }

      tallest.splice(i, 1)
      shortest.splice(insertIndex, 0, candidate)

      if (!isValidSequence(tallest)) {
        shortest.splice(insertIndex, 1)
        tallest.splice(i, 0, candidate)
        continue
      }

      if (getHeightSpread(columns) < currentSpread) {
        moved = true
        break
      }

      shortest.splice(insertIndex, 1)
      tallest.splice(i, 0, candidate)
    }

    if (!moved) {
      let swapped = false

      for (let i = tallest.length - 1; i >= 0 && !swapped; i -= 1) {
        for (let j = 0; j < shortest.length; j += 1) {
          const fromTall = tallest[i]
          const fromShort = shortest[j]
          const trialShort = shortest.filter((_, idx) => idx !== j)
          const trialTall = tallest.filter((_, idx) => idx !== i)
          const tallInsertIndex = findInsertIndex(trialTall, fromShort)
          const shortInsertIndex = findInsertIndex(trialShort, fromTall)

          if (shortInsertIndex < 0) {
            continue
          }

          if (tallInsertIndex < 0) {
            continue
          }

          shortest.splice(j, 1)
          tallest.splice(i, 1)
          tallest.splice(tallInsertIndex, 0, fromShort)
          shortest.splice(shortInsertIndex, 0, fromTall)

          if (getHeightSpread(columns) < currentSpread) {
            swapped = true
            moved = true
            break
          }

          shortest.splice(shortInsertIndex, 1)
          tallest.splice(tallInsertIndex, 1)
          tallest.splice(i, 0, fromTall)
          shortest.splice(j, 0, fromShort)
        }
      }

      if (!moved) {
        break
      }
    }
  }

  return columns
}

export default function PhotoWall() {
  const [columnCount, setColumnCount] = useState(4)

  useEffect(() => {
    const updateColumns = () => setColumnCount(getColumnCount(window.innerWidth))
    updateColumns()
    window.addEventListener('resize', updateColumns)

    return () => window.removeEventListener('resize', updateColumns)
  }, [])

  const columns = useMemo(() => distributeColumns(PHOTO_WALL, columnCount), [columnCount])

  if (!PHOTO_WALL.length) {
    return null
  }

  return (
    <section className={styles.section} id="mosaico" aria-label="Mosaico fotográfico">
      <div className={`${styles.header} reveal`}>
        <h2 className="section-title">Muro de momentos</h2>
      </div>

      <div className={styles.wall}>
        {columns.map((column, columnIndex) => (
          <div key={`column-${columnIndex}`} className={styles.column}>
            {column.map((photo, index) => (
              <figure
                key={photo.id}
                className={`${styles.tile} reveal`}
                style={{
                  '--tilt': `${photo.tilt}deg`,
                  transitionDelay: `${(columnIndex + index) * 0.06}s`,
                }}
              >
                <img src={photo.src} alt={photo.alt} loading="lazy" />
              </figure>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
