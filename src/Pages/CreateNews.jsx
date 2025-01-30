import { useState } from "react";
import "./CreateNews.css";
import { InputGroup, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { saveNewsArticle } from "../Services/newsService";

const CreateNews = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // State för förhandsgranskning
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleNewsBodyChange = (e) => {
    setContent(e.target.value);
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
    if (!title.trim()) {
      alert("Fyll i titel");
      return;
    }
    if (!content.trim()) {
      alert("Fyll i artikelns innehåll");
      return;
    }

    await saveNewsArticle(title, content, image);

    setTitle("");
    setContent("");
    setImage(null);
    setImagePreview(null);

    queryClient.invalidateQueries("latestNews");
    navigate("/");
  };

  return (
    <div className="news-container m-5">
      <div className="news-body">
        <h1 className="mb-3">Lägg in ny nyhet</h1>
        <InputGroup className="mb-3">
          <Form.Control
            type="text"
            placeholder="Titel"
            value={title}
            onChange={handleTitleChange}
            required
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <Form.Control
            as="textarea"
            placeholder="Innehåll"
            value={content}
            onChange={handleNewsBodyChange}
            rows={10}
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
      <div className="news-review-container">
        <h2 className="mb-3 mt-1">Granska</h2>
        <div className="news-review-body p-3">
          <p className="review-info-header">
            Titel: <span>{title}</span>
          </p>
          <p className="review-info-header">
            Innehåll: <span>{content}</span>
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

export default CreateNews;
