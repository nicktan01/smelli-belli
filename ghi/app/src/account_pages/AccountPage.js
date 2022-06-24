import React from "react";
import { useToken } from "../authApi";
import { useState, useEffect } from "react";

function AccountPage() {
  // eslint-disable-next-line no-unused-vars
  const [token, login, logout] = useToken();
  const [user, setUser] = useState("");

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

  // accounts/<str:email>
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
          <div className="container shadow p-4 mt-4">
            <header>
              <h1>Account</h1>
              <div>you are currently logged in as: {user.username}</div>
            </header>
            <div className="container p-4 mt-4">
              <h3>Account Details:</h3>
              <div>first name: {user.first_name}</div>
              <div>last name: {user.last_name}</div>
              <div>email: {user.email}</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container shadow p-4 mt-4">
          <header>
            <h1>Account</h1>
            <div>you are currently logged out</div>
          </header>
        </div>
      )}
    </div>
  );
}

export default AccountPage;
