import { useNavScroll } from '../hooks/useNavScroll'
import styles from '../styles/Navbar.module.css'

const NAV_LINKS = [
  { href: '#galeria',  label: 'Galería' },
  { href: '#about',    label: 'Nosotros' },
  { href: '#packs',    label: 'Packs' },
  { href: '#contacto', label: 'Contacto' },
]

export default function Navbar({ onContact }) {
  const scrolled = useNavScroll()

  return (
    <nav className={`${styles.nav}${scrolled ? ` ${styles.scrolled}` : ''}`}>
      <a href="#" className={styles.logo}>
        <div className={styles.logoMark}>
          {/* Reemplaza el contenido con: <img src="/logo.svg" alt="Logo" /> */}
          ✦
        </div>
        NombreEstudio
      </a>

      <ul className={styles.links}>
        {NAV_LINKS.map(({ href, label }) => (
          <li key={href}>
            <a href={href}>{label}</a>
          </li>
        ))}
      </ul>

      <button className={styles.cta} onClick={onContact}>
        Reservar sesión
      </button>
    </nav>
  )
}
