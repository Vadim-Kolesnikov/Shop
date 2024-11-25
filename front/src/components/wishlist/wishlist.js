import "./wish_list.css";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import { useEffect, useState } from "react";

import EmptyPage from "../empty_page/empty_page.js";

import WishListProduct from "./wish_list_product.js";
import utils from "../../utils.js";
import SETTINGS from "../../settings.js";

const area = "products";

function WishList() {
  const { promiseInProgress } = usePromiseTracker({ area });
  const [wishList, setWishList] = useState(null);

  useEffect(() => {
    utils.getData(
      trackPromise,
      SETTINGS.WISH_LIST_URL,
      SETTINGS.TOKEN,
      setWishList
    );
  }, [setWishList]);

  if (!wishList || wishList.products.length == 0) {
    return <EmptyPage text="No products in wish list" />;
  } else if (promiseInProgress) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <div className="wishList">
        <div className="pageTitle subTitleText">WISH LIST</div>
        <div className="wishContainer">
          {wishList.products.map((prod) => (
            <WishListProduct
              product={prod}
              key={prod.id}
              img={prod.img}
            ></WishListProduct>
          ))}
        </div>
      </div>
    );
  }
}

export default WishList;
