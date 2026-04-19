import { useState, useRef, useCallback, useEffect } from 'react'
import { SLIDES, CATS } from '../data'
import styles from '../styles/Gallery.module.css'

export default function Gallery() {
  const [activeCat, setActiveCat] = useState('all')
  const [currentIdx, setCurrentIdx] = useState(0)
  const trackRef    = useRef(null)
  const isDragging  = useRef(false)
  const startX      = useRef(0)
  const scrollLeft  = useRef(0)
  const touchStart  = useRef(0)

  const visible = SLIDES.filter(
    (s) => activeCat === 'all' || s.cat === activeCat
  )

  const scrollToIdx = useCallback(
    (idx) => {
      if (!trackRef.current) return
      const items = trackRef.current.querySelectorAll(`.${styles.slide}`)
      items[idx]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
      setCurrentIdx(idx)
    },
    []
  )

  const slideBy = (dir) => {
    const next = Math.max(0, Math.min(visible.length - 1, currentIdx + dir))
    scrollToIdx(next)
  }

  // reset when category changes
  useEffect(() => {
    setCurrentIdx(0)
    trackRef.current?.scrollTo({ left: 0, behavior: 'smooth' })
  }, [activeCat])

  /* ── drag to scroll ── */
  const onMouseDown = (e) => {
    isDragging.current  = true
    startX.current      = e.pageX - trackRef.current.offsetLeft
    scrollLeft.current  = trackRef.current.scrollLeft
    trackRef.current.classList.add(styles.grabbing)
  }
  const onMouseLeave = () => {
    isDragging.current = false
    trackRef.current?.classList.remove(styles.grabbing)
  }
  const onMouseUp = () => {
    isDragging.current = false
    trackRef.current?.classList.remove(styles.grabbing)
  }
  const onMouseMove = (e) => {
    if (!isDragging.current) return
    e.preventDefault()
    const x = e.pageX - trackRef.current.offsetLeft
    trackRef.current.scrollLeft = scrollLeft.current - (x - startX.current) * 1.2
  }

  /* ── touch ── */
  const onTouchStart = (e) => { touchStart.current = e.touches[0].clientX }
  const onTouchEnd   = (e) => {
    const diff = touchStart.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 40) slideBy(diff > 0 ? 1 : -1)
  }

  /* ── update dot on scroll ── */
  const onScroll = () => {
    if (!trackRef.current) return
    const items = [...trackRef.current.querySelectorAll(`.${styles.slide}`)]
    let minDist = Infinity
    let idx = 0
    items.forEach((s, i) => {
      const dist = Math.abs(
        s.getBoundingClientRect().left - trackRef.current.getBoundingClientRect().left
      )
      if (dist < minDist) { minDist = dist; idx = i }
    })
    setCurrentIdx(idx)
  }

  return (
    <section className={styles.gallery} id="galeria">
      {/* Header */}
      <div className={`${styles.header} reveal`}>
        <span className="section-tag">Portafolio</span>
        <h2 className="section-title">
          Historias que <em>cuento</em> con luz
        </h2>
        <p className="section-desc">
          Cada sesión es única. Aquí encontrarás una muestra de mi trabajo
          en diferentes estilos y contextos.
        </p>
      </div>

      {/* Category tabs */}
      <div className={`${styles.catTabs} reveal`}>
        {CATS.map((c) => (
          <button
            key={c.key}
            className={`${styles.tab}${activeCat === c.key ? ` ${styles.active}` : ''}`}
            onClick={() => setActiveCat(c.key)}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Carousel */}
      <div className={styles.carouselWrap}>
        <button className={`${styles.btn} ${styles.prev}`} onClick={() => slideBy(-1)}>
          ←
        </button>

        <div
          className={styles.track}
          ref={trackRef}
          onMouseDown={onMouseDown}
          onMouseLeave={onMouseLeave}
          onMouseUp={onMouseUp}
          onMouseMove={onMouseMove}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onScroll={onScroll}
        >
          {visible.map((s) => (
            <div className={styles.slide} key={s.id} data-cat={s.cat}>
              <div className={styles.slideImg}>
                {/*
                  Reemplaza src con la ruta de tu foto:
                  src={`/fotos/${s.filename}`}
                */}
                <img src={s.src} alt={s.label} draggable={false} />
                <div className={styles.overlay}>
                  <span className={styles.slideLabel}>{s.label}</span>
                </div>
              </div>
              <p className={styles.caption}>{s.caption}</p>
            </div>
          ))}
        </div>

        <button className={`${styles.btn} ${styles.next}`} onClick={() => slideBy(1)}>
          →
        </button>
      </div>

      {/* Dots */}
      <div className={styles.dots}>
        {visible.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot}${i === currentIdx ? ` ${styles.active}` : ''}`}
            onClick={() => scrollToIdx(i)}
            aria-label={`Ir a imagen ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
