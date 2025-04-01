import "../Styles/Corredor.css"
import logo from "../assets/logo_sem fundo.png"

const Corredor = () =>{

  return(
    <div className="divPrincipalCorredor">
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

      <form action="post" className="formularioCorredor">
        <label htmlFor="">Nome Completo:</label>
        <input type="text" name="nomeCompletoCorredor" />
        <label htmlFor="">CPF:</label>
        <input type="text" name="cpfCorredor" />
        <label htmlFor="">Tamanho da Camisa:</label>
        <input type="text" name="tamCamisaCorredor"/>
        <label htmlFor="">Distância:</label>
        <input type="text" name="distanciaCorredor"/>
        <label htmlFor="">Última Corrida:</label>
        <input type="text" name="ultCorridaCorredor"/>
        <input type="submit" value="Cadastrar" className="botaoCadastrarCorredor" />
      </form>

    </div>
    
    
  )

}

export default Corredor;