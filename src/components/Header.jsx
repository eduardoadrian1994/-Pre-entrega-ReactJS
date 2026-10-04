function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#inicio" aria-label="Norte Tech, ir al inicio">
        <span className="brand-mark" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </span>
        <span className="brand-name">norte<span>tech</span><small>TECNOLOGÍA CON INTENCIÓN</small></span>
      </a>
      <nav className="main-nav" aria-label="Navegación principal">
        <a href="#inicio">Inicio</a>
        <a href="#catalogo">Productos</a>
        <a href="#nuevo-producto">Sumar producto</a>
        <a href="#equipo">Nosotros</a>
      </nav>
      <a className="header-cta" href="#catalogo">
        Descubrir <span aria-hidden="true">↗</span>
      </a>
    </header>
  );
}

export default Header;
