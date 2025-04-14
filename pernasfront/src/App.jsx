import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


import Login from "../src/Pages/Login"
import Cadeirante from "./Pages/Cadeirante"
import Corredor from "./Pages/Corredor"
import Evento from "./Pages/Evento"
// import Relatorio from "./Pages/Relatorio"

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login /> }></Route>
        <Route path="/cadeirante" element={<Cadeirante />}></Route>
        <Route path="/corredor" element={<Corredor />}></Route>
        <Route path="/evento" element={<Evento />}></Route>
        {/* <Route path="/relatorio" element={<Relatorio />}></Route> */}
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  )
}

export default App
