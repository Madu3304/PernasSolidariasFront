import { Link } from "react-router-dom"
import "../Styles/Graficos.css"
import logo from "../assets/logo_sem fundo.png"
import { useEffect, useState } from "react";
import axios from "axios";

import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Header from "../Components/HeaderCabecalho";

// const data = [
//   { name: 'Jan', valor: 30 },
//   { name: 'Fev', valor: 45 },
//   { name: 'Mar', valor: 28 },
//   { name: 'Abr', valor: 60 },
// ];

const Grafico = () => {

  const [dados, setDados] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3000/Relatorio/grafico-cadeirantes')
      .then(response => {
        const dadosFormatados = response.data.map(item => ({
          name: item.nome,
          Valor: item.qtd
        }));
        setDados(dadosFormatados);
        setCarregando(false);
      })
      .catch(error => {
        console.error('Erro ao buscar dados do gráfico:', error);
        setCarregando(false);
      });
  }, []);

  return (
    <div className="tela">
      <Header/>
      <div className="graf-cadeirante-corrida">
        <h2 className="titulo-graf-cadeirante-corrida">Cadeirantes que mais participaram de corridas</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={dados}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Valor" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Grafico
