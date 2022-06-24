import React from "react";
import useSWR from "swr";
// import { useCallback } from "react";
import { useAuthContext } from "../authApi";
import ProductColumn from "../components/ProductColumn";

function Cart(props) {
  const { token } = useAuthContext();
  const { data: cart, error } = useSWR(
    token ? "/api/cart/" : null,
    async () => {
      const request = await fetch(`${process.env.REACT_APP_CUSTOMER_HOST}/api/cart/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await request.json();
      return json;
    }
  );
  async function checkout(items){
    console.log(items)
    const url = `${process.env.REACT_APP_EMPLOYEE_HOST}/api/orders/`
    const fetchConfig = {
      method: "post",
      header: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: items,
      }),
    };
    const response = await fetch(url, fetchConfig);
    if(response.ok){
      console.log("this is the response", response)
    }
  }

  let columns = [[], [], [], []];

  if ((cart || {}).error || cart === undefined) return null;

  let i = 0;
  for (const item of cart) {
    columns[i].push( item );
    i += 1;
    if (i > 3){
      i = 0;
    }
  }

  let cartedProducts = {};
  let total = 0;
  let quantity = 0;
  (cart || []).forEach((item) => {
    cartedProducts[item] = true;
    total += item.price * item.cartQuantity;
    quantity += item.cartQuantity
  });

  return (
    <div className="container">
      <div className="row">
        {columns.map((list) => (
          <ProductColumn list={list} 
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
        <button className="btn btn-dark" onClick={() => {checkout({cart})}}>Checkout</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;