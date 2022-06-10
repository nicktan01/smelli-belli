import React from 'react';
import { Link } from "react-router-dom";

// async function AddToCart(product){
//   console.log("this is the product", product)
//   const data = {...this.state};
//   const url = `http://localhost:8090/api/cart`
//   const fetchConfig = {
//     method: "post",
//     body: JSON.stringify(data),
//     headers: {
//       'Content-type': 'application/json',
//     },
//   };

//   const response = await fetch(url, fetchConfig);
//   if(response.ok){
//     const carted = await response.json();
//     console.log(carted)
//     this.setState({
//         "products": [],
//     });
//     this.props.loadProduct();
//   }

// }

function ProductColumn(props) {
    return (
        <div className="col">
          {props.list.map(product => {
            return (
              <div key={product.id} className="card mb-3 shadow">
                <img src={ !product.image ? 'https://tracerproducts.com/wp-content/uploads/2019/12/Product-Image-Coming-Soon.jpg' : product.image } className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">{product.name} {product.size}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {product.scent1} {product.price}
                  </h6>
                </div>
                <div>
                  <button className="btn btn-success" onClick={() => {props.AddToCart(product)}}>Add To Cart</button>
                </div>
                <div className="card-footer">
                  {product.description}
                </div>
              </div>
            );
          })}
        </div>
      );
}

class ListProducts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          productColumns: [[], [], []],
        };
        this.AddToCart=this.AddToCart.bind(this)
      }
    
      async componentDidMount() {
          const url = 'http://localhost:8100/api/products/'

          try {
              const response = await fetch(url);
              if (response.ok) {
                const data = await response.json();

                const requests = [];
                  for (let product of data.products) {
                    const detailUrl = `http://localhost:8100/api/products/${product.sku}`;
                    requests.push(fetch(detailUrl));
                }
                
                const responses = await Promise.all(requests);

                const productColumns = [[], [], []];

                let i = 0;
                for (const productResponse of responses) {
                    if (productResponse.ok) {
                        const details = await productResponse.json();
                        productColumns[i].push(details);
                        i += 1;
                        if (i > 2) {
                            i = 0;
                        }
                    } else {
                        console.error(productResponse)
                    }
                }

                this.setState({productColumns: productColumns});
             }
          } catch (e) {
              console.error("error:", e)
          }
      }
      async AddToCart(product){
        console.log("this is the product", product)
        const data = {        
              "product_sku": product.sku,
              "user_id": 1,
              "quantity": 1,
              "totals": product.price
            };
        const url = `http://localhost:8090/api/cart/`
        const fetchConfig = {
          method: "post",
          body: JSON.stringify(data),
          headers: {
            'Content-type': 'application/json',
          },
        };
      
        const response = await fetch(url, fetchConfig);
        if(response.ok){
          const carted = await response.json();
          console.log(carted)
          this.setState({
              "products": [],
          });
          this.props.loadProduct();
        }
      
      }
    render() {
        return (
            <>
            <div className="my-3">
            <h2 className="display-8 fw-bold">
                Shop All Products
            </h2>
            <div className="filters">
                <button>Sort By</button>
                <button>Scent</button>
                <button>Product Type</button>
            </div>
            </div>
            <div className="container">
            <div className="row">
                {this.state.productColumns.map((productList, index) => {
                return (
                    <ProductColumn AddToCart={this.AddToCart} key={index} list={productList} />
                );
                })}
            </div>
            </div>
            </>
        ) 
    }
    
}

    


export default ListProducts;