import "./App.css";
import ProductSearch from "./components/product_search/product_search.js";
import Orders from "./components/orders/orders.js";
import Main from "./components/main/main.js";
import Cart from "./components/cart/cart.js";
import WishList from "./components/wishlist/wishlist.js";
import Registration from "./components/registration/registration.js";
import Login from "./components/login/login.js";
import ProductDetail from "./components/product_detail/product_detail.js";

import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";

import SETTINGS from "./settings.js";
import utils from "./utils.js";
import Profile from "./components/profile/profile.js";
import ChangeProfileData from "./components/profile/change_profile_data.js";
import StartPage from "./components/start_page/start_page.js";
import Products from "./components/products/products.js";

const productSlugsArea = "product_ids";
const brandsArea = "brands";
const typesArea = "types";

const App = () => {
  const { productSlugsPromiseInProgress } = usePromiseTracker({
    productSlugsArea,
  });
  const [productSlugs, setProductSlugs] = useState([]);

  const { brandsPromiseInProgress } = usePromiseTracker({ brandsArea });
  const [brands, setBrands] = useState([]);

  const { typesPromiseInProgress } = usePromiseTracker({ typesArea });
  const [types, setTypes] = useState([]);

  useEffect(() => {
    utils.getData(
      trackPromise,
      SETTINGS.PRODUCT_IDS_URL,
      SETTINGS.TOKEN,
      setProductSlugs
    );
    utils.getData(trackPromise, SETTINGS.BRANDS_URL, SETTINGS.TOKEN, setBrands);
    utils.getData(trackPromise, SETTINGS.TYPES_URL, SETTINGS.TOKEN, setTypes);
  }, [setProductSlugs, setBrands, setTypes]);
  if (
    productSlugsPromiseInProgress ||
    brandsPromiseInProgress ||
    typesPromiseInProgress
  ) {
    return <div>Подождите, данные загружаются!</div>;
  } else {
    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route
              path="profile/wish_list"
              key={`link${-4}`}
              element={
                <Main brands={brands} types={types}
                  element={
                    <Profile element={<WishList />} activeElemenetNum={1} />
                  }
                />
              }
            ></Route>
            <Route
              path="profile/orders"
              key={`link${-3}`}
              element={
                <Main brands={brands} types={types}
                  element={
                    <Profile element={<Orders />} activeElemenetNum={2} />
                  }
                />
              }
            ></Route>
            <Route
              path="profile/logout"
              key={`link${-2}`}
              element={
                <Main brands={brands} types={types}
                  element={
                    <Profile
                      element={<ChangeProfileData />}
                      activeElemenetNum={3}
                    />
                  }
                />
              }
            ></Route>
            <Route
              path="profile/change_data"
              key={`link${-1}`}
              element={
                <Main brands={brands} types={types}
                  element={
                    <Profile
                      element={<ChangeProfileData />}
                      activeElemenetNum={0}
                    />
                  }
                />
              }
            ></Route>
            <Route
              path="cart"
              key={`link${0}`}
              element={<Main brands={brands} types={types} element={<Cart />} />}
            />
            <Route
              path="orders"
              key={`link${1}`}
              element={<Main brands={brands} types={types} element={<Orders />} />}
            />
            <Route
              path="wish_list"
              key={`link${2}`}
              element={<Main brands={brands} types={types} element={<WishList />} />}
            />
            <Route
              path=""
              key={`link${3}`}
              element={<Main brands={brands} types={types} element={<ProductSearch />} />}
            />
            <Route
              path="registration"
              element={<StartPage element={<Registration></Registration>} />}
              key={`link${4}`}
            ></Route>
            <Route
              path="login"
              key={`link${5}`}
              element={<StartPage element={<Login></Login>} />}
            ></Route>
            {productSlugs.map((slug) => (
              <Route
                key={slug}
                path={`products/${slug}`}
                element={<Main brands={brands} types={types} element={<ProductDetail slug={slug} />} />}
              />
            ))}
            {brands.map((brand) => (
              <Route
                key={`${brand.name}_${brand.id}`}
                path={`products/${brand.name}`}
                element={<Main brands={brands} types={types} element={<Products brand={brand} />} />}
              />
            ))}
            {types.map((type) => (
              <Route
                key={`${type.name}_${type.id}`}
                path={`products/${type.name}`}
                element={<Main brands={brands} types={types} element={<Products type={type} />} />}
              />
            ))}
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
};

export default App;
