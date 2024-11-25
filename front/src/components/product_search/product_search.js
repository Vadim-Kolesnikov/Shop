import "./product_search.css";
import Product from "../product/product.js";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import utils from "../../utils.js";
import SETTINGS from "../../settings.js";

import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import arrow from "../../imgs/arrow.png";

function priceRangeChange(setPriceRange, priceRange) {
  return () => {
    let elem = document.getElementsByClassName("rangeInput")[0];
    let min = elem.childNodes[0].value;
    let max = elem.childNodes[1].value;
    setPriceRange({
      current_min: min,
      current_max: max,
      min: priceRange.min,
      max: priceRange.max,
    });
  };
}

function changePage(pageInfo, setPageInfo, pageNum, setPageNum, changeType) {
  return () => {
    if (pageInfo[changeType]) {
      utils.sendData("", "get", {}, "", setPageInfo, pageInfo[changeType]);
      if (changeType == "next") {
        setPageNum(pageNum + 1);
      } else {
        setPageNum(pageNum - 1);
      }
    }
  };
}

function applyFilterChanges(types, brands, setPageInfo, setPageNum) {
  return () => {
    let sortByInputs = document.getElementsByClassName("sortByRadio");
    let colorInputs = document.getElementsByClassName("typeCheckBox");
    let brandInputs = document.getElementsByClassName("brandCheckBox");
    let rangeInput = document.getElementsByClassName("rangeInput")[0];

    let min = rangeInput.childNodes[0].value;
    let max = rangeInput.childNodes[1].value;

    let sortId = utils.getChecked(SETTINGS.SORT_TYPES, sortByInputs)[0];
    let typeIds = utils.getChecked(types, colorInputs);
    let brandIds = utils.getChecked(brands, brandInputs);

    let obj1 = {
      types: typeIds,
      brands: brandIds,
    };
    let obj2 = {
      price_start: String(min),
      price_end: String(max),
    };

    let params = "?";
    params += utils.makeQueryStrFromArrs(obj1);
    params += utils.makeQueryStrFromStrings(obj2);

    if (sortId || sortId == 0) {
      if (SETTINGS.SORT_TYPES[sortId].name[0] == "-") {
        params += utils.makeQueryStrFromStrings({
          sort_by: SETTINGS.SORT_TYPES[sortId - 1].name,
          reverse: "True",
        });
      } else {
        params += utils.makeQueryStrFromStrings({
          sort_by: SETTINGS.SORT_TYPES[sortId].name,
        });
      }
    }

    utils.sendData("main/products", "get", {}, params, setPageInfo).then(() => {
      setPageNum(1);
    });
  };
}

function resetFilters() {
  let sortByInputs = document.getElementsByClassName("sortByRadio");
  let typeInputs = document.getElementsByClassName("typeCheckBox");
  let brandInputs = document.getElementsByClassName("brandCheckBox");

  utils.resetCheckBoxes(sortByInputs);
  utils.resetCheckBoxes(typeInputs);
  utils.resetCheckBoxes(brandInputs);
}

function filterClickHandler(num) {
  return () => {
    let elem = document.getElementsByClassName("filter")[num];
    let arrow = document.getElementsByClassName("arrowImg")[num];
    if (elem.classList.contains("activeFilter")) {
      elem.classList.remove("activeFilter");
      arrow.classList.remove("activeArrowImg");
    } else {
      elem.classList.add("activeFilter");
      arrow.classList.add("activeArrowImg");
    }
  };
}

const pageInfoArea = "pageInfo";
const brandsArea = "brands";
const typesArea = "types";
const priceRangeArea = "priceRange";

