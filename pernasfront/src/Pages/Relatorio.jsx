import '../Styles/Relatorio.css'
import Header from "../Components/HeaderCabecalho"
import { FiEdit2, FiTrash2, FiDownload } from "react-icons/fi"
import EditarModal from "../Components/Model/EditarModal.jsx"
import DeletarModal from '../Components/Model/DeletarModal.jsx'
import React, { useState, useEffect } from 'react'

const Relatorio = () => {
    const [users, setUsers] = useState([])
    const [userToEdit, setUserToEdit] = useState(null)
    const [userToDelete, setUserToDelete] = useState(null)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

    useEffect(() => {
        const fetchRelatorios = async () => {
            try {
                const response = await fetch("http://localhost:3000/relatorios/listarRelatorios", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })

                if (!response.ok) {
                    throw new Error(`Erro HTTP! Status: ${response.status}`)
                }

                const data = await response.json()
                setUsers(data) // Assumindo que 'data' é um array de usuários/relatórios
                console.log("Resposta do back para listar:", data)

            } catch (error) {
                console.error("Erro ao listar relatórios:", error)
            }
        }

        fetchRelatorios();
    }, [])

    const handleOpenEditModal = (user) => {
        setUserToEdit(user)
        setIsEditModalOpen(true)
    }

    const handleOpenDeleteModal = (user) => {
        setUserToDelete(user)
        setIsDeleteModalOpen(true)
    }

    const handleEditConfirm = (updatedUser) => {
        console.log("Confirmando edição para:", updatedUser)
        // Lógica para enviar a edição para o back-end (você precisaria de um fetch/axios aqui)
        setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u))
        setIsEditModalOpen(false)
        setUserToEdit(null)
    };

    const handleDeleteConfirm = async () => {
        if (userToDelete) {
            console.log(`Deletando usuário com ID: ${userToDelete.id}`)
            try {
                const response = await fetch(`http://localhost:3000/relatorios/deletar/${userToDelete.id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }
                // Se a deleção for bem-sucedida, atualiza o estado
                setUsers(users.filter(user => user.id !== userToDelete.id))
                // toast.success("Usuário deletado com sucesso!") // Descomente se tiver o toast
            } catch (error) {
                console.error("Erro ao deletar usuário:", error)
                // toast.error("Erro ao deletar usuário") // Descomente se tiver o toast
            }
        }
        setIsDeleteModalOpen(false)
        setUserToDelete(null)
    }

    // A função toggleMenu e o estado menuOpen não parecem ser usados, pode removê-los
    // const toggleMenu = (userId) => {
    //     setMenuOpen(menuOpen === userId ? null : userId)
    // }

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

            {/* Modal de Edição */}
            <EditarModal
                isOpen={isEditModalOpen}
                setModalOpen={setIsEditModalOpen}
                user={userToEdit}
                onEditConfirm={handleEditConfirm}
            >
                {/* O children aqui pode ser um título ou instrução geral */}
            </EditarModal>

            {/* Modal de Deleção */}
            <DeletarModal
                isOpen={isDeleteModalOpen}
                setModalOpen={setIsDeleteModalOpen}
                user={userToDelete}
                onDeleteConfirm={handleDeleteConfirm}
            >
                {userToDelete ? (
                    <p>Tem certeza que deseja deletar a dupla **{userToDelete.Corredor} e {userToDelete.Cadeirante}**?</p>
                ) : (
                    <p>Tem certeza que deseja deletar este item?</p>
                )}
            </DeletarModal>

            <button className="download_button">
                <a href="http://localhost:3000/relatorios/download-csv" 
                    className="download" title="Baixar Relatório CSV">
                    <FiDownload className="icon" /> Emitir Relatório</a>
            </button>
        </div>
    )
}

export default Relatorio
