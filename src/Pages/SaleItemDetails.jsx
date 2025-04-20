import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSaleItem } from "../Services/saleService";
import "./SaleItemDetails.css";

const SaleItemDetails = () => {
  const { id } = useParams();
  const [saleItem, setSaleItem] = useState(null);

  useEffect(() => {
    const fetchSaleItem = async () => {
      const articleData = await getSaleItem(id);
      setSaleItem(articleData);
    };
    fetchSaleItem();
  }, [id]);

  if (!saleItem) {
    return <div className="text-center mt-5 fw-bold">Laddar...</div>;
  }

  return (
    <div className="sale-item-container">
      <h1 className="mb-5">{saleItem.item}</h1>
      {saleItem.image && (
        <img
          src={saleItem.image}
          alt={saleItem.item}
          className="img-fluid mb-5"
        />
      )}
      <p>{saleItem.description}</p>
      <p className="fw-bold mt-3">Pris: {saleItem.price} SEK</p>
    </div>
  );
};

export default SaleItemDetails;
