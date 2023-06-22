import React, { useState, useEffect, useContext } from 'react';
import NavBar from '../components/navBar';
import {CallContext} from '../context/context';
import './callPageStyle.css';

const CallPage = () => {
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const { user, setUser } = useContext(CallContext);
  const [ calls, setCalls ] = useState([]);

  const handleDelete = (callId) => {
      const token = localStorage.getItem('token');

      fetch(`http://192.168.0.39:3010/call/${callId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      })
      .then(response => response.json())
    .then(data => {
      console.log('Chamado excluído:', data);
      setCalls(prevCalls => prevCalls.filter(call => call.id !== callId));
    })
    .catch(error => console.error('Erro ao excluir chamado:', error));
};
  
useEffect(() => {
  const token = localStorage.getItem('token');
  fetch('http://192.168.0.39:3010/call', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    }
  })
  .then(response => response.json())
  .then(data => setCalls(data.calls))
  .catch(error => console.error('Erro ao buscar chamados:', error));
}, [])
  

  const handleSubmit = (e) => {
    e.preventDefault();

    const newCall = {
      title: title,
      comment: comment,
      status: status,
      priority: priority,
    };

    const token = localStorage.getItem('token');
    console.log(token);

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
      })
      .catch((error) => {
        console.error('Erro ao cadastrar chamado', error.response);
      });

    setTitle('');
    setComment('');
    setStatus('');
    setPriority('');
  };

  return (
    <div>
      <NavBar user={user.name} />

      <div className='H1'>
        <h1>BEM VINDO AO CALL OPENING</h1>
      </div>
      <div className='H3'>
        <h3>Abra seu chamado :)</h3>
      </div>
      <form onSubmit={handleSubmit} className='formContainer'>
        <div className='formGroup'>
          <label htmlFor='title'>Título:</label>
          <input
            type='text'
            id='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className='formGroup'>
          <label htmlFor='comment'>Comentário:</label>
          <input
            type='text'
            id='comment'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <div className='formGroup'>
          <label htmlFor='status'>Status:</label>
          <input
            type='text'
            id='status'
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
        </div>
        <div className='formGroup'>
          <label htmlFor='priority'>Prioridade:</label>
          <input
            type='text'
            id='priority'
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          />
        </div>
        <button type='submit'>Cadastrar chamado</button>
      </form>

    <div className="getCalls">
      <div className="column">
    <h3>Título</h3>
    {calls.map(call => (
      <div key={call.id} className="callItem">
        <p>{call.title}</p>
      </div>
    ))}
  </div>

  <div className="column">
    <h3>Comentário</h3>
    {calls.map(call => (
      <div key={call.id} className="callItem">
        <p>{call.comment}</p>
      </div>
    ))}
  </div>

  <div className="column">
    <h3>Status</h3>
    {calls.map(call => (
      <div key={call.id} className="callItem">
        <p>{call.status}</p>
      </div>
    ))}
  </div>

  <div className="column">
    <h3>Prioridade</h3>
    {calls.map(call => (
      <div key={call.id} className="callItem">
        <p>{call.priority}</p>
      </div>
    ))}
  </div>

  <div className="column">
    <h3>Email do usuário</h3>
    {calls.map(call => (
      <div key={call.id} className="callItem">
        <p>{call.user.email}</p>
      </div>
    ))}
  </div>
  <div className="column">
    <h3>Excluir</h3>
    {calls.map(call => (
      <div key={call.id} className="callItemButtom">
        <button onClick={() => handleDelete(call.id)}>Excluir</button>
      </div>
    ))}
  </div>
</div>

    </div>
  );
};

export default CallPage;
