import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getNewsArticles } from "../Services/newsService";
import GenericTable from "../Components/GenericTable";
import CrudActions from "../Components/CrudActions";
import "./News.css";
import ConfirmModal from "../Components/ConfirmModal";
import { uploadImage, deleteImage } from "../Services/firestoreService";
import { deleteNewsArticle, updateNewsArticle } from "../Services/newsService";
import DOMPurify from "dompurify";
import { useAdmin } from "../Context/AdminContext.jsx";
import Spinner from "../Components/Spinner";

const News = () => {
  const oneYearInMs = 365 * 24 * 60 * 60 * 1000; // 1 år i millisekunder

  const [showModal, setShowModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [itemToUpdate, setItemToUpdate] = useState(null);
  const [updatedData, setUpdatedData] = useState({});

  const { isAdmin } = useAdmin();

  const {
    data: articles = [],
    isLoading,
    refetch: refetchArticles,
  } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const newsData = await getNewsArticles();
      return newsData.sort((a, b) => b.createdAt - a.createdAt);
    },
    staleTime: oneYearInMs,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const navigate = useNavigate();

  const navigateToNewsDetail = (id) => {
    navigate(`/news-article/${id}`);
  };

  const sanitizedContent = (content) => {
    return DOMPurify.sanitize(content);
  };

  const handleLineBreaks = (content) => {
    return content.replace(/\n/g, "<br>");
  };

  // Kolumner som ska in i tabellen
  const newsColumns = [
    { header: "Titel", key: "title", style: { width: "20%" } },
    {
      header: "Hantera",
      render: (_, item) =>
        item && item.id ? (
          <CrudActions
            id={item}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ) : (
          "-"
        ),
      style: { width: "25%" },
    },
  ];

  const handleDelete = (item) => {
    setItemToDelete(item);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteNewsArticle(itemToDelete.id, itemToDelete.image);
      refetchArticles();
      setShowModal(false);
    } catch (error) {
      console.error("Error deleting article:", error);
      setShowModal(false);
    }
    setItemToDelete(null);
  };

  const handleUpdate = (item) => {
    setItemToUpdate(item);
    setUpdatedData({
      title: item.title || "",
      content: item.content || "",
      image: null, // Inget filobjekt laddas in direkt, användaren laddar upp om det behövs
    });
    setShowModal(true);
  };

  const handleConfirmUpdate = async () => {
    try {
      let imageUrl = updatedData.image;

      // Om det finns en gammal bild och en ny bild ska laddas upp, ta bort den gamla bilden först
      if (updatedData.image instanceof File) {
        // Ta bort den gamla bilden från Firebase Storage om den finns
        if (itemToUpdate && itemToUpdate.image) {
          await deleteImage(itemToUpdate.image);
        }

        // Ladda upp den nya bilden
        imageUrl = await uploadImage(
          "news-images",
          updatedData.image,
          itemToUpdate.item,
        );
      } else {
        imageUrl = itemToUpdate.image; // Behåll den gamla bilden om ingen ny laddas upp
      }

      // Skapa ett objekt att uppdatera
      const updatedItem = {
        ...updatedData,
        image: imageUrl, // Använd den nya eller befintliga bild-URL:en
      };

      // Uppdatera i Firestore
      await updateNewsArticle(itemToUpdate.id, updatedItem);

      refetchArticles(); // Uppdatera listan
      setShowModal(false); // Stäng modalen

      // Återställ filinputen om en ny bild laddades upp
      if (updatedData.image instanceof File) {
        handleResetFileInput(); // Rensa file-inputfältet
      }
    } catch (error) {
      console.error("Error updating article:", error);
      setShowModal(false);
    }
    setItemToUpdate(null);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: value, // Dynamiskt uppdatera rätt fält
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setUpdatedData((prevData) => ({
      ...prevData,
      image: file, // Spara filen i updatedData
    }));
  };

  const handleResetFileInput = () => {
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setItemToDelete(null);
    setItemToUpdate(null);
    handleResetFileInput();
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <div>
      <h1 className="page-title mx-auto">Nyheter</h1>
      <div className="news-container d-flex flex-column align-items-center">
        {isLoading ? (
          <Spinner />
        ) : articles.length > 0 ? (
          articles.map((article) => {
            const createdAtDate = article.createdAt
              ? new Date(article.createdAt.seconds * 1000).toLocaleDateString()
              : "Okänd tid";

            const sanitizedArticleContent = sanitizedContent(article.content);
            const truncatedContent = truncateText(sanitizedArticleContent, 200);
            const contentWithLineBreaks = handleLineBreaks(truncatedContent);

            return (
              <div
                key={article.id}
                className="card custom-article-card"
                onClick={() => navigateToNewsDetail(article.id)}
              >
                <p className="created-at-date">{createdAtDate}</p>
                {article.image && (
                  <img
                    src={article.image}
                    className="article-img"
                    alt="Nyhetsbild"
                    loading="lazy"
                  />
                )}
                <div className="card-body mt-3">
                  <h5 className="card-title mb-3">{article.title}</h5>
                  <p className="content-text">
                    <span
                      className="sanitized-content"
                      dangerouslySetInnerHTML={{
                        __html: contentWithLineBreaks,
                      }}
                    />
                    <span className="text-danger"> ... läs mer</span>
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <p className="fw-bold">Inga nyheter tillgängliga</p>
        )}
      </div>
      {isAdmin && (
        <div className="existing-news-items-table">
          <h4 className="text-center py-4">Alla nyheter</h4>
          <p className="text-center">(Administratörsvy)</p>
          <GenericTable data={articles} columns={newsColumns} />
        </div>
      )}
      <ConfirmModal
        show={showModal}
        message={
          itemToUpdate
            ? "Uppdatera nyhetens information:"
            : "Är du säker på att du vill ta bort denna nyhet?"
        }
        onConfirm={itemToUpdate ? handleConfirmUpdate : handleConfirmDelete}
        onCancel={handleCloseModal}
      >
        {itemToUpdate ? (
          <div>
            <label className="form-label">Titel</label>
            <input
              type="text"
              className="form-control mb-3"
              name="title"
              value={updatedData.title}
              onChange={handleInputChange}
            />
            <label className="form-label">Innehåll</label>
            <textarea
              className="form-control mb-3"
              name="content"
              rows="3"
              value={updatedData.content}
              onChange={handleInputChange}
            ></textarea>
            <label className="form-label">Bild</label>
            <input
              type="file"
              className="form-control mb-3"
              name="image"
              onChange={handleFileChange}
            />
          </div>
        ) : (
          <div style={{ textAlign: "center" }}>
            {itemToDelete && (
              <>
                <p className="fw-bold m-3">{itemToDelete.title}</p>
                {itemToDelete.image ? (
                  <img
                    src={itemToDelete.image}
                    alt="Nyhetsbild"
                    className="img-fluid"
                    width="200"
                    loading="lazy"
                  />
                ) : (
                  <p>Bild saknas</p>
                )}
              </>
            )}
          </div>
        )}
      </ConfirmModal>
    </div>
  );
};

export default News;
