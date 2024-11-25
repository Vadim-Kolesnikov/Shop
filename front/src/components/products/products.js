import { useEffect, useState } from "react";
import Product from "../product/product";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import utils from "../../utils.js";
import SETTINGS from "../../settings.js";
import "./products.css";
import { Link } from "react-router-dom";
import arrow from "../../imgs/arrow.png";

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

function sortClickHandler() {
  let elem = document.getElementsByClassName("pageTitleSortMenu")[0];
  //   let arrow = document.getElementsByClassName("arrowImg")[0];
  if (elem.classList.contains("activePageTitleSortMenu")) {
    elem.classList.remove("activePageTitleSortMenu");
    // arrow.classList.remove("activeArrowImg");
  } else {
    elem.classList.add("activePageTitleSortMenu");
    // arrow.classList.add("activeArrowImg");
  }
}

function clickHandlerSortMenuEl(num, setPageInfo, setPageNum, type, brand) {
  return () => {
    let elems = document.getElementsByClassName("pageTitleSortMenuEl");
    for (let i = 0; i < elems.length; i++) {
      if (i == num) {
        elems[num].classList.add("activePageTitleSortMenuEl");
      } else {
        elems[i].classList.remove("activePageTitleSortMenuEl");
      }
    }

    let params = "?";
    if (type) {
      params += utils.makeQueryStrFromArrs({ types: [type.id] });
    } else {
      params += utils.makeQueryStrFromArrs({ brands: [brand.id] });
    }

    if (SETTINGS.SORT_TYPES[num].name[0] == "-") {
      params += utils.makeQueryStrFromStrings({
        sort_by: SETTINGS.SORT_TYPES[num - 1].name,
        reverse: "True",
      });
    } else {
      params += utils.makeQueryStrFromStrings({
        sort_by: SETTINGS.SORT_TYPES[num].name,
      });
    }
    console.log(params)
    utils.sendData("main/products", "get", {}, params, setPageInfo).then(() => {
      setPageNum(1);
    });
  };
}

const pageInfoArea = "pageInfo";

function Products(props) {
  const [pageNum, setPageNum] = useState(1);
  const [pageInfo, setPageInfo] = useState({
    results: [],
    next: null,
    previous: null,
    count: 0,
  });
  const { pageInfoPromiseInProgress } = usePromiseTracker({ pageInfoArea });
  useEffect(() => {
    let params = "?";
    if (props.brand) {
      params += `brands=${props.brand.id}`;
    } else {
      params += `types=${props.type.id}`;
    }
    console.log(`${SETTINGS.PRODUCTS_URL}${params}`);
    utils.getData(
      trackPromise,
      `${SETTINGS.PRODUCTS_URL}${params}`,
      SETTINGS.TOKEN,
      setPageInfo
    );
    setPageNum(1);
  }, [setPageInfo, props.type, props.brand, setPageNum]);
  if (pageInfoPromiseInProgress) {
    return <h1>Загрузка</h1>;
  } else {
    console.log(pageInfo.results);
    return (
      <div className="pageStyle">
        <div className="pageTitleContainer">
          <div className="pageTitle titleText">
            {props.brand ? props.brand.name : props.type.name}
          </div>
          <div className="pageTitleSort regularText">
            <div onClick={sortClickHandler}>Sort By</div>
            <div className="pageTitleSortMenu">
              <div
                className="pageTitleSortMenuEl"
                onClick={clickHandlerSortMenuEl(
                  0,
                  setPageInfo,
                  setPageNum,
                  props.type,
                  props.brand
                )}
              >
                price increase
              </div>
              <div
                className="pageTitleSortMenuEl"
                onClick={clickHandlerSortMenuEl(
                  1,
                  setPageInfo,
                  setPageNum,
                  props.type,
                  props.brand
                )}
              >
                price decrease
              </div>
              <div
                className="pageTitleSortMenuEl"
                onClick={clickHandlerSortMenuEl(
                  2,
                  setPageInfo,
                  setPageNum,
                  props.type,
                  props.brand
                )}
              >
                from A to Z
              </div>
              <div
                className="pageTitleSortMenuEl"
                onClick={clickHandlerSortMenuEl(
                  3,
                  setPageInfo,
                  setPageNum,
                  props.type,
                  props.brand
                )}
              >
                from Z to A
              </div>
            </div>
          </div>
        </div>
        <div className="productsFourColContainer">
          {pageInfo.results.map((prod) => (
            <Link
              to={`/products/${prod.slug}`}
              className="productLink"
              key={prod.id}
            >
              <Product product={prod} key={prod.id} img={prod.img}></Product>
            </Link>
          ))}
        </div>
        <div className="paginationMenuWrapper">
          <div className="paginationMenu">
            {pageInfo.previous ? (
              <button
                className="paginationBtn btnStyle subTitleText"
                onClick={changePage(
                  pageInfo,
                  setPageInfo,
                  pageNum,
                  setPageNum,
                  "previous"
                )}
              >
                <img
                  src={arrow}
                  className="paginationArrow rigthPaginationArrow"
                ></img>
              </button>
            ) : (
              <div className="paginationButton nonActivePaginationBtn">
                <img
                  src={arrow}
                  className="paginationArrow rigthPaginationArrow deactivePaginationArrow"
                ></img>
              </div>
            )}
            <div className="currentPageNumber subTitleText">{pageNum}</div>
            {pageInfo.next ? (
              <button
                className="paginationBtn btnStyle subTitleText"
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
              <div className="paginationButton nonActivePaginationBtn">
                <img
                  src={arrow}
                  className="paginationArrow deactivePaginationArrow"
                ></img>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Products;
