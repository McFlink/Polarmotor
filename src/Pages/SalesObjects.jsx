import { useState, useEffect } from "react";
import "./SalesObjects.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { getSaleItems } from "../Services/saleService";

const SalesObjects = () => {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const fetchSales = async () => {
      const salesData = await getSaleItems();
      const sortedSales = salesData.sort((a, b) => b.createdAt - a.createdAt);
      setSales(sortedSales);
    };

    fetchSales();
  }, []);

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <div className="sales-objects-container">
      <h1 className="page-title">Till salu</h1>
      <div className="object-cards-container">
        {sales.length > 0 ? (
          sales.map((sale) => (
            <div key={sale.id} className="card custom-sales-object-card">
              <img
                src={sale.image || "https://via.placeholder.com/300"}
                className="card-img-top img-fluid custom-card-image"
                alt={sale.item}
              />
              <h5 className="card-title text-center mt-3 fw-bold">
                {sale.item}
              </h5>
              <div className="card-body">
                {truncateText(sale.description, 130)}
              </div>
            </div>
          ))
        ) : (
          <p>Laddar...</p>
        )}
      </div>
    </div>
  );
};

export default SalesObjects;
