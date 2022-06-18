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
    return (
      <React.Fragment>
      <div className="Mainpage d-flex justify-content-center position-relative">
        <img className="hero-img-blur"
          src="/images/hero-img.jpg"
          height={300}
          width={null}
          style={{ objectFit: "cover", width: "100%" }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            width: "100%",
            height: "200px",
            background: "#fff",
            opacity: "0.5",
          }}
        />
        <img
          src="/images/sbmain.png"
          height={200}
          width={null}
          style={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        />
      </div>
        <h3 className="text-center" style={{
        transform: "translateY(-90%)"}}>Find Products Suited For You!</h3>       
     
     <div className="px-5">
     <div className="quiz-container px-5">
      <div className="div1 text-center left-img">
        <img src="/images/body-quiz.jpg"
        height={300}
        width={null}
        style={{ objectFit: "cover", width: "100%" }}
        ></img>
        <NavLink to="/bodyquiz" role="button" className="col text-center btn btn-outline-dark btn-lg">
          Body Quiz Scent
        </NavLink >
      </div>
      <div className="div2 text-center right-img">
        <img src="/images/home-quiz.jpg"
        height={300}
        width={null}
        style={{ objectFit: "cover", width: "100%",}}
        ></img>
        <NavLink to="/homequiz" role="button" className="col text-center btn btn-outline-dark btn-lg">
          Home Quiz Scent
        </NavLink> 
      </div>
    </div>
      
        
    <div className="carousel-container carousel-dark">
    <div className="carousel container x-5 y-5 div3">
        <div id="carouselExampleCaptions" className="carousel slide mt-5" data-bs-ride="false">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
        </div>
        <div className="carousel-inner carousel-fade ">
          <div className="carousel-item active">
          {this.state.products.map(product => {
              if (product.name === top_candle.name) {
                return (
                  <div>
                    <NavLink to={"/products/"+ product.sku}>
                      <img style={{ objectFit: "cover", width: "100%" }} height={630} key={product.sku} src={product.image} className="d-block height-80 mx-auto" alt="headphones.jpeg"/>
                    </NavLink>
                    <div className="carousel-caption d-none d-md-block stroke-text">
                      <h5>Our top Home Product!</h5>
                      <p>{product.name}</p>
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
                      <img style={{ objectFit: "cover", width: "100%" }} height={630} key={product.sku} src={product.image} className="d-block height-80 mx-auto" alt="headphones.jpeg"/>
                    </NavLink>
                    <div className="carousel-caption d-none d-md-block stroke-text">
                      <h5>Our top Body Product</h5>
                      <p>{product.name}</p>
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

    </div>

      </React.Fragment>
    );
  }
}

export default HomePage;
