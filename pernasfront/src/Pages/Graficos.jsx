import { Link } from "react-router-dom"
import "../Styles/Graficos.css"
import logo from "../assets/logo_sem fundo.png"
import { useEffect, useState } from "react";
import axios from "axios";

import React from "react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Header from "../Components/HeaderCabecalho";

// const data = [
//   { name: 'Jan', valor: 30 },
//   { name: 'Fev', valor: 45 },
//   { name: 'Mar', valor: 28 },
//   { name: 'Abr', valor: 60 },
// ];

const Grafico = () => {

  const [dadosCadeirante, setDadosCadeirante] = useState([]);
  const [dadosCorredor, setDadosCorredor] = useState([]);
  const [dadosEvento, setDadosEvento] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3000/Relatorio/grafico-cadeirantes')
      .then(response => {
        const dadosCadeiranteFormatados = response.data.map(item => ({
          name: item.nome,
          Valor: item.qtd
        }));
        setDadosCadeirante(dadosCadeiranteFormatados);
        setCarregando(false);
      })
      .catch(error => {
        console.error('Erro ao buscar dados do gráfico:', error);
        setCarregando(false);
      });
  }, []);

  
  useEffect(() => {
    axios.get('http://localhost:3000/Relatorio/grafico-corredores')
      .then(response => {
        const dadosCorredorFormatados = response.data.map(item => ({
          name: item.nome,
          Valor: item.qtd
        }));
        setDadosCorredor(dadosCorredorFormatados);
        setCarregando(false);
      })
      .catch(error => {
        console.error('Erro ao buscar dados do gráfico:', error);
        setCarregando(false);
      });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:3000/Relatorio/grafico-eventos')
      .then(response => {
        const dadosEventoFormatados = response.data.map(item => ({
          name: item.nome,
          Valor: item.qtd
        }));
        setDadosEvento(dadosEventoFormatados);
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
      <div className="graficos">
        <div className="graf-cadeirante-corrida">
          <h2 className="titulo-graf-cadeirante-corrida">Cadeirantes que mais participaram de corridas</h2>
          <ResponsiveContainer width="100%" aspect={0.7}>
            <BarChart
              layout="vertical"
              data={dadosCadeirante}
              margin={{ left: 30 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" />
              <Tooltip />
              <Legend />
              <Bar dataKey="Valor" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="graf-corredor-corrida">
          <h2 className="titulo-graf-corredor-corrida">Corredores que mais participaram de corridas</h2>
          <ResponsiveContainer width="100%" aspect={0.7}>
            <BarChart
              layout="vertical"
              data={dadosCorredor}
              margin={{ left: 30 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" />
              <Tooltip />
              <Legend />
              <Bar dataKey="Valor" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="graf-evento-inscricoes">
          <h2 className="titulo-graf-evento-inscricoes">Eventos com mais inscrições</h2>
          <ResponsiveContainer width="100%" aspect={0.7}>
            <BarChart
              layout="vertical"
              data={dadosEvento}
              margin={{ left: 30 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" />
              <Tooltip />
              <Legend />
              <Bar dataKey="Valor" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Grafico
