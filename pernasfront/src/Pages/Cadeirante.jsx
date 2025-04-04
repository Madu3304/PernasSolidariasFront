import { Link } from "react-router-dom"
import "../Styles/Cadeirante.css"
import logo from "../assets/logo_sem fundo.png"

const Cadeirante = () =>{

  return(
    <div className="divPrincipalCadeirante">
      <header>
        <img src={logo} alt="" />
        <Link to="/corredor">Corredores</Link>
        <Link to="/cadeirante">Cadeirantes</Link>
        <a>Relatórios</a>
        <Link to="/evento">Evento</Link>
        <a>Gráficos</a>
        <a>Membros</a>
      </header>

      <form action="post" className="formularioCadeirante">
        <label htmlFor="">Nome Completo:</label>
        <input type="text" name="nomeCompletoCadeirante" />
        <label htmlFor="">CPF:</label>
        <input type="text" name="cpfCadeirante" />
        <label htmlFor="">Tamanho da Camisa:</label>
        <input type="text" name="tamCamisaCadeirante"/>
        <label htmlFor="">Distância:</label>
        <input type="text" name="distanciaCadeirante"/>
        <label htmlFor="">Última Corrida:</label>
        <input type="text" name="ultCorridaCadeirante"/>
        <div className="checkbox-container-cadeirante">
          <input type="checkbox" name="" id="" />
          <a>Possui cadeira própria?</a>
          {/* <label htmlFor="">Possui cadeira própria?</label> */}
        </div>
        <input type="submit" value="Cadastrar" className="botaoCadastrarCadeirante" />
      </form>

    </div>
    
    
  )

}

export default Cadeirante;