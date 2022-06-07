import './HomePage.css';
import { NavLink } from "react-router-dom";
import React from 'react';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }
  
  async getListProducts() {
      const response = await fetch('http://localhost:8100/api/products/');
      if (response.ok) {
        const data = await response.json();
        this.setState({
          products: data.products,
        });
      } else {
        console.error(response);
      }
  } 

  async componentDidMount() {
    this.getListProducts();
  }

  render() {
    let top_lotion = this.state.products[0];
    let top_candle = this.state.products[1];
    console.log(top_lotion)
    return (
      <React.Fragment>
      <div className="MainPage">
        <div className="quiz-buttons container mt-5">
            <div className="row">
              <div className="col text-center">
              <NavLink to="/bodyquiz" role="button" className="col text-center btn btn-outline-dark btn-lg">
                  Scent for Body Quiz
              </NavLink >
              </div>
              <div className="col text-center">
                <NavLink to="/homequiz" role="button" className="col text-center btn btn-outline-dark btn-lg">
                    Scent for Home Quiz
                </NavLink>
              </div>
            </div>
        </div>

      <div className="carousel container x-5 y-5">
        <div id="carouselExampleCaptions" className="carousel slide mt-5" data-bs-ride="false">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
          {this.state.products.map(product => {
              if (product.name === top_candle.name) {
                return (
                  <div>
                    <NavLink to={"/products/"+ product.sku}>
                      <img height={630} key={product.sku} src={product.image} className="d-block height-80 mx-auto" alt="headphones.jpeg"/>
                    </NavLink>
                    <div className="carousel-caption d-none d-md-block stroke-text">
                      <h5>Our top Candle</h5>
                      <p>Enjoy the woody scent of our candle!</p>
                    </div>
                  </div>
                );
              }
            })}
          </div>
          <div className="carousel-item">
            {this.state.products.map(product => {
              if (product.name === top_lotion.name) {
                return (
                  <div>
                    <NavLink to={"/products/"+ product.sku}>
                      <img height={630} key={product.sku} src={product.image} className="d-block height-80 mx-auto" alt="headphones.jpeg"/>
                    </NavLink>
                    <div className="carousel-caption d-none d-md-block stroke-text">
                      <h5>Our top Lotion</h5>
                      <p>Enjoy the fresh scent of our lotion!</p>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
        </div>
      </div>
      </div>

      </React.Fragment>
    );
  }
}

export default HomePage;
