import { useState, useEffect } from 'react';
import '../css/components/header.css';

// encabezado con logo menu y modo oscuro
function Header() {
  // tema guardado o claro por defecto
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  // aplica el tema y lo guarda
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // cambia entre claro y oscuro
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <header className="header">
      <div className="header__container">
        <a href="#inicio" className="header__logo">
          ☕ Cafetería
        </a>

        <nav className="header__nav" aria-label="Navegación principal">
          <a href="#inicio" className="header__link">Inicio</a>
          <a href="#menu" className="header__link">Menú</a>
          <a href="#contacto" className="header__link">Contacto</a>
        </nav>

        <button
          type="button"
          className="header__toggle"
          onClick={toggleTheme}
          aria-label="Cambiar tema de color"
        >
          {theme === 'light' ? '🌙 Modo oscuro' : '☀️ Modo claro'}
        </button>
      </div>
    </header>
  );
}

export default Header;