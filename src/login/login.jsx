import React from 'react';

export default function Login() {
    return (
        <main className="flex-fill d-flex flex-column justify-content-center align-items-center">
      <h2>Login</h2>
      <form className="d-flex flex-column align-items-end">
        <input type="text" className="form-control mt-3" placeholder="username"></input>
        <input type="password" className="form-control mt-2" placeholder="password"></input>
        <input type="submit" className="btn bg-secondary mt-3" value="Login"></input>
      </form>
    </main>
    );
}
