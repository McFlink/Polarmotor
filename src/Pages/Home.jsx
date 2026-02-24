import "./Home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { getSaleItems } from "../Services/saleService";
import { getPurchaseItems } from "../Services/purchaseService";
import { getNewsArticles } from "../Services/newsService";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FaCircleArrowRight } from "react-icons/fa6";
import { MdReadMore } from "react-icons/md";
import { useEffect } from "react";
import DOMPurify from "dompurify";
import Spinner from "../Components/Spinner";

const Home = () => {
  const oneYearInMs = 365 * 24 * 60 * 60 * 1000; // 1 år i millisekunder

  // Caching with React Query
  const {
    data: sales = [],
    isLoading,
    refetch: refetchSales,
  } = useQuery({
    queryKey: ["latestSales"],
    queryFn: async () => {
      const salesData = await getSaleItems();
      // Sortera säljobjekten så att de senaste visas först
      return salesData.sort((a, b) => b.createdAt - a.createdAt);
    },
    staleTime: oneYearInMs, // Så länge datan anses "fräsch". Data hämtas INTE igen efter 5 minuter så länge användaren är kvar på sidan, dock när sidan mountas (besöks) igen.
    cacheTime: Infinity, // Anger hur länge cachad data finns kvar i cache, även efter att sidan har lämnats. Angiven tid tickar på även om appen lämnas. Rensas efter angiven tid.
    refetchOnWindowFocus: false, // Hämtar om data när fönstret återfår fokus
    refetchOnReconnect: false, // Hämtar INTE om data om t ex anslutning försvunnit eller liknande
  });

  const { data: purchases = [], refetch: refetchPurchases } = useQuery({
    queryKey: ["latestPurchases"],
    queryFn: async () => {
      const purchaseData = await getPurchaseItems();

      return purchaseData.sort((a, b) => b.createdAt - a.createdAt);
    },
    staleTime: oneYearInMs,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const { data: news = [], refetch: refetchNews } = useQuery({
    queryKey: ["latestNews"],
    queryFn: async () => {
      const newsData = await getNewsArticles();
      return newsData.sort((a, b) => b.createdAt - a.createdAt);
    },
    staleTime: oneYearInMs,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const navigate = useNavigate();

  const navigateToNewsDetail = (id) => {
    navigate(`/news-article/${id}`);
  };

  const navigateToSaleItemDetails = (id) => {
    navigate(`/sale-item/${id}`);
  };

  const navigateToPurchaseItemDetails = (id) => {
    navigate(`/purchase-item/${id}`);
  };

  const latestSales = sales.slice(0, 3);
  const latestPurchases = purchases.slice(0, 3);
  const latestNews = news.slice(0, 3);

  useEffect(() => {
    refetchSales();
    refetchPurchases();
    refetchNews();
  }, [refetchSales, refetchPurchases, refetchNews]);

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

  const sanitizedContent = (content) => {
    return DOMPurify.sanitize(content);
  };

  const sanitizeAndTruncateContent = (content, maxLength) => {
    // Sanera och ta bort HTML-taggar som <br> eller andra taggar
    const cleanText = DOMPurify.sanitize(content).replace(/<br\s*\/?>/g, " "); // Ta bort <br> taggar
    // Trunkera den rengjorda texten
    return cleanText.length > maxLength
      ? cleanText.substring(0, maxLength) + "..."
      : cleanText;
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="page-shell home-shell">
      <div className="home-header">
        <span className="section-label">Premium verkstad</span>
        <h1 className="section-heading">Välkommen till Polarmotor</h1>
        <p className="lede">
          Motorcykelverkstaden i norr för service, custom och prestanda. Se de
          senaste nyheterna och objekten direkt nedan.
        </p>
      </div>

      <div className="home-grid">
        <section className="home-panel latest-news-container">
          <div className="panel-top">
            <h4>Senaste nyheterna</h4>
            <button className="ghost-button" onClick={navigateToNewsPage}>
              Se alla nyheter
            </button>
          </div>
          <ul className="ul-news-list">
            {latestNews.length > 0 ? (
              latestNews.map((news) => {
                const truncatedContent = sanitizeAndTruncateContent(
                  news.content,
                  70,
                );

                return (
                  <li key={news.id} className="news-list">
                    <div className="news-title-row">
                      <FaCircleArrowRight className="title-arrow me-2" />
                      <span>{news.title}</span>
                    </div>
                    <p className="news-snippet">
                      <span
                        dangerouslySetInnerHTML={{
                          __html: truncatedContent,
                        }}
                      />
                      <button
                        className="text-button"
                        onClick={() => navigateToNewsDetail(news.id)}
                      >
                        <MdReadMore className="ms-2 me-2" />
                        läs mer
                      </button>
                    </p>
                  </li>
                );
              })
            ) : (
              <p>Inga nyheter än...</p>
            )}
          </ul>
        </section>

        <section className="home-panel latest-sale-container">
          <div className="panel-top">
            <h4 className="sale-title-h3">Senast inlagda till salu</h4>
            <button className="ghost-button" onClick={navigateToSalesObjects}>
              Se alla produkter
            </button>
          </div>
          <div className="card-grid">
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
                    <button
                      className="btn btn-primary card-button"
                      onClick={() => navigateToSaleItemDetails(sale.id)}
                    >
                      Gå till produkt
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>Inga säljobjekt än...</p>
            )}
          </div>
        </section>

        <section className="home-panel latest-buy-container">
          <div className="panel-top">
            <h4>Senast inlagda under "köpes"</h4>
            <button className="ghost-button" onClick={navigateToBuyObjects}>
              Se alla produkter
            </button>
          </div>
          <div className="card-grid">
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

                    <button
                      className="btn btn-primary"
                      onClick={() => navigateToPurchaseItemDetails(purchase.id)}
                    >
                      Gå till produkt
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>Inga köp-objekt än...</p>
            )}
          </div>
        </section>

        <section className="home-panel random-container">
          <div className="panel-top">
            <h4>Slumpade bilder från galleriet</h4>
            <button className="ghost-button" onClick={navigateToGallery}>
              Se galleri
            </button>
          </div>
          <p className="muted">Kommer snart.</p>
        </section>
      </div>
    </div>
  );
};

export default Home;
