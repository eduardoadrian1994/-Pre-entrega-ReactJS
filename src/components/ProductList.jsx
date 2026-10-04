import { useMemo, useState } from "react";
import ProductCard from "./ProductCard.jsx";

function ProductList({ products, onCheckAvailability }) {
  const [activeCategory, setActiveCategory] = useState("Todo");
  const [search, setSearch] = useState("");
  const categories = useMemo(
    () => ["Todo", ...new Set(products.map((product) => product.category))],
    [products],
  );
  const visibleProducts = useMemo(() => {
    const query = search.trim().toLocaleLowerCase("es");
    return products.filter((product) => {
      const matchesCategory =
        activeCategory === "Todo" || product.category === activeCategory;
      const matchesSearch =
        !query ||
        `${product.name} ${product.description} ${product.category}`
          .toLocaleLowerCase("es")
          .includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, products, search]);

  return (
    <>
      <div className="catalog-controls">
        <div className="category-filters" aria-label="Filtrar por categoría">
          {categories.map((category) => (
            <button
              className={`filter-chip${activeCategory === category ? " is-active" : ""}`}
              key={category}
              type="button"
              aria-pressed={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <label className="search-field">
          <span className="search-icon" aria-hidden="true">⌕</span>
          <span className="visually-hidden">Buscar productos</span>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="¿Qué estás buscando?"
          />
          <kbd>/</kbd>
        </label>
      </div>
      <div className="catalog-meta">
        <span>{visibleProducts.length} productos para descubrir</span>
        <span className="catalog-meta-right"><span className="stock-dot" /> Stock actualizado</span>
      </div>
      {visibleProducts.length > 0 ? (
        <div className="product-grid">
          {visibleProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              onCheckAvailability={onCheckAvailability}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <span aria-hidden="true">⌕</span>
          <h3>No encontramos ese producto</h3>
          <p>Probá con otro nombre o elegí una categoría diferente.</p>
          <button
            className="text-button"
            type="button"
            onClick={() => {
              setSearch("");
              setActiveCategory("Todo");
            }}
          >
            Limpiar filtros <span aria-hidden="true">↗</span>
          </button>
        </div>
      )}
    </>
  );
}

export default ProductList;
