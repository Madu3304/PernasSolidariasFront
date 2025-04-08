import { Link } from "react-router-dom"
import "../Styles/Graficos.css"
import logo from "../assets/logo_sem fundo.png"
import { useEffect, useState } from "react";
import axios from "axios";


import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

const Grafico = () => {
  const [dados, setDados] = useState([]);

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

      <div style={{ width: "100%", height: 400 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={dados}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nome" /> {/* substitua pelo campo certo */}
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="quantidade" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
    </div>
  );
};

export default Grafico;
