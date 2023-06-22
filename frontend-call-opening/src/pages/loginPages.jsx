import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './loginPageStyle.css';

function LoginPage() {
  const navigate = useNavigate();
  const [failed, setFailed] = useState(false);
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });

  const handleClick = async () => {
    const options = {
      method: 'POST',
      body: JSON.stringify(login),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const url = 'http://192.168.0.39:3010/auth/login';
    const response = await fetch(url, options);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
        const token = data.token;
        localStorage.setItem('token', token);
        navigate('/call');

      
    }
    setFailed(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLogin((prevLogin) => ({
      ...prevLogin,
      [name]: value,
    }));
  };

  return (
    <div className="login-page">
      <div className="login-page-body">
        <form className="login-form">
          <label htmlFor="email">
            <input
              className="email"
              type="email"
              name="email"
              placeholder="Digite seu email"
              value={login.email}
              onChange={handleInputChange}
            />
          </label>
          <label htmlFor="password">
            <input
              className="senha"
              type="password"
              name="password"
              placeholder="Digite sua senha"
              value={login.password}
              onChange={handleInputChange}
            />
          </label>
          <button type="button" className="login-btn" onClick={handleClick}>
            LOGIN
          </button>
          <button type="button" className="create-btn">
            REGISTRAR
          </button>
        </form>
        <p></p>
      </div>
    </div>
  );
}

export default LoginPage;
