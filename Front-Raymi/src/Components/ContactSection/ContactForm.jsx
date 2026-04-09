function ContactForm() {
  const handleSubmit = (event) => {
    event.preventDefault();
    // lógica de envío aquí
  };

  return (
    <form className="contact-form reveal right" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label>Nombre</label>
          <input type="text" placeholder="Tu nombre completo" />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" placeholder="tu@email.com" />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Teléfono</label>
          <input type="tel" placeholder="+51 9XX XXX XXX" />
        </div>

        <div className="form-group">
          <label>Tipo de servicio</label>
          <select>
            <option value="">Selecciona un pack</option>
            <option>Pack Esencial</option>
            <option>Pack Premium</option>
            <option>Pack Completo</option>
            <option>Pack Expedición</option>
            <option>Pack personalizado</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label>Cuéntame sobre tu proyecto</label>
        <textarea placeholder="¿Qué tipo de sesión buscas? ¿Tienes una fecha en mente?"></textarea>
      </div>

      <button type="submit" className="form-submit">
        Enviar mensaje →
      </button>
    </form>
  );
}

export default ContactForm;