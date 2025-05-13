import { Link } from "react-router-dom"
import InputMask from 'react-input-mask';
import "../Styles/Corredor.css"
import logo from "../assets/logo_sem fundo.png"
import { toast } from "react-toastify";
import { useState } from "react";
import Header from "../Components/Header";


const Corredor = () =>{

  const [formData, setFormData] = useState({
    nm_corredor: "",
    cpf_corredor: "",
  });

  const validarInscricao = (data) => {
    if (!data.nm_corredor || !data.cpf_corredor) {
      return {
        valido: false,
        mensagem: "Por favor, preencha todos os campos obrigatórios."
      };
    }

    // Regex para validar CPF com pontuação
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    if (!cpfRegex.test(data.cpf_corredor)) {
      return {
        valido: false,
        mensagem: "CPF inválido. Use o formato XXX.XXX.XXX-XX"
      };
    }

    return { valido: true };
  };


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
  
    fetch("http://localhost:3000/corredor/corredor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) {
          return res.text().then(text => { throw new Error(text) })
        }
        return res.json()
      })
      .then((data) => {
        toast.success("Corredor cadastrado com sucesso!")
        console.log("Resposta do back:", data);
      })
      .catch((err) => {
        console.error("Erro ao cadastrar Corredor:", err.message)
      })
  }  

  return(
    <div className="divPrincipalCorredor">
      <Header />

      <form onSubmit={handleSubmit} className="formularioCorredor">
        <label htmlFor="">Nome Completo:</label>
        <input type="text" name="nm_corredor" value={formData.nm_corredor} onChange={handleChange} />
        <label htmlFor="cpf">CPF:</label>
        <input
          type="text"
          name="cpf_corredor"
          value={formData.cpf_corredor}
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

            setFormData((prev) => ({ ...prev, cpf_corredor: value }));
          }}
          placeholder="000.000.000-00"
        />
        {/* <input type="text" name="cpf_corredor" value={formData.cpf_corredor} onChange={handleChange} /> */}
        {/* <label htmlFor="">Tamanho da Camisa:</label>
        <input type="text" name="tamanho_blusa" value={formData.tamanho_blusa || ""} onChange={handleChange} /> */}
        <label htmlFor="tamanho_blusa" id="label-tamanho-blusa">Tamanho da Camisa</label>
        <select name="tamanho_blusa" id="tamanho_blusa" value={formData.tamanho_blusa || ""} onChange={handleChange}>
          <option value="" selected disabled>Selecione</option>
          <option value="PP">PP</option>
          <option value="P">P</option>
          <option value="M">M</option>
          <option value="G">G</option>
          <option value="GG">GG</option>
          <option value="XGG">XGG</option>
        </select>
        <input type="submit" value="Cadastrar" className="botaoCadastrarCorredor" />
      </form>
    </div>

  )
}

export default Corredor;