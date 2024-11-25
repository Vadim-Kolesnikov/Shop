import "./header.css";
import { Link, Navigate } from "react-router-dom";
import { Theme } from "../theme/theme";
import img from "../../imgs/cross.png";

function Header(props) {
  return (
    <div className="header pageStyle">
      <div className="logoContainer subTitleText">
        SHOP NAME
        <img className="logoImg" src={img}></img>
      </div>
      <nav>
        <div className="navElement">
          <div className="headerDropMenuContainer">
            <div className="headerDropMenuTitle regularText aText">TYPES</div>
            <div className="headerDropMenu regularText leftDropMenu">
              {props.types.map((type) => {
                return (
                  <Link
                    className="regularText aText"
                    to={`/products/${type.name}`}
                  >
                    <div className="headerDropMenuElement aText">
                      {type.name}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
        <div className="navElement">
          <div className="headerDropMenuContainer">
            <div className="headerDropMenuTitle regularText aText">BRANDS</div>
            <div className="headerDropMenu regularText rightDropMenu">
              {props.brands.map((brand) => {
                return (
                  <Link
                    className="regularText aText"
                    to={`/products/${brand.name}`}
                  >
                    <div className="headerDropMenuElement aText">
                      {brand.name}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
        <div className="navElement">
          <Link className="regularText aText" to="/">
            PRODUCTS
          </Link>
        </div>
        <div className="navElement">
          <Link className="regularText aText" to="/cart">
            CART
          </Link>
        </div>
        <div className="navElement">
          <Link className="regularText aText" to="/profile/change_data">
            Profile
          </Link>
        </div>
        <div className="navElement">
          <Theme />
        </div>
      </nav>
    </div>
  );
}

export default Header;
