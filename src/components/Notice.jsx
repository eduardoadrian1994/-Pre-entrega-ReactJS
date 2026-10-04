import { useEffect } from "react";

function Notice({ message, onClose }) {
  useEffect(() => {
    const timeout = window.setTimeout(onClose, 4000);
    return () => window.clearTimeout(timeout);
  }, [message, onClose]);

  return (
    <div className="notice" role="status">
      <span className="notice-icon" aria-hidden="true">✓</span>
      <p>{message}</p>
      <button type="button" aria-label="Cerrar aviso" onClick={onClose}>×</button>
    </div>
  );
}

export default Notice;
