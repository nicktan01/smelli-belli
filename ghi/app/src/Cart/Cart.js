import React from "react";

class Cart extends React.Component {
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
        const response = await fetch(`${process.env.REACT_APP_CUSTOMER_HOST}/api/cart/`);
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
      let first_product = this.state.products[0]
      console.log("this is the products", first_product)
     
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