import "./product.css"

function Product(props) {
    return (
      <div className="productWrapper regularText">
        <div className="qtyBox regularText">{props.product.qty}</div>
        <div className="product regularText">
          <div className="imgWrapper">
          <img className="productImg" src={props.img}></img>
                  </div>
                  <div className="productInfo">
                      <div className="productTextContainer">
                        <div className="productText productTextStart">{props.product.name}</div>
                        <div className="productText productTextStart">{Number(props.product.price)} $</div>
                        
                      </div>
                      <div className="productTextContainer">
                        <div className="productText productTextEnd">{props.product.type.name}</div>
                        <div className="productText productTextEnd"><div className="overflowText">{props.product.brand.name}</div></div>
                      </div>
                  </div>
        </div>
      </div>
    );
  }


  export default Product;