import './Hero.css'; 

function Hero() {
  return (
    <section id="hero">
      <div className="hero-left">
        <p className="hero-tag">Fotografía profesional · Lima, Perú</p>
        <h1 className="hero-title">
          Cada momento<br />
          <em>merece ser</em><br />
          eterno
        </h1>
        <p className="hero-desc">
          Retratos, bodas, eventos y naturaleza. Capturo la esencia de tus 
          momentos más valiosos con luz natural y una mirada auténtica.
        </p>
        <div className="hero-actions">
          <a href="#galeria" className="btn-primary">Ver galería</a>
          <a href="#packs" className="btn-ghost">
            Ver packs <span>→</span>
          </a>
        </div>
        <div className="hero-line">Disponible para toda Lima y alrededores</div>
      </div>

      <div className="hero-right">
        {/* En React es obligatorio cerrar la etiqueta img con /> */}
        <img 
          src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=900&q=80" 
          alt="Fotografía de retrato" 
        />
      </div>

      <div className="scroll-indicator">
        <div className="line"></div>
        <span>Scroll</span>
      </div>
    </section>
  );
}

export default Hero;