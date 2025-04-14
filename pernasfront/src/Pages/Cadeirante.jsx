import { Link } from "react-router-dom"
import logo from "../assets/logo_sem fundo.png"
import { toast } from "react-toastify"
import { useState } from "react"
import Header from "../Components/Header"
import "../Styles/Cadeirante.css"

const Cadeirantes = () =>{

  const [formData, setFormData] = useState({
    nomeCompletoCadeirante: "",
    cpfCadeirante: "",
    possuiCadeira: false
  })

  const [mostrarOpcoes, setMostrarOpcoes] = useState(false)


  const validarInscricao = (data) => {
    if (!data.nomeCompletoCadeirant || !data.cpfCadeirante || !data.possuiCadeira) {
      return {
        valido: false,
        mensagem: "Por favor, preencha todos os campos obrigatórios."
      };
    }
    
    return { valido: true }
  }

  //botao de marcar cadeira propria
  const comSemCadeira = (opcao) => {
    setFormData((prev) => ({
      ...prev,
      possuiCadeira: opcao === "Sim"
    }))
    setMostrarOpcoes(false);
  }


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
    fetch("http://localhost:3000/cadeirante", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Cadeirante cadastrado com sucesso!")
        console.log("Resposta do back:", data)
      })
      .catch((err) => {
        console.error("Erro ao cadastrar cadeirante:", err)
      })
  }

  return(
    <div className="divPrincipalCadeirante">
      <Header />

      <form onSubmit={handleSubmit} className="formularioCadeirante">
        <label htmlFor="">Nome Completo:</label>
        <input type="text" name="nomeCompletoCadeirante" value={formData.nomeCompletoCadeirante} onChange={handleChange} />
        <label htmlFor="">CPF:</label>
        <input type="text" name="cpfCadeirante" value={formData.cpfCadeirante} onChange={handleChange}/>
        <label htmlFor="">Tamanho da Camisa:</label>
        <input type="text" name="tamCamisaCadeirante" value={formData.tamCamisaCadeirante || ""} onChange={handleChange} />
        <label htmlFor="">Distância:</label>
        <input type="text" name="distanciaCadeirante" value={formData.distanciaCadeirante || ""} onChange={handleChange} />
        <label htmlFor="">Última Corrida:</label>
        <input type="text" name="ultCorridaCadeirante" value={formData.ultCorridaCadeirante || ""} onChange={handleChange} />

          <div className="checkbox-container-cadeirante">
          <label>Possui cadeira própria?</label>
          <button type="button" onClick={() => setMostrarOpcoes(!mostrarOpcoes)}>
            Escolher
          </button>

          {mostrarOpcoes && (
            <div className="campoEscolha">
              <button type="button" onClick={() => comSemCadeira("Sim")}>Sim</button>
              <button type="button" onClick={() => comSemCadeira("Não")}>Não</button>
            </div>
          )}
        </div>

        <input type="submit" value="Cadastrar" className="botaoCadastrarCadeirante" onChange={handleChange} />
      </form>
    </div>
  )
}

export default Cadeirantes