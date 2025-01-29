import "./Home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { getSaleItems } from "../Services/saleService";
import { getPurchaseItems } from "../Services/purchaseService";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const Home = () => {
  const oneYearInMs = 365 * 24 * 60 * 60 * 1000; // 1 år i millisekunder

  // Caching with React Query
  const { data: sales = [], refetch: refetchSales } = useQuery({
    queryKey: ["sales"],
    queryFn: getSaleItems,
    staleTime: oneYearInMs, // Så länge datan anses "fräsch". Data hämtas INTE igen efter 5 minuter så länge användaren är kvar på sidan, dock när sidan mountas (besöks) igen.
    cacheTime: Infinity, // Anger hur länge cachad data finns kvar i cache, även efter att sidan har lämnats. Angiven tid tickar på även om appen lämnas. Rensas efter angiven tid.
    refetchOnWindowFocus: false, // Hämtar INTE om data när fönstret återfår fokus
    refetchOnReconnect: false, // Hämtar INTE om data om t ex anslutning försvunnit eller liknande
  });

  const { data: purchases = [], refetch: refetchPurchases } = useQuery({
    queryKey: ["purchases"],
    queryFn: getPurchaseItems,
    staleTime: oneYearInMs,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const navigate = useNavigate();

  const latestSales = sales.slice(0, 3);
  const latestPurchases = purchases.slice(0, 3);

  const navigateToSalesObjects = () => {
    navigate("/salesobjects");
  };

  const navigateToNewsPage = () => {
    navigate("/news");
  };

  const navigateToBuyObjects = () => {
    navigate("/purchaseObjects");
  };

  const navigateToGallery = () => {
    navigate("/gallery");
  };

  return (
    <>
      <h1 className="text-center m-4">Välkommen till Polarmotor</h1>
      <div className="home-container">
        <div className="news-container box">
          <button className="go-to-page-button" onClick={navigateToNewsPage}>
            Se alla nyheter
          </button>
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
                  loading="lazy"
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
        </div>
        <div className="latest-buy-container box">
          <button className="go-to-page-button" onClick={navigateToBuyObjects}>
            Se alla produkter
          </button>
          <h3>Senast inlagda under "köpes"</h3>
          {latestPurchases.length > 0 ? (
            latestPurchases.map((purchase) => (
              <div key={purchase.id} className="card custom-card">
                <img
                  src={purchase.image || "https://via.placeholder.com/300"}
                  className="card-img-top"
                  alt={purchase.item}
                  loading="lazy"
                />
                <div className="card-body">
                  <h5 className="card-title">{purchase.item}</h5>
                  <button className="btn btn-primary">Gå till produkt</button>
                </div>
              </div>
            ))
          ) : (
            <p>Inga köp-objekt än...</p>
          )}
        </div>
        <div className="random-container box">
          <button className="go-to-page-button" onClick={navigateToGallery}>
            Se galleri
          </button>
          <h3>Slumpade bilder från galleriet</h3>
        </div>
      </div>
    </>
  );
};

export default Home;
