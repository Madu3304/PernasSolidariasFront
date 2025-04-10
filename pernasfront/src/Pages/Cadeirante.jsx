import { Link } from "react-router-dom"
import logo from "../assets/logo_sem fundo.png"
import { toast } from "react-toastify"
import { useState } from "react"
import Header from "../Components/Header"
import Cadeirante from "../Styles/Cadeirante.css"

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
      toast.warn(resultado.mensagem);
      return;
    }
  
    // Aqui vai o envio pro back
    fetch("http://localhost:3001/cadeirante", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Cadeirante cadastrado com sucesso!");
        console.log("Resposta do back:", data);
      })
      .catch((err) => {
        console.error("Erro ao cadastrar cadeirante:", err);
        toast.error("Erro ao cadastrar.");
      });
  };

  return(
    <div className="divPrincipalCadeirante">
      <Header />

      <form onSubmit={handleSubmit} className="formularioCadeirante">
        <label htmlFor="">Nome Completo:</label>
        <input type="text" name="nomeCompletoCadeirante" value={formData.nomeCompletoCadeirante} onChange={handleChange} />
        <label htmlFor="">CPF:</label>
        <input type="text" name="cpfCadeirante" value={formData.cpfCadeirante} onChange={handleChange}/>
        <label htmlFor="">Tamanho da Camisa:</label>
        <input type="text" name="tamCamisaCadeirante"value={formData.tamCamisaCadeirante || ""} onChange={handleChange}/>
        <label htmlFor="">Distância:</label>
        <input type="text" name="distanciaCadeirante"value={formData.distanciaCadeirante || ""} onChange={handleChange}/>
        <label htmlFor="">Última Corrida:</label>
        <input type="text" name="ultCorridaCadeirante" value={formData.ultCorridaCadeirante || ""} onChange={handleChange}/>
        <div className="checkbox-container-cadeirante">
          <input type="checkbox" name="" id="" checked={formData.possuiCadeira} onChange={handleChange}/>
          <a>Possui cadeira própria?</a>
        </div>
        <input type="submit" value="Cadastrar" className="botaoCadastrarCadeirante" />
      </form>

    </div>
    
    
  )

}

export default Cadeirante;