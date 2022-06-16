import { useToken } from "./authApi";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function EditAccount() {
    const [token, update] = useToken();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [user, setUser] = useState([]);
    const [error, setError] = useState(null);
    const canSignup = username && password && email && firstName && lastName;


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
        <div className="row">
          <div className="offset-4 col-4 mt-4 mb-4">
            <div className="shadow p-4 mt-4">
              <h1>Edit Account</h1>
              <div className="form-floating mb-3">
                <input
                  className="form-control"
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  placeholder="username"
                />
                <label htmlFor="username">{user.username}</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  className="form-control"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  placeholder="email"
                />
                <label htmlFor="email">{user.email}</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  className="form-control"
                  type="text"
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                  placeholder="first name"
                />
                <label htmlFor="first_name">{user.first_name}</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  className="form-control"
                  type="text"
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                  placeholder="last name"
                />
                <label htmlFor="last_name">{user.username}</label>
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
                className="btn btn-primary"
                disabled={!canSignup}
                onClick={async () =>
                  setError(
                    await update(username, password, email, firstName, lastName)
                  )
                }
              >
                update
              </button>
            </div>
          </div>
        </div>
    </div>
  );
}

export default EditAccount;
