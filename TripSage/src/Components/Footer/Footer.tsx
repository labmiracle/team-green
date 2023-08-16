import { NavLink } from "react-router-dom";
import { FaLinkedin } from "react-icons/fa6";
import "./footer.scss";

const Footer = () => {
  return (
    <footer>
      <div id="container-footer">
        <div className="social-networks">
          <ul>
            <li>
              <NavLink
                to="https://www.linkedin.com/in/franciscocrema-44284b239/"
                className="linkedin"
              >
                {FaLinkedin}
              </NavLink>
            </li>
            <li>
              <NavLink to="" className="linkedin">
                {FaLinkedin}
              </NavLink>
            </li>
            <li>
              <NavLink to="" className="linkedin">
                {FaLinkedin}
              </NavLink>
            </li>
            <li>
              <NavLink to="" className="linkedin">
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
        </div>
      </div>
    </footer>
  );
};
export default Footer;
