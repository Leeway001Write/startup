import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import Login from './login/login';
import Inbox from './inbox/inbox';
import Write from './write/write';
import Send from './send/send';
import { Nav } from 'react-bootstrap';


export default function App() {
  return (
    <BrowserRouter>
      <div className="body min-vh-100 d-flex flex-column">
        <header>
          <nav className="navbar bg-primary">
            <div className="container-fluid">
              <div className="d-flex align-items-center">
                <a className="navbar-brand text-white fs-1 fw-bold" href="index.html">Sincerely,</a>

                <ul className="navbar-nav d-flex flex-row ms-3 fs-5">
                  <li className="nav-item me-3">
                    <NavLink className="nav-link" to="/">Login</NavLink>
                  </li>
                  <li className="nav-item me-3">
                    <NavLink className="nav-link" to="/inbox">Inbox</NavLink>
                  </li>
                  <li className="nav-item me-3">
                    <NavLink className="nav-link" to="/write">Write a letter</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/send">Send a letter</NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/write" element={<Write />} />
          <Route path="/send" element={<Send />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <footer className="container-fluid mt-auto d-flex justify-content-between p-3 bg-dark fs-5 text-white">
          <p className="text-white mb-0">Dallin Wright</p>
          <a className="text-secondary" href="https://github.com/Leeway001Write/startup">View GitHub Repository</a>      
        </footer>
      </div>
    </BrowserRouter>
  )
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}