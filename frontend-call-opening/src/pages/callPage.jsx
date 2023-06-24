import React, { useState, useEffect, useContext } from 'react';
import NavBar from '../components/navBar';
import { CallContext } from '../context/context';
import UpdateOverlay from '../components/updateCallPage'; 
import './callPageStyle.css';

const CallPage = ({ onUpdate, onClose }) => {
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const { user, setUser, name, setName } = useContext(CallContext);

  const [calls, setCalls] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showUpdateOverlay, setShowUpdateOverlay] = useState(false);
  const [selectedCallId, setSelectedCallId] = useState(null);

  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedComment, setUpdatedComment] = useState('');
  const [updateStatus, setUpdateStatus] = useState('');
  const [updatePriority, setUpdatePriority] = useState('');

  
  const handleDelete = (callId) => {
    const token = localStorage.getItem('token');

    fetch(`http://192.168.0.39:3010/call/${callId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Chamado excluído:', data);
        setCalls((prevCalls) => prevCalls.filter((call) => call.id !== callId));
      })
      .catch((error) => console.error('Erro ao excluir chamado:', error));
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    setUser(userData);
  }, [setUser]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://192.168.0.39:3010/call', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((data) => setCalls(data.calls))
      .catch((error) => console.error('Erro ao buscar chamados:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newCall = {
      title: title,
      comment: comment,
      status: status,
      priority: priority,
      user: name,
    };

    const token = localStorage.getItem('token');
    console.log(token);

    setIsLoading(true);

    fetch('http://192.168.0.39:3010/call', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(newCall),
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log('Chamado cadastrado:', data);
        console.log(newCall);
        if (user) {
          setCalls((prevCalls) => [
            ...prevCalls,
            { ...newCall, id: data.id, user: data.name },
          ]);
        } else {
          console.log('Usuário não está definido.');
        }
        setShowSuccessMessage(true);
      })
      .catch((error) => {
        console.error('Erro ao cadastrar chamado', error.response);
      })
      .finally(() => {
        setIsLoading(false);
      });

    setTitle('');
    setComment('');
    setStatus('');
    setPriority('');
  };

  useEffect(() => {
    if (showSuccessMessage) {
      setShowSuccessMessage(false);
      window.location.reload();
    }
  }, [showSuccessMessage]);

  const handleUpdate = (callId) => {
    setShowUpdateOverlay(true);

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

  };
  

  return (
    <div>
      <NavBar user={user?.name} />
      <div className="loadingContainer">
        {isLoading && <div className="loading">Carregando...</div>}
        {showSuccessMessage && (
          <div className="successMessage">Chamado cadastrado com sucesso!</div>
        )}
      </div>
      <div className="H1">
        <h1>BEM VINDO AO CALL OPENING</h1>
      </div>
      <div className="H3">
        <h3>Abra seu chamado :)</h3>
      </div>
      <form onSubmit={handleSubmit} className="formContainer">
        <div className="formGroup">
          <label htmlFor="title">Título:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="formGroup">
          <label htmlFor="comment">Comentário:</label>
          <input
            type="text"
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <div className="formGroup">
          <label htmlFor="status">Status:</label>
          <select
            type="text"
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Selecione</option>
            <option value="início">Início</option>
            <option value="tratamento">Tratamento</option>
            <option value="concluído">Concluído</option>
          </select>
        </div>
        <div className="formGroup">
          <label htmlFor="priority">Prioridade:</label>
          <select
            type="text"
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="">Selecione</option>
            <option value="pequena">Pequena</option>
            <option value="normal">Normal</option>
            <option value="alta">Alta</option>
          </select>
        </div>
        <button type="submit">Cadastrar chamado</button>
      </form>

      <div className="getCalls">
        <div className="column">
          <h3>Título</h3>
          {calls.map((call) => (
            <div key={call.id} className="callItem">
              <p>{call.title}</p>
            </div>
          ))}
        </div>

        <div className="column">
          <h3>Comentário</h3>
          {calls.map((call) => (
            <div key={call.id} className="callItem">
              <p>{call.comment}</p>
            </div>
          ))}
        </div>

        <div className="column">
          <h3>Status</h3>
          {calls.map((call) => (
            <div key={call.id} className="callItem">
              <p>{call.status}</p>
            </div>
          ))}
        </div>

        <div className="column">
          <h3>Prioridade</h3>
          {calls.map((call) => (
            <div key={call.id} className="callItem">
              <p>{call.priority}</p>
            </div>
          ))}
        </div>

        <div className="column">
          <h3>Usuário</h3>
          {calls.map((call) => (
            <div key={call.id} className="callItem">
              <p>{call && user?.name && user?.name.split(' ')[0]}</p>
            </div>
          ))}
        </div>
        <div className="column">
          <h3>Excluir</h3>
          {calls.map((call) => (
            <div key={call.id} className="callItemButtom">
              <button onClick={() => handleDelete(call.id)}>Excluir</button>
            </div>
          ))}
        </div>
        <div className="column">
          <h3>Atualizar</h3>
          {calls.map((call) => (
            <div key={call.id} className="buttomUpdate">
              <button onClick={() => handleUpdate(call.id)}>Atualizar</button>
            </div>
          ))}
        </div>
      </div>
      {showUpdateOverlay && (
  <div className="overlay">
    <UpdateOverlay onClose={() => setShowUpdateOverlay(false)} onUpdate={handleUpdate} />
  </div>
)}


    </div>
  );
};

export default CallPage;
