import React, { useEffect, useState } from 'react';
import './navBarStyle.css';
import { useNavigate } from 'react-router-dom';

function NavBar() {
    const [user, setUser] = useState({});

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'));
        setUser(userData);
      }, [setUser]);

    return (
        <nav className="navegation-body">
            <button className="chamados">
                MEUS CHAMADOS
            </button>
            <h3
        className="user"
        >
           Seja bem-vindo, { user.name.split(' ')[0] }
           <span role="img" aria-label="Emoji Feliz">
          🙂
        </span>
        </h3>
        </nav>
    )
}

export default NavBar;