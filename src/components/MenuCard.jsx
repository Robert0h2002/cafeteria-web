import '../css/components/menu-card.css';

function MenuCard({ title, image, price }) {
  return (
    <article className="menu-card">
      <img src={image} alt={title} className="menu-card__image" />
      <div className="menu-card__body">
        <h3 className="menu-card__title">{title}</h3>
        {price !== undefined && (
          <p className="menu-card__price">Bs {price}</p>
        )}
      </div>
    </article>
  );
}

export default MenuCard;