import { Link, useNavigate } from "react-router-dom"
import "../Styles/Evento.css"
import logo from "../assets/logo_sem fundo.png"
import { toast } from "react-toastify";
import { use, useState } from "react";
import Header from "../Components/HeaderCabecalho";


const Evento = () =>{
  const token = localStorage.getItem("token")
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    nm_evento: "",
    dt_corrida: "",
    distancia: "",
    local_corrida: ""
  })

  const validarInscricao = (data) => {
    if (!data.nm_evento || !data.dt_corrida || !data.local_corrida ) {
      return {
        valido: false,
        mensagem: "Por favor, preencha todos os campos obrigatórios."
      };
    }
    
    return { valido: true }
  };

  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const resultado = validarInscricao(formData)
    if (!resultado.valido) {
      toast.warn(resultado.mensagem)
      return
    }

    const dataRegex = /^(\d{2})-(\d{2})-(\d{4})$/;
    const match = formData.dt_corrida.match(dataRegex);
    if (!match) {
      toast.warn("A data deve estar no formato DD-MM-YYYY");
      return;
    }

    const distRegex = /^\d*$/
    const matchDist = formData.distancia.match(distRegex)
    if(!matchDist) {
      toast.warn("Escreva um número para o campo Distância")
      return
    }

    const dataFormatada = `${match[3]}-${match[2]}-${match[1]}`;

    const dadosParaEnvio = {
      ...formData,
      dt_corrida: dataFormatada
    };
  
    // Aqui vai o envio pro back
    fetch("http://localhost:3000/evento/evento", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(dadosParaEnvio),
    })
      .then((res) => {
        if (!res.ok) {
          return res.text().then(text => { throw new Error(text) });
        }
        return res.json();
      })
      .then((data) => {
        toast.success("Evento cadastrado com sucesso!")
        console.log("Resposta do back:", data)
        setFormData({
          nm_evento: "",
          dt_corrida: "",
          distancia: "",
          local_corrida: ""
        })
      })
      .catch((err) => {
        console.error("Erro na requisição:", err.message);

        if (err.message.includes("Token inválido") || err.message.includes("Token não fornecido")) {
          alert("Sessão expirada. Por favor, faça login novamente.")
          // toast.error("Sessão expirada. Por favor, faça login novamente.");

          localStorage.removeItem('token');

          navigate('/')
        }
      })
  }


  return(
    <div className="divPrincipalEvento">
      <Header />

      <form onSubmit={handleSubmit} className="formulario">
         <div className="formulario__campo">
          <label htmlFor="nomeEvento">Nome da Corrida:</label>
          <input
            type="text"
            id="nomeEvento"
            name="nm_evento"
            value={formData.nm_evento}
            onChange={handleChange}
            required 
          />
        </div>
        <div className="formulario__campo">
          <label htmlFor="distancia">Distância (Em quilômetros):</label>
          <input
            type="text"
            id="distancia"
            name="distancia"
            value={formData.distancia}
            onChange={handleChange}
            required 
          />
        </div>
        <div className="formulario__campo">
          <label htmlFor="dataCorrida">Data da Corrida:</label>
          <input
            type="text" 
            id="dataCorrida"
            name="dt_corrida"
            value={formData.dt_corrida}
            onChange={handleChange}
            required 
          />
        </div>
        <div className="formulario__campo">
          <label htmlFor="localCorrida">Local da Corrida:</label>
          <input
            type="text"
            id="localCorrida"
            name="local_corrida"
            value={formData.local_corrida}
            onChange={handleChange}
            required 
          />
        </div>
        <input type="submit" value="Cadastrar" className="formulario__botaoCadastrar" />
      </form>
    </div>    
  )
}

export default Evento;