
import "./profile.css"
import { Link, Navigate } from "react-router-dom"
import axios from "axios";
import { useEffect, useState } from "react";

const apiUrl = "http://127.0.0.1:8000/accounts/auth/token/logout/";

function logOutFn(setIsAuth) {
  return () => {
    const instance = axios.create({
      baseURL: apiUrl,
      headers: { Authorization: `Token ${localStorage.getItem("token")}` },
    });
    console.log(`Token ${localStorage.getItem("token")}`);

    instance.post().then((resp) => {
      console.log(resp);
      setIsAuth(false);
    });
  };
}


function Profile(props){
    const [isAuth, setIsAuth] = useState(true)

    useEffect(() => {}, [setIsAuth])
    

  useEffect(() => {}, [setIsAuth])
  if(isAuth){
    return (
    <div className="profile pageStyle">
        <div>
            <div className="profileMenu">
                <Link className="regularText aText" to="/profile/change_data">
                    <div className="profileMenuElement subTitleText">Change Data</div>
                </Link>
                {/* <Link className="regularText aText" to="/profile/wish_list">
                    <div className="profileMenuElement subTitleText">Wish List</div>
                </Link> */}
                <Link className="regularText aText" to="/profile/orders">
                    <div className="profileMenuElement subTitleText">Orders</div>
                </Link>
                <div className="regularText aText" onClick={logOutFn(setIsAuth)}>
                    <div className="profileMenuElement subTitleText">Logout</div>
                </div>
            </div>
        </div>
        <div className="profileMain">
            {props.element}
        </div>
    </div>
    )
  }else{
    return <Navigate to="/login"></Navigate>
  }
} 


export default Profile