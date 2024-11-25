import { Link } from "react-router-dom";
import "./registration.css";
import axios from "axios";
import SETTINGS from "../../settings";
import utils from "../../utils";



function postRegInfo() {
  let name = document.getElementById("regNameInput").value;
  let email = document.getElementById("regEmailInput").value;
  let password = document.getElementById("regPasswordInput").value;
  const formData = new FormData();
  
  console.log(name, email, password)

  formData.append("username", name); 
  formData.append("email", email)
  formData.append("password", password)

  const instance = axios.create({
    baseURL: SETTINGS.ACCOUNTS_URL,
  });

  instance.post("api/v1/auth/users/", formData).then((resp) => {
    console.log(resp.data, resp.status);
  }).catch(err => console.log(err));
}

function Registration(props) {
  return (
    <div className="registration">
      <div className="registrationWrapper">
        <div className="registrationForm regularText">
          <div className="registrationMainTitleWrapper">
            <div className="registrationMainTitle titleText">Registration</div>
          </div>
          <div className="registrationTitle">Name</div>
          <input className="registrationInput inputStyle" id="regNameInput"></input>
          <div className="registrationTitle">Email</div>
          <input className="registrationInput inputStyle" id="regEmailInput"></input>
          <div className="registrationTitle">Password</div>
          <input className="registrationInput inputStyle" id="regPasswordInput"></input>
          <div className="registrationButtonWrapper">
            <button
              className="registrationButton btnStyle"
              onClick={postRegInfo}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
