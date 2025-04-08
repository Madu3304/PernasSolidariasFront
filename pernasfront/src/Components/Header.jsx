import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo_sem fundo.png"
import { toast } from "react-toastify";
import { useState } from "react";
import './Header.css'

const Header = () =>{
    return(
        <header>
            <img src={logo} alt="" />
            <Link to="/corredor" className="tirarHiperlink">Corredores</Link>
            <Link to="/cadeirante" className="tirarHiperlink">Cadeirantes</Link>
            <a>Relatórios</a>
            <Link to="/evento" className="tirarHiperlink">Evento</Link>
            <a>Gráficos</a>
            <a>Membros</a>
        </header>
    );
}

export default Header