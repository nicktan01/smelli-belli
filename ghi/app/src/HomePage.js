import "./HomePage.css";
import { NavLink } from "react-router-dom";
import React from "react";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  async getListProducts() {
    const response = await fetch(
      `${process.env.REACT_APP_INVENTORY_HOST}/api/products/`
    );
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
    let top_lotion = this.state.products[2];
    let top_candle = this.state.products[5];
    return (
      <React.Fragment>
        <div className="Mainpage d-flex justify-content-center position-relative">
          <img
            className="hero-img-blur"
            src={process.env.PUBLIC_URL + "/images/hero-img.jpg"}
            height={300}
            width={null}
            style={{ objectFit: "cover", width: "100%" }}
            alt="home banner"
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
            src={process.env.PUBLIC_URL + "/images/sbmain.png"}
            height={200}
            width={null}
            style={{
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
            }}
            alt="logo"
          />
        </div>
        <div className="px-4 py-3 my-1 text-center">
          <h3>Find Products Suited For You!</h3>
        </div>

        <div className="px-4 py-1 my-1 text-center">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ position: "relative" }}>
              <img src={process.env.PUBLIC_URL + "/images/body-quiz.jpg"} width={500} alt="quiz"></img>
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "100%",
                  height: "200px",
                  background: "#fff",
                  opacity: "0.6",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translateX(-50%) translateY(-50%)",
                  padding: "5px",
                }}
              >
                <h3 className="">Body Scent Quiz</h3>
                <p className="">
                  Take a short quiz to determine your ideal scent profile for
                  all body related products!
                </p>
                <NavLink
                  to="/bodyquiz"
                  role="button"
                  className="col text-center btn btn-outline-dark btn-lg"
                >
                  Body Quiz Scent
                </NavLink>
              </div>
            </div>

            <div className="px-4 py-1 my-1 text-center">
              <div style={{ position: "relative" }}>
                <img src="/images/home-quiz.jpg" width={500} alt="quiz"></img>
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
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translateX(-50%) translateY(-50%)",
                    padding: "5px",
                  }}
                >
                  <h3>Home Scent Quiz</h3>
                  <p>
                    Take a short quiz to determine your ideal scent profile for
                    all home related products!
                  </p>
                  <NavLink
                    to="/homequiz"
                    role="button"
                    className="col text-center btn btn-outline-dark btn-lg"
                  >
                    Home Quiz Scent
                  </NavLink>
                </div>
              </div>
            </div>
          </div>

          <div className="px-4 py-3 my-1 text-center">
            <h3>Featured Products</h3>
          </div>
          <div className="carousel-container carousel-dark">
            <div className="carousel container x-5 y-5 div3">
              <div
                id="carouselExampleCaptions"
                className="carousel slide mt-1"
                data-bs-ride="false"
                style={{ width: "100%" }}
              >
                <div className="carousel-indicators">
                  <button
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide-to="0"
                    className="active"
                    aria-current="true"
                    aria-label="Slide 1"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide-to="1"
                    aria-label="Slide 2"
                  ></button>
                </div>
                <div className="carousel-inner carousel-fade ">
                  <div className="carousel-item active">
                    {this.state.products.map((product) => {
                      if (product.name === top_candle.name) {
                        return (
                          <div>
                            <NavLink to={"/products/" + product.sku}>
                              <img
                                style={{ objectFit: "cover", width: "100%" }}
                                height={630}
                                key={product.sku}
                                src={product.image}
                                className="d-block height-80 mx-auto"
                                alt="product"
                              />
                            </NavLink>
                            <div
                              style={{
                                position: "absolute",
                                bottom: "0%",
                                width: "100%",
                                height: "150px",
                                background: "#fff",
                                opacity: "0.5",
                              }}
                            />
                            <div className="carousel-caption d-none d-md-block stroke-text">
                              <h5>Our top Home Product</h5>
                              <p>{product.name}</p>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                  <div className="carousel-item">
                    {this.state.products.map((product) => {
                      if (product.name === top_lotion.name) {
                        return (
                          <div>
                            <NavLink to={"/products/" + product.sku}>
                              <img
                                style={{ objectFit: "cover", width: "100%" }}
                                height={630}
                                key={product.sku}
                                src={product.image}
                                className="d-block height-80 mx-auto"
                                alt="product"
                              />
                            </NavLink>
                            <div
                              style={{
                                position: "absolute",
                                bottom: "0%",
                                width: "100%",
                                height: "150px",
                                background: "#fff",
                                opacity: "0.5",
                              }}
                            />
                            <div className="carousel-caption d-none d-md-block stroke-text">
                              <h5>Our top Body Product</h5>
                              <p>{product.name}</p>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleCaptions"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleCaptions"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
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
