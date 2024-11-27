import "./product_detail.css";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import React, { useEffect, useState } from "react";
import utils from "../../utils.js";
import SETTINGS from "../../settings.js";

const productArea = "product";

function addToWishList(product) {
  return () => {
    utils.sendData("accounts/wish_list", "patch", { product_id: product.id });
  };
}

function addToCart(product) {
  return () => {
    utils
      .sendData("accounts/cart", "patch", {
        product_id: product.id,
        product_qty: 1,
      })
      .then(() => {
        
      });
  
        let elem = document.getElementsByClassName("addToCartNotification")[0]
        elem.style.right = '0px'
        setTimeout(()=>{
          elem.style.right = '-500px'
        }, 2500)
  };
}

function ProductDetail(props) {
  const { productPromiseInProgress } = usePromiseTracker({ productArea });
  const [product, setProduct] = useState(null);

  useEffect(() => {
    utils.getData(
      trackPromise,
      `${SETTINGS.PRODUCTS_URL}/${props.slug}`,
      SETTINGS.TOKEN,
      setProduct
    );
  }, [setProduct]);
  if (productPromiseInProgress || !product) {
    return <div>Подождите, данные загружаются!</div>;
  } else {
    return (
      <div className="productDetail pageStyle">
        <div className="productDetailGallery">
          <img
            className="productDetailImg"
            src={`${SETTINGS.BASE_URL}${product.img}`}
          ></img>
        </div>

        <div className="productDetailInfo">
          <div className="addToCartNotification regularText">
            <div className="addToCartNotificationTitle">Product successfully added to cart!</div>
            <div className="addToCartNotificationDes"></div>
          </div>
          <div className="productDetailInfoHead titleText">{product.name}</div>

          <div className="productDetailInfoText regularText regularText">
            <div className="productDetailInfoTitle subTitleText">Description: </div>{" "}
            <div className="lorem">{product.des}</div>
          </div>

          <div className="productDetailInfoText regularText">
            <div className="productDetailInfoTitle subTitleText">Brand:</div>
            {product.brand.name}
          </div>

          <div className="productDetailInfoText regularText">
            <div className="productDetailInfoTitle subTitleText">Type:</div>
            {product.type.name}
          </div>

          <div className="productDetailInfoText regularText">
            <div className="productDetailInfoTitle subTitleText">Price:</div>{" "}
            {Number(product.price)} $
          </div>

          <div className="productDetailBtnGroup">
            <button
              className="btnStyle productDetailBtn"
              onClick={addToCart(product)}
              id="addBtn1"
            >
              Add to cart
            </button>
            <button
              style={{display: 'none'}}
              className="btnStyle productDetailBtn"
              onClick={addToWishList(product)}
            >
              Add to wish list
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductDetail;
