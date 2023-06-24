import React, { useState } from 'react';

function UpdateOverlay({ onClose, onUpdate, callId }) {
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedComment, setUpdatedComment] = useState('');
  const [updateStatus, setUpdateStatus] = useState('');
  const [updatePriority, setUpdatePriority] = useState('');
  const [calls, setCalls] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const handleUpdate = (callId) => {
    setIsLoading(true);

    const updatedCall = {
      title: updatedTitle,
      comment: updatedComment,
      status: updateStatus,
      priority: updatePriority,
    };

    const token = localStorage.getItem('token');

    fetch(`http://192.168.0.39:3010/call/${callId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(updatedCall),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Chamado atualizado:', data);
        onUpdate(data);
        onClose();
      })
      .catch((error) => {
        console.error('Erro ao atualizar chamado:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="update-overlay">
      <div className="update-form-container">
        <h2>Atualizar Chamado</h2>
        <form onSubmit={handleUpdate}>
          <div className="form-group">
            <label htmlFor="updatedTitle">Título:</label>
            <input
              type="text"
              id="updatedTitle"
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="updatedComment">Comentário:</label>
            <input
              type="text"
              id="updatedComment"
              value={updatedComment}
              onChange={(e) => setUpdatedComment(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="updatedStatus">Status:</label>
            <input
              type="text"
              id="updatedStatus"
              value={updateStatus}
              onChange={(e) => setUpdateStatus(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="updatedPriority">Prioridade:</label>
            <input
              type="text"
              id="updatedPriority"
              value={updatePriority}
              onChange={(e) => setUpdatePriority(e.target.value)}
            />
          </div>
          <div className="button-group">
            
            <button type="submit">Atualizar</button>
          
            <button type="button" onClick={handleCancel}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateOverlay;
