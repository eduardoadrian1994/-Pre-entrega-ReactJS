import { useEffect, useState } from "react";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import Layout from "./components/Layout.jsx";
import Notice from "./components/Notice.jsx";
import ProductForm from "./components/ProductForm.jsx";
import ProductList from "./components/ProductList.jsx";

function App() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadProducts() {
      try {
        const response = await fetch("/products.json", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`No se pudo cargar el catálogo (${response.status}).`);
        }

        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error("El archivo del catálogo tiene un formato inválido.");
        }

        setProducts(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          setLoadError(error.message || "Ocurrió un error al cargar el catálogo.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    loadProducts();
    return () => controller.abort();
  }, []);

  function addProduct(product) {
    setProducts((currentProducts) => [...currentProducts, product]);
    setNotice(`${product.name} ya forma parte del catálogo.`);
  }

  function showAvailability(product, quantity) {
    if (product.stock < quantity) {
      setNotice(`Solo quedan ${product.stock} unidades de ${product.name}.`);
      return;
    }

    setNotice(
      `¡Hay disponibilidad! ${quantity} ${quantity === 1 ? "unidad" : "unidades"} de ${product.name}.`,
    );
  }

  return (
    <Layout header={<Header />} footer={<Footer />}>
      <main>
        <section className="hero" id="inicio">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-dot" /> Tecnología elegida para vos</p>
            <h1>Ideas grandes.<br /><span>Tecnología a tu ritmo.</span></h1>
            <p className="hero-description">
              Encontrá ese próximo compañero para crear, trabajar y disfrutar cada día.
            </p>
            <a className="button button-dark hero-button" href="#catalogo">
              Explorar productos <span aria-hidden="true">↘</span>
            </a>
            <div className="hero-note">
              <span className="note-stars" aria-hidden="true">★★★★★</span>
              <span>Una selección pensada para durar</span>
            </div>
          </div>
          <div className="hero-art" aria-label="Notebook abierta sobre un escritorio">
            <img
              src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1200&q=90"
              alt="Notebook de diseño minimalista sobre un escritorio"
            />
            <div className="hero-sticker">
              <span className="sticker-spark" aria-hidden="true">✳</span>
              <span>Elegí bien.<br /><strong>Disfrutá más.</strong></span>
            </div>
            <div className="hero-index">01 <span>/</span> 06</div>
          </div>
          <div className="hero-vertical">NORTE TECH · BUENOS AIRES</div>
        </section>

        <section className="catalog section-shell" id="catalogo">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Un mundo de posibilidades</p>
              <h2>Encontrá tu próximo <span>favorito.</span></h2>
            </div>
            <p className="section-aside">
              Tecnología útil, diseño cuidado y una selección que vale la pena.
            </p>
          </div>

          {isLoading && (
            <div className="catalog-message" role="status">
              <span className="loading-spinner" /> Preparando una selección para vos…
            </div>
          )}
          {!isLoading && loadError && (
            <div className="catalog-message catalog-error" role="alert">
              <strong>No pudimos abrir el catálogo.</strong>
              <span>{loadError} Verificá que la aplicación esté corriendo desde el servidor de desarrollo.</span>
            </div>
          )}
          {!isLoading && !loadError && (
            <ProductList products={products} onCheckAvailability={showAvailability} />
          )}
        </section>

        {!isLoading && !loadError && (
          <section className="add-product-section section-shell" id="nuevo-producto">
            <div className="add-product-copy">
              <p className="eyebrow">¿Tenés una novedad?</p>
              <h2>Sumala a la <span>selección.</span></h2>
              <p>
                Cargá un producto con sus datos y mirá cómo se incorpora al catálogo en el momento.
              </p>
              <div className="form-benefit">
                <span aria-hidden="true">↳</span> Se actualiza sin recargar la página
              </div>
            </div>
            <ProductForm products={products} onAddProduct={addProduct} />
          </section>
        )}

        <section className="promise-strip" aria-label="Nuestra propuesta">
          <div><span aria-hidden="true">✳</span><p>Selección con intención</p></div>
          <div><span aria-hidden="true">↗</span><p>Diseño para todos los días</p></div>
          <div><span aria-hidden="true">♡</span><p>Atención de persona a persona</p></div>
        </section>
      </main>
      {notice && <Notice message={notice} onClose={() => setNotice("")} />}
    </Layout>
  );
}

export default App;
