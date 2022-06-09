import { useState, useEffect } from "react";

function GetProducts() {
  const [orders, setProducts] = useState(null);

  useEffect(() => {
    async function getProducts() {
      const url = `${process.env.REACT_APP_INVENTORY_HOST}/api/products/`;
      const response = await fetch(url, {
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const products = await response.json();
        setProducts(products);
      } else {
        setError(await response.text());
      }
    }
    if (token) {
      getProducts();
    }
  }, [token]);

  // ternary operator: a condition followed by a (? - if), then an expression to execute if the condition
  // is truthy followed by a (: - else), and finally the expression to execute if the conidtion is falsy
  return (
    <div>
      {token && (
        <>
          {orders == null ? (
            <div>Orders loading...</div>
          ) : (
            <div>{orders.length || "no"} products</div>
          )}
          {user == null ? (
            <div>Loading your information</div>
          ) : (
            <div>You are staff: {user.is_staff ? "YES!" : "no :-("}</div>
          )}{" "}
        </>
      )}
    </div>
  );
}
