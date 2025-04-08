import { Link } from "react-router-dom"
import "../Styles/Evento.css"
import logo from "../assets/logo_sem fundo.png"

const Evento = () =>{

  return(
    <div className="divPrincipalEvento">
      <header>
        <img src={logo} alt="" />
        <Link to="/corredor" className="tirarHiperlink">Corredores</Link>
        <Link to="/cadeirante" className="tirarHiperlink">Cadeirantes</Link>
        <a>Relatórios</a>
        <Link to="/evento" className="tirarHiperlink">Evento</Link>
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