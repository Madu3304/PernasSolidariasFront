import React, { useState, useEffect } from 'react'
import '../Modelcss/EditarModal.css'

export default function EditarModal({ isOpen, setModalOpen, user, onEditConfirm }) {
  // Estado interno para gerenciar os dados do usuário durante a edição
  const [editedUser, setEditedUser] = useState(user)

  // Use useEffect para atualizar o estado interno se o 'user' prop mudar
  useEffect(() => {
    setEditedUser(user)
  }, [user])

  if (!isOpen) {
    return null
  }

  // Lida com a mudança nos campos de input
  const handleChange = (e) => {
    const { name, value } = e.target
    setEditedUser(prevUser => ({
      ...prevUser,
      [name]: value
    }))
  }

  // Lida com o clique no botão de confirmar edição
  const handleSubmitEdit = () => {
    if (editedUser) {
      onEditConfirm(editedUser) // Chama a função do pai passando o usuário editado
    }
  }

  return (
    <div className="fundo">
      <div className="quadro">
        <div className="fechar" onClick={() => setModalOpen(false)}>X</div>
        
        <div className="modal-content">
          <h2>Editar Dupla</h2>
          {editedUser ? (
            <form>
              <label>
                Corredor:
                <input
                  type="text"
                  name="Corredor"
                  value={editedUser.Corredor || ''} // Use || '' para evitar undefined
                  onChange={handleChange}
                />
              </label>
              <label>
                Cadeirante:
                <input
                  type="text"
                  name="Cadeirante"
                  value={editedUser.Cadeirante || ''}
                  onChange={handleChange}
                />
              </label>
              {/* Adicione outros campos conforme necessário */}
            </form>
          ) : (
            <p>Carregando dados para edição</p>
          )}
        </div>

        <button className="edit-button" onClick={handleSubmitEdit}>
          Confirmar Edição
        </button>

      </div>
    </div>
  )
}