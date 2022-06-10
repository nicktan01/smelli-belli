import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToken } from "../authApi";
import "./products.css";

function ProductColumn(props) {
  return (
    <div className="col">
      {props.list.map((product) => {
        return (
          <Product
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

function Product({ sku, onClickLikeProduct, onClickCartProduct, liked, carted }) {
  const navigate = useNavigate();
  const [token] = useToken();
  const [user, setUser] = useState([]);

  //current user
  useEffect(() => {
    async function getCurrentUser() {
    const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/accounts/me/`;
    const response = await fetch(url, {
        credentials: "include",
    });
    if (response.ok) {
        const user = await response.json();
        console.log(user);
        setUser(user);
    }
    }
    if (token) {
    getCurrentUser();
    }
}, [token]);

  function likeProductHandler(e, sku) {
    e.stopPropagation();
    onClickLikeProduct(sku);
  }

  //wishlist
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

// cart
function cartProductHandler(e, product) {
  e.stopPropagation();
  onClickCartProduct(product);
}
  useEffect(() => {
    async function fetchData() {
      const url = "http://localhost:8090/api/cart/";
      const fetchConfig = {
        method: "post",
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch(url, fetchConfig);
      if(response.ok){
        console.log("this is the response", response)
      }
    }
    fetchData();
  }, [sku]);

  return (
    <div
      key={product.sku}
      className="card mb-3 shadow"
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
            fillRule="evenodd"
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
      <div>
        <button className="btn" >{carted ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="cart bi bi-cart-check-fill" viewBox="0 0 16 16" onClick={(e) => cartProductHandler(e, product.sku)}> 
          <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-1.646-7.646-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L8 8.293l2.646-2.647a.5.5 0 0 1 .708.708z"/>
        </svg> 
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className=" cart bi bi-cart-plus" viewBox="0 0 16 16" onClick={(e) => cartProductHandler(e, product.sku)}> 
  <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z"/>
  <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
</svg> 
      )}</button>
      </div>
    </div>
  );
}

function ProductList({ category }) {
  const [productColumns, setProductColumns] = useState([[], [], [], []]);
  const [likedProducts, setLikedProducts] = useState({});
  const [cartedProducts, setCartedProducts] = useState({});
  console.log("liked product:", likedProducts);
  console.log("carted products:", cartedProducts);

  useEffect(() => {
    async function fetchData() {
      const url = "http://localhost:8100/api/products/";

      try {
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();

          const products = [];
          for (let product of data.products) {
            if (!category || category === product.product_type) {
              products.push(product);
            }
          }

          const newProductColumns = [[], [], [], []];

          let i = 0;
          for (const product of products) {
            newProductColumns[i].push(product);
            i += 1;
            if (i > 3) {
              i = 0;
            }
          }

          setProductColumns(newProductColumns);
        }
      } catch (e) {
        console.error("error:", e);
      }
    }
    fetchData();
  }, [category]);

  return (
    <>
      <div className="my-3">
        <h2 className="display-8 fw-bold">Shop All Products</h2>
        <div className="filters">
          <div className="dropdown">
            <button
              className="btn btn-secondary btn-sm dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Sort By
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a className="dropdown-item" href="#">
                Price: Low to High
              </a>
              <a className="dropdown-item" href="#">
                Price: High to Low
              </a>
              <a className="dropdown-item" href="#">
                Scent Name: A to Z
              </a>
              <a className="dropdown-item" href="#">
                Scent Name: Z to A
              </a>
            </div>
            <button
              className="btn btn-secondary btn-sm dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Primary Scent
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a className="dropdown-item" href="#">
                Amber
              </a>
              <a className="dropdown-item" href="#">
                Fruity
              </a>
              <a className="dropdown-item" href="#">
                Woody
              </a>
              <a className="dropdown-item" href="#">
                Fresh
              </a>
              <a className="dropdown-item" href="#">
                Floral
              </a>
            </div>
            <button
              className="btn btn-secondary btn-sm dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Product Type
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a className="dropdown-item" href="#">
                Lotion
              </a>
              <a className="dropdown-item" href="#">
                Body Wash
              </a>
              <a className="dropdown-item" href="#">
                Soap
              </a>
              <a className="dropdown-item" href="#">
                Deodorant
              </a>
              <a className="dropdown-item" href="#">
                Candle
              </a>
              <a className="dropdown-item" href="#">
                Incense Stick
              </a>
              <a className="dropdown-item" href="#">
                Room Spray
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          {productColumns.map((productList, index) => {
            return (
              <ProductColumn
                key={index}
                list={productList}
                likedProducts={likedProducts}
                cartedProducts={cartedProducts}
                onClickLikeProduct={(productId) =>
                  setLikedProducts({
                    ...likedProducts,
                    [productId]: !likedProducts[productId],
                  })
                }
                onClickCartProduct={(productId) =>
                  setCartedProducts({
                    ...cartedProducts,
                  [productId]: !cartedProducts[productId],
                  })
                }
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default ProductList;
