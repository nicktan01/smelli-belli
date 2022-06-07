import './HomePage.css';
import { NavLink } from "react-router-dom";

function HomePage() {
  return (
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
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src="headphones.jpeg" className="d-block w-80 mx-auto" alt="headphones.jpeg"/>
          <div className="carousel-caption d-none d-md-block">
            <h5>First slide label</h5>
            <p>Some representative placeholder content for the first slide.</p>
          </div>
        </div>
        <div className="carousel-item">
          <img src="headphones.jpeg" className="d-block w-80 mx-auto" alt="headphones.jpeg"/>
          <div className="carousel-caption d-none d-md-block">
            <h5>Second slide label</h5>
            <p>Some representative placeholder content for the second slide.</p>
          </div>
        </div>
        <div className="carousel-item">
          <img src="headphones.jpeg" className="d-block w-80 mx-auto" alt="headphones.jpeg"/>
          <div className="carousel-caption d-none d-md-block">
            <h5>Third slide label</h5>
            <p>Some representative placeholder content for the third slide.</p>
          </div>
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

    
    
  );
}

export default HomePage;
