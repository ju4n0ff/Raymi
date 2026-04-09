function ContactInfo() {
  return (
    <div className="contact-left reveal left">
      <span className="section-tag">Contacto</span>
      <h2 className="section-title">
        Hablemos de <br /><em>tu historia</em>
      </h2>

      <div className="contact-info">
        <div className="contact-row">
          <div className="icon-wrap">📍</div>
          <div>
            <div className="label">Ubicación</div>
            <div className="value">Lima, Perú · Disponible para viajes</div>
          </div>
        </div>

        <div className="contact-row">
          <div className="icon-wrap">📸</div>
          <div>
            <div className="label">Instagram</div>
            <a
              href="https://www.instagram.com/raymi_fotografia/"
              className="value"
              target="_blank"
              rel="noopener noreferrer"
            >
              @raymi_fotografia
            </a>
          </div>
        </div>

        <div className="contact-row">
          <div className="icon-wrap">✉️</div>
          <div>
            <div className="label">Email</div>
            <a href="mailto:raymifotografia24@gmail.com" className="value">
              raymifotografia24@gmail.com
            </a>
          </div>
        </div>

        <div className="contact-row">
          <div className="icon-wrap">📱</div>
          <div>
            <div className="label">WhatsApp</div>
            <a
              href="https://w.app/raymi"
              className="value"
              target="_blank"
              rel="noopener noreferrer"
            >
              +51 952 365 703
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactInfo;