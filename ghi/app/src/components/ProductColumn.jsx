import Product from "../components/Product";

function ProductColumn(props) {
  return (
    <div className="col">
      {props.list.map((product) => {
        return (
          <Product
            key={product.sku}
            sku={product.sku}
            onClickLikeProduct={props.onClickLikeProduct}
            onClickCartProduct={props.onClickCartProduct}
            liked={props.likedProducts[product.sku]}
          />
        );
      })}
    </div>
  );
}

export default ProductColumn;
