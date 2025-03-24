import { FaUser, FaLock } from "react-icons/fa"

import { useState } from "react"
import "./Login.css"

const Login = () => {
    const [ username, setUsername] = useState("")
    const [ password, setPassword] = useState("")

    const handleSubmit = (Event) => {
        Event.preventDefault()

        //coletando os dados e informando que está indo para o back. 
        alert("Salvando usuário:" + username + " - " + password)
    };

  return (
    <div className='container'>
      <form>
        <img src="" alt="" />
      <img src="../assets/logo.png"></img>

        <div className="input-field">
            <input type="email" placeholder="E-mail"  id="email" onChange={(e) => setUsername(e.target.value)}/>
            <FaUser className="icon" />
        </div>
        <div className="input-field">
            <input type="password" placeholder="Senha" id="password" onChange={(e) => setPassword(e.target.value)}/>
            <FaLock className="icon" />
        </div>

        <div className="recall-forget">
            <label>
                <input type="checkbox"/>
                Lembre de mim
            </label>
            <a href="#">Esqueceu a senha?</a>
        </div>

        <button>Entrar</button>

        <div className="signup-link">
            <p>
                Não tem conta? <a href="#">Cadastre-se</a>
            </p>
        </div>


      </form>
    </div>
  )
}

export default Login
