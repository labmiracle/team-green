import { NavLink } from "react-router-dom";
import { FaLinkedin } from "react-icons/fa6";
import "./footer.scss";

const Footer = () => {
  return (
    <footer>
      <div id="container-footer">
        <div className="social-networks">
          <h3>Social</h3>
          <hr />
          <ul>
            <li>
              <NavLink
                to="https://www.linkedin.com/in/franciscocrema/"
                className="linkedin"
              >
                {FaLinkedin}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="https://www.linkedin.com/in/eugenio-barroso-0a8244218/"
                className="linkedin"
              >
                {FaLinkedin}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="https://www.linkedin.com/in/lucasbecerra27"
                className="linkedin"
              >
                {FaLinkedin}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="https://www.linkedin.com/in/giovannadipaolo/"
                className="linkedin"
              >
                {FaLinkedin}
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="copyrigth">
          <p>
            Copyright © <b>TripSage</b>
          </p>
        </div>
        <div className="contact">
          <h3>Contact</h3>
          <hr />
          <p>francrema00@gmail.com</p>
          <p>eugeasc@gmail.com</p>
          <p>becerralucas40@gmail.com</p>
          <p>giovannadipaolo39@gmail.com</p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
