import AegisCapital from '../../assets/login/Aegis-Capital.png';
import './Login.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config';

function Login() {
  const [textData, setTextData] = useState({});
  const [error, setError] = useState<string | null>(null); // Adiciona o estado de erro
  const navigate = useNavigate(); // Inicialize o hook de navegação


  const handle_input = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    if (type === 'file' && (e.target as HTMLInputElement).files) {
      const fileArray = Array.from((e.target as HTMLInputElement).files!);
      console.log(name, fileArray);
      setTextData((prevData) => ({
        ...prevData,
        [name]: fileArray,
      }));
    } else {
      console.log(name, value);
      setTextData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handle_submit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Infos: ', textData);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/login`, textData);
      console.log('Resposta do backend:', response.data);

      const token = response.data.token;
      const username = response.data.username

      localStorage.setItem('token', token);
      localStorage.setItem('username', username);


      alert('Login bem-sucedido!');
      navigate('/');
    } catch (error: any) {
      console.error('Erro ao enviar dados:', error);
      setError('Credenciais inválidas ou erro ao tentar fazer login.');
    }
  };

  return (
    <div className="main">
      <div className="card-form">
        <form onSubmit={handle_submit}>
          <h1>Login</h1>
          <input
            id="login"
            name="email"
            placeholder="E-mail"
            onChange={handle_input}
          />

          <input
            id="senha"
            name="senha"
            type="password" // Adicionei o tipo para senhas
            placeholder="Senha"
            onChange={handle_input}
          />

          <button type="submit" className="btn btn-warning">
            Entrar
          </button>

          {error && <p className="error">{error}</p>} {/* Exibe a mensagem de erro */}
        </form>
      </div>

      <div className="logo">
        <img src={AegisCapital} alt="Aegis Logo" className="logo-aegis" />

        <span>
          <strong>O futuro pertence àqueles que se</strong>
        </span>
        <span>
          <strong>preparam hoje!</strong>
        </span>
      </div>
    </div>
  );
}

export default Login;
