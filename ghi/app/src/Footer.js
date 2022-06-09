import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-3 border-top">
      <ul className="nav col-md-4 justify-content-start">
        <li className="nav-item">
          <NavLink to="/" className="nav-link px-2 text-muted">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/about" className="nav-link px-2 text-muted">
            About/FAQ
          </NavLink>
        </li>
        <li className="nav-link px-2 text-muted">Connect: </li>
        <li className="nav-item">
          <a
            href="mailto:smelliibellii@gmail.com"
            className="nav-link px-2 text-muted"
          >
            <i className="bi bi-envelope"></i>
          </a>
        </li>
        <li className="nav-item">
          <a
            href="https://www.instagram.com/smellibelli22/"
            className="nav-link px-2 text-muted"
          >
            <i className="bi bi-instagram"></i>
          </a>
        </li>
        <li className="nav-item">
          <a
            href="https://www.facebook.com/smellibelli22/"
            className="nav-link px-2 text-muted"
          >
            <i className="bi bi-facebook"></i>
          </a>
        </li>
        <li className="nav-item">
          <a
            href="https://m.me/smellibelli22"
            className="nav-link px-2 text-muted"
          >
            <i className="bi bi-messenger"></i>
          </a>
        </li>
        <li className="nav-item">
          <ul className="navbar-nav px-2">
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
                <i className="bi bi-linkedin"></i>
              </NavLink>
              <div
                style={{ left: "unset", right: "0" }}
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <a
                  href="https://www.linkedin.com/in/luucin/"
                  className="dropdown-item"
                >
                  Cindy
                </a>
                <a
                  href="https://www.linkedin.com/in/elliottklaassen/"
                  className="dropdown-item"
                >
                  Elliott
                </a>
                <a
                  href="https://www.linkedin.com/in/jaidensy/"
                  className="dropdown-item"
                >
                  Jaiden
                </a>
                <a
                  href="/https://www.linkedin.com/in/jordan-frerichs/"
                  className="dropdown-item"
                >
                  Jordan
                </a>
                <a
                  href="https://www.linkedin.com/in/nicholas-tan01/"
                  className="dropdown-item"
                >
                  Nicholas
                </a>
              </div>
            </li>
          </ul>
        </li>
      </ul>

      <NavLink
        to="/"
        className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
      ></NavLink>

      <ul className="nav col-md-4 justify-content-end">
        <li className="nav-item">
          <NavLink to="/login" className="nav-link px-2 text-muted">
            Employee Login
          </NavLink>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
