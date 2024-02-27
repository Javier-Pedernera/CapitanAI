import React from 'react';

const DropdownMenu: React.FC = () => {
  return (
    <div className="dropdown">
      <button className="dropbtn">Menú</button>
      <div className="dropdown-content">
        <div>Acerca</div>
        <div>Contacto</div>
        <div>Preguntas Frecuentes</div>
      </div>
    </div>
  );
}

export default DropdownMenu;