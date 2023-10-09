import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/app.scss";
import NavBar from "./Components/NavBar/NavBar";
import Footer from "./Components/Footer/Footer";
import React from "react";
import Fly from "./Components/Fly/Fly";
import Home from "./Components/Home/Home";
import LogIn from "./Components/LogIn-Register/LogIn";
import ProductList from "./Components/Search/SearchFly";
import RegistrationUser from "./Components/LogIn-Register/RegistrationUser";

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <NavBar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fly" element={<Fly />} />
          <Route path="/logIn" element={<LogIn />} />
          <Route
            path="/register"
            element={
              <RegistrationUser onCancel={() => {}} onRegister={() => {}} />
            }
          />

          <Route path="/fligths" element={<ProductList sessionToken="" />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
