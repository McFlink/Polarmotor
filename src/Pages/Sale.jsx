import { useState } from "react";
import "./Sale.css";
import { InputGroup, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Sale = () => {
  const [item, setItem] = useState("");
  const [price, setPrice] = useState(null);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

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
    setImage(URL.createObjectURL(file)); // Skapar URL för förhandsgranskning
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
        <Button variant="primary" type="submit">
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
                src={image}
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
    </div>
  );
};

export default Sale;
