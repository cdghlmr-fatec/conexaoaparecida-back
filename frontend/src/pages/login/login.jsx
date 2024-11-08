import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';  // Import axios at the top
import './login.css';

import logo from '../../assets/ConexAp.png';
import fundo from '../../assets/fundoConex.jpg';

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);  // Novo estado de carregamento
  const navigate = useNavigate();  // Para redirecionar após login

  // Função para lidar com o envio do formulário de login
  const handleLogin = async (e) => {
    e.preventDefault();  // Previne o comportamento padrão do formulário
    setError(null);  // Reseta erros antes da nova tentativa
    setLoading(true);  // Ativa o carregamento (loading)

    try {
      const response = await axios.post('https://bug-free-pancake-69vr9jvqpj4x2459p-8081.app.github.dev/api/auth/signin', { username, password });
      const { jwt, roles } = response.data;
     
      localStorage.setItem('token', jwt);
      localStorage.setItem('roles', JSON.stringify(roles)); 

      // Redireciona com base nas roles do usuário
      if (roles.includes('admin')) {
        navigate('/admin');
      } else if (roles.includes('coordenador')) {
        navigate('/coordenador');
      } else if (roles.includes('secretaria')) {
        navigate('/secretaria');
      } else {
        // Se o usuário não tiver um papel adequado, redireciona para uma página de erro ou login
        navigate('/login');
      }

      alert('Login bem-sucedido');
    } catch (error) {
      setError(error.response?.data?.message || 'Usuário ou senha incorretos');
    } finally {
      setLoading(false);  // Finaliza o carregamento (loading)
    }
  };

  return (
    <div className="row mt-page h-100 w-100 m-0 p-0">
      <div className="col-sm-5 d-flex justify-content-center align-items-center text-center">
        <form className="form-signin w-75 justify-content-center align-items-center text-center p-0" onSubmit={handleLogin}>
          <div className="justify-content-center align-items-center text-center">
            <img src={logo} className="logo mb-2" alt="Logo" />
            <div className="d-flex justify-content-center align-items-center text-center">
              <h4 className="mb-4 w-100">Gerencie sua excursão de forma descomplicada.</h4>
            </div>
            <h5 className="mb-4 text-secondary">Acesse sua conta</h5>
          </div>
          <div className="mt-4">
            <input
              className="w-75"
              type="text"
              placeholder="E-mail"
              value={username}
              onChange={(e) => setUsername(e.target.value)}  // Atualiza o estado do username
              required
            />
          </div>
          <div className="mt-2">
            <input
              className="w-75"
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}  // Atualiza o estado da senha
              required
            />
          </div>

          {error && <div className="mt-2 text-danger">{error}</div>}  {/* Exibe a mensagem de erro, se houver */}

          <div className="mt-3 mb-5">
            <button className="btn-login btn btn-primary w-75" type="submit" disabled={loading}>
              {loading ? 'Carregando...' : 'Login'}  {/* Mostra "Carregando..." durante o processo */}
            </button>
          </div>

          <div>
            <span className="me-1">Não tenho uma conta.</span>
            <Link to="/solicitacao">Solicite agora!</Link>
          </div>
        </form>
      </div>

      <div className="col-sm-7 p-0">
        <img src={fundo} className="background-login" alt="Background" />
      </div>
    </div>
  );
}