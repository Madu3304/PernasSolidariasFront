import React from "react";
import { Link } from "react-router-dom";
// import logo from "../assets/logo_sem fundo.png";
import logo from "../assets/logo_sfdois.png";
import '../Components/HeaderCabecalho.css'; 

const headerCabecalho = () => {
  return (
    <header className="headerCabecalho">

      <nav className="header__nav">
        <div className="header__logo">
          <Link to="/" className="header__logo-link">
            <img src={logo} alt="Pernas Solidárias" className="headerlogo" />
          </Link>
        </div>
        <ul className="header__list">
          <li className="header__item">
            <Link to="/corredor" className="header__link" activeClassName="active">Corredores</Link>
          </li>
          <li className="header__item">
            <Link to="/cadeirante" className="header__link" activeClassName="active">Cadeirantes</Link>
          </li>
          <li className="header__item">
            <Link to="/evento" className="header__link" activeClassName="active">Evento</Link>
          </li>
          <li className="header__item">
            <Link to="/relatorio" className="header__link" activeClassName="active">Relatórios</Link>
          </li>
          <li className="header__item">
            <Link to="/dupla" className="header__link" activeClassName="active">Criar Duplas</Link>
          </li>
          <li className="header__item">
            <Link to="/graficos" className="header__link" activeClassName="active">Gráficos</Link>
            {/* <a href="#" className="header__link">Gráficos</a> */}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default headerCabecalho;
