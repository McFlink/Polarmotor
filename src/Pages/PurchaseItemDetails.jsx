import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPurchaseItem } from "../Services/purchaseService";
import "./PurchaseItemDetails.css";

const PurchaseItemDetails = () => {
  const { id } = useParams();
  const [purchaseItem, setPurchaseItem] = useState(null);

  useEffect(() => {
    const fetchPurchaseItem = async () => {
      const articleData = await getPurchaseItem(id);
      setPurchaseItem(articleData);
    };
    fetchPurchaseItem();
  }, [id]);

  if (!purchaseItem) {
    return <div className="text-center mt-5 fw-bold">Laddar...</div>;
  }

  return (
    <div className="purchase-item-container">
      <h1 className="mb-5">{purchaseItem.item}</h1>
      {purchaseItem.image && (
        <img
          src={purchaseItem.image}
          alt={purchaseItem.item}
          className="img-fluid mb-5"
        />
      )}
      <p>{purchaseItem.description}</p>
    </div>
  );
};

export default PurchaseItemDetails;
