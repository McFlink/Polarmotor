import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Modal } from "react-bootstrap";
import { getNewsArticles } from "../Services/newsService";
import Spinner from "../Components/Spinner";
import "./Gallery.css";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const {
    data: news = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["gallery-news"],
    queryFn: getNewsArticles,
    staleTime: 5 * 60 * 1000,
  });

  const images = useMemo(() => {
    const collected = [];
    const seen = new Set();

    const addUrl = (url, title) => {
      if (typeof url !== "string") return;
      const trimmed = url.trim();
      if (!trimmed || seen.has(trimmed)) return;
      seen.add(trimmed);
      collected.push({ url: trimmed, title: title || "Nyhetsbild" });
    };

    news.forEach((article) => {
      const title = article?.title || "Nyhetsbild";

      addUrl(article?.imageUrl, title);
      addUrl(article?.image, title);

      if (Array.isArray(article?.images)) {
        article.images.forEach((img) => addUrl(img, title));
      }

      if (Array.isArray(article?.imageUrls)) {
        article.imageUrls.forEach((img) => addUrl(img, title));
      }
    });

    return collected;
  }, [news]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return (
      <div className="page-shell gallery-shell">
        <h1 className="section-heading">Galleri</h1>
        <p className="gallery-status">Kunde inte ladda bilder just nu.</p>
      </div>
    );
  }

  return (
    <div className="page-shell gallery-shell">
      <div className="gallery-header">
        <span className="section-label">Nyheter</span>
        <h1 className="section-heading">Galleri</h1>
        <p className="gallery-lede">
          Bilder som lagts upp i nyhetsartiklar visas här. Klicka på en bild för
          att öppna den större.
        </p>
      </div>

      {images.length === 0 ? (
        <p className="gallery-status">Inga bilder än.</p>
      ) : (
        <div className="gallery-grid">
          {images.map((img) => (
            <button
              key={img.url}
              className="gallery-card"
              onClick={() => setSelectedImage(img)}
              type="button"
            >
              <div className="gallery-media">
                <img
                  src={img.url}
                  alt={img.title}
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/600x400/0f172a/ffffff?text=Bild";
                  }}
                />
                <div className="gallery-overlay">
                  <span>{img.title}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      <Modal
        show={!!selectedImage}
        onHide={() => setSelectedImage(null)}
        centered
        dialogClassName="gallery-modal-dialog"
        contentClassName="gallery-modal-content"
      >
        <Modal.Body>
          {selectedImage && (
            <img
              src={selectedImage.url}
              alt={selectedImage.title}
              className="gallery-modal-img"
              loading="lazy"
            />
          )}
        </Modal.Body>
        {selectedImage?.title && (
          <Modal.Footer className="gallery-modal-footer">
            <span>{selectedImage.title}</span>
          </Modal.Footer>
        )}
      </Modal>
    </div>
  );
};

export default Gallery;
