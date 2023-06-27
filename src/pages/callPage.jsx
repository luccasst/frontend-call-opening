import React, { useState, useEffect, useContext } from 'react';
import NavBar from '../components/navBar';
import { CallContext } from '../context/context';
import './callPageStyle.css';

const CallPage = () => {
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const { user, setUser, name, setName } = useContext(CallContext);

  const [calls, setCalls] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [editableCall, setEditableCall] = useState({});

const handleEdit = (call) => {
  setEditableCall((prevEditableCalls) => ({
    ...prevEditableCalls,
    [call.id]: { ...call },
  }));
};

const handleCancelEdit = (callId) => {
  setEditableCall((prevEditableCalls) => {
    const updatedEditableCalls = { ...prevEditableCalls };
    delete updatedEditableCalls[callId];
    return updatedEditableCalls;
  });
};
 

  
  const handleDelete = (callId) => {
    const token = localStorage.getItem('token');

    fetch(`http://localhost:3010/call/${callId}`, {
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
    fetch('http://localhost:3010/call', {
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

    fetch('http://localhost:3010/call', {
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

  const handleUpdate = (callId) => {
    const updatedCall = editableCall[callId];
  
    const token = localStorage.getItem('token');
  
    fetch(`http://localhost:3010/call/${callId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(updatedCall),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Chamado atualizado:', data);
        setCalls((prevCalls) => {
          const updatedCalls = prevCalls.map((call) => {
            if (call.id === callId) {
              return {
                ...call,
                title: updatedCall.title,
                comment: updatedCall.comment,
                status: updatedCall.status,
                priority: updatedCall.priority,
              };
            }
            return call;
          });
          return updatedCalls;
        });
        handleCancelEdit(callId);
      })
      .catch((error) => console.error('Erro ao atualizar chamado:', error));
  };
  
  
  

  useEffect(() => {
    if (showSuccessMessage) {
      setShowSuccessMessage(false);
      window.location.reload();
    }
  }, [showSuccessMessage]);
  

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
        <h2>Abra seu chamado :)</h2>
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
        <div className="buttonCreate">
        <button type="submit">Cadastrar chamado</button>
        </div>
      </form>

      <div className="getCalls">
      <div className="column">
    <h3>Título</h3>
    {calls.map((call) => (
      <div key={call.id} className="callItem">
        {editableCall[call.id] ? (
          <input
            type="text"
            value={editableCall[call.id].title}
            onChange={(e) =>
              setEditableCall((prevEditableCalls) => ({
                ...prevEditableCalls,
                [call.id]: {
                  ...prevEditableCalls[call.id],
                  title: e.target.value,
                },
              }))
            }
          />
        ) : (
          <p>{call.title}</p>
        )}
      </div>
    ))}
  </div>
  <div className="column">
    <h3>Comentáro</h3>
    {calls.map((call) => (
      <div key={call.id} className="callItem">
        {editableCall[call.id] ? (
          <input
            type="text"
            value={editableCall[call.id].comment}
            onChange={(e) =>
              setEditableCall((prevEditableCalls) => ({
                ...prevEditableCalls,
                [call.id]: {
                  ...prevEditableCalls[call.id],
                  comment: e.target.value,
                },
              }))
            }
          />
        ) : (
          <p>{call.comment}</p>
        )}
      </div>
    ))}
  </div>

  <div className="column">
    <h3>Status</h3>
    {calls.map((call) => (
      <div key={call.id} className="callItem">
        {editableCall[call.id] ? (
          <select
            type="text"
            value={editableCall[call.id].status}
            onChange={(e) =>
              setEditableCall((prevEditableCalls) => ({
                ...prevEditableCalls,
                [call.id]: {
                  ...prevEditableCalls[call.id],
                  status: e.target.value,
                },
              }))
            }
          >
              <option value="">Selecione</option>
            <option value="início">Início</option>
            <option value="tratamento">Tratamento</option>
            <option value="concluído">Concluído</option>
          </select>
        ) : (
          <p>{call.status}</p>
        )}
      </div>
    ))}
  </div>

  <div className="column">
    <h3>Prioridade</h3>
    {calls.map((call) => (
      <div key={call.id} className="callItem">
        {editableCall[call.id] ? (
          <select
            type="text"
            value={editableCall[call.id].priority}
            onChange={(e) =>
              setEditableCall((prevEditableCalls) => ({
                ...prevEditableCalls,
                [call.id]: {
                  ...prevEditableCalls[call.id],
                  priority: e.target.value,
                },
              }))
            }
          >
            <option value="">Selecione</option>
            <option value="pequena">Pequena</option>
            <option value="normal">Normal</option>
            <option value="alta">Alta</option>
          </select>
        ) : (
          <p>{call.priority}</p>
        )}
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
        {editableCall[call.id] ? (
          <div className="buttonGroup">
            <button onClick={() => handleUpdate(call.id)}>Salvar</button>
            <button onClick={() => handleCancelEdit(call.id)}>Cancelar</button>
          </div>
        ) : (
          <button onClick={() => handleEdit(call)}>Editar</button>
        )}
      </div>
    ))}
  </div>

      </div>
     

  </div>
  );
};

export default CallPage;
