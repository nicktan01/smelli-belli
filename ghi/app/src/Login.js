import { useToken } from "./authApi";
import { useState, useEffect } from "react";
import SignUp from "./SignUp";
import { useNavigate } from "react-router-dom";

function Login() {
  const [token, login, logout] = useToken();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const canLogin = username && password;

  useEffect(() => {
    async function getCurrentUser() {
      const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/accounts/me/`;
      const response = await fetch(url, {
        credentials: "include",
      });
      if (response.ok) {
        const user = await response.json();
        console.log(user);
        setUser(user);
      }
    }
    if (token) {
      getCurrentUser();
    }
  }, [token]);

  return (
    <div>
      {token ? (
        <div className="row">
          <div className="offset-4 col-4 mt-4 mb-4">
            <div className="shadow p-4 mt-4">
              <h1 className="mx-4">You're logged in!</h1>
              {/* <div>{token}</div> */}
              <button
                className="btn btn-danger offset-4 col-4"
                onClick={logout}
              >
                Logout
              </button>
              {/* {orders == null ? (
                <div>Orders loading...</div>
              ) : (
                <div>{orders.length || "no"} products</div>
              )}
              {user == null ? (
                <div>Loading your information</div>
              ) : (
                <div>You are staff: {user.is_staff ? "YES!" : "no :-("}</div>
              )} */}
            </div>
          </div>
        </div>
      ) : (
        <div className="row">
          <div className="offset-4 col-4 mt-4 mb-4">
            <div className="shadow p-4 mt-4">
              <h1>Login</h1>
              <div className="form-floating mb-3">
                <input
                  className="form-control"
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  placeholder="username"
                />
                <label htmlFor="username">Username</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  className="form-control"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  placeholder="password"
                />
                <label htmlFor="password">Password</label>
              </div>
              <p>
                {error ? (
                  <div
                    class="alert alert-danger"
                    role="alert"
                    dangerouslySetInnerHTML={{ __html: error }}
                  />
                ) : null}
              </p>
              <button
                className="btn btn-success"
                disabled={!canLogin}
                onClick={async () => setError(await login(username, password))}
              >
                Login
              </button>
              <div className="border-top my-3 py-2">
                <h4>New to Smelli Belli?</h4>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
