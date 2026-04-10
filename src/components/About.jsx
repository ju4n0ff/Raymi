import styles from '../styles/About.module.css'

const STATS = [
  { num: '5+',   label: 'Años de experiencia' },
  { num: '300+', label: 'Sesiones realizadas' },
  { num: '100%', label: 'Clientes satisfechos' },
]

export default function About() {
  return (
    <section className={styles.about} id="about">
      {/* Image */}
      <div className={`${styles.imgWrap} reveal from-left`}>
        {/*
          Reemplaza src con tu foto de perfil/estudio:
          src="/fotos/sobre-mi.jpg"
        */}
        <img
          src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=700&q=80"
          alt="El fotógrafo"
        />
      </div>

      {/* Content */}
      <div className={`${styles.content} reveal from-right`}>
        <span className="section-tag">Sobre mí</span>
        <h2 className="section-title">
          Una mirada<br /><em>que escucha</em>
        </h2>

        <p className={styles.bio}>
          Soy fotógrafo profesional con base en Lima, especializado en
          retratos, bodas, eventos y naturaleza. Mi enfoque es crear imágenes
          honestas que capturen la emoción del momento sin artificios. Trabajo
          con luz natural siempre que es posible, y cuando no, la recreo con
          cuidado y sensibilidad.
        </p>
        <p className={`${styles.bio} ${styles.bio}`}>
          Cada cliente es único, cada historia diferente. Me tomo el tiempo
          de conocer a las personas antes de fotografiarlas, porque la
          confianza es la base de una gran foto.
        </p>

        <div className={styles.stats}>
          {STATS.map(({ num, label }) => (
            <div key={label}>
              <div className={styles.statNum}>{num}</div>
              <div className={styles.statLabel}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
