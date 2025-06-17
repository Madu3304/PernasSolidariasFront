import '../Styles/Relatorio.css'
import Header from "../Components/HeaderCabecalho"
import { toast } from 'react-toastify'
import { FiAlignJustify, FiEdit2, FiTrash2 } from "react-icons/fi"
import React from 'react'
import { useEffect, useState } from 'react'
import ModalEditar from './Models/RelaEditarModel.jsx'


const Relatorio = () => {

    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchDuplas = async () => {
            try {
                setLoading(true)
                setError(null)

                const response = await fetch("http://localhost:3000/Relatorio/relatorios", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                })

                if (!response.ok) {
                    const errorText = await response.text()
                    throw new Error(`Erro na rede ou servidor: ${response.status} - ${errorText}`)
                }

                const data = await response.json()
                console.log("Resposta do back:", data)
                setUsers(data)

            } catch (err) {
                console.error("Erro ao buscar dados:", err)
                setError("Erro ao carregar dados. Tente novamente mais tarde.")
            } finally {
                setLoading(false)
            }
        }
          fetchDuplas()
    }, [])

    const handleEdit = (userId) => {
        alert(`Editar opção com ID: ${userId}`)
    }

    const handleDelete = async (userId) => {
        if (window.confirm(`Tem certeza que deseja excluir essa dupla com ID: ${userId}?`)) {
           try {
                const response = await fetch("http://localhost:3000/Relatorio/relatorios/${userId}", {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })

                if (!response.ok) {
                    const errorText = await response.text()
                    throw new Error(`Erro ao excluir: ${response.status} - ${errorText}`)
                }

                setUsers(users.filter(user => user.id !== userId))

            } catch (err) {
                console.error("Erro ao excluir usuário:", err)
                alert("Erro ao excluir usuário: " + err.message)
            }
        }

        const [menuOpen, setMenuOpen] = useState(null);
        const toggleMenu = (userId) => {
            setMenuOpen(menuOpen === userId ? null : userId)
        }

    return (
        <div className="user-list-container">
            <Header />
            <h2 className='titulo'>Duplas</h2>
            <div className="table-wrapper">
                {loading && <p className="message">Carregando dados...</p>}
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
                                    <td>{user.corredor?.nomeCorredor}</td>
                                    <td>{user.cadeirante?.nomeCadeirante}</td>
                                    <td className="actions-cell">
                                        <div className="dropdownMenu">
                                            <button onClick={() => handleEdit(user.id)} className="ButaoCoisas">
                                                <FiEdit2 className="icon" />
                                            </button>
                                       </div>
                                       <ModalEditar/>
                                       <div className="dropdownMenu">
                                            <button onClick={() => handleDelete(user.id)} className="ButaoCoisas">
                                                <FiTrash2 className="icon" />
                                            </button>
                                       </div>
                                       <Model/>
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
        )
    }
}
export default Relatorio
