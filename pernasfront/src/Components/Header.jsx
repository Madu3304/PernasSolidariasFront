import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo_sem fundo.png";
import '../Components/Header.css'; 

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo">
        <img src={logo} alt="Pernas Solidárias" id="header-logo" />
      </div>
      <nav className="header__nav">
        <ul className="header__list">
          <li className="header__item">
            <Link to="/corredor" className="header__link">Corredores</Link>
          </li>
          <li className="header__item">
            <Link to="/cadeirante" className="header__link">Cadeirantes</Link>
          </li>
          <li className="header__item">
            <a href="#" className="header__link">Relatórios</a>
          </li>
          <li className="header__item">
            <Link to="/evento" className="header__link">Evento</Link>
          </li>
          <li className="header__item">
            <Link to="/graficos" className="header__link">Gráficos</Link>
            {/* <a href="#" className="header__link">Gráficos</a> */}
          </li>
          <li className="header__item">
            <a href="#" className="header__link">Membros</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
