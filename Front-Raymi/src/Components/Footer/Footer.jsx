import "./Footer.css";

function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <div>
          <div className="footer-logo">
            Raymi<span>Estudio</span>
          </div>
          <p className="footer-tagline">Fotografía profesional · Lima, Perú</p>
        </div>
        <div className="footer-socials">
          <a
            className="social-btn"
            href="https://www.instagram.com/raymi_fotografia/"
            title="Instagram"
            target="_blank"
            rel="noopener noreferrer"
          >
            📸
          </a>
          <a className="social-btn" href="#" title="Facebook">
            📘
          </a>
          <a className="social-btn" href="#" title="WhatsApp">
            💬
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Raymi · Todos los derechos reservados</span>
      </div>
    </footer>
  );
}

export default Footer;