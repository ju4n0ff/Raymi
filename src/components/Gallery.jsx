import { useState, useRef, useCallback, useEffect } from 'react'
import { SLIDES, CATS } from '../data'
import styles from '../styles/Gallery.module.css'

export default function Gallery() {
  const [activeCat, setActiveCat] = useState('all')
  const [currentIdx, setCurrentIdx] = useState(0)
  const [lightboxIdx, setLightboxIdx] = useState(null)
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

  const lbSlideBy = (dir) => {
    setLightboxIdx((prev) => {
      const next = prev + dir
      if (next < 0) return visible.length - 1
      if (next >= visible.length) return 0
      return next
    })
  }

  // reset when category changes
  useEffect(() => {
    setCurrentIdx(0)
    trackRef.current?.scrollTo({ left: 0, behavior: 'smooth' })
  }, [activeCat])

  // keyboard for lightbox
  useEffect(() => {
    if (lightboxIdx === null) return
    const handler = (e) => {
      if (e.key === 'Escape') setLightboxIdx(null)
      if (e.key === 'ArrowLeft') lbSlideBy(-1)
      if (e.key === 'ArrowRight') lbSlideBy(1)
    }
    window.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [lightboxIdx])

  /* ── drag to scroll ── */
  const onMouseDown = (e) => {
    isDragging.current = true
    startX.current = e.pageX - trackRef.current.offsetLeft
    scrollLeft.current = trackRef.current.scrollLeft
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
  const onTouchEnd = (e) => {
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
          {visible.map((s, i) => (
            <div
              className={styles.slide}
              key={s.id}
              data-cat={s.cat}
              onClick={() => setLightboxIdx(i)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter') setLightboxIdx(i) }}
            >
              <div className={styles.slideImg}>
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

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <div
          className={styles.lightbox}
          onClick={(e) => { if (e.target === e.currentTarget) setLightboxIdx(null) }}
        >
          <button
            className={styles.lbClose}
            onClick={() => setLightboxIdx(null)}
            aria-label="Cerrar"
          >
            ✕
          </button>

          <button
            className={`${styles.lbArrow} ${styles.lbPrev}`}
            onClick={() => lbSlideBy(-1)}
            aria-label="Anterior"
          >
            ←
          </button>

          <div className={styles.lbImage}>
            <img src={visible[lightboxIdx].src} alt={visible[lightboxIdx].label} />
            <div className={styles.lbInfo}>
              <span>{visible[lightboxIdx].label}</span>
              <span>{visible[lightboxIdx].caption}</span>
            </div>
          </div>

          <button
            className={`${styles.lbArrow} ${styles.lbNext}`}
            onClick={() => lbSlideBy(1)}
            aria-label="Siguiente"
          >
            →
          </button>

          <div className={styles.lbCounter}>
            {lightboxIdx + 1} / {visible.length}
          </div>
        </div>
      )}
    </section>
  )
}
