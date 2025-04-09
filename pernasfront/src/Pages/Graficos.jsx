import { Link } from "react-router-dom"
import "../Styles/Graficos.css"
import logo from "../assets/logo_sem fundo.png"
import { useEffect, useState } from "react";
import axios from "axios";


import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

const Grafico = () => {
  const [dados, setDados] = useState({ corredores: [], cadeirantes: [], eventos: [] });

  useEffect(() => {
    const buscarDados = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/grafico");
        setDados(res.data);
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
      }
    };

    buscarDados();
  }, []);

  return (
    <div>
       <div className="divPrincipalGraficos">
      <header>
        <img src={logo} alt="Logo Pernas Solidárias" />
        <Link to="/corredor" className="tirarHiperlink">Corredores</Link>
        <Link to="/cadeirante" className="tirarHiperlink">Cadeirantes</Link>
        <a>Relatórios</a>
        <Link to="/evento" className="tirarHiperlink">Evento</Link>
        <a>Gráficos</a>
        <a>Membros</a>
      </header>

      <div className="container-graficos">
      <div className="grafico">
        <h3>Corredores que mais participaram</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dados.corredores.map(item => ({
            nome: item.Corredor.nomeCorredor,
            quantidade: item.quantidade
          }))}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nome" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="quantidade" fill="#00CED1" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grafico">
        <h3>Cadeirantes que mais participaram</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dados.cadeirantes.map(item => ({
            nome: item.Cadeirante.nomeCadeirante,
            quantidade: item.quantidade
          }))}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nome" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="quantidade" fill="#00CED1" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grafico">
        <h3>Eventos com mais inscrições</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dados.eventos.map(item => ({
            nome: item.Evento.nomeEvento,
            quantidade: item.quantidade
          }))}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nome" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="quantidade" fill="#00CED1" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
    </div>
    </div>
  );
};

export { Grafico }
