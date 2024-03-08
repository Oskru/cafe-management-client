import { useState } from 'react';
import './login.scss';
import { PRODUCTS_URL } from '../../utils/data/api';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'username') {
      setUsername(value);
    } else {
      setPassword(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(PRODUCTS_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${btoa(`${username}:${password}`)}`,
        },
      });
      if (res.ok) {
        window.sessionStorage.setItem('username', username);
        window.sessionStorage.setItem('password', password);
        navigate('/');
        location.reload();
      } else {
        setError('Invalid username or password');
      }
    } catch (e) {
      console.error('Error logging in', e);
    }
  };

  return (
    <div className='login'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='username'
          placeholder='Email'
          value={username}
          onChange={handleInputChange}
          className='login__username'
        />
        <input
          type='password'
          name='password'
          placeholder='Password'
          value={password}
          onChange={handleInputChange}
          className='login__password'
        />
        {error && <p className='login__error'>{error}</p>}
        <button type='submit' className='login__submit'>
          Login
        </button>
      </form>
    </div>
  );
}