function ProductSearch() {
  const { brandsPromiseInProgress } = usePromiseTracker({ brandsArea });
  const [brands, setBrands] = useState([]);

  const { typesPromiseInProgress } = usePromiseTracker({ typesArea });
  const [types, setTypes] = useState([]);

  const { pageInfoPromiseInProgress } = usePromiseTracker({ pageInfoArea });
  const [pageInfo, setPageInfo] = useState({
    results: [],
    next: null,
    previous: null,
    count: 0,
  });

  const { priceRangePromiseInProgress } = usePromiseTracker({ priceRangeArea });
  const [priceRange, setPriceRange] = useState({
    min: 0,
    max: 0,
    current_min: 0,
    current_max: 0,
  });

  const [pageNum, setPageNum] = useState(1);

  useEffect(() => {
    utils.getData(
      trackPromise,
      SETTINGS.PRODUCTS_URL,
      SETTINGS.TOKEN,
      setPageInfo
    );

    utils.getData(trackPromise, SETTINGS.BRANDS_URL, SETTINGS.TOKEN, setBrands);
    utils.getData(trackPromise, SETTINGS.TYPES_URL, SETTINGS.TOKEN, setTypes);
    utils.getData(
      trackPromise,
      SETTINGS.MIN_MAX_URL,
      SETTINGS.TOKEN,
      setPriceRange
    );
    setPageNum(1);
  }, [setBrands, setTypes, setPriceRange, setPageInfo, setPageNum]);

  if (
    pageInfoPromiseInProgress ||
    brandsPromiseInProgress ||
    typesPromiseInProgress ||
    priceRangePromiseInProgress
  ) {
    return <div>Подождите, данные загружаются!</div>;
  } else {
    return (
      <div className="products pageStyle">
        <div className="pageTitle titleText">PRODUCTS</div>
        <div className="productsPageContainer">
          <div className="productsSortFilter">
            <div className="filter">
              <div
                className="filterTitle subTitleText"
                onClick={filterClickHandler(0)}
              >
                Sort
                <div className="arrowImgcontainer">
                  <img className="arrowImg" src={arrow}></img>
                </div>
              </div>
              <form>
                <div className="radioElement regularText">
                  <input
                    type="radio"
                    name="sortByRadio"
                    className="sortByRadio"
                  />
                  Price increase
                </div>
                <div className="radioElement regularText">
                  <input
                    type="radio"
                    name="sortByRadio"
                    className="sortByRadio"
                  />
                  Price decrease
                </div>
                <div className="radioElement regularText">
                  <input
                    type="radio"
                    name="sortByRadio"
                    className="sortByRadio"
                  />
                  From A to Z
                </div>
                <div className="radioElement regularText">
                  <input
                    type="radio"
                    name="sortByRadio"
                    className="sortByRadio"
                  />
                  From Z to A
                </div>
              </form>
            </div>

            <div className="filter">
              <div
                className="filterTitle subTitleText"
                onClick={filterClickHandler(1)}
              >
                Brands
                <div className="arrowImgcontainer">
                  <img className="arrowImg" src={arrow}></img>
                </div>
              </div>
              <form>
                {brands.map((brand) => (
                  <div className="choiceElement regularText" key={brand.id}>
                    <input
                      type="checkbox"
                      name="brandCheckBox"
                      className="brandCheckBox"
                    />
                    {brand.name}
                  </div>
                ))}
              </form>
            </div>

            <div className="filter">
              <div
                className="filterTitle subTitleText"
                onClick={filterClickHandler(2)}
              >
                Types
                <div className="arrowImgcontainer">
                  <img className="arrowImg" src={arrow}></img>
                </div>
              </div>

              <form>
                {types.map((type) => (
                  <div className="choiceElement regularText" key={type.id}>
                    <input
                      type="checkbox"
                      name="typeCheckBox"
                      className="typeCheckBox"
                    />
                    {type.name}
                  </div>
                ))}
              </form>
            </div>

            <div className="filter">
              <div
                className="filterTitle subTitleText"
                onClick={filterClickHandler(3)}
              >
                Price
                <div className="arrowImgcontainer">
                  <img className="arrowImg" src={arrow}></img>
                </div>
              </div>
              <div className="rangePriceWrapper">
                <input
                  className="rangePrice inputStyle"
                  value={priceRange.current_min}
                  readOnly={true}
                ></input>
                <div className="rangeInputContainer">
                  <RangeSlider
                    rangeSlideDisabled={true}
                    className="rangeInput"
                    min={priceRange.min}
                    max={priceRange.max}
                    onInput={priceRangeChange(setPriceRange, priceRange)}
                  />
                </div>

                <input
                  className="rangePrice inputStyle"
                  value={priceRange.current_max}
                  readOnly={true}
                ></input>
              </div>
            </div>
            <div className="addFiltersBtnGroup">
              <div className="addFiltersBtnContainer">
                <button
                  className="addFiltersBtn btnStyle"
                  onClick={applyFilterChanges(
                    types,
                    brands,
                    setPageInfo,
                    setPageNum
                  )}
                >
                  Apply Changes
                </button>
              </div>
              <div className="addFiltersBtnContainer">
                <button
                  className="addFiltersBtn btnStyle"
                  onClick={resetFilters}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
          <div className="productsContainerWrapper">
            <div className="productsContainer">
              {pageInfo.results.length > 0 ? pageInfo.results.map((prod) => (
                <Link
                  to={`products/${prod.slug}`}
                  className="productLink"
                  key={prod.id}
                >
                  <Product
                    product={prod}
                    key={prod.id}
                    img={prod.img}
                  ></Product>
                </Link>
              )) : <div className="titleText noProductsMessage">Nothing</div>}
            </div>
          </div>
        </div>
        <div className="paginationMenuWrapper">
          <div className="paginationMenu">
            {pageInfo.previous ? (
              <button
                className="paginationBtn subTitleText"
                onClick={changePage(
                  pageInfo,
                  setPageInfo,
                  pageNum,
                  setPageNum,
                  "previous"
                )}
              >
                <img src={arrow} className="paginationArrow rigthPaginationArrow"></img>
              </button>
            ) : (
              <div className="paginationBtn subTitleText nonActivePaginationBtn">
                <img src={arrow} className="paginationArrow rigthPaginationArrow deactivePaginationArrow"></img>
              </div>
            )}
            <div className="currentPageNumber subTitleText">{pageNum}</div>
            {pageInfo.next ? (
              <button
                className="paginationBtn subTitleText"
                onClick={changePage(
                  pageInfo,
                  setPageInfo,
                  pageNum,
                  setPageNum,
                  "next"
                )}
              >
                <img src={arrow} className="paginationArrow"></img>
              </button>
            ) : (
              <div className="paginationBtn subTitleText nonActivePaginationBtn">
                <img src={arrow} className="paginationArrow deactivePaginationArrow"></img>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ProductSearch;
