import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NavBar() {
    const [user, setUser] = useState({});

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'));
        setUser(userData);
      }, [setUser]);

    return (
        <nav>
        <h3
        className="user"
        >
            { user.name }
        </h3>
        </nav>
    )
}

export default NavBar;