import { Link, Navigate } from "react-router-dom"
import { FaUser, FaLock } from "react-icons/fa"
import logo from "../assets/logo.png"
import logo2 from "../assets/logo_sem fundo.png"
import { useNavigate } from "react-router-dom";

import { useState } from "react"
import "../Styles/Login.css"

const Login = () => {
    const navigate = useNavigate()
    const [ username, setUsername] = useState("")
    const [ password, setPassword] = useState("")

    const handleSubmit = async (Event) => {
        Event.preventDefault();

        try {
            const res = await fetch("http://localhost:3000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email: username, senha: password })
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.msg || "Erro ao fazer login");
                return;
            }

            localStorage.setItem("token", data.token);
            navigate("/corredor");
        } catch (error) {
            alert("Erro de rede. Tente novamente mais tarde");
            console.error("Erro no login:", error);
        }
    };


  return (
    <div className="App">
      <div className="header_login">
      <img src={logo2} alt=""  className="img"/>
        <h1 className="h1">Pernas  </h1>
        <h2 className="h2">Solidarias |</h2>
        <h3 className="h3">Entrar</h3>
      </div>
      

    <div className='container'>
      <form onSubmit={handleSubmit}>
      <img src={logo} alt="" />

        <div className="input-field">
            <input type="email" placeholder="E-mail"  className="email" value={username} onChange={(e) => setUsername(e.target.value)} required/>
            <FaUser className="icon" />
        </div>
        <div className="input-field">
            <input type="password" placeholder="Senha" className="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
            <FaLock className="icon" />
        </div>

        <div className="recall-forget">
            <label>
                <input type="checkbox"/>
                Lembre de mim
            </label>
            <a href="#">Esqueceu a senha?</a>
        </div>

        <button type="submit" className="botaoLogar">Entrar</button>

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
