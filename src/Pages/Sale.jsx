import { useEffect, useState } from "react";
import "./Sale.css";
import { InputGroup, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { getSaleItems, saveSaleItem } from "../Services/saleService";

const Sale = () => {
  const [item, setItem] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // State för förhandsgranskning

  const handleItemChange = (e) => {
    setItem(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Hämtar första filen
    setImage(file); // Skapar URL för förhandsgranskning

    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await saveSaleItem(item, price, description, image);

    setItem("");
    setPrice("");
    setDescription("");
    setImage(null);
    setImagePreview(null);
  };

  return (
    <div className="sale-container m-5">
      <div className="sale-body">
        <h1 className="mb-3">Sälj produkt</h1>
        <InputGroup className="mb-3">
          <Form.Control
            type="text"
            placeholder="Produkt att sälja"
            value={item}
            onChange={handleItemChange}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <Form.Control
            type="number"
            placeholder="Pris"
            value={price}
            onChange={handlePriceChange}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <Form.Control
            type="text"
            placeholder="Beskrivning"
            value={description}
            onChange={handleDescriptionChange}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <Form.Control type="file" onChange={handleFileChange} />
        </InputGroup>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Lägg upp
        </Button>
      </div>
      <div className="sale-review-container">
        <h2 className="mb-3 mt-1">Granska</h2>
        <div className="sale-review-body p-3">
          <p className="review-info-header">
            Produkt: <span>{item}</span>
          </p>
          <p className="review-info-header">
            Pris: <span>{price} kr</span>
          </p>
          <p className="review-info-header">
            Beskrivning: <span>{description}</span>
          </p>
          {image ? (
            <div className="mt-5">
              <img
                src={imagePreview}
                alt="Preview"
                className="img-fluid"
                width={400}
              />
            </div>
          ) : (
            <p>
              <em>Uppladdad bild visas här</em>
            </p>
          )}
        </div>
      </div>

      {/* // Testning
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const fetchSales = async () => {
      const salesData = await getSaleItems();
      setSales(salesData);
    };
    fetchSales();
  }, []);
    

      <div>
        <h2>Sales</h2>
        {sales.length > 0 ? (
          sales.map((sale) => (
            <div key={sale.id}>
              <p>{sale.item}</p>
              <p>{sale.price}</p>
              <p>{sale.description}</p>
              {sale.image ? (
                <img
                  src={sale.image}
                  alt={sale.item}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/400x400";
                  }}
                  width="200"
                />
              ) : (
                <p>N/A</p>
              )}
            </div>
          ))
        ) : (
          <p>Laddar...</p>
        )}
      </div> */}
    </div>
  );
};

export default Sale;
