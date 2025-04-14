import { Link } from "react-router-dom"
import "../Styles/Corredor.css"
import logo from "../assets/logo_sem fundo.png"
import { toast } from "react-toastify";
import { useState } from "react";
import Header from "../Components/Header";


const Corredor = () =>{

  const [formData, setFormData] = useState({
    nomeCompletoCorredor: "",
    cpfCorredor: "",
  });

  const validarInscricao = (data) => {
    if (!data.nome || !data.cpf) {
      return {
        valido: false,
        mensagem: "Por favor, preencha todos os campos obrigatórios."
      };
    }
    
    return { valido: true };
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const resultado = validarInscricao(formData);
    if (!resultado.valido) {
      toast.warn(resultado.mensagem)
      return
    }
  }  


  // Aqui vai o envio pro back
  fetch("http://localhost:3000/corredor", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((res) => res.json())
    .then((data) => {
      toast.success("Cadeirante Corredor com sucesso!")
      console.log("Resposta do back:", data)
    })
    .catch((err) => {
      console.error("Erro ao cadastrar Corredor:", err)
    });


  return(
    <div className="divPrincipalCorredor">
      <Header />

      <form onSubmit={handleSubmit} className="formularioCorredor">
        <label htmlFor="">Nome Completo:</label>
        <input type="text" name="nomeCompletoCorredor" value={formData.nomeCompletoCorredor} onChange={handleChange} />
        <label htmlFor="">CPF:</label>
        <input type="text" name="cpfCorredor" value={formData.cpfCorredor} onChange={handleChange} />
        <label htmlFor="">Tamanho da Camisa:</label>
        <input type="text" name="tamCamisaCorredor" value={formData.tamCamisaCorredor || ""} onChange={handleChange} />
        <label htmlFor="">Distância:</label>
        <input type="text" name="distanciaCorredor" value={formData.distanciaCorredor || ""} onChange={handleChange} />
        <label htmlFor="">Última Corrida:</label>/
        <input type="text" name="ultCorridaCorredor" value={formData.ultCorridaCorredor || ""} onChange={handleChange} />
        <input type="submit" value="Cadastrar" className="botaoCadastrarCorredor" />
      </form>
    </div>

  )
}

export default Corredor;