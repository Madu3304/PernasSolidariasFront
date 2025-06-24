import React from 'react'
import '../Modelcss/DeletarModal.css'

export default function DeletarModal({ isOpen, setModalOpen, user, onDeleteConfirm, children }) {
  if (!isOpen) {
    return null
  }

  return (
    <div className="fundo">
      <div className="quadro">
        <div className="fechar" onClick={() => setModalOpen(false)}>X</div>
        
        <div className="modal-content">
          {children || (user ? `Tem certeza que deseja deletar a dupla ${user.Corredor} e ${user.Cadeirante}?` : "Tem certeza que deseja deletar este item?")}
        </div>

        <div className="modal-actions">
          <button className="cancel-button" onClick={() => setModalOpen(false)}>Cancelar</button>
          <button className="delete-button" onClick={onDeleteConfirm}>Deletar</button>
        </div>
      </div>
    </div>
  )
}