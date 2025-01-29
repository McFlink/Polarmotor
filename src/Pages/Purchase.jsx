import { useState } from "react";
import "./Purchase.css";
import { InputGroup, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { savePurchaseItem } from "../Services/purchaseService";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const Purchase = () => {
  const [item, setItem] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // State för förhandsgranskning
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleItemChange = (e) => {
    setItem(e.target.value);
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
    if (!item.trim()) {
      alert("Fyll i produktens titel!");
      return;
    }
    if (!description.trim()) {
      alert("Fyll i en beskrivning!");
      return;
    }

    await savePurchaseItem(item, description, image);

    setItem("");
    setDescription("");
    setImage(null);
    setImagePreview(null);

    queryClient.invalidateQueries("latestPurchases"); // Markerar cachade datan för "sales" som utdaterad/invalid, och triggar ny fetch från API nästa gång den används, dvs när vi navigerar Home-sidan.
    navigate("/");
  };

  return (
    <div className="purchase-container m-5">
      <div className="purchase-body">
        <h1 className="mb-3">Köp produkt (annons)</h1>
        <InputGroup className="mb-3">
          <Form.Control
            type="text"
            placeholder="Produkt att köpa (titel)"
            value={item}
            onChange={handleItemChange}
            required
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <Form.Control
            as="textarea"
            placeholder="Beskrivning (inkl önskat pris"
            value={description}
            onChange={handleDescriptionChange}
            rows={4}
            style={{ resize: "none" }}
            required
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <Form.Control type="file" onChange={handleFileChange} />
        </InputGroup>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Lägg upp
        </Button>
      </div>
      <div className="purchase-review-container">
        <h2 className="mb-3 mt-1">Granska</h2>
        <div className="purchase-review-body p-3">
          <p className="review-info-header">
            Produkt: <span>{item}</span>
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
                loading="lazy"
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

export default Purchase;
