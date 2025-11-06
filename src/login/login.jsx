import React, { useEffect, useState } from 'react';
import Unauthenticated from './unauthenticated.jsx';
import Authenticated from './authenticated.jsx';

import { updateWeather } from '../weather.js';


export default function Login() {
    const [user, setUser] = useState(null);
    const [errorText, setErrorText] = useState("");

    useEffect(() => {
        let currentUser = localStorage.getItem('user');
        if (currentUser && currentUser != "null") {
            setUser(currentUser);
        }
    }, []);

    const authenticateUser = async function(endpoint, username, password) {
        if (!username || username === "" ||
            !password || password === "") {
            setErrorText("Missing username or password");
            return;
        }
        setErrorText("");

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
            // Logout failed. Assume user or server is offline
        })
        .finally(() => {
            setUser(null);
            localStorage.setItem('user', null);
        });
    }

    return (
        <main className="flex-fill d-flex flex-column justify-content-center align-items-center">
            {user == null && <Unauthenticated onLogin={ loginUser } errorText={ errorText } />}
            {user != null && <Authenticated user={ user } onLogout={ logoutUser }/>}
        </main>
    );
}