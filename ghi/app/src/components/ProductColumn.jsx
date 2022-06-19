import Product from "../components/Product";

function ProductColumn(props) {
  return (
    <div className="col">
      {props.list.map((product) => {
        return (
          <Product
            sku={product.sku}
            onClickLikeProduct={props.onClickLikeProduct}
            liked={props.likedProducts[product.sku]}
          />
        );
      })}
    </div>
  );
}

export default ProductColumn;
