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
  readAloud: false,
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

/* ── Read aloud logic ──────────────────────── */
const IGNORED_TAGS = new Set(['SCRIPT', 'STYLE', 'SVG', 'PATH', 'NOSCRIPT'])
const IGNORE_CLASSES = ['skip-link', 'bigCursor', 'mask', 'toggle', 'panel']

function isIgnored(el) {
  if (!el || el === document.body || el === document.documentElement) return true
  if (IGNORED_TAGS.has(el.tagName)) return true
  if (el.getAttribute('aria-hidden') === 'true') return true
  const cl = el.className
  if (typeof cl === 'string' && IGNORE_CLASSES.some((c) => cl.includes(c))) return true
  return false
}

function extractText(el) {
  const tag = el.tagName

  if (tag === 'IMG') {
    const alt = el.getAttribute('alt')
    if (alt) return `Imagen: ${alt}`
    return null
  }

  if (tag === 'A') {
    const text = el.textContent.trim()
    const label = el.getAttribute('aria-label')
    const href = el.getAttribute('href') || ''
    const display = label || text
    if (!display) return null
    if (/^https?:\/\//.test(href)) return `Enlace externo: ${display}`
    if (href.startsWith('#')) return `Enlace: ${display}`
    if (href.startsWith('mailto:')) return `Correo: ${display}`
    return `Enlace: ${display}`
  }

  if (tag === 'BUTTON') {
    const label = el.getAttribute('aria-label') || el.textContent.trim()
    if (!label) return null
    return `Botón: ${label}`
  }

  if (/^H[1-6]$/.test(tag)) {
    const text = el.textContent.trim()
    if (!text) return null
    const level = tag[1]
    return level === '1' ? text : `Título: ${text}`
  }

  if (['INPUT', 'SELECT', 'TEXTAREA'].includes(tag)) {
    const id = el.getAttribute('id')
    let labelText = null
    if (id) {
      const labelEl = document.querySelector(`label[for="${id}"]`)
      if (labelEl) labelText = labelEl.textContent.trim()
    }
    const display = el.getAttribute('aria-label') || labelText || el.getAttribute('placeholder') || 'Campo de formulario'
    const value = el.value ? `: ${el.value}` : ''
    return `${display}${value}`
  }

  return null
}

function findMeaningful(el) {
  let current = el
  let depth = 0
  while (current && depth < 6) {
    if (!isIgnored(current)) {
      const text = extractText(current)
      if (text) return text
      if (current.hasAttribute('aria-label')) {
        return current.getAttribute('aria-label')
      }
    }
    if (current.classList) {
      if (current.classList.contains('section-tag') || current.classList.contains('section-title')) {
        return current.textContent.trim()
      }
      const hasName = Array.from(current.classList).some((c) => c.includes('name') || c.includes('title') || c.includes('badge'))
      if (hasName) {
        const t = current.textContent.trim()
        if (t && t.length > 2) return t
      }
    }
    current = current.parentElement
    depth++
  }
  return null
}

/* ── Component ─────────────────────────────── */
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

  /* ── Read aloud ── */
  useEffect(() => {
    if (!settings.readAloud) return

    let timer = null
    let currentEl = null

    const speak = (text) => {
      if (!text) return
      window.speechSynthesis.cancel()
      const u = new SpeechSynthesisUtterance(text)
      u.lang = 'es-PE'
      u.rate = 0.92
      u.pitch = 1
      window.speechSynthesis.speak(u)
    }

    const onOver = (e) => {
      const target = e.target
      if (target === currentEl) return
      if (isIgnored(target)) return
      currentEl = target
      clearTimeout(timer)
      window.speechSynthesis.cancel()
      timer = setTimeout(() => {
        const text = findMeaningful(target)
        if (text) speak(text)
      }, 400)
    }

    document.addEventListener('mouseover', onOver, { passive: true })
    return () => {
      clearTimeout(timer)
      window.speechSynthesis.cancel()
      document.removeEventListener('mouseover', onOver)
    }
  }, [settings.readAloud])

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
            <button
              className={`${styles.option}${settings.fontSize !== 'normal' ? ` ${styles.active}` : ''}`}
              onClick={() => toggle('fontSize')}
              aria-pressed={settings.fontSize !== 'normal'}
            >
              <span className={styles.optionIcon}>{fontSizeIcon}</span>
              <span className={styles.optionLabel}>Tamaño de fuente</span>
              <span className={styles.optionValue}>{fontSizeLabel}</span>
            </button>

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

            <button
              className={`${styles.option}${settings.readAloud ? ` ${styles.active}` : ''}`}
              onClick={() => toggle('readAloud')}
              aria-pressed={settings.readAloud}
            >
              <span className={styles.optionIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                  <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
                  <path d="M19 10v2a7 7 0 01-14 0v-2" />
                  <path d="M12 19v4" />
                  <path d="M8 23h8" />
                </svg>
              </span>
              <span className={styles.optionLabel}>Lectura en voz alta</span>
              <span className={styles.optionValue}>{settings.readAloud ? 'Activado' : 'Desactivado'}</span>
            </button>

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

      {settings.readingMask && (
        <div className={styles.mask} ref={maskRef} aria-hidden="true">
          <div className={styles.maskTop} />
          <div className={styles.maskGap} />
          <div className={styles.maskBottom} />
        </div>
      )}

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
