// src/App.jsx

import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser');
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON);
      setUser(user);
    }
  }, []);

  return (
    <div>
      <Navbar user={user} setUser={setUser} />

      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/services' element={<Services />} />
          <Route path='/contact' element={<Contact />} />

          <Route
            path='/login'
            element={
              !user ? (
                <Login setUser={setUser} />
              ) : (
                <Navigate replace to='/dashboard' />
              )
            }
          />

          <Route
            path='/dashboard'
            element={user ? <Dashboard /> : <Navigate replace to='/login' />}
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
