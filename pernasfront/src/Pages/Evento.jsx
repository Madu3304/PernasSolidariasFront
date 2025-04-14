import { Link } from "react-router-dom"
import "../Styles/Evento.css"
import logo from "../assets/logo_sem fundo.png"
import { toast } from "react-toastify";
import { useState } from "react";
import Header from "../Components/Header";


const Evento = () =>{

  const [formData, setFormData] = useState({
    nomeCompleto: "",
    dataCorrida: ""
  });

  const validarInscricao = (data) => {
    if (!data.nomeCompleto || !data.dataCorrida ) {
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
  
    // Aqui vai o envio pro back
    fetch("http://localhost:3000/evento", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Cadeirante evento com sucesso!")
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
        <label htmlFor="">Nome da Corrida:</label>
        <input type="text" name="nomeCompleto" value={formData.nomeCompleto} onChange={handleChange} />
        <label htmlFor="">Distância:</label>
        <input type="text" name="distancia" value={formData.distancia} onChange={handleChange}/>
        <label htmlFor="">Data da Corrida:</label>
        <input type="text" name="dataCorrida" value={formData.dataCorrida} onChange={handleChange}/>
        <input type="submit" value="Cadastrar" className="botaoCadastrar" />
      </form>
    </div>    
  )
}

export default Evento;