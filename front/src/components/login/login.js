import { Link } from "react-router-dom";
import "./login.css";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SETTINGS from "../../settings.js";

function postLoginInfo(setIsAuth) {
  return () => {
    let name = document.getElementById("loginNameInput").value;
    let password = document.getElementById("loginPasswordInput").value;
    const formData = new FormData();

    console.log(name, password);

    formData.append("username", name);
    formData.append("password", password);

    const instance = axios.create({
      baseURL: SETTINGS.ACCOUNTS_URL,
    });

    instance
      .post("auth/token/login/", formData)
      .then((resp) => {
        localStorage.setItem("token", resp.data["auth_token"]);
        console.log(localStorage.getItem("token"));
      })
      .then(() => {
        setIsAuth(true);
      })
      .then(() => {
        
      })
      .catch((err) => console.log(err));
  };
}

function Login(props) {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {}, [setIsAuth]);
  if (!isAuth) {
    return (
      <div className="login">
        <div className="loginWrapper">
          <div className="loginForm">
            <div className="loginMainTitleWrapper">
              <div className="loginMainTitle titleText">Login</div>
            </div>
            <div className="loginTitle regularText">Name</div>
            <input className="loginInput inputStyle" id="loginNameInput"></input>
            <div className="loginTitle regularText">Password</div>
            <input className="loginInput inputStyle" id="loginPasswordInput"></input>
            <div className="loginButtonWrapper">
              <button
                className="loginButton btnStyle"
                onClick={postLoginInfo(setIsAuth)}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <Navigate to="/"></Navigate>;
  }
}

export default Login;
