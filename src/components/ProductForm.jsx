import { useState } from "react";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

function readImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("No se pudo procesar la imagen seleccionada."));
      }
    };
    reader.onerror = () => reject(new Error("No se pudo leer la imagen seleccionada."));
    reader.readAsDataURL(file);
  });
}

function ProductForm({ products, onAddProduct }) {
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const nextId =
    products.reduce((highestId, product) => Math.max(highestId, Number(product.id) || 0), 0) + 1;

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    const form = event.currentTarget;
    const formData = new FormData(form);
    const imageFile = formData.get("image");

    if (!(imageFile instanceof File) || imageFile.size === 0) {
      setError("Elegí una imagen para identificar el producto.");
      return;
    }

    if (!imageFile.type.startsWith("image/")) {
      setError("El archivo seleccionado debe ser una imagen.");
      return;
    }

    if (imageFile.size > MAX_IMAGE_SIZE) {
      setError("La imagen debe pesar menos de 5 MB.");
      return;
    }

    setIsSaving(true);
    try {
      const image = await readImage(imageFile);
      onAddProduct({
        id: nextId,
        name: String(formData.get("name")).trim(),
        category: String(formData.get("category")).trim(),
        description: String(formData.get("description")).trim(),
        price: Number(formData.get("price")),
        stock: Number(formData.get("stock")),
        rating: null,
        image,
        tag: "Recién llegado",
      });
      form.reset();
    } catch (readError) {
      setError(readError.message || "No se pudo agregar el producto.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <div className="form-heading">
        <div>
          <span className="form-step">NUEVO PRODUCTO</span>
          <h3>Completá los detalles</h3>
        </div>
        <span className="form-id">ID #{String(nextId).padStart(3, "0")}</span>
      </div>
      <div className="form-fields">
        <label className="form-field">
          <span>Nombre del producto</span>
          <input name="name" type="text" placeholder="Ej. Cámara compacta" required maxLength={70} />
        </label>
        <label className="form-field">
          <span>Categoría</span>
          <input name="category" type="text" placeholder="Ej. Fotografía" required maxLength={35} />
        </label>
        <label className="form-field">
          <span>Precio <small>ARS</small></span>
          <input name="price" type="number" placeholder="0" min="1" step="1" required />
        </label>
        <label className="form-field">
          <span>Unidades disponibles</span>
          <input name="stock" type="number" placeholder="0" min="0" step="1" required />
        </label>
        <label className="form-field form-field-wide">
          <span>Descripción breve</span>
          <input name="description" type="text" placeholder="¿Qué lo hace especial?" required maxLength={100} />
        </label>
        <label className="form-field form-field-wide upload-field">
          <span>Imagen del producto</span>
          <input name="image" type="file" accept="image/*" required />
          <small>JPG, PNG o WebP · Hasta 5 MB</small>
        </label>
      </div>
      {error && <p className="form-error" role="alert">{error}</p>}
      <button className="button button-dark submit-button" type="submit" disabled={isSaving}>
        {isSaving ? "Agregando producto…" : "Agregar al catálogo"}
        {!isSaving && <span aria-hidden="true">↗</span>}
      </button>
      <p className="form-footnote">El producto aparecerá en la selección al instante.</p>
    </form>
  );
}

export default ProductForm;
