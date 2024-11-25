import "./order.css";
import Product from "../product/product.js";
import SETTINGS from "../../settings.js";

function Order(props) {
  return (
    <div className="order activeOrder" key={props.key} id={props.id}>
      <div className="orderTitle subTitleText">Order №{props.id}</div>
      <div className="orderContent">
        <div className="orderText  regularText">
          <div className="orderTextTitle regularText">DeliveryType:</div>
          {props.delivery_type}
        </div>
        <div className="orderText  regularText">
          <div className="orderTextTitle regularText">Status:</div>
          {props.status}
        </div>
        <div className="orderText regularText">
          <div className="orderTextTitle  regularText">Address:</div>
          {props.address}
        </div>
        <div className="orderText regularText">
          <div className="orderTextTitle regularText">Total:</div>
          {props.total} $
        </div>
        <div className="orderTextTitle regularText">Products:</div>
        <div className="orderProducts">
          {props.order_products.map((order_prod) => (
            <Product
              product={order_prod.product}
              img={order_prod.product.img}
              key={order_prod.id}
            ></Product>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Order;
