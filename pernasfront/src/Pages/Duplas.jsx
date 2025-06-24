import React, { useState, useEffect } from "react"
import Header from "../Components/HeaderCabecalho"
import "../Styles/Dupla.css"

const Dupla = () => {
  const [eventoQuery, setEventoQuery] = useState("")
  const [eventos, setEventos] = useState([])
  const [eventoSelecionado, setEventoSelecionado] = useState(null)

  const [duplas, setDuplas] = useState([
    { corredorId: null, corredorNome: "", cadeiranteId: null, cadeiranteNome: "" }
  ])

  const [corredoresSugestoes, setCorredoresSugestoes] = useState([])
  const [cadeirantesSugestoes, setCadeirantesSugestoes] = useState([])

  // Busca eventos conforme o usuário digita
  useEffect(() => {
    if (eventoQuery.length > 1) {
      DuplasService.buscarEventos(eventoQuery).then(setEventos)
    } else {
      setEventos([])
    }
  }, [eventoQuery])

  // Atualiza autocomplete corredor para a linha index
  const buscarCorredores = async (query, index) => {
    if (query.length > 0) {
      const res = await DuplasService.buscarCorredores(query)
      setCorredoresSugestoes(res)
    } else {
      setCorredoresSugestoes([])
    }
  }

  // Atualiza autocomplete cadeirante para a linha index
  const buscarCadeirantes = async (query, index) => {
    if (query.length > 0) {
      const res = await DuplasService.buscarCadeirantes(query)
      setCadeirantesSugestoes(res)
    } else {
      setCadeirantesSugestoes([])
    }
  }

  // Atualiza valor corredor na linha index
  const handleCorredorChange = (index, value) => {
    const novasDuplas = [...duplas]
    novasDuplas[index].corredorNome = value
    novasDuplas[index].corredorId = null
    setDuplas(novasDuplas)
    buscarCorredores(value, index)
  }

  // Atualiza valor cadeirante na linha index
  const handleCadeiranteChange = (index, value) => {
    const novasDuplas = [...duplas]
    novasDuplas[index].cadeiranteNome = value
    novasDuplas[index].cadeiranteId = null
    setDuplas(novasDuplas)
    buscarCadeirantes(value, index)
  }

  // Seleciona corredor da lista de sugestões
  const selecionarCorredor = (index, corredor) => {
    const novasDuplas = [...duplas]
    novasDuplas[index].corredorNome = corredor.nome
    novasDuplas[index].corredorId = corredor.id
    setDuplas(novasDuplas)
    setCorredoresSugestoes([])
  }

  // Seleciona cadeirante da lista de sugestões
  const selecionarCadeirante = (index, cadeirante) => {
    const novasDuplas = [...duplas]
    novasDuplas[index].cadeiranteNome = cadeirante.nome
    novasDuplas[index].cadeiranteId = cadeirante.id
    setDuplas(novasDuplas)
    setCadeirantesSugestoes([])
  }

  // Adiciona nova linha dupla
  const adicionarLinha = () => {
    setDuplas([...duplas, { corredorId: null, corredorNome: "", cadeiranteId: null, cadeiranteNome: "" }])
  }

  // Remove linha dupla
  const removerLinha = (index) => {
    const novasDuplas = duplas.filter((_, i) => i !== index)
    setDuplas(novasDuplas)
  }

  // Salvar duplas
  const salvar = async () => {
    if (!eventoSelecionado) {
      alert("Selecione um evento antes de salvar")
      return
    }

    // Verifica se todas as duplas tem ids selecionados
    for (let i = 0; i < duplas.length; i++) {
      if (!duplas[i].corredorId || !duplas[i].cadeiranteId) {
        alert(`Preencha corretamente corredor e cadeirante na linha ${i + 1}`)
        return
      }
    }

    // Formata dados para backend
    const dadosSalvar = duplas.map(d => ({
      corredorId: d.corredorId,
      cadeiranteId: d.cadeiranteId
    }))

    try {
      await DuplasService.salvarDuplasEvento(eventoSelecionado.id, dadosSalvar)
      alert("Duplas salvas com sucesso!")
      // Opcional: limpar formulário
      setDuplas([{ corredorId: null, corredorNome: "", cadeiranteId: null, cadeiranteNome: "" }])
      setEventoSelecionado(null)
      setEventoQuery("")
    } catch (error) {
      console.error(error)
      alert("Erro ao salvar duplas")
    }
  }

  return (
    <div className="duplasConta">
        <Header />
      <h2>Associar Duplas ao Evento</h2>

      <label>Buscar evento:</label>
      <input
        type="text"
        value={eventoQuery}
        onChange={(e) => setEventoQuery(e.target.value)}
        placeholder="Digite nome do evento"
      />
      {eventos.length > 0 && (
        <ul className="autocomplete-list">
          {eventos.map(ev => (
            <li
              key={ev.id}
              onClick={() => {
                setEventoSelecionado(ev)
                setEventoQuery(ev.nome)
                setEventos([])
              }}
            >
              {ev.nome}
            </li>
          ))}
        </ul>
      )}

      {eventoSelecionado && (
        <div>
          <h3>Evento selecionado: {eventoSelecionado.nome}</h3>

          <table>
            <thead>
              <tr>
                <th>Corredor</th>
                <th>Cadeirante</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {duplas.map((dupla, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="text"
                      value={dupla.corredorNome}
                      onChange={(e) => handleCorredorChange(index, e.target.value)}
                      placeholder="Digite nome corredor"
                      autoComplete="off"
                    />
                    {/* Sugestões corredor */}
                    {corredoresSugestoes.length > 0 && dupla.corredorNome && (
                      <ul className="autocomplete-list">
                        {corredoresSugestoes.map(corredor => (
                          <li
                            key={corredor.id}
                            onClick={() => selecionarCorredor(index, corredor)}
                          >
                            {corredor.nome}
                          </li>
                        ))}
                      </ul>
                    )}
                  </td>
                  <td>
                    <input
                      type="text"
                      value={dupla.cadeiranteNome}
                      onChange={(e) => handleCadeiranteChange(index, e.target.value)}
                      placeholder="Digite nome cadeirante"
                      autoComplete="off"
                    />
                    {/* Sugestões cadeirante */}
                    {cadeirantesSugestoes.length > 0 && dupla.cadeiranteNome && (
                      <ul className="autocomplete-list">
                        {cadeirantesSugestoes.map(cadeirante => (
                          <li
                            key={cadeirante.id}
                            onClick={() => selecionarCadeirante(index, cadeirante)}
                          >
                            {cadeirante.nome}
                          </li>
                        ))}
                      </ul>
                    )}
                  </td>
                  <td>
                    <button className="salva" onClick={() => removerLinha(index)}>Remover</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button className="salva" onClick={adicionarLinha}>Adicionar Linha</button>

          <br />

          <button className="salva" onClick={salvar}>Salvar</button>
        </div>
      )}
    </div>
  )
}

export default Dupla
