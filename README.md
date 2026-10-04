# Norte Tech — Pre-entrega

Catálogo de tecnología desarrollado con React y Vite para la pre-entrega del proyecto.

## Ejecutar localmente

```bash
npm install
npm run dev
```

Los comandos `npm run build` y `npm run lint` permiten verificar la compilación y el código.

## Funcionalidades

- Catálogo inicial cargado con `fetch` desde `public/products.json` en un efecto de React.
- Tarjetas de producto reutilizables, filtros por categoría, búsqueda, favoritos, cantidad y consulta de disponibilidad.
- Formulario para agregar productos con ID automático, validación de imagen y actualización inmediata del catálogo.
- Layout compartido con encabezado, navegación por secciones, información de la empresa y tres tarjetas del equipo.

Los productos agregados desde el formulario se mantienen en el estado de la aplicación durante la sesión actual; no hay servidor ni persistencia entre recargas. El sistema de rutas y el carrito global quedan fuera de esta pre-entrega, según la consigna.
