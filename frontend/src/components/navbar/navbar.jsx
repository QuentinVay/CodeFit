import React from "react";
import "./navbar.scss";
import { useNavigate } from "react-router-dom";
import haltere from "../../assets/musculation.svg";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleClick = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="navbar">
      <img src={haltere} className="navbar-logo" alt="Logo" />
      <button
        type="button"
        className="navbar-title"
        onClick={() => navigate("/")}
      >
        CodeFit
      </button>
      <div className="navbar-auth">
        <button
          type="button"
          className="navbar-button"
          onClick={() => {
            // eslint-disable-next-line no-unused-expressions
            token ? handleClick() : navigate("/login");
          }}
        >
          {token ? "Se déconnecter" : "Se connecter"}
        </button>
        {token && (
          <button
            type="button"
            className="button-profil"
            onClick={() => navigate("/profil")}
          >
            Profil
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
