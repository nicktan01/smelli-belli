import { NavLink } from "react-router-dom";

function Nav() {
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
                <NavLink className="dropdown-item" to="/inventory">
                  Inventory
                </NavLink>
                <NavLink className="dropdown-item" to="/orderfulfillment">
                  Order Fulfillment
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
                Shop
              </NavLink>
              <div
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <NavLink className="dropdown-item" to="/home">
                  Home Products
                </NavLink>
                <NavLink className="dropdown-item" to="/body">
                  Body Products
                </NavLink>
                <NavLink className="dropdown-item" to="/shopall">
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
                <i class="bi bi-person-fill"></i>
              </NavLink>
              <div
                style={{ left: "unset", right: "0" }}
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <NavLink className="dropdown-item" to="/login">
                  My Account
                </NavLink>
                <NavLink className="dropdown-item" to="/orderhistory">
                  Order History
                </NavLink>
                <NavLink className="dropdown-item" to="/wishlist">
                  Wish List
                </NavLink>
                <NavLink className="dropdown-item" to="/scentprofile">
                  Scent Profile
                </NavLink>
              </div>
            </span>
            <span className="nav-item active">
              <NavLink className="nav-link" to="/cart">
                <i class="bi bi-cart"></i>
                <span class="position-absolute top-25 start-90 translate-middle badge rounded-pill bg-danger">
                  3
                </span>
              </NavLink>
            </span>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
