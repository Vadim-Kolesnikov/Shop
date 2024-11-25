import "./cart.css";
import CartProduct from "../cart_product/cart_product";
import EmptyPage from "../empty_page/empty_page.js";
import axios from "axios";

import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import { useEffect, useState } from "react";
import SETTINGS from "../../settings.js";
import utils from "../../utils.js";

const cartArea = "cart";
const deliveryTypeArea = "deliveryTypes";

function createOrder(deliveryTypes) {
  return () => {
    let radios = document.getElementsByClassName("deliveryRadioInput");

    let delivery_type_id;
    for (let i = 0; i < radios.length; i++) {
      if (radios[i].checked) {
        delivery_type_id = deliveryTypes[i].id;
        break;
      }
    }
    if (delivery_type_id) {
      let address = document.getElementById("addressInput").value;
      if (address.length == 0) {
        alert("Write your address");
      } else {
        let data = {
          delivery_type_id: delivery_type_id,
          address: address,
          redirect_url: "http://localhost:3000/"
        }
        const instance = axios.create({
          baseURL: SETTINGS.BASE_URL,
          headers: { Authorization: `Token ${SETTINGS.TOKEN}` },
          data: data,
        });
        instance.post("payment/create_payment", data).then((resp) => {
          console.log(resp.data)
          window.location.href = resp.data['confirmation']['confirmation_url']
        });
       
      }
    } else {
      alert("Choose delivery type");
    }
  };
}

function Cart() {
  const { cartPromiseInProgress } = usePromiseTracker({ cartArea });
  const { deliveryTypesPromiseInProgress } = usePromiseTracker({
    deliveryTypeArea,
  });
  const [cart, setCart] = useState(null);
  const [deliveryTypes, setDeliveryTypes] = useState([]);

  useEffect(() => {
    utils.getData(trackPromise, SETTINGS.CART_URL, SETTINGS.TOKEN, setCart);
    utils.getData(
      trackPromise,
      SETTINGS.DELIVERY_TYPES_URL,
      SETTINGS.TOKEN,
      setDeliveryTypes
    );
    console.log(cart);
    console.log(deliveryTypes);
  }, [setCart]);

  if (cartPromiseInProgress || deliveryTypesPromiseInProgress) {
    return <div>Подождите, данные загружаются!</div>;
  } else if (!cart || cart.products.length == 0) {
    return <EmptyPage text="No products in cart" />;
  } else {
    return (
      <div className="cart pageStyle">
        <div className="pageTitle titleText">CART</div>
        <div className="cartContainer">
          <div className="createOrderContainer">
            <div className="createOrder">
              <div className="cartContentTitle subTitleText">Create order</div>
              <div className="cartText regularText">
                <div className="cartTitle">Total:</div> {cart.total} $
              </div>
              <div className="cartText regularText">
                <div className="cartTitle">Qty:</div> 23
              </div>
              <div className="cartText regularText">
                <div className="cartTitle">Address:</div> <br></br>
                <textarea id="addressInput" className="inputStyle"></textarea>
              </div>
              <div className="deliveryTypes">
                <div className="cartText regularText">
                  <div className="cartTitle regularText">DeliveryType: </div>
                </div>
                <form>
                  {deliveryTypes.map((deliveryType) => (
                    <div className="deliveryType regularText">
                      <input
                        type="radio"
                        name="deliveryType"
                        className="deliveryRadioInput"
                      />
                      {deliveryType.name}
                    </div>
                  ))}
                </form>
              </div>
              <div>
                <button
                  className="createOrderBtn btnStyle"
                  onClick={createOrder(deliveryTypes)}
                >
                  Create order
                </button>
              </div>
            </div>
          </div>

          <div className="cartProducts">
            <div className="cartProductsTitle subTitleText"> Cart products</div>
            <div className="cartProductsContainer"></div>
            {cart.products.map((cartProduct) => (
              <CartProduct
                product={cartProduct.product}
                cartProductId={cartProduct.id}
                qty={cartProduct.qty}
                setCart={setCart}
              ></CartProduct>
            ))}
          </div>

          
        </div>
      </div>
    );
  }
}

export default Cart;
