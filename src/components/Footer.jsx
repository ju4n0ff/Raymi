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
        <div className={styles.column}>
          <div className={styles.logo}>
            Nombre<span>Estudio</span>
          </div>
          <p className={styles.description}>
            Estudio boutique de fotografía profesional dedicado a capturar la esencia de tus momentos más especiales.
          </p>
        </div>

        <div className={styles.column}>
          <h4>Menú</h4>
          <a href="#">Galería</a>
          <a href="#">Nosotros</a>
          <a href="#">Packs</a>
          <a href="#">Contacto</a>
        </div>

        <div className={styles.column}>
          <h4>Patrocinadores</h4>
          <span className={styles.item}>Canon Perú</span>
          <span className={styles.item}>Adobe Studio</span>
          <span className={styles.item}>Vite Framework</span>
        </div>

        <div className={styles.column}>
          <h4>Contacto</h4>
          <a href="mailto:hola@estudio.com">hola@estudio.com</a>
          <span>+51 999 888 777</span>
          <span>Av. Las Artes 123, Lima</span>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.socials}>
          <a href="#" className={styles.socialBtn}>📸</a>
          <a href="#" className={styles.socialBtn}>📘</a>
          <a href="#" className={styles.socialBtn}>💬</a>
        </div>
        
        <div className={styles.legal}>
          <span>© {new Date().getFullYear()} NombreEstudio · Todos los derechos reservados</span>
          <span>Hecho en Lima - Perú</span>
        </div>
      </div>
    </footer>
  )
}
