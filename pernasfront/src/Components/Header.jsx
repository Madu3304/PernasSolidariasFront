import React from "react";
import { Link } from "react-router-dom";
// import logo from "../assets/logo_sem fundo.png";
import logo from "../assets/logo_sfdois.png";
import '../Components/Header.css'; 

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo">
        <Link to="/" className="header__logo-link">
          {/* <img src={logo} alt="Pernas Solidárias" className="header__logo" /> */}
        </Link>
      </div>

      <nav className="header__nav">
        <ul className="header__list">
          <li className="header__item">
            <Link to="/corredor" className="header__link" activeClassName="active">Corredores</Link>
          </li>
          <li className="header__item">
            <Link to="/cadeirante" className="header__link" activeClassName="active">Cadeirantes</Link>
          </li>
          <li className="header__item">
            <a href="#" className="header__link" activeClassName="active">Relatórios</a>
          </li>
          <li className="header__item">
            <Link to="/evento" className="header__link" activeClassName="active">Evento</Link>
          </li>
          <li className="header__item">
            <Link to="/graficos" className="header__link" activeClassName="active">Gráficos</Link>
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
