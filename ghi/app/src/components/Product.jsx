import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../product_pages/products.css";

function Product({ sku, onClickLikeProduct, liked }) {
  const navigate = useNavigate();

  function likeProductHandler(e, sku) {
    e.stopPropagation();
    onClickLikeProduct(sku);
  }

  const [product, setProduct] = useState({});

  useEffect(() => {
    async function fetchData() {
      const url = "http://localhost:8100/api/products/";

      try {
        const detailUrl = `http://localhost:8100/api/products/${sku}`;
        setProduct("loading");
        fetch(detailUrl)
          .then((res) => res.json())
          .then((data) => {
            setProduct(data);
          });
      } catch (e) {
        console.error("error:", e);
      }
    }
    fetchData();
  }, [sku]);

  return (
    <div
      key={product.sku}
      className="card mb-3 shadow-none border-0"
      onClick={() => {
        navigate(`/products/${product.sku}`);
      }}
    >
      {liked ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          class="bi bi-heart-fill"
          viewBox="0 0 16 16"
          onClick={(e) => likeProductHandler(e, product.sku)}
        >
          <path
            fill-rule="evenodd"
            d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          className="bi bi-heart"
          viewBox="0 0 16 16"
          onClick={(e) => likeProductHandler(e, product.sku)}
        >
          <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
        </svg>
      )}
      <img
        src={
          !product.image
            ? "https://tracerproducts.com/wp-content/uploads/2019/12/Product-Image-Coming-Soon.jpg"
            : product.image
        }
        className="card-img-top"
      />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <h6 className="card-subtitle mb-2 text-muted">
          ${product.price} - {product.size}
        </h6>
      </div>
    </div>
  );
}

export default Product;
