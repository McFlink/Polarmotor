import { useState, useEffect } from "react";
import "./Home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { getSaleItems } from "../Services/saleService";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [sales, setSales] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSales = async () => {
      const salesData = await getSaleItems();
      const sortedSales = salesData.sort((a, b) => b.createdAt - a.createdAt);
      setSales(sortedSales);
    };

    fetchSales();
  }, []);

  const latestSales = sales.slice(0, 3);

  const navigateToSalesObjects = () => {
    navigate("/salesobjects");
  };

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
          <button
            className="go-to-page-button"
            onClick={navigateToSalesObjects}
          >
            Se alla produkter
          </button>
          <h3 className="sale-title-h3">Senast inlagda till salu </h3>
          {latestSales.length > 0 ? (
            latestSales.map((sale) => (
              <div key={sale.id} className="card custom-card">
                <img
                  src={sale.image || "https://via.placeholder.com/300"}
                  className="card-img-top"
                  alt={sale.item}
                />
                <div className="card-body">
                  <h5 className="card-title">{sale.item}</h5>
                  <button className="btn btn-primary">Gå till produkt</button>
                </div>
              </div>
            ))
          ) : (
            <p>Inga säljobjekt än...</p>
          )}
          {/* <div className="card custom-card">
            <img src={mcImage} className="card-img-top" alt="..."></img>
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <button className="btn btn-primary">Gå till produkt</button>
            </div>
          </div> */}
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
