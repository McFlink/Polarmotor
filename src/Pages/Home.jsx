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
          {/* Remove this when full release version is ready */}
          <div className="under-contruction"></div>
          <p className="temp-info-text">
            Denna sida är under uppbyggnad. Ni kommer dock åt kontaktinformation
            under 'Kontakt'-fliken högst upp, så tveka inte att höra av er om
            det är något ni behöver hjälp med.
          </p>
          <ul>
            <li>Nyhet 1</li>
            <li>Nyhet 2</li>
            <li>Nyhet 3</li>
          </ul>
        </div>
        <div className="latest-sale-container box">
          <h3>Senast inlagda till salu</h3>
          <div className="card custom-card">
            <img src={mcImage} className="card-img-top" alt="..."></img>
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <button className="btn btn-primary">Gå till produkt</button>
            </div>
          </div>
          <div className="card custom-card">
            <img src={mcImage} className="card-img-top" alt="..."></img>
            <div className="card-body">
              <h5 className="card-title">Card title 2</h5>
              <button className="btn btn-primary">Gå till produkt</button>
            </div>
          </div>
          <div className="card custom-card">
            <img src={mcImage} className="card-img-top" alt="..."></img>
            <div className="card-body">
              <h5 className="card-title">Card title 2</h5>
              <button className="btn btn-primary">Gå till produkt</button>
            </div>
          </div>
        </div>
        <div className="latest-buy-container box">
          <h3>Senast inlagda under "köpes"</h3>
        </div>
        <div className="random-container box">
          <h3>Slumpade bilder från galleriet</h3>
        </div>
      </div>
    </>
  );
};

export default Home;
