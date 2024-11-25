import axios from "axios";
import Product from "../product/product";
import "./cart_product.css";
import utils from "../../utils";
import SETTINGS from "../../settings";
import img from "../../imgs/bin.png"


function removeFromCart(cartProductId, qty) {
  return () => {
    utils
      .sendData("accounts/cart", "delete", {
        data: { cart_product_id: cartProductId, qty: qty },
      })
      .then((res) => {
        window.location.reload();
      });
  };
}

function changeQty(cartProductId, product, is_plus) {
  return () => {
    let product_qty = 1;

    if (is_plus) {
      utils
        .sendData("accounts/cart", "patch", {
          product_id: product.id,
          product_qty: product_qty,
        })
        .then((res) => {
          window.location.reload();
        });
    } else {
      utils
        .sendData("accounts/cart", "delete", {
          data: {
            cart_product_id: cartProductId,
            qty: product_qty,
          },
        })
        .then((res) => {
          window.location.reload();
        });
    }
  };
}

function CartProduct(props) {
  console.log(props.cartProductId);
  return (
    <div className="cartProduct">
      <Product
        product={props.product}
        img={`${SETTINGS.BASE_URL}${props.product.img}`}
      ></Product>
      <div className="cartProductInterface">
        <div className="qty">
          <button
            type="submit"
            className="qtyBtn btnStyle"
            onClick={changeQty(
              props.cartProductId,
              props.product,
              false,
              props.setCart
            )}
          >
            -
          </button>
          <div className="qtyInputWrapper regularText">{props.qty}</div>
          <button
            type="submit"
            className="qtyBtn btnStyle"
            onClick={changeQty(props.cartProductId, props.product, true)}
          >
            +
          </button>
        </div>
        <button
          type="submit"
          className="deleteProductBtn btnStyle"
          onClick={removeFromCart(props.cartProductId, props.qty)}
        >
          <img className="cartBin" src={img}></img>
        </button>
      </div>
    </div>
  );
}

export default CartProduct;
