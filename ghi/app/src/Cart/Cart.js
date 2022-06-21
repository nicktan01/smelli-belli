import React from 'react';


class Cart extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        products: [],
      };
    }

    async componentDidMount() {
        const response = await fetch('http://localhost:8090/api/cart/');
        if (response.ok) {
          const data = await response.json();
          console.log(data)
          this.setState({
            products: data,
          }); 
        } else {
          console.error(response);
        }
    } 
        
    render() {
      console.log("this is the state", this.state.cart)
      // const cartItems = this.state.map((d) => <li key={d.sku}>{d.name}</li>)
        return (
          
            <div className="row">
              <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                  <h1>Cart</h1>
                  {/* <h2>This is h2 { this.state }</h2>
                  <div>This is div { this.state }</div> */}
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                          <td>{ this.state.cart }</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
        );
        
    }
}

export default Cart;