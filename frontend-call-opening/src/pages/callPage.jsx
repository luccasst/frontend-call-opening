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
              type="email"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
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
      );
}

export default CallPage;
