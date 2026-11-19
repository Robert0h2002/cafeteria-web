import '../css/components/menu-card.css';

// tag, description y price son opcionales:
// los cafés propios traen todo, las recetas de la API solo título e imagen
function MenuCard({ title, image, price, tag, description }) {
  return (
    <article className="menu-card">
      <img src={image} alt={title} className="menu-card__image" loading="lazy" />
      <div className="menu-card__body">
        {tag && <span className="menu-card__tag">{tag}</span>}
        <h3 className="menu-card__title">{title}</h3>
        {description && (
          <p className="menu-card__description">{description}</p>
        )}
        {price !== undefined && (
          <p className="menu-card__price">Bs {price}</p>
        )}
      </div>
    </article>
  );
}

export default MenuCard;
