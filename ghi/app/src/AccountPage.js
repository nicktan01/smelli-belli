import React from "react";
import { useToken } from "./authApi";
import { useState, useEffect } from "react";


function AccountPage() {
const [token] = useToken();
const [user, setUser] = useState(null);
const [error, setError] = useState(null);

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

    // accounts/<str:email>/

        return (
            <div className="container shadow p-4 mt-4">
                <h1>Account Page</h1>
                <h4>username</h4>
                <div className="container p-4 mt-4">
                    Change Account Details
                </div>
                <div className="container p-4 mt-4">
                    View Orders
                </div>
                <div className="container p-4 mt-4">
                    {token}
                </div>
            </div>
        )
    }

export default AccountPage;