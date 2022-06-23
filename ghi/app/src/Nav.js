import { NavLink } from "react-router-dom";
import { useToken } from "./authApi";
import useSWR from "swr";
import { useState, useEffect } from "react";

function Nav() {
  const [token] = useToken();
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getCurrentUser() {
      const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/accounts/me/`;
      const response = await fetch(url, {
        credentials: "include",
      });
      if (response.ok) {
        const user = await response.json();
        setUser(user);
      }
    }
    if (token) {
      getCurrentUser();
    }
  }, [token]);

  const { data: cart, error } = useSWR(
    token ? "/api/cart/" : null,
    async () => {
      const request = await fetch("http://localhost:8090/api/cart/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await request.json();
      return json;
    }
  );

  let quantity = 0;
  (cart || []).forEach((item) => {
    quantity += item.cartQuantity
  });

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light"
      style={{ backgroundColor: "#ccd5ae" }}
    >
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          <img src="/images/sblogo2.png" alt="" width="110" height="25" />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav me-auto">
            {token && user && user.is_staff && (
              <li className="nav-item dropdown">
                <NavLink
                  className="nav-link dropdown-toggle"
                  to="#"
                  id="navbarDropdownMenuLink"
                  data-toggle="dropdown"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Employee
                </NavLink>
                <div
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <NavLink className="dropdown-item" to="employees/inventory">
                    Inventory
                  </NavLink>
                  <NavLink className="dropdown-item" to="employees/newproduct">
                    New Product Form
                  </NavLink>
                </div>
              </li>
            )}
            <li className="nav-item dropdown">
              <NavLink
                className="nav-link dropdown-toggle"
                to="#"
                id="navbarDropdownMenuLink"
                data-toggle="dropdown"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Shop
              </NavLink>
              <div
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <NavLink className="dropdown-item" to="/products/home">
                  Home Products
                </NavLink>
                <NavLink className="dropdown-item" to="/products/body">
                  Body Products
                </NavLink>
                <NavLink className="dropdown-item" to="/products/all">
                  Shop all
                </NavLink>
              </div>
            </li>
            <li className="nav-item dropdown">
              <NavLink
                className="nav-link dropdown-toggle"
                to="#"
                id="navbarDropdownMenuLink"
                data-toggle="dropdown"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Scent Finder
              </NavLink>
              <div
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <NavLink className="dropdown-item" to="/homequiz">
                  Home Scent Quiz
                </NavLink>
                <NavLink className="dropdown-item" to="/bodyquiz">
                  Body Scent Quiz
                </NavLink>
              </div>
            </li>
          </ul>
          { token ?
          <>
          <ul className="navbar-nav">
            <span className="nav-item dropdown">
              <NavLink
                className="nav-link dropdown-toggle"
                to="#"
                id="navbarDropdownMenuLink"
                data-toggle="dropdown"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="bi bi-person-fill"></i>
              </NavLink>
              <div
                style={{ left: "unset", right: "0" }}
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <NavLink
                  className="dropdown-item"
                  to={token ? "/account" : "/login"}
                >
                  My Account
                </NavLink>

                <NavLink className="dropdown-item" to="/orderhistory">
                  Order History
                </NavLink>
                <NavLink className="dropdown-item" to="/wishlist">
                  Wish List
                </NavLink>
                <NavLink className="dropdown-item" to="/scentprofiles">
                  Scent Profile
                </NavLink>
              </div>
            </span>
            <span className="nav-item active">
              <NavLink className="nav-link" to="/cart">
                <i className="bi bi-cart"></i>
                <span className="position-absolute top-25 start-90 translate-middle badge rounded-pill bg-danger">
                  {quantity}
                </span>
              </NavLink>
            </span>
          </ul>
          </>
          :
          <>
          <ul className="navbar-nav">
            <span className="nav-item dropdown">
              <NavLink
                className="nav-link dropdown-toggle"
                to="#"
                id="navbarDropdownMenuLink"
                data-toggle="dropdown"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="bi bi-person-fill"></i>
              </NavLink>
              <div
                style={{ left: "unset", right: "0" }}
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <NavLink
                  className="dropdown-item"
                  to={token ? "/account" : "/login"}
                >
                  My Account
                </NavLink>
              </div>
            </span>
            <span className="nav-item active">
              <NavLink className="nav-link" to="/cart">
                <i className="bi bi-cart"></i>
                <span className="position-absolute top-25 start-90 translate-middle badge rounded-pill bg-danger">
                  {/* {cartQuantity} */}
                </span>
              </NavLink>
            </span>
          </ul>
          </> 
          }
        </div>
      </div>
    </nav>
  );
}

export default Nav;
