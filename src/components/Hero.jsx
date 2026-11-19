import '../css/components/hero.css';

function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="hero__content">
        <h1 className="hero__title">El aroma del buen café en cada taza</h1>
        <p className="hero__subtitle">
          Bebidas artesanales y postres recién horneados para acompañar tu día.
        </p>
        <a href="#menu" className="hero__button">
          Ver menú
        </a>
      </div>
    </section>
  );
}

export default Hero;