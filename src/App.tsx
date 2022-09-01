import React from 'react';
import './App.css';
import Navbar from './components/static/navbar/Navbar';
import Login from './pages/login/Login';
import CadastroUsuario from './pages/cadastroUsuario/CadastroUsuario';
import Home from './pages/home/Home';
import Footer from './components/static/footer/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ minHeight: '100vh' }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cadastro" element={<CadastroUsuario />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
