import "./Navbar.css";
import React, { useState, useEffect } from 'react';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav id="navbar" className={scrolled ? "scrolled" : ""}>
      <a className="nav-logo" href="#">
        <div className="logo-mark">✦</div>
        Raymi Fotografía
      </a>

      <ul className="nav-links">
        <li><a href="#galeria">Galería</a></li>
        <li><a href="#about">Nosotros</a></li>
        <li><a className="nav-cta" href="#packs">Packs</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;