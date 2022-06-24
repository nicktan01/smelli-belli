import useSWR from "swr";

import { useAuthContext } from "../authApi";
import ProductColumn from "../components/ProductColumn";
import "../account_pages/wishlist.css";

function WishlistPage(props) {
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

  let columns = [[], [], [], []];

  if ((wishlist || {}).error || wishlist === undefined) return null;

  let i = 0;
  for (const sku of wishlist) {
    columns[i].push({ sku: sku });
    i += 1;
    if (i > 3) {
      i = 0;
    }
  }

  let likedProducts = {};
  (wishlist || []).forEach((item) => (likedProducts[item] = true));

  return (
    <div>
      <h2>Wishlisted Items</h2>
      <div className="container">
        <div className="row">
          {columns.map((list) => (
            <ProductColumn list={list} likedProducts={likedProducts} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default WishlistPage;
