import { Link } from "react-router-dom"
import "../Styles/Evento.css"
import logo from "../assets/logo_sem fundo.png"
import { toast } from "react-toastify";
import { useState } from "react";
import Header from "../Components/Header";


const Evento = () =>{

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
      },
      body: JSON.stringify(dadosParaEnvio),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Evento cadastrado com sucesso!")
        // setFormData('')
        // formData.nm_evento = ''
        console.log("Resposta do back:", data)
      })
      .catch((err) => {
        console.error("Erro ao evento cadeirante:", err)
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
            name="nomeEvento"
            value={formData.nomeEvento}
            onChange={handleChange}
            required 
          />
        </div>
        <div className="formulario__campo">
          <label htmlFor="distancia">Distância:</label>
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
            name="dataCorrida"
            value={formData.dataCorrida}
            onChange={handleChange}
            required 
          />
        </div>
        <div className="formulario__campo">
          <label htmlFor="localCorrida">Local da Corrida:</label>
          <input
            type="text"
            id="localCorrida"
            name="localCorrida"
            value={formData.localCorrida}
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