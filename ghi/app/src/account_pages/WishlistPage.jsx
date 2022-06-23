import useSWR from "swr";

import { useAuthContext } from "../authApi";
import ProductColumn from "../components/ProductColumn";

function WishlistPage(props) {
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
    <div className="container mt-2">
      <div>
        <h2>Wishlisted Items</h2>
      </div>
      <div className="row">
        {columns.map((list) => (
          <ProductColumn list={list} likedProducts={likedProducts} />
        ))}
      </div>
    </div>
  );
}

export default WishlistPage;
