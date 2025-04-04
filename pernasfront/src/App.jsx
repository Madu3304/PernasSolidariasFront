import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

import Login from "../src/Pages/Login";
import Cadeirante from "./Pages/Cadeirante";
import Corredor from "./Pages/Corredor";
import Evento from "./Pages/Evento";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login /> }></Route>
        <Route path="/cadeirante" element={<Cadeirante />}></Route>
        <Route path="/corredor" element={<Corredor />}></Route>
        <Route path="/evento" element={<Evento />}></Route>
      </Routes>
    </Router>
  );
}

export default App
