import React, { useEffect, useState } from "react";
import "./products.css";
import Select from "react-select";
import ProductColumn from "../components/ProductColumn";
import useSWR from "swr";
import { useAuthContext } from "../authApi";

const sortOptions = [
  { value: "bestselling", label: "Best Selling" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "name-asc", label: "A to Z" },
  { value: "name-desc", label: "Z to A" },
];
const scentOptions = [
  { value: "Amber", label: "Amber" },
  { value: "Floral", label: "Floral" },
  { value: "Woody", label: "Woody" },
  { value: "Fresh", label: "Fresh" },
  { value: "Fruity", label: "Fruity" },
];

function ProductList({ category }) {
  const [productColumns, setProductColumns] = useState([[], [], [], []]);
  const [likedProducts, setLikedProducts] = useState({});
  const [cartedProducts, setCartedProducts] = useState({});
  const [sortBy, setSortBy] = useState(sortOptions[0]);
  const [filterBy, setFilterBy] = useState([]);

  // Fetching wishlist for the user
  const { token } = useAuthContext();
  const { data: wishlist, error } = useSWR(
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

  // customStyles is setting styling for the react-select filter and sort by fields
  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      width: state.selectProps.width,
    }),
    control: (provided, { selectProps: { width } }) => ({
      ...provided,
      width: width,
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";

      return { ...provided, opacity, transition };
    },
  };

  useEffect(() => {
    async function fetchData() {
      const url = `${
        process.env.REACT_APP_INVENTORY_HOST
      }/api/products?sortBy=${sortBy.value}&scents=${filterBy.reduce(
        (a, b) => (a ? a + "," + b.value : b.value),
        ""
      )}`;

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
  }, [category, filterBy, sortBy]);

  if (wishlist && wishlist.error) return null;
  let likedProductsMap = {};
  (wishlist || []).forEach((sku) => (likedProductsMap[sku] = true));

  return (
    <>
      <div className="d-flex justify-content-center position-relative">
        <img
          src="/images/bodyproducts.jpg"
          height={150}
          width={null}
          style={{ objectFit: "cover", width: "100%" }}
          alt="dried flowers in small containers of oil"
        />

        <div
          style={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            width: "100%",
            height: "100px",
            background: "#fff",
            opacity: "0.5",
          }}
        />
      </div>
      <div className="my-3">
        <div className="d-flex justify-content-end me-4">
          <Select
            options={sortOptions}
            styles={customStyles}
            width="200px"
            value={sortBy}
            placeholder="Sort By"
            className="me-3"
            onChange={(option) => {
              setSortBy(option);
            }}
          />
          <Select
            isMulti
            options={scentOptions}
            placeholder="Primary Scent"
            width="200px"
            styles={customStyles}
            onChange={(option) => {
              setFilterBy(option);
            }}
            value={filterBy}
          />
        </div>
      </div>
      <div className="container">
        <div className="row">
          {productColumns.map((productList, index) => {
            return (
              <ProductColumn
                key={index}
                list={productList}
                likedProducts={likedProductsMap}
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
