import Product from "../components/Product";

function ProductColumn({
  list = [],
  likedProducts = {},
  onClickLikeProduct,
  onClickCartProduct,
  cartedProducts = {},
}) 

{
  return (
    <div className="col">
      {list.map((product) => {
        return (
          <Product
            key={product.sku}
            sku={product.sku}
            cartQuantity={product.cartQuantity}
            onClickLikeProduct={onClickLikeProduct}
            onClickCartProduct={onClickCartProduct}
            liked={likedProducts[product.sku]}
            carted={cartedProducts[product.sku]}
          />
        );

      })}
    </div>
  );
}

export default ProductColumn;
