// import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { useState } from "react"
import Header from "../Components/HeaderCabecalho"
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

    // Regex para validar CPF com pontuação
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    if (!cpfRegex.test(data.cpfCadeirante)) {
      return {
        valido: false,
        mensagem: "CPF inválido. Use o formato XXX.XXX.XXX-XX"
      };
    }

    return { valido: true };
  };

  const [situacaoBlusa, setSituacaoBlusa] = useState("")
   const opcoesBlusa = ["Selecione", "P", "M", "G", "GG"]

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
      nm_cadeirante: formData.nomeCompletoCadeirante,
      cpf_cadeirante: formData.cpfCadeirante,
      tamanho_blusa: situacaoBlusa,
      s_n_cadeira: situacao
      // Se você for usar `distanciaCadeirante`, adicione aqui também
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
        <div className="formularioCadeirante__campo">
          <label htmlFor="nomeCompletoCadeirante">Nome Completo:</label>
            <input type="text" name="nomeCompletoCadeirante" value={formData.nomeCompletoCadeirante} onChange={handleChange} required/>
        </div>

        <div className="formularioCadeirante__campo">
        <label htmlFor="cpfCadeirante">CPF:</label>
        <input type="text" name="cpfCadeirante" value={formData.cpfCadeirante} 
          onChange={(e) => {
            let value = e.target.value.replace(/\D/g, ""); // Remove tudo que não for dígito
            if (value.length > 11) value = value.slice(0, 11);

            // Aplica a máscara manualmente
            if (value.length > 9)
              value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, "$1.$2.$3-$4");
            else if (value.length > 6)
              value = value.replace(/(\d{3})(\d{3})(\d{1,3})/, "$1.$2.$3");
            else if (value.length > 3)
              value = value.replace(/(\d{3})(\d{1,3})/, "$1.$2");

            setFormData((prev) => ({ ...prev, cpfCadeirante: value }));
          }}
          placeholder="000.000.000-00" required/>
        </div>

        <div className="formularioCorredor__campo">
          <label htmlFor="tamanho_blusa">Tamanho da Camisa:</label>
          <select name="tamanho_blusa" id="tamanho_blusa" className="situacaoCorredor" value={situacaoBlusa} 
            onChange={ (e) => setSituacaoBlusa(e.target.value)} >
            {opcoesBlusa.map((opcao, index) => (
              <option key={index} value={opcao === "Selecione" ? "" : opcao} disabled={opcao === "Selecione"} >
                {opcao}
              </option>
            ))}
          </select>
        </div>

        <div className="formularioCadeirante__campo">
          <label htmlFor="situacao">Possui cadeira própria?</label>
          <div className="situacao">
            <select name="ComSemCadeira" id="situacao" className="situacaoCadeirante" value={situacao} onChange={(e) => setSituacao(e.target.value)} >
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