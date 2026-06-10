import { useState, useEffect, useCallback, useRef } from 'react'
import styles from '../styles/AccessibilityPanel.module.css'

const STORAGE_KEY = 'raymi-a11y'

const DEFAULTS = {
  fontSize: 'normal',
  contrast: 'normal',
  underline: false,
  grayscale: false,
  dyslexia: false,
  lineSpacing: 'normal',
  readingMask: false,
  bigCursor: false,
}

function loadSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return { ...DEFAULTS, ...JSON.parse(raw) }
  } catch { /* ignore */ }
  return { ...DEFAULTS }
}

function applyToDoc(settings) {
  const root = document.documentElement
  root.setAttribute('data-font-size', settings.fontSize)
  root.setAttribute('data-contrast', settings.contrast)
  root.setAttribute('data-underline', settings.underline ? 'true' : 'false')
  root.setAttribute('data-grayscale', settings.grayscale ? 'true' : 'false')
  root.setAttribute('data-dyslexia', settings.dyslexia ? 'true' : 'false')
  root.setAttribute('data-line-spacing', settings.lineSpacing)
  root.setAttribute('data-big-cursor', settings.bigCursor ? 'true' : 'false')
}

export default function AccessibilityPanel() {
  const [open, setOpen] = useState(false)
  const [settings, setSettings] = useState(loadSettings)
  const [mouseY, setMouseY] = useState(0)
  const [mouseX, setMouseX] = useState(0)
  const maskRef = useRef(null)
  const cursorRef = useRef(null)

  useEffect(() => {
    applyToDoc(settings)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
  }, [settings])

  const toggle = useCallback((key) => {
    if (key === 'fontSize') {
      setSettings((prev) => ({
        ...prev,
        fontSize:
          prev.fontSize === 'normal'
            ? 'large'
            : prev.fontSize === 'large'
              ? 'xlarge'
              : 'normal',
      }))
    } else if (key === 'lineSpacing') {
      setSettings((prev) => ({
        ...prev,
        lineSpacing:
          prev.lineSpacing === 'normal'
            ? 'relaxed'
            : prev.lineSpacing === 'relaxed'
              ? 'loose'
              : 'normal',
      }))
    } else if (key === 'contrast') {
      setSettings((prev) => ({
        ...prev,
        contrast: prev.contrast === 'normal' ? 'high' : 'normal',
      }))
    } else if (typeof DEFAULTS[key] === 'boolean') {
      setSettings((prev) => ({ ...prev, [key]: !prev[key] }))
    }
  }, [])

  const reset = useCallback(() => {
    setSettings({ ...DEFAULTS })
  }, [])

  /* ── Reading mask mouse tracking ── */
  useEffect(() => {
    if (!settings.readingMask) return
    const handler = (e) => {
      setMouseY(e.clientY)
      if (maskRef.current) {
        maskRef.current.style.setProperty('--mask-y', `${e.clientY}px`)
      }
    }
    window.addEventListener('mousemove', handler, { passive: true })
    return () => window.removeEventListener('mousemove', handler)
  }, [settings.readingMask])

  /* ── Big cursor mouse tracking ── */
  useEffect(() => {
    if (!settings.bigCursor) return
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    if (isTouch) return

    const move = (e) => {
      setMouseX(e.clientX)
      setMouseY(e.clientY)
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`
      }
    }
    window.addEventListener('mousemove', move, { passive: true })
    return () => window.removeEventListener('mousemove', move)
  }, [settings.bigCursor])

  const fontSizeLabel =
    settings.fontSize === 'normal'
      ? 'Normal'
      : settings.fontSize === 'large'
        ? 'Grande'
        : 'Muy grande'

  const fontSizeIcon =
    settings.fontSize === 'normal'
      ? 'A'
      : settings.fontSize === 'large'
        ? 'A+'
        : 'A++'

  const lineSpacingLabel =
    settings.lineSpacing === 'normal'
      ? 'Normal'
      : settings.lineSpacing === 'relaxed'
        ? 'Relajado'
        : 'Suelto'

  return (
    <>
      {/* Toggle button */}
      <button
        className={`${styles.toggle}${open ? ` ${styles.toggleOpen}` : ''}`}
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Panel de accesibilidad"
        aria-expanded={open}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v8M8 12h8" />
        </svg>
      </button>

      {/* Panel */}
      {open && (
        <div className={styles.panel} role="dialog" aria-label="Opciones de accesibilidad">
          <div className={styles.header}>
            <span className={styles.title}>Accesibilidad</span>
            <button
              className={styles.resetBtn}
              onClick={reset}
              aria-label="Restablecer valores predeterminados"
            >
              Restablecer
            </button>
          </div>

          <div className={styles.options + ' ' + styles.scrollable}>
            {/* Tamaño de fuente */}
            <button
              className={`${styles.option}${settings.fontSize !== 'normal' ? ` ${styles.active}` : ''}`}
              onClick={() => toggle('fontSize')}
              aria-pressed={settings.fontSize !== 'normal'}
            >
              <span className={styles.optionIcon}>{fontSizeIcon}</span>
              <span className={styles.optionLabel}>Tamaño de fuente</span>
              <span className={styles.optionValue}>{fontSizeLabel}</span>
            </button>

            {/* Alto contraste */}
            <button
              className={`${styles.option}${settings.contrast === 'high' ? ` ${styles.active}` : ''}`}
              onClick={() => toggle('contrast')}
              aria-pressed={settings.contrast === 'high'}
            >
              <span className={styles.optionIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a10 10 0 010 20V2z" />
                </svg>
              </span>
              <span className={styles.optionLabel}>Alto contraste</span>
              <span className={styles.optionValue}>{settings.contrast === 'high' ? 'Activado' : 'Desactivado'}</span>
            </button>

            {/* Interlineado */}
            <button
              className={`${styles.option}${settings.lineSpacing !== 'normal' ? ` ${styles.active}` : ''}`}
              onClick={() => toggle('lineSpacing')}
              aria-pressed={settings.lineSpacing !== 'normal'}
            >
              <span className={styles.optionIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                  <path d="M12 3v18M8 7l4-4 4 4M8 17l4 4 4-4" />
                </svg>
              </span>
              <span className={styles.optionLabel}>Interlineado</span>
              <span className={styles.optionValue}>{lineSpacingLabel}</span>
            </button>

            {/* Dislexia amigable */}
            <button
              className={`${styles.option}${settings.dyslexia ? ` ${styles.active}` : ''}`}
              onClick={() => toggle('dyslexia')}
              aria-pressed={settings.dyslexia}
            >
              <span className={styles.optionIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                  <path d="M4 7V4h16v3" />
                  <path d="M9 20h6" />
                  <path d="M12 4v16" />
                </svg>
              </span>
              <span className={styles.optionLabel}>Dislexia amigable</span>
              <span className={styles.optionValue}>{settings.dyslexia ? 'Activado' : 'Desactivado'}</span>
            </button>

            {/* Máscara de lectura */}
            <button
              className={`${styles.option}${settings.readingMask ? ` ${styles.active}` : ''}`}
              onClick={() => toggle('readingMask')}
              aria-pressed={settings.readingMask}
            >
              <span className={styles.optionIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                  <rect x="2" y="3" width="20" height="3" rx="1" />
                  <rect x="2" y="18" width="20" height="3" rx="1" />
                </svg>
              </span>
              <span className={styles.optionLabel}>Máscara de lectura</span>
              <span className={styles.optionValue}>{settings.readingMask ? 'Activado' : 'Desactivado'}</span>
            </button>

            {/* Cursor grande */}
            <button
              className={`${styles.option}${settings.bigCursor ? ` ${styles.active}` : ''}`}
              onClick={() => toggle('bigCursor')}
              aria-pressed={settings.bigCursor}
            >
              <span className={styles.optionIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                  <path d="M6 3l14 8-6 2-3 6-2-6-6-3z" />
                </svg>
              </span>
              <span className={styles.optionLabel}>Cursor grande</span>
              <span className={styles.optionValue}>{settings.bigCursor ? 'Activado' : 'Desactivado'}</span>
            </button>

            {/* Subrayar enlaces */}
            <button
              className={`${styles.option}${settings.underline ? ` ${styles.active}` : ''}`}
              onClick={() => toggle('underline')}
              aria-pressed={settings.underline}
            >
              <span className={styles.optionIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                  <path d="M6 3v12a6 6 0 0012 0V3" />
                  <path d="M4 21h16" />
                </svg>
              </span>
              <span className={styles.optionLabel}>Subrayar enlaces</span>
              <span className={styles.optionValue}>{settings.underline ? 'Activado' : 'Desactivado'}</span>
            </button>

            {/* Escala de grises */}
            <button
              className={`${styles.option}${settings.grayscale ? ` ${styles.active}` : ''}`}
              onClick={() => toggle('grayscale')}
              aria-pressed={settings.grayscale}
            >
              <span className={styles.optionIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                  <rect x="2" y="2" width="20" height="20" rx="2" />
                  <path d="M2 2l20 20M22 2L2 22" />
                </svg>
              </span>
              <span className={styles.optionLabel}>Escala de grises</span>
              <span className={styles.optionValue}>{settings.grayscale ? 'Activado' : 'Desactivado'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Reading mask overlay */}
      {settings.readingMask && (
        <div className={styles.mask} ref={maskRef} aria-hidden="true">
          <div className={styles.maskTop} />
          <div className={styles.maskGap} />
          <div className={styles.maskBottom} />
        </div>
      )}

      {/* Big cursor */}
      {settings.bigCursor && (
        <div className={styles.bigCursor} ref={cursorRef} aria-hidden="true">
          <svg viewBox="0 0 32 32" fill="none">
            <path
              d="M4 4l8 22 4.5-9.5L26 13 4 4z"
              fill="rgba(181,113,74,.25)"
              stroke="var(--terracota)"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}
    </>
  )
}
