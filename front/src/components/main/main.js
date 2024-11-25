import Footer from "../footer/footer";
import Header from "../header/header";
import "./main.css";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import SETTINGS from "../../settings";

const area = "isAuth";

function Main(props) {
  const [isAuth, setIsAuth] = useState(null);
  const { promiseInProgress } = usePromiseTracker({ area });

  if (localStorage.length === 0) {
    localStorage.setItem("token", "");
  }

  useEffect(() => {
    const instance = axios.create({
      baseURL: SETTINGS.MAIN_URL,
      headers: { Authorization: `Token ${localStorage.getItem("token")}` },
    });
    trackPromise(
      instance
        .get()
        .then((resp) => {
          setIsAuth(true);
        })
        .catch((err) => {
          console.log(err.status);
          if (err.status == 401) {
            setIsAuth(false);
          }
        })
    );
  }, [setIsAuth]);

  if (promiseInProgress || isAuth === null) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  } else {
    if (!isAuth) {
      return <Navigate to="/registration"></Navigate>;
    } else {
      return (
        <div className="main">
          <header>
            <Header types={props.types} brands={props.brands}></Header>
          </header>
          <main>{props.element}</main>
          <footer>
            <Footer></Footer>
          </footer>
        </div>
      );
    }
  }
}

export default Main;
