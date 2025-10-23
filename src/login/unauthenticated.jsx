import React from 'react';

export default function Unauthenticated({ onLogin }) {

    const handleSubmit = function(event) {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);
        const user = formData.get('username');

        console.log(user);

        onLogin(user);
    };

    return (
        <>
            <h2>Login</h2>
            <form className="d-flex flex-column align-items-end" onSubmit={handleSubmit}>
                <input name="username" type="text" className="form-control mt-3" placeholder="username"></input>
                <input name="password" type="password" className="form-control mt-2" placeholder="password"></input>
                <button type="submit" className="btn bg-secondary mt-3">Login</button>
            </form>
        </>
    );
}
