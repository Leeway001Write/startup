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

    const loginUser = function(username) {
        setUser(username);
        localStorage.setItem('user', username);
    }

    const logoutUser = function() {
        loginUser(null);
    }

    const getWeather = async function() {
        console.log(await updateWeather());
    }

    return (
        <main className="flex-fill d-flex flex-column justify-content-center align-items-center">
            {user == null && <Unauthenticated onLogin={ loginUser } />}
            {user != null && <Authenticated user={ user } onLogout={ logoutUser }/>}
            <button className="btn" onClick={ getWeather }>GET WEATHER</button>
        </main>
    );
}

function getPosition() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}