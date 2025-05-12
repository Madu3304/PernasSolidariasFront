import { Link } from "react-router-dom"
import logo from "../assets/logo_sem fundo.png"
import { toast } from "react-toastify"
import { useState } from "react"
import Header from "../Components/Header"
import "../Styles/Cadeirante.css"

const Cadeirantes = () =>{

  const [formData, setFormData] = useState({
    nomeCompletoCadeirante: "",
    cpfCadeirante: ""
   })

  const validarInscricao = (data) => {
    if (!data.nomeCompletoCadeirante || !data.cpfCadeirante) {
      return {
        valido: false,
        mensagem: "Por favor, preencha todos os campos obrigatórios."
      };
    }
    
    return { valido: true }
  }

  const [situacao, setSituacao] = useState("")
  const opcoes = ["Selecione", "Sim", "Não"]

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  
    const resultado = validarInscricao(formData)
    if (!resultado.valido) {
      toast.warn(resultado.mensagem)
      return
    }
  
    const dadosParaEnvio = {
      ...formData,
      ComSemCadeira: situacao
    }
  
    // Aqui vai o envio pro back
    fetch("http://localhost:3000/cadeirante/cadeirante", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
        toast.success("Cadeirante cadastrado com sucesso!");
        console.log("Resposta do back:", data);
      })
      .catch((err) => {
        console.error("Erro ao cadastrar cadeirante:", err.message);
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
        <input type="text" name="tamanhoBlusa" value={formData.tamanhoBlusa || ""} onChange={handleChange} />
        
        <div className="checkbox-container-cadeirante">
          <label htmlFor="situacao">Possui cadeira própria?</label>
          <div className="situacao">
            <select name="ComSemCadeira" id="situacao" value={situacao} onChange={(e) => setSituacao(e.target.value)} >
              {opcoes.map((opcao, index) => (
                <option key={index} value={opcao === "Selecione" ? "" : opcao}>
                  {opcao}
                </option>
              ))}
            </select>
          </div>
        </div>
        <input type="submit" value="Cadastrar" className="botaoCadastrarCadeirante" onChange={handleChange} />
      </form>
    </div>
  )
}

export default Cadeirantes