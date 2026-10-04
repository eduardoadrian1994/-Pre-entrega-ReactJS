const team = [
  { name: "Valentina Fernández", role: "Dirección creativa", initials: "VF", color: "peach" },
  { name: "Martín Bianchi", role: "Desarrollo", initials: "MB", color: "blue" },
  { name: "Camila Torres", role: "Experiencia de cliente", initials: "CT", color: "green" },
];

function Footer() {
  return (
    <footer className="site-footer" id="equipo">
      <div className="footer-main">
        <div className="footer-about">
          <a className="brand footer-brand" href="#inicio" aria-label="Norte Tech, ir al inicio">
            <span className="brand-mark" aria-hidden="true">
              <span /><span /><span /><span />
            </span>
            <span className="brand-name">norte<span>tech</span><small>TECNOLOGÍA CON INTENCIÓN</small></span>
          </a>
          <p>Creemos que la tecnología correcta no te distrae de tus ideas: te ayuda a hacerlas realidad.</p>
          <a className="footer-email" href="mailto:hola@nortetech.com.ar">
            hola@nortetech.com.ar <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="team-area">
          <div className="team-heading">
            <div>
              <p className="eyebrow">Personas detrás de cada detalle</p>
              <h2>Un equipo que <span>te entiende.</span></h2>
            </div>
            <span className="team-count">03 / EQUIPO</span>
          </div>
          <div className="team-grid">
            {team.map((person) => (
              <article className="team-card" key={person.name}>
                <div className={`team-avatar avatar-${person.color}`} aria-hidden="true">{person.initials}</div>
                <div>
                  <h3>{person.name}</h3>
                  <p>{person.role}</p>
                </div>
                <span className="team-arrow" aria-hidden="true">↗</span>
              </article>
            ))}
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Norte Tech. Hecho con intención.</span>
        <span>Buenos Aires, Argentina <span className="footer-location-dot" /></span>
      </div>
    </footer>
  );
}

export default Footer;
