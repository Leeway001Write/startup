import React, { useEffect, useState } from 'react';
import Unauthenticated from './unauthenticated.jsx';
import Authenticated from './authenticated.jsx';

import { updateWeather } from '../weather.js';


export default function Login() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        let currentUser = localStorage.getItem('user');
        if (currentUser) {
            setUser(currentUser);
        }
    }, []);

    const authenticateUser = async function(endpoint, username, password) {
        const response = await fetch(endpoint, {
            method: 'POST',
            body: JSON.stringify({ email: username, password: password}),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            }
        });

        if (response?.status === 200) {
            // Success
            setUser(username);
            localStorage.setItem('user', username);
        } else if (response?.status === 401) {
            // User does not exist
            if (confirm("User does not exist. Create new account?")) {
                authenticateUser('api/auth/create', username, password);
            }
        } else {
            // Other error
            try {
                const body = await response.json();
                console.log(`⚠ Auth error: ${body.msg}`);
            } catch (error) {
                console.log("Error with response JSON during auth: ", error);
            }
        }
    }

    const loginUser = (username, password) => authenticateUser('api/auth/login', username, password);

    const logoutUser = function() {
        fetch('api/auth/logout', {
            method: 'DELETE'
        })
        .catch(() => {
            // Logout failed. Assume user is offline
        })
        .finally(() => {
            setUser(null);
            localStorage.setItem('user', null);
        });
    }

    const testBackend = async (isSecureTest) => {
        let result = null
        if (isSecureTest) {
            result = await fetch('/api/test/secure', {method: 'GET'});
        } else {
            result = await fetch('/api/test', {method: 'GET'});
        }
        let data = await result.json();
        console.log(data);
    };

    return (
        <main className="flex-fill d-flex flex-column justify-content-center align-items-center">
            {user == null && <Unauthenticated onLogin={ loginUser } />}
            {user != null && <Authenticated user={ user } onLogout={ logoutUser }/>}
            <button className="btn" onClick={ () => testBackend(false) }>TEST BACKEND</button>
            <button className="btn" onClick={ () => testBackend(true) }>SECURE TEST</button>
        </main>
    );
}