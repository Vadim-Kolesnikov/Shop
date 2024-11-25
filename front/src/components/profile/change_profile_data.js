import "./change_profile_data.css";

import axios from "axios";
import SETTINGS from "../../settings";
import { useEffect, useState } from "react";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import utils from "../../utils.js";

function changePassword(user) {
  return () => {
    let new_password = document.getElementById("newPassword").value;
    let current_password = document.getElementById("currentPassword").value;

    const formData = new FormData();

    formData.append("new_password", new_password);
    formData.append("current_password", current_password);

    const instance = axios.create({
      baseURL: SETTINGS.ACCOUNTS_URL,
      headers: { Authorization: `Token ${SETTINGS.TOKEN}` },
    });
    instance
      .post("api/v1/auth/users/set_password/", formData)
      .then((resp) => {
        console.log(resp.data, resp.status);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };
}

function changeLogin(user) {
  return () => {
    let username = document.getElementById("login").value;
    let current_password = document.getElementById("userPassword").value;

    const formData = new FormData();

    formData.append("new_username", username);
    formData.append("current_password", current_password);

    const instance = axios.create({
      baseURL: SETTINGS.ACCOUNTS_URL,
      headers: { Authorization: `Token ${SETTINGS.TOKEN}` },
    });
    instance
      .post("api/v1/auth/users/set_username/", formData)
      .then((resp) => {
        console.log(resp.data, resp.status);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };
}

const area = "user";

function ChangeProfileData() {
  const [user, setUser] = useState({});
  const { promiseInProgress } = usePromiseTracker({ area });

  useEffect(() => {
    utils.getData(trackPromise, SETTINGS.USER_URL, SETTINGS.TOKEN, setUser);
  });
  if (!user || user.length == 0) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <div className="changeProfileData">
        <div className="changeProfileDataForm">
          <div className="subTitleText">Hello, {user.username}!</div>
        </div>
        <div className="changeProfileDataForm">
          <div className="subTitleText changeProfileDataFormTitle">
            Change Login
          </div>
          <div className="changeProfileDataInputGroup">
            <div className="changeProfileDataInputContainer">
              <div className="changeProfileDataInputTitle regularText">
                Password
              </div>
              <input
                className="changeProfileDataInput inputStyle"
                id="userPassword"
              ></input>
            </div>
            <div className="changeProfileDataInputContainer">
              <div className="changeProfileDataInputTitle regularText">
                New Login
              </div>
              <input
                className="changeProfileDataInput inputStyle"
                id="login"
              ></input>
            </div>
          </div>
          <div className="profileDataButtonContainer">
            <button
              className="profileDataButton btnStyle"
              onClick={changeLogin(user)}
            >
              Change
            </button>
          </div>
        </div>
        <div className="changeProfileDataForm">
          <div className="subTitleText changeProfileDataFormTitle">
            Change Password
          </div>
          <div className="changeProfileDataInputGroup">
            <div className="changeProfileDataInputContainer">
              <div className="changeProfileDataInputTitle regularText">
                Currrent Password
              </div>
              <input
                className="changeProfileDataInput inputStyle"
                id="currentPassword"
              ></input>
            </div>
            <div className="changeProfileDataInputContainer">
              <div className="changeProfileDataInputTitle regularText">
                New Password
              </div>
              <input
                className="changeProfileDataInput inputStyle"
                id="newPassword"
              ></input>
            </div>
          </div>
          <div className="profileDataButtonContainer">
            <button
              className="profileDataButton btnStyle"
              onClick={changePassword(user)}
            >
              Change
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ChangeProfileData;
