import { useNavScroll } from '../hooks/useNavScroll'
import styles from '../styles/Navbar.module.css'
import { Link } from 'react-router-dom'

const NAV_LINKS = [
  { href: '#galeria',  label: 'Galería' },
  { href: '#about',    label: 'Sobre mí' },
  { href: '#packs',    label: 'Packs' },
  { href: '#contacto', label: 'Contacto' },
]

export default function Navbar({ onContact }) {
  const scrolled = useNavScroll()

  return (
    <nav className={`${styles.nav}${scrolled ? ` ${styles.scrolled}` : ''}`}>
      <a href="#" className={styles.logo}>
        <img src="/images/logo.avif" alt="Raymi Fotografía" className={styles.logoMark} />
      </a>

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
