import { useState, useEffect } from 'react'
import { CONTACT_INFO, PACKS } from '../data'
import styles from '../styles/Modal.module.css'

const INITIAL_FORM = {
  nombre:   '',
  email:    '',
  telefono: '',
  pack:     '',
  mensaje:  '',
}

export default function Modal({ isOpen, onClose, preselect }) {
  const [form, setForm] = useState(INITIAL_FORM)
  const [sent, setSent] = useState(false)

   useEffect(() => {
    if (preselect) {
      setForm((prev) => ({ ...prev, pack: `Pack ${preselect}` }))
    }
  }, [preselect])

  const set = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => {
      setSent(false)
      setForm(INITIAL_FORM)
      onClose()
    }, 2800)
  }

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div
      className={`${styles.overlay}${isOpen ? ` ${styles.open}` : ''}`}
      onClick={handleOverlayClick}
      aria-hidden={!isOpen}
    >
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title} id="modal-title">
            Hablemos de<br /><em>tu historia</em>
          </h2>
          <button className={styles.close} onClick={onClose} aria-label="Cerrar">
            ✕
          </button>
        </div>

        {/* Body */}
        <div className={styles.body}>
          {/* Info strip */}
          <div className={styles.infoStrip}>
            {CONTACT_INFO.map((info) => (
              <div className={styles.infoItem} key={info.label}>
                <span className={styles.infoIcon}>{info.icon}</span>
                <div>
                  <div className={styles.infoLabel}>{info.label}</div>
                  <div className={styles.infoValue}>{info.value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="nombre">Nombre</label>
                <input
                  id="nombre"
                  type="text"
                  placeholder="Tu nombre completo"
                  value={form.nombre}
                  onChange={set('nombre')}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={form.email}
                  onChange={set('email')}
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="telefono">Teléfono</label>
                <input
                  id="telefono"
                  type="tel"
                  placeholder="+51 9XX XXX XXX"
                  value={form.telefono}
                  onChange={set('telefono')}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="pack">Tipo de servicio</label>
                <select
                  id="pack"
                  value={form.pack}
                  onChange={set('pack')}
                >
                  <option value="">Selecciona un pack</option>
                  {PACKS.map((p) => (
                    <option key={p.name} value={`Pack ${p.name}`}>
                      Pack {p.name}
                    </option>
                  ))}
                  <option value="Pack personalizado">Pack personalizado</option>
                </select>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="mensaje">Cuéntame sobre tu proyecto</label>
              <textarea
                id="mensaje"
                placeholder="¿Qué tipo de sesión buscas? ¿Tienes una fecha en mente? Cuéntame todo..."
                value={form.mensaje}
                onChange={set('mensaje')}
              />
            </div>

            <button
              type="submit"
              className={`${styles.submit}${sent ? ` ${styles.sent}` : ''}`}
            >
              {sent ? '✓ Mensaje enviado' : 'Enviar mensaje →'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
