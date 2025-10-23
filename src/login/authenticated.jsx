import React from 'react';

export default function Authenticated({ user, onLogout }) {
    return (
      <>
        <h2>Login</h2>
        <div className="d-flex flex-column align-items-center">
            <p>User: { user } </p>
            <button type="button" className="btn bg-warning text-white mt-3" onClick={ onLogout }>Sign out</button>
        </div>
      </>
    );
}
