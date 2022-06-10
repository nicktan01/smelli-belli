import React from "react";
import { useToken } from "./authApi";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

function AccountPage() {
    const [token] = useToken();
    const [user, setUser] = useState([]);
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

        // accounts/<str:email>
        console.log(user)
            return (
                
                <div className="container shadow p-4 mt-4">
                    <header>
                        <h1>Account</h1>
                        <div>you are currently logged in as: {user.username}</div>
                    </header>
                    <body>
                        <div className="container p-4 mt-4">
                                <h3>Account Details:
                                    <NavLink to="/account/edit" className="nowrap">
                                        <i className="bi bi-pencil-square"></i>
                                    </NavLink>
                                </h3>
                            <div>first name: {user.first_name}</div>
                            <div>last name: {user.last_name}</div>
                            <div>email: {user.email}</div>
                        </div>
                    </body>
                </div>
            )
        }

export default AccountPage;