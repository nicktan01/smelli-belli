import { Navigate } from 'react-router-dom';

function Login(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const canLogin = username && password;

  if (props.token) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <h1>Login</h1>
      <input type="text" onChange={e => setUsername(e.target.value)} value={username} placeholder="username" />
      <input type="password" onChange={e => setPassword(e.target.value)} value={password} placeholder="password" />
      <button disabled={!canLogin} onClick={async () => setError(await props.login(username, password))}>Login</button>
    </div>
  )
}

export default Login;
