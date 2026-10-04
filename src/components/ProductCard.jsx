import { useState } from "react";

const currency = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

function ProductCard({ product, index, onCheckAvailability }) {
  const [quantity, setQuantity] = useState(product.stock > 0 ? 1 : 0);
  const [isFavorite, setIsFavorite] = useState(false);
  const outOfStock = product.stock === 0;
  const displayedQuantity = Math.min(quantity, product.stock);

  return (
    <article
      className="product-card"
      style={{ "--card-index": index }}
    >
      <div className="product-image-wrap">
        <img
          className="product-image"
          src={product.image}
          alt={product.name}
          loading="lazy"
        />
        {product.tag && <span className="product-tag">{product.tag}</span>}
        <button
          className={`favorite-button${isFavorite ? " is-favorite" : ""}`}
          type="button"
          aria-label={isFavorite ? `Quitar ${product.name} de favoritos` : `Agregar ${product.name} a favoritos`}
          aria-pressed={isFavorite}
          onClick={() => setIsFavorite((favorite) => !favorite)}
        >
          {isFavorite ? "♥" : "♡"}
        </button>
        <span className={`availability-label${outOfStock ? " is-out" : ""}`}>
          <span /> {outOfStock ? "Sin stock" : "Disponible"}
        </span>
      </div>
      <div className="product-content">
        <div className="product-category">{product.category}<span>★ {product.rating || "Nuevo"}</span></div>
        <h3>{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-price-row">
          <strong>{currency.format(product.price)}</strong>
          <span>{outOfStock ? "Consultanos" : `${product.stock} disponibles`}</span>
        </div>
        <div className="product-actions">
          <div className="quantity-picker" aria-label={`Cantidad de ${product.name}`}>
            <button
              type="button"
              aria-label="Restar una unidad"
              disabled={outOfStock || displayedQuantity <= 1}
              onClick={() => setQuantity((current) => Math.max(1, current - 1))}
            >
              −
            </button>
            <span aria-live="polite">{displayedQuantity}</span>
            <button
              type="button"
              aria-label="Sumar una unidad"
              disabled={outOfStock || displayedQuantity >= product.stock}
              onClick={() =>
                setQuantity((current) => Math.min(product.stock, current + 1))
              }
            >
              +
            </button>
          </div>
          <button
            className="availability-button"
            type="button"
            disabled={outOfStock}
            onClick={() => onCheckAvailability(product, displayedQuantity)}
          >
            {outOfStock ? "Agotado" : "Consultar"} <span aria-hidden="true">↗</span>
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
