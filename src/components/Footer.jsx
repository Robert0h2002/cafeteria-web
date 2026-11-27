import '../css/components/footer.css';

// pie con direccion horario y redes
function Footer() {
  return (
    <footer id="contacto" className="footer">
      <div className="footer__container">
        <div className="footer__section">
          <h2 className="footer__title">📍 Dirección</h2>
          <p className="footer__text">Av. Arce #1234, Zona Sopocachi</p>
          <p className="footer__text">La Paz, Bolivia</p>
        </div>

        <div className="footer__section">
          <h2 className="footer__title">🕒 Horario</h2>
          <p className="footer__text">Lunes a Viernes: 07:30 - 20:30</p>
          <p className="footer__text">Sábados y Domingos: 09:00 - 19:00</p>
        </div>

        <div className="footer__section">
          <h2 className="footer__title">📱 Redes</h2>
          <div className="footer__socials">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="footer__link"
            >
              Instagram
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="footer__link"
            >
              Facebook
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noreferrer"
              className="footer__link"
            >
              TikTok
            </a>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© 2026 Cafetería — Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;