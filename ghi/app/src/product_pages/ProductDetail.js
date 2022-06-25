import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../authApi";
import "../product_pages/products.css";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { token } = useAuthContext();
  const { data: wishlist } = useSWR(
    token ? "/api/wishlist/" : null,
    async () => {
      const request = await fetch(
        `${process.env.REACT_APP_CUSTOMER_HOST}/api/wishlist/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const json = await request.json();
      return json;
    }
  );

  const { sku } = useParams();
  const BASE_URL = `${process.env.REACT_APP_INVENTORY_HOST}/api/products`;

  const [name, setCurrentItemName] = useState([]);
  const [image, setCurrentImage] = useState([]);
  const [size, setCurrentSize] = useState([]);
  const [price, setCurrentPrice] = useState([]);
  const [scent1, setCurrentScent1] = useState([]);
  const [scent2, setCurrentScent2] = useState([]);
  const [description, setCurrentDescription] = useState([]);
  const productLiked = wishlist && wishlist.includes(sku);

  function likeProductHandler(e, sku) {
    e.stopPropagation();
    if (token === false || token === undefined) {
      navigate("/login");
    }
    if (!productLiked) {
      addToWishlist(sku, token);
    } else {
      deleteFromWishlist(sku, token);
    }
  }
  
  const { mutate } = useSWRConfig();

  function addToWishlist(sku, token) {
    const url = `${process.env.REACT_APP_CUSTOMER_HOST}/api/wishlist/`;
    const fetchConfig = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        sku: sku,
      }),
    };
    const response = fetch(url, fetchConfig);

    response
      .then((res) => res.json())
      .then((data) => {
        mutate("/api/wishlist/");
      });
  }

  function deleteFromWishlist(sku, token) {
    const url = `${process.env.REACT_APP_CUSTOMER_HOST}/api/wishlist/`;
    const fetchConfig = {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        sku: sku,
      }),
    };
    const response = fetch(url, fetchConfig);

    response
      .then((res) => res.json())
      .then((data) => {
        mutate("/api/wishlist/");
      });
  }

  function cartProductHandler(e, sku) {
    e.stopPropagation();
    if (token === undefined) {
      navigate("/login");
      return;
    }
    addToCart(sku, token);
  }

  function addToCart(sku, token) {
    const url = `${process.env.REACT_APP_CUSTOMER_HOST}/api/cart/`;
    const fetchConfig = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        sku: sku,
      }),
    };
    const response = fetch(url, fetchConfig);

    response
      .then((res) => res.json())
      .then((data) => {
        mutate("/api/cart/");
      });
  }

  // function deleteFromCart(sku, token) {
  //   const url = `${process.env.REACT_APP_CUSTOMER_HOST}/api/cart`;
  //   const fetchConfig = {
  //     method: "delete",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //     body: JSON.stringify({
  //       sku: sku,
  //     }),
  //   };
  //   const response = fetch(url, fetchConfig);

  //   response
  //     .then((res) => res.json())
  //     .then((data) => {
  //       mutate("/api/cart/");
  //     });
  // }

  useEffect(() => {
    const productUrl = `${BASE_URL}/${sku}/`;
    fetch(productUrl)
      .then((res) => res.json())
      .then((data) => {
        setCurrentItemName(data.name);
        setCurrentImage(data.image);
        setCurrentSize(data.size);
        setCurrentPrice(data.price);
        setCurrentScent1(data.scent1);
        setCurrentScent2(data.scent2);
        setCurrentDescription(data.description);
      });
  }, [BASE_URL, sku]);

  return (
    <>
      <div className="container mt-5">
        <div className="product-image">
          <img src={image} style={{ width: 400 }} alt="products" />
          <button className="heart-button">
            <div className="heart">
              {productLiked ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="like-icon bi bi-heart-fill mb-1"
                  viewBox="0 0 16 16"
                  onClick={(e) => likeProductHandler(e, sku)}
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
                  className="like-icon bi bi-heart mb-1"
                  viewBox="0 0 16 16"
                  onClick={(e) => likeProductHandler(e, sku)}
                >
                  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                </svg>
              )}
            </div>
          </button>
        </div>
        <div className="info">
          <div className="media-body">
            <div className="media-heading">
              <h3>{name}</h3>
              <button
                className="cart-button"
                onClick={(e) => cartProductHandler(e, sku)}
              >
                {" "}
                Add to cart
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  className=" cart bi bi-cart-plus"
                  viewBox="0 0 16 16"
                >
                  <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z" />
                  <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                </svg>
              </button>
            </div>
            <h4>
              ${price} - {size}
            </h4>
            <p>{description}</p>
            <p> Primary Scent: {scent1}</p>
            <p> Secondary Scent: {scent2}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
