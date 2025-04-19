import "./Home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { getSaleItems } from "../Services/saleService";
import { getPurchaseItems } from "../Services/purchaseService";
import { getNewsArticles } from "../Services/newsService";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FaCircleArrowRight } from "react-icons/fa6";
import { MdReadMore } from "react-icons/md";

const Home = () => {
  const oneYearInMs = 365 * 24 * 60 * 60 * 1000; // 1 år i millisekunder

  // Caching with React Query
  const { data: sales = [] } = useQuery({
    queryKey: ["latestSales"],
    queryFn: getSaleItems,
    staleTime: oneYearInMs, // Så länge datan anses "fräsch". Data hämtas INTE igen efter 5 minuter så länge användaren är kvar på sidan, dock när sidan mountas (besöks) igen.
    cacheTime: Infinity, // Anger hur länge cachad data finns kvar i cache, även efter att sidan har lämnats. Angiven tid tickar på även om appen lämnas. Rensas efter angiven tid.
    refetchOnWindowFocus: false, // Hämtar INTE om data när fönstret återfår fokus
    refetchOnReconnect: false, // Hämtar INTE om data om t ex anslutning försvunnit eller liknande
  });

  const { data: purchases = [] } = useQuery({
    queryKey: ["latestPurchases"],
    queryFn: getPurchaseItems,
    staleTime: oneYearInMs,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const { data: news = [] } = useQuery({
    queryKey: ["latestNews"],
    queryFn: getNewsArticles,
    staleTime: oneYearInMs,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const navigate = useNavigate();

  const latestSales = sales.slice(0, 3);
  const latestPurchases = purchases.slice(0, 3);
  const latestNews = news.slice(0, 3);

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

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <>
      <h1 className="text-center m-4">Välkommen till Polarmotor</h1>
      <div className="home-container">
        <div className="latest-news-container box">
          <button className="go-to-page-button" onClick={navigateToNewsPage}>
            Se alla nyheter
          </button>
          <h3>Senaste nyheterna</h3>
          <ul className="ul-news-list">
            {latestNews.length > 0 ? (
              latestNews.map((news) => (
                <li key={news.id} className="news-list">
                  <FaCircleArrowRight className="title-arrow me-2" />
                  {news.title}
                  <p className="fw-light mt-1 d-flex justify-content-between align-items-center">
                    {truncateText(news.content, 78)}
                    <span className="fw-semibold text-primary d-flex align-items-center">
                      {" "}
                      <MdReadMore className="ms-2 me-2" />
                      läs mer
                    </span>
                  </p>
                </li>
              ))
            ) : (
              <p>Inga nyheter än...</p>
            )}
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
