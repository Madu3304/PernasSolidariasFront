import { Link } from "react-router-dom"
import { FaUser, FaLock } from "react-icons/fa"
import logo from "../assets/logo.png"
import logo2 from "../assets/logo_sem fundo.png"

import { useState } from "react"
import "../Styles/Login.css"

const Login = () => {
    const [ username, setUsername] = useState("")
    const [ password, setPassword] = useState("")

    const handleSubmit = (Event) => {
        Event.preventDefault()

        //coletando os dados e informando que está indo para o back. 
        alert("Salvando usuário:" + username + " - " + password)
    };

  return (
    <div className="App">
      <div className="header">
      <img src={logo2} alt=""  className="img"/>
        <h1 className="h1">Pernas  </h1>
        <h2 className="h2">Solidarias |</h2>
        <h3 className="h3">Entrar</h3>
      </div>
      

    <div className='container'>
      <form>
      <img src={logo} alt="" />

        <div className="input-field">
            <input type="email" placeholder="E-mail"  className="email" onChange={(e) => setUsername(e.target.value)}/>
            <FaUser className="icon" />
        </div>
        <div className="input-field">
            <input type="password" placeholder="Senha" className="password" onChange={(e) => setPassword(e.target.value)}/>
            <FaLock className="icon" />
        </div>

        <div className="recall-forget">
            <label>
                <input type="checkbox"/>
                Lembre de mim
            </label>
            <a href="#">Esqueceu a senha?</a>
        </div>

        <Link to="/corredor"><button>Entrar</button></Link>

        <div className="signup-link">
            <p>
                Não tem conta? <a href="#">Cadastre-se</a>
            </p>
        </div>


      </form>
    </div>
    </div>
  )
}

export default Login
