import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPurchaseItem } from "../Services/purchaseService";
import "./PurchaseItemDetails.css";
import DOMPurify from "dompurify";

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

  const createdAtDate = purchaseItem.createdAt
    ? new Date(purchaseItem.createdAt.seconds * 1000).toLocaleDateString()
    : "";

  const sanitizedContent = DOMPurify.sanitize(purchaseItem.description);

  const handleLineBreaks = (description) => {
    // Ersätt varje "\n" med <br> (för radbrytning). dangerouslySetInnerHTML används för att injicera html i DOM, vilket betyder att BR-taggar kommer att tolkas som radbryt.
    return description.replace(/\n/g, "<br>");
  };

  const contentWithLineBreaks = handleLineBreaks(sanitizedContent);

  return (
    <div className="purchase-item-container">
      <div className="purchase-item">
        <h1>{purchaseItem.item}</h1>
        <p className="mb-5 fst-italic">Upplagd: {createdAtDate}</p>
        {purchaseItem.image && (
          <img
            src={purchaseItem.image}
            alt={purchaseItem.item}
            className="img-fluid mb-5"
          />
        )}
        <div
          className="article-content mb-5"
          dangerouslySetInnerHTML={{ __html: contentWithLineBreaks }}
        />
      </div>
    </div>
  );
};

export default PurchaseItemDetails;
