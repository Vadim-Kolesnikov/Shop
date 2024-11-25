import "./wish_list_product.css";
import Product from "../product/product.js";
import utils from "../../utils.js";
import SETTINGS from "../../settings.js";
import img from "../../imgs/bin.png"
function removeFromWishList(productId) {
  return () => {
    utils
      .sendData("accounts/wish_list", "delete", {
        data: { product_id: productId },
      })
      .then((res) => {
        window.location.reload();
      });
  };
}

function WishListProduct(props) {
  return (
    <div className="wishListProduct">
      <button className="like btnStyle" onClick={removeFromWishList(props.id)}>
        <img className="wishTrashBin" src={img}></img>
      </button>
      <Product
        product={props.product}
        img={`${SETTINGS.BASE_URL}${props.product.img}`}
      ></Product>
    </div>
  );
}

export default WishListProduct;
