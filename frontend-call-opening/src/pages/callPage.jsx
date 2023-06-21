import React, { useState } from 'react';

const CallPage = () => {
    const [title, setTitle] = useState('');
    const [comment, setComment] = useState('');
    const [status, setStatus] = useState('');
    const [priority, setPriority] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        setTitle('');
        setComment('');
        setStatus('');
        setPriority('');
    }

    return (
      <div>
        <div className='h1'>
          <h1>BEM VINDO AO CALL OPENING</h1>
        </div>
        <div className="h3">
          <h3>Ta com problema? Abra seu chamado :)</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <br />
          <label>
            Comment:
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </label>
          <br />
          <label>
            Status:
            <input
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />
          </label>
          <br />
          <label>
            Priority:
            <input
              type="text"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            />
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
        </div>
      );
}

export default CallPage;
