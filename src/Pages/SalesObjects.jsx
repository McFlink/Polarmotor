import { useState, useEffect } from "react";
import "./SalesObjects.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { getSaleItems } from "../Services/saleService";

const SalesObjects = () => {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const fetchSales = async () => {
      const salesData = await getSaleItems();
      setSales(salesData);
    };

    fetchSales();
  }, []);

  return (
    <div className="sales-objects-container">
      <h1>SalesObjects</h1>
      <div>
        {sales.length > 0 ? (
          sales.map((sale) => (
            <div key={sale.id} className="card custom-sales-object-card">
              <img
                src={sale.image || "https://via.placeholder.com/300"}
                className="card-img-top"
                alt={sale.item}
              />
              <div className="card-body">
                <h5 className="card-title">{sale.item}</h5>
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
