import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return (
    <>
      <div class="body min-vh-100 d-flex flex-column">
      <header>
        <nav class="navbar bg-primary">
          <div class="container-fluid">
            <div class="d-flex align-items-center">
              <a class="navbar-brand text-white fs-1 fw-bold" href="index.html">Sincerely,</a>

              <ul class="navbar-nav d-flex flex-row ms-3 fs-5">
                <li class="nav-item me-3">
                  <a class="nav-link fw-bold" href="index.html">Login</a>
                </li>
                <li class="nav-item me-3">
                  <a class="nav-link" href="inbox.html">Inbox</a>
                </li>
                <li class="nav-item me-3">
                  <a class="nav-link" href="write.html">Write a letter</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="send.html">Send a letter</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <footer class="container-fluid mt-auto d-flex justify-content-between p-3 bg-dark fs-5 text-white">
        <p class="text-white mb-0">Dallin Wright</p>
        <a class="text-secondary" href="https://github.com/Leeway001Write/startup">View GitHub Repository</a>      
      </footer>
    </div>
    </>
  )
}
