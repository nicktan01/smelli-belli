import React from "react";
import { AuthContext } from "../authApi";

class Cart extends React.Component {
  static contextType = AuthContext
    constructor(props) {
      super(props);
      this.state = {
        products: [],
        user: "",
        quantity: "",
        totals: ""
      };
    }

    async componentDidMount() {
      const token = this.context.token;
      console.log(token)
        const response = await fetch(`${process.env.REACT_APP_CUSTOMER_HOST}/api/cart/`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          console.log("this is the data ", data)
          this.setState({
            products: data,
          }); 
        } else {
          console.error(response);
        }
    } 
        
    render() {
      console.log(this.state.products)
        return (
            
            <div className="row">
              <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                  <h1>Cart</h1>
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Item Name</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                    {this.state.products.map(cart => {
                      return (
                        <tr key={cart.product.sku}>
                          <td>{cart.product.name}</td>
                          <td>{cart.product.price}</td>
                          {/* <td>{cart.product.image}</td> */}
                        </tr>
                      );
                    })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
        );
        
    }
}

export default Cart;