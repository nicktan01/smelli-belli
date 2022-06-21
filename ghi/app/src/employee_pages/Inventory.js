import React, { useState, useEffect } from "react";

export function InventoryTable(props) {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">Product</th>
          <th scope="col">Size</th>
          <th scope="col">SKU</th>
          <th scope="col">Quantity</th>
          <th scope="col">Price</th>
        </tr>
      </thead>
      <tbody>
        {props.products.map((product) => {
          return (
            <InventoryRow
              product={product}
              key={product.sku}
              updateQuantity={props.updateQuantity}
            />
          );
        })}
      </tbody>
    </table>
  );
}

export function InventoryRow(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [quantity, setQuantity] = useState(props.product.quantity);

  const handleQuantityEditClick = () => {
    setIsEditing(true);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  return (
    <tr key={props.product.sku}>
      <td>{props.product.name}</td>
      <td>{props.product.size}</td>
      <td>{props.product.sku}</td>
      <td>
        {!isEditing ? (
          <>
            {props.product.quantity} &nbsp;
            <button
              className="btn"
              type="submit"
              onClick={handleQuantityEditClick}
            >
              <i className="bi bi-pencil-square"></i>
            </button>
          </>
        ) : (
          <>
            <input
              type="number"
              style={{ width: "80px" }}
              value={quantity}
              onChange={handleQuantityChange}
            />
            <button
              className="btn"
              type="submit"
              onClick={() => {
                props.updateQuantity(props.product.sku, quantity);
                setIsEditing(false);
              }}
            >
              <i className="bi bi-check-square"></i>
            </button>
          </>
        )}
      </td>
      <td>{props.product.price}</td>
    </tr>
  );
}

function InventoryList(props) {
  const [product, setProduct] = useState("");
  const [products, setProducts] = useState([]);

  function handleProductChange(event) {
    const value = event.target.value;
    setProduct(value);
  }

  async function updateQuantity(sku, quantity) {
    const url = `${process.env.REACT_APP_INVENTORY_HOST}/api/products/${sku}/`;

    const params = {
      quantity,
    };

    try {
      const response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(params),
      });

      if (response.ok) {
        const newProduct = await response.json();
        setProducts((prevState) => {
          const products = prevState.map((product) => {
            if (product.sku === sku) {
              return newProduct;
            }

            return product;
          });

          return products;
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function productSearch(event) {
    event.preventDefault();
    const searchUrl = `${process.env.REACT_APP_INVENTORY_HOST}/api/products/?name=${product}`;
    const fetchConfig = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(searchUrl, fetchConfig);
    if (response.ok) {
      const data = await response.json();
      setProducts(data.products);
    }
  }

  useEffect(() => {
    async function fetchData() {
      const url = `${process.env.REACT_APP_INVENTORY_HOST}/api/products/`;

      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        setProducts(data.products);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <div className="d-flex justify-content-center position-relative">
        <img
          src="/images/invbanner.jpeg"
          height={300}
          width={null}
          style={{ objectFit: "cover", width: "100%", opacity: "0.6" }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            width: "100%",
            height: "200px",
            background: "#fff",
            opacity: "0.5",
          }}
        />
        <img
          src="/images/invlogo.png"
          height={200}
          width={null}
          style={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        />
      </div>
      <div className="row justify-content-center mt-3">
        <form onSubmit={productSearch} className="col-10">
          <div className="input-group mb-3 mt-3">
            <input
              onChange={handleProductChange}
              type="text"
              className="form-control"
              placeholder="Product name or keyword"
              aria-label="search"
              aria-describedby="basic-addon2"
            />
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" type="submit">
                Search Products
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="px-4 py-3 my-3 text-center">
        <InventoryTable products={products} updateQuantity={updateQuantity} />
      </div>
    </>
  );
}

export default InventoryList;
