import React from "react";
import { useToken } from "./authApi";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function HomePage() {

  const [token, login, logout] = useToken();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();


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
    <div className="px-4 py-5 my-5 text-center">
      
      <h1 className="display-5 fw-bold">Smelli Belli</h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">Home and body products</p>
      </div>
    </div>
  );
}

export default HomePage;
