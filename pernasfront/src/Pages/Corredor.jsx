import { Link } from "react-router-dom";
import "../Styles/Corredor.css";
import { toast } from "react-toastify";
import { useState } from "react";
import Header from "../Components/HeaderCabecalho";

const Corredor = () => {
 const [formData, setFormData] = useState({
    nm_corredor: "",
    cpf_corredor: "",
    tamanho_blusa: "",
});

  const [situacao, setSituacao] = useState("");
  const opcoes = ["Selecione", "PP", "P", "M", "G", "GG"];

const validarInscricao = (data) => {
  if (!data.nm_corredor || !data.cpf_corredor || !data.tamanho_blusa) {
    return {
      valido: false,
      mensagem: "Por favor, preencha todos os campos obrigatórios.",
    };
  }

  const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
  if (!cpfRegex.test(data.cpf_corredor)) {
    return {
      valido: false,
      mensagem: "CPF inválido. Use o formato XXX.XXX.XXX-XX",
    };
  }

  return { valido: true };
};


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataParaEnviar = {
      nm_corredor: formData.nm_corredor,
      cpf_corredor: formData.cpf_corredor,
      tamanho_blusa: situacao, 
    };

    const resultado = validarInscricao(dataParaEnviar);
    if (!resultado.valido) {
      toast.warn(resultado.mensagem);
      return;
    }


    fetch("http://localhost:3000/corredor/corredor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataParaEnviar),
    })
      .then((res) => {
        if (!res.ok) {
          return res.text().then((text) => {
            throw new Error(text);
          });
        }
        return res.json();
      })
      .then((data) => {
        toast.success("Corredor cadastrado com sucesso!");
        console.log("Resposta do back:", data);
        setFormData({
          nm_corredor: "",
          cpf_corredor: "",
          tamanho_blusa: "",
        });
        setSituacao("");
      })
      .catch((err) => {
        console.error("Erro ao cadastrar Corredor:", err.message);
      });
  };

  return (
    <div className="divPrincipalCorredor">
      <Header />

      <form onSubmit={handleSubmit} className="formularioCorredor">
        <div className="formularioCorredor__campo">
          <label htmlFor="nm_corredor">Nome Completo:</label>
          <input
            type="text"
            id="nm_corredor"
            name="nm_corredor"
            value={formData.nm_corredor}
            onChange={handleChange}
            required
          />
        </div>

        <div className="formularioCorredor__campo">
          <label htmlFor="cpf_corredor">CPF:</label>
          <input
            type="text"
            name="cpf_corredor"
            id="cpf_corredor"
            value={formData.cpf_corredor}
            onChange={(e) => {
              let value = e.target.value.replace(/\D/g, "");
              if (value.length > 11) value = value.slice(0, 11);

              if (value.length > 9)
                value = value.replace(
                  /(\d{3})(\d{3})(\d{3})(\d{1,2})/,
                  "$1.$2.$3-$4"
                );
              else if (value.length > 6)
                value = value.replace(/(\d{3})(\d{3})(\d{1,3})/, "$1.$2.$3");
              else if (value.length > 3)
                value = value.replace(/(\d{3})(\d{1,3})/, "$1.$2");

              setFormData((prev) => ({ ...prev, cpf_corredor: value }));
            }}
            placeholder="000.000.000-00"
            required
          />
        </div>

        <div className="formularioCorredor__campo">
          <label htmlFor="tamanho_blusa">Tamanho da Camisa:</label>
          <select
            name="tamanho_blusa"
            id="tamanho_blusa"
            className="situacaoCorredor"
            value={situacao}
            onChange={(e) => setSituacao(e.target.value)}
            required
          >
            {opcoes.map((opcao, index) => (
              <option
                key={index}
                value={opcao === "Selecione" ? "" : opcao}
                disabled={opcao === "Selecione"}
              >
                {opcao}
              </option>
            ))}
          </select>
        </div>

        <input
          type="submit"
          value="Cadastrar"
          className="botaoCadastrarCorredor"
        />
      </form>
    </div>
  );
};

export default Corredor;
