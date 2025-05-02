import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSaleItem } from "../Services/saleService";
import "./SaleItemDetails.css";
import DOMPurify from "dompurify";

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
    return (
      <div className="text-center fw-bold loading-text">
        Laddar produktdetaljer...
      </div>
    );
  }

  const createdAtDate = saleItem.createdAt
    ? new Date(saleItem.createdAt.seconds * 1000).toLocaleDateString()
    : "";

  const sanitizedContent = DOMPurify.sanitize(saleItem.description);

  const handleLineBreaks = (description) => {
    // Ersätt varje "\n" med <br> (för radbrytning). dangerouslySetInnerHTML används för att injicera html i DOM, vilket betyder att BR-taggar kommer att tolkas som radbryt.
    return description.replace(/\n/g, "<br>");
  };

  const contentWithLineBreaks = handleLineBreaks(sanitizedContent);

  return (
    <div className="sale-item-container">
      <div className="sale-item">
        <h1>{saleItem.item}</h1>
        <p className="mb-5 fst-italic">Upplagd: {createdAtDate}</p>
        {saleItem.image && (
          <img
            src={saleItem.image}
            alt={saleItem.item}
            className="img-fluid mb-5"
          />
        )}
        <p className="fw-bold">Beskrivning:</p>
        <div
          className="article-content mb-5"
          dangerouslySetInnerHTML={{ __html: contentWithLineBreaks }}
        />
        <p className="fw-bold mt-3">Pris: {saleItem.price} SEK</p>
      </div>
    </div>
  );
};

export default SaleItemDetails;
