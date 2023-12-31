import { NavLink, Link } from "react-router-dom";
import "./navbar.scss";
import { AiOutlineUser } from "react-icons/ai";

function NavBar() {
  return (
    <header>
      <section id="container-todo">
        <div className="container-nav">
          <header>
            <div className="container-seccion">
              <nav id="navbar">
                <Link to="/">
                  <img
                    src="../../../public/img/Logo.png"
                    alt="Logo"
                    id="logo"
                  />
                </Link>
                <ul>
                  <li>
                    <NavLink to="/fly">
                      <img src="../../../public/img/Flight.png" alt="Fly" />
                    </NavLink>
                  </li>
                </ul>
              </nav>

              <div className="container-button">
                <div className="button">
                  <div id="icon">
                    <Link to={"/logIn"}>
                      <button>
                        <AiOutlineUser />
                        {"Log In "}
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </header>
        </div>
      </section>
    </header>
  );
}

export default NavBar;
