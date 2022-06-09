import React from 'react';

function ProductColumn(props) {
    return (
        <div className="col">
          {props.list.map(product => {
            return (
              <div key={product.id} className="card mb-3 shadow">
                <img src={ !product.image ? 'https://tracerproducts.com/wp-content/uploads/2019/12/Product-Image-Coming-Soon.jpg' : product.image } className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                  ${product.price} - {product.size}
                  </h6>
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
          productColumns: [[], [], [], []]
        };
      }
    
      async componentDidMount() {
          const url = 'http://localhost:8100/api/products/'

          try {
              const response = await fetch(url);
              if (response.ok) {
                const data = await response.json();

                const requests = [];
                  for (let product of data.products) {
                    if (product["product_type"] == "Home") {
                      const detailUrl = `http://localhost:8100/api/products/${product.sku}`;
                      requests.push(fetch(detailUrl));
                    }
                }
                
                const responses = await Promise.all(requests);

                const productColumns = [[], [], [], []];

                let i = 0;
                for (const productResponse of responses) {
                    if (productResponse.ok) {
                        const details = await productResponse.json();
                        productColumns[i].push(details);
                        i += 1;
                        if (i > 3) {
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

    render() {
        return (
            <>
            <div className="my-3">
            <h2 className="display-8 fw-bold">
                Shop Home Products
            </h2>
            <div className="filters">
            <div className="dropdown">
              <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                 Sort By
              </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a className="dropdown-item" href="#">Price: Low to High</a>
                   <a className="dropdown-item" href="#">Price: High to Low</a>
                   <a className="dropdown-item" href="#">Scent Name: A to Z</a>
                   <a className="dropdown-item" href="#">Scent Name: Z to A</a>
                </div>
                <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                 Primary Scent
              </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a className="dropdown-item" href="#">Amber</a>
                  <a className="dropdown-item" href="#">Fruity</a>
                   <a className="dropdown-item" href="#">Woody</a>
                   <a className="dropdown-item" href="#">Fresh</a>
                   <a className="dropdown-item" href="#">Floral</a>
                </div>
                <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                 Product Type
              </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a className="dropdown-item" href="#">Lotion</a>
                   <a className="dropdown-item" href="#">Body Wash</a>
                   <a className="dropdown-item" href="#">Soap</a>
                   <a className="dropdown-item" href="#">Deodorant</a>
                   <a className="dropdown-item" href="#">Candle</a>
                   <a className="dropdown-item" href="#">Incense Stick</a>
                   <a className="dropdown-item" href="#">Room Spray</a>
                </div>
              </div>
            </div>
            </div>
            <div className="container">
            <div className="row">
                {this.state.productColumns.map((productList, index) => {
                return (
                    <ProductColumn key={index} list={productList} />
                );
                })}
            </div>
            </div>
            </>
        ) 
    }
    
}

    


export default ListProducts;