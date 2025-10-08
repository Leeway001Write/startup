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
      <div class="body min-vh-100 d-flex flex-column">
        <header>
          <nav class="navbar bg-primary">
            <div class="container-fluid">
              <div class="d-flex align-items-center">
                <a class="navbar-brand text-white fs-1 fw-bold" href="index.html">Sincerely,</a>

                <ul class="navbar-nav d-flex flex-row ms-3 fs-5">
                  <li class="nav-item me-3">
                    <NavLink class="nav-link" to="/">Login</NavLink>
                  </li>
                  <li class="nav-item me-3">
                    <NavLink class="nav-link" to="/inbox">Inbox</NavLink>
                  </li>
                  <li class="nav-item me-3">
                    <NavLink class="nav-link" to="/write">Write a letter</NavLink>
                  </li>
                  <li class="nav-item">
                    <NavLink class="nav-link" to="/send">Send a letter</NavLink>
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

        <footer class="container-fluid mt-auto d-flex justify-content-between p-3 bg-dark fs-5 text-white">
          <p class="text-white mb-0">Dallin Wright</p>
          <a class="text-secondary" href="https://github.com/Leeway001Write/startup">View GitHub Repository</a>      
        </footer>
      </div>
    </BrowserRouter>
  )
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}