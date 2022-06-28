import React from "react";
import useSWR from "swr";
import { useSWRConfig } from "swr";
import { useAuthContext } from "../authApi";
import ProductColumn from "../components/ProductColumn";

function Cart() {
  const { token } = useAuthContext();
  const { data: cart } = useSWR(token ? "/api/cart/" : null, async () => {
    const request = await fetch(
      `${process.env.REACT_APP_CUSTOMER_HOST}/api/cart/`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const json = await request.json();
    return json;
  });

  const { mutate } = useSWRConfig();

  async function checkout(items) {
    //get every item sku and quantity and store it in product post request
    //and the total price of the cart
    let product_list = [];
    let product = {};
    let total_amount = 0;
    let order_number = 1;
    for (let item of items.cart) {
      // eslint-disable-next-line
      for (let i of items.cart) {
        product = {};
        product["sku"] = item.sku;
        product["quantity"] = item.cartQuantity;
        total_amount += item.price * item.cartQuantity;
        order_number += 1;
      }
      product_list.push(product);
    }

    let requestBody = {
      products: product_list,
      total: total_amount,
      order_number: order_number,
    };

    const url = `${process.env.REACT_APP_EMPLOYEE_HOST}/api/orders/`;
    const fetchConfig = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    };
    const response = fetch(url, fetchConfig);

    response
      .then((res) => res.json())
      .then((data) => {
        mutate("/api/orders/");
      });
  }
  let columns = [[], [], [], []];

  if ((cart || {}).error || cart === undefined) return null;

  let i = 0;
  for (const item of cart) {
    columns[i].push(item);
    i += 1;
    if (i > 3) {
      i = 0;
    }
  }

  let cartedProducts = {};
  let total = 0;
  let quantity = 0;
  (cart || []).forEach((item) => {
    cartedProducts[item] = true;
    total += item.price * item.cartQuantity;
    quantity += item.cartQuantity;
  });

  return (
    <div className="container">
      <div className="row">
        {columns.map((list) => (
          <ProductColumn
            list={list}
            cartedProducts={cartedProducts}
            showPlusMinus={true}
          />
        ))}
      </div>
      <div className="row">
        <h1>Summary</h1>
        <div className="row">
          <table>
            <thead>
              <tr>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{quantity}</td>
                <td>${total}</td>
              </tr>
            </tbody>
          </table>
          <button
            className="btn btn-dark"
            onClick={() => {
              checkout({ cart });
            }}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
