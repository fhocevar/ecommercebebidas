import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/authContext'; // Importando o contexto de autenticação

const Login = () => {
  const { login } = useAuth(); // Usando o contexto para gerenciar o estado de autenticação
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenindo o comportamento padrão do formulário
    try {
      const response = await axios.post('http://localhost:3000/auth/login', { email, password });
      localStorage.setItem('token', response.data.access_token); // Armazenando o token JWT no localStorage
      login(response.data); // Atualizando o contexto com os dados do usuário
      setError(''); // Limpando mensagens de erro em caso de sucesso
    } catch (err) {
      console.error('Erro ao fazer login:', err);
      setError('Credenciais inválidas'); // Definindo mensagem de erro
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Senha</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
