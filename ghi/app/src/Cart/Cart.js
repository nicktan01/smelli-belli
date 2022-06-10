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
          this.setState({
            products: data.products,
          }); 
        } else {
          console.error(response);
        }
    } 
        
    render() {
      console.log("this is the state", this.state)
        return (
          
            <div>

            </div>
        );
        
    }
}

export default Cart;