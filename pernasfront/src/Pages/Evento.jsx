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
    
    return { valido: true };
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const resultado = validarInscricao(formData);
    if (!resultado.valido) {
      toast.warn(resultado.mensagem); //cantinho da tela luizinho 
      return;
    }

    //pro back
    console.log("Dados enviados:", formData);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  return(
    <div className="divPrincipalEvento">
      <Header />

      <form action="post" className="formulario">
        <label htmlFor="">Nome da Corrida:</label>
        <input type="text" name="nomeCompleto" />
        <label htmlFor="">Distância:</label>
        <input type="text" name="distancia"/>
        <label htmlFor="">Data da Corrida:</label>
        <input type="text" name="dataCorrida"/>
        <input type="submit" value="Cadastrar" className="botaoCadastrar" />
      </form>

    </div>
    
    
  )

}

export default Evento;