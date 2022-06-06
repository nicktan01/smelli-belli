import { useEffect, useState, useSyncExternalStore } from 'react';
import './App.css';
import { useToken } from './authApi';

function App() {
  const [token, login, logout, signup] = useToken();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [orders, setProducts] = useState(null);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const canLogin = username && password;
  const canSignup = canLogin && email && firstName && lastName;

  useEffect(() => {
    async function getProducts() {
      const url = `${process.env.REACT_APP_INVENTORY_HOST}/api/products/`;
      const response = await fetch(url, {
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const products = await response.json();
        setProducts(products);
      } else {
        setError(await response.text())
      }
    }
    async function getCurrentUser() {
      const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/accounts/me/`;
      const response = await fetch(url, {
        credentials: 'include',
      });
      if (response.ok) {
        const user = await response.json();
        console.log(user);
        setUser(user);
      }
    }
    if (token) {
      getProducts();
      getCurrentUser();
    }
  }, [token]);

  return (
    // <Nav token={token} />
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/login" element={<Login login={login} token={token} />} />
    //   </Routes>
    // </BrowserRouter>
    <div>
      { error ? <div dangerouslySetInnerHTML={{__html: error}} /> : null }
      { token
      ? <div>
          <h1>You're logged in!</h1>
          <div>{token}</div>
          <button onClick={logout}>Logout</button>
          { orders == null?
            <div>Orders loading...</div> :
            <div>{orders.length || 'no'} products</div>
          }
          { user == null?
            <div>Loading your information</div> :
            <div>You are staff: {user.is_staff ? 'YES!' : 'no :-('}</div>
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
