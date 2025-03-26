import "../Styles/Corredor.css"
import logo from "../assets/logo_sem fundo.png"

const Corredor = () =>{

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
        <label htmlFor="">Nome Completo:</label>
        <input type="text" name="nomeCompleto" />
        <label htmlFor="">CPF:</label>
        <input type="text" name="cpf" />
        <label htmlFor="">Tamanho da Camisa:</label>
        <input type="text" name="tamCamisa"/>
        <label htmlFor="">Distância:</label>
        <input type="text" name="distancia"/>
        <label htmlFor="">Última Corrida:</label>
        <input type="text" name="ultCorrida"/>
        <input type="submit" value="Cadastrar" className="botaoCadastrar" />
      </form>

    </div>
    
    
  )

}

export default Corredor;