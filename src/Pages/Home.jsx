import React from "react";
import "./Home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import mcImage from "../tempimages/mc.jfif";

const Home = () => {
  return (
    <>
      <h1 className="text-center m-4">Välkommen till Polarmotor</h1>
      <div className="home-container">
        <div className="news-container box">
          <h3>Senaste nyheterna</h3>
          <ul>
            <li>Nyhet 1</li>
            <li>Nyhet 2</li>
            <li>Nyhet 3</li>
          </ul>
        </div>
        <div className="latest-sale-container box">
          <h3>Senast inlagda till salu</h3>
          <div className="card custom-card">
            <div className="card-body">
              <img src={mcImage} class="card-img-top" alt="..."></img>
              <h5 class="card-title">Card title</h5>
              <a href="#" class="btn btn-primary">
                Gå till produkt
              </a>
            </div>
          </div>
          <div className="card custom-card">
            <div className="card-body">
              <img src={mcImage} class="card-img-top" alt="..."></img>
              <h5 class="card-title">Card title</h5>
              <a href="#" class="btn btn-primary">
                Gå till produkt
              </a>
            </div>
          </div>
        </div>
        <div className="latest-buy-container box">
          <h3>Senast inlagda under "köpes"</h3>
        </div>
        <div className="random-container box">
          <h3>Random</h3>
        </div>
      </div>
    </>
  );
};

export default Home;
