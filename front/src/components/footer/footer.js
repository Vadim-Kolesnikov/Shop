import "./footer.css"
import img from "../../imgs/cross.png"
import { Link } from "react-router-dom";

function Footer() {
    return (
            <div className="footer pageStyle">
                <div className="footerColumn">
                        <div className="footerMenuEl"><Link to="/" className="regularText">Products</Link></div>
                        <div className="footerMenuEl"><Link to="/cart" className="regularText">Cart</Link></div>
                        <div className="footerMenuEl"><Link to="/profile/send_data" className="regularText">Profile</Link></div>
                </div>
                <div className="footerColumn regularText lowVis">Cupidatat consequat aliquip commodo duis. Aliquip adipisicing cupidatat consequat anim quis Lorem consectetur non et aliquip et. Culpa est elit labore enim labore excepteur culpa. Culpa do elit aliqua sunt quis.</div>
                <div className="footerColumn">
                        <div className="footerLogo titleText">
                                <img src={img} className="footerLogoImg"></img>
                                JEWERLY SHOP
                        </div>
                </div>
            </div>
    );
  }


  export default Footer;