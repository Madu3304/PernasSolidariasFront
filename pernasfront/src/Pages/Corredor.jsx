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
    <div className="divPrincipalCorredor">
      <Header />

      <form action="post" className="formularioCorredor">
        <label htmlFor="">Nome Completo:</label>
        <input type="text" name="nomeCompletoCorredor" />
        <label htmlFor="">CPF:</label>
        <input type="text" name="cpfCorredor" />
        <label htmlFor="">Tamanho da Camisa:</label>
        <input type="text" name="tamCamisaCorredor"/>
        <label htmlFor="">Distância:</label>
        <input type="text" name="distanciaCorredor"/>
        <label htmlFor="">Última Corrida:</label>
        <input type="text" name="ultCorridaCorredor"/>
        <input type="submit" value="Cadastrar" className="botaoCadastrarCorredor" />
      </form>

    </div>

  )

}

export default Corredor;