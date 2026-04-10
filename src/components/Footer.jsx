import styles from '../styles/Footer.module.css'

const SOCIALS = [
  { icon: '📸', label: 'Instagram', href: '#' },
  { icon: '📘', label: 'Facebook',  href: '#' },
  { icon: '💬', label: 'WhatsApp',  href: '#' },
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div>
          <div className={styles.logo}>
            Nombre<span>Estudio</span>
          </div>
          <p className={styles.tagline}>Fotografía profesional · Lima, Perú</p>
        </div>

        <div className={styles.socials}>
          {SOCIALS.map(({ icon, label, href }) => (
            <a
              key={label}
              className={styles.socialBtn}
              href={href}
              title={label}
              aria-label={label}
            >
              {icon}
            </a>
          ))}
        </div>
      </div>

      <div className={styles.bottom}>
        <span>© {new Date().getFullYear()} NombreEstudio · Todos los derechos reservados</span>
        <span>Hecho con ✦ en Lima</span>
      </div>
    </footer>
  )
}
