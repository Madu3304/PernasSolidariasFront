import { Link } from "react-router-dom"
import "../Styles/Cadeirante.css"
import logo from "../assets/logo_sem fundo.png"
import { toast } from "react-toastify";
import { useState } from "react";
import Header from "../Components/Header";

const Cadeirante = () =>{

  const [formData, setFormData] = useState({
    nomeCompletoCadeirante: "",
    cpfCadeirante: "",
    possuiCadeira: false
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
    <div className="divPrincipalCadeirante">
      <Header />

      <form action="post" className="formularioCadeirante">
        <label htmlFor="">Nome Completo:</label>
        <input type="text" name="nomeCompletoCadeirante" />
        <label htmlFor="">CPF:</label>
        <input type="text" name="cpfCadeirante" />
        <label htmlFor="">Tamanho da Camisa:</label>
        <input type="text" name="tamCamisaCadeirante"/>
        <label htmlFor="">Distância:</label>
        <input type="text" name="distanciaCadeirante"/>
        <label htmlFor="">Última Corrida:</label>
        <input type="text" name="ultCorridaCadeirante"/>
        <div className="checkbox-container-cadeirante">
          <input type="checkbox" name="" id="" />
          <a>Possui cadeira própria?</a>
        </div>
        <input type="submit" value="Cadastrar" className="botaoCadastrarCadeirante" />
      </form>

    </div>
    
    
  )

}

export default Cadeirante;