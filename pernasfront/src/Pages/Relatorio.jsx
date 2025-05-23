import React, { useState } from 'react';
import '../Styles/Relatorio.css';
import Header from "../Components/HeaderCabecalho";
import { FiAlignJustify, FiEdit2, FiTrash2 } from "react-icons/fi";

const Relatorio = () => {
    const [users, setUsers] = useState([
        { id: 1, Corredor: 'Will', Cadeirante: 'Teste' },
        { id: 2, Corredor: 'Alice', Cadeirante: 'Example' },
        { id: 3, Corredor: 'Bob', Cadeirante: 'Example' },
        { id: 4, Corredor: 'Carol', Cadeirante: 'Example' },
    ]);

    const [menuOpen, setMenuOpen] = useState(null); // Guarda o ID do menu aberto

    const handleEdit = (userId) => {
        alert(`Editar usuário com ID: ${userId}`);
    };

    const handleDelete = (userId) => {
        if (window.confirm(`Tem certeza que deseja excluir o usuário com ID: ${userId}?`)) {
            setUsers(users.filter(user => user.id !== userId));
        }
    };

    const toggleMenu = (userId) => {
        setMenuOpen(menuOpen === userId ? null : userId);
    };

        // Aqui vai o envio pro back
        fetch("http://localhost:3000/relatorios/listarRelatorios", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dadosRecebidos),
        })
          .then((res) => res.json())
          .then((data) => {
            toast.success("Lista atualiada")
            // setFormData('')
            // formData.nm_evento = ''
            console.log("Resposta do back:", data)
          })
         

    return (
        <div className="user-list-container">
            <Header />
            <h2 className='titulo'>Duplas</h2>
            <div className="table-wrapper">
                {users.length > 0 ? (
                    <table className="user-table">
                        <thead>
                            <tr>
                                <th>Corredor</th>
                                <th>Cadeirante</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td>{user.Corredor}</td>
                                    <td>{user.Cadeirante}</td>
                                    <td className="actions-cell">
                                        <div className="dropdownMenu">
                                            <button onClick={() => handleEdit(user.id)} className="ButaoCoisas">
                                                <FiEdit2 className="icon" />
                                            </button>
                                            <button onClick={() => handleDelete(user.id)} className="ButaoCoisas">
                                                <FiTrash2 className="icon" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="message">Nenhum dado encontrado.</p>
                )}
            </div>
        </div>
    );
};

export default Relatorio;
