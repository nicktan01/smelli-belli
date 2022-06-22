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
      const request = await fetch("http://localhost:8090/api/cart/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await request.json();
      return json;
    }
  );
  // const [product, setProduct] = useState({});

  // const fetchProductData = useCallback(() => {
  //   const url = `${process.env.REACT_APP_INVENTORY_HOST}/api/products/`;

  //   try {
  //     const detailUrl = `${process.env.REACT_APP_INVENTORY_HOST}/api/products/${sku}`;
  //     setProduct("loading");
  //     fetch(detailUrl)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setProduct(data);
  //       });
  //   } catch (e) {
  //     console.error("error:", e);
  //   }
  // }, [sku]);
  
  // useEffect(() => {
  //   fetchProductData();
  // }, [fetchProductData, sku]);

  // const { mutate } = useSWRConfig();

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
    total += item.price;
    quantity += item.cartQuantity
  });

  console.log(total)
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
              <td>{total}</td>
            </tr>
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}

export default Cart;