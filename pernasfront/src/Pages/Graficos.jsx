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
    <div style={{ width: "100%", height: 400 }}>
      <ResponsiveContainer>
        <LineChart data={dados}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="nome" /> {/* ou o campo do seu banco */}
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="quantidade" stroke="#8884d8" /> {/*  */}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Grafico;
