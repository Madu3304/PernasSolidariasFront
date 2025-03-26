import "../Styles/Evento.css"
import logo from "../assets/logo_sem fundo.png"

const Evento = () =>{

  return(
    <div className="divPrincipal">
      <header>
        <img src={logo} alt="" />
        {/* <a>aaaaaaaaa</a> */}
          <a>Corredores</a>
          <a>Cadeirantes</a>
          <a>Relatórios</a>
          <a>Corridas</a>
          <a>Gráficos</a>
          <a>Membros</a>
      </header>

      <form action="post" className="formulario">
        <label htmlFor="">Nome da Corrida:</label>
        <input type="text" name="nomeCompleto" />
        <label htmlFor="">Distância:</label>
        <input type="text" name="distancia"/>
        <input type="submit" value="Cadastrar" className="botaoCadastrar" />
      </form>

    </div>
    
    
  )

}

export default Evento;