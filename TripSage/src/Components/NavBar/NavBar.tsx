import { NavLink, Link } from "react-router-dom";
import "./navbar.scss";

function NavBar() {
  return (
    <header>
      <section className="container-todo">
        <div id="container-seccion">
          <Link to="/">
            <img src="../../../public/img/Logo.png" alt="Logo" id="logo" />
          </Link>
          <nav id="navbar">
            <ul>
              <li>
                <NavLink to="/fly">
                  <img src="../../../public/img/Flight.png" alt="Fly" />
                </NavLink>
              </li>
              <li>
                <NavLink to="/hotel">
                  <img src="../../../public/img/Hotel.png" alt="Hotel" />
                </NavLink>
              </li>
            </ul>
          </nav>

          <div className="container-button">
            <div className="button">
              <img src="../../../public/img/LogIn.png" />
              <button>Log In</button>
            </div>
          </div>
        </div>
      </section>
    </header>
  );
}

export default NavBar;
