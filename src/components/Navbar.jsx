import { useNavScroll } from '../hooks/useNavScroll'
import styles from '../styles/Navbar.module.css'
import { Link } from 'react-router-dom'

const NAV_LINKS = [
  { href: '/Gallery',  label: 'Galería' },
  { href: '/#about',    label: 'Nosotros' },
  { href: '/#packs',    label: 'Packs' },
  { href: '/#contacto', label: 'Contacto' },
]

export default function Navbar({ onContact }) {
  const scrolled = useNavScroll()

  return (
    <nav className={`${styles.nav}${scrolled ? ` ${styles.scrolled}` : ''}`}>
      <Link to="/" className={styles.logo}>
        <div className={styles.logoMark}>
          {/* Reemplaza el contenido con: <img src="/logo.svg" alt="Logo" /> */}
          ✦
        </div>
        RaymiEstudio
      </Link>

      <ul className={styles.links}>
        {NAV_LINKS.map(({ href, label }) => (
          <li key={href}>
            <Link to={href}>{label}</Link>
          </li>
        ))}
      </ul>

      <button className={styles.cta} onClick={onContact}>
        Reservar sesión
      </button>
    </nav>
  )
}
