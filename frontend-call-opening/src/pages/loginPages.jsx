import React from 'react';

function LoginPage() {
 
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
            
            />
          </label>
          <label htmlFor="password">
            <input
              className="senha"
              type="password"
              name="password"
              placeholder="Digite sua senha"
              
            />
          </label>
          <button
            type="button"
            className="login-btn"
          >
            LOGIN
          </button>
          <button
            type="button"
            className="create-btn"
          >
            REGISTRAR
          </button>
        </form>
        <p
        >
         
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
