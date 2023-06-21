import React, { useState, useContext } from 'react';
import NavBar from '../components/navBar';
import callContext from '../context/context';
import './callPageStyle.css';

const CallPage = () => {
    const [title, setTitle] = useState('');
    const [comment, setComment] = useState('');
    const [status, setStatus] = useState('');
    const [priority, setPriority] = useState('');
    const { user, setUser } = useContext(callContext);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newCall = {
          title: title,
          comment: comment,
          status: status,
          priority: priority
        }

        const token = localStorage.getItem('token');
        console.log(token);

        fetch('http://192.168.0.39:3010/call', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
          },
          body: JSON.stringify(newCall)
        })
          .then(response => {
            console.log(response);
            return response.json();
          })
          .then(data => {
            console.log('Chamado cadastrado:', data);
            console.log(newCall);
          })
          .catch(error => {
            console.error('Erro ao cadastrar chamado', error.response);
          });


        setTitle('');
        setComment('');
        setStatus('');
        setPriority('');
    }

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
    </div>
  );
}

export default CallPage;
