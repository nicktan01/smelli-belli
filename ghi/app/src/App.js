import { useEffect, useState } from 'react';
import './App.css';
import { useToken } from './authApi';

function App() {
  const [token, login, logout, signup] = useToken();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [orders, setOrders] = useState(null);
  const [error, setError] = useState(null);
  const canLogin = username && password;
  const canSignup = canLogin && email && firstName && lastName;

  useEffect(() => {
    async function getOrders() {
      const url = `${process.env.REACT_APP_EMPLOYEES_HOST}/api/products/`;
      const response = await fetch(url, {
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const orders = await response.json();
        setOrders(orders);
      } else {
        setError(await response.text())
      }
    }
    if (token) {
      getOrders();
    }
  }, [token]);

  return (
    <div>
      { error ? <div dangerouslySetInnerHTML={{__html: error}} /> : null }
      { token
      ? <div>
          <h1>Logout</h1>
          <div>{token}</div>
          <button onClick={logout}>Logout</button>
          { orders == null?
            <div>Orders loading...</div> :
            <div>{orders.length || 'no'} orders</div>
          }
        </div>
      : <div>
          <h1>Login</h1>
          <input type="text" onChange={e => setUsername(e.target.value)} value={username} placeholder="username" />
          <input type="email" onChange={e => setEmail(e.target.value)} value={email} placeholder="email" />
          <input type="text" onChange={e => setFirstName(e.target.value)} value={firstName} placeholder="first name" />
          <input type="text" onChange={e => setLastName(e.target.value)} value={lastName} placeholder="last name" />
          <input type="password" onChange={e => setPassword(e.target.value)} value={password} placeholder="password" />
          <button disabled={!canLogin} onClick={async () => setError(await login(username, password))}>Login</button>
          <button disabled={!canSignup} onClick={async () => setError(await signup(username, password, email, firstName, lastName))}>Sign up</button>
        </div>
      }
    </div>
  );
}

export default App;
