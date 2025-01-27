import { useState, useEffect } from "react";
import "./SalesObjects.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { getSaleItems } from "../Services/saleService";
import GenericTable from "../Components/GenericTable";
import CrudActions from "../Components/CrudActions";
import { deleteSaleItem, updateSaleItem } from "../Services/saleService";
import ConfirmModal from "../Components/ConfirmModal";
import { uploadImage, deleteImage } from "../Services/firestoreService";

const SalesObjects = () => {
  const [sales, setSales] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [itemToUpdate, setItemToUpdate] = useState(null);
  const [updatedData, setUpdatedData] = useState({});

  const fetchSales = async () => {
    const salesData = await getSaleItems();
    const sortedSales = salesData.sort((a, b) => b.createdAt - a.createdAt);
    setSales(sortedSales);
  };

  useEffect(() => {
    fetchSales();
  }, []);

  const handleDelete = (item) => {
    setItemToDelete(item);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteSaleItem(itemToDelete.id, itemToDelete.image);
      fetchSales();
      setShowModal(false);
    } catch (error) {
      console.error("Error deleting sale:", error);
      setShowModal(false);
    }
    setItemToDelete(null);
  };

  const handleUpdate = (item) => {
    setItemToUpdate(item);
    setUpdatedData({
      description: item.description || "",
      image: null, // Inget filobjekt laddas in direkt, användaren laddar upp om det behövs
      item: item.item || "",
      price: item.price || "",
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
          "sales-images",
          updatedData.image,
          itemToUpdate.item
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
      await updateSaleItem(itemToUpdate.id, updatedItem);

      fetchSales(); // Uppdatera listan
      setShowModal(false); // Stäng modalen

      // Återställ filinputen om en ny bild laddades upp
      if (updatedData.image instanceof File) {
        handleResetFileInput(); // Rensa file-inputfältet
      }
    } catch (error) {
      console.error("Error updating sale:", error);
      setShowModal(false);
    }
    setItemToUpdate(null);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target; // Hämta fältets namn och värde
    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: value, // Uppdatera rätt egenskap dynamiskt
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Hämta den valda filen
    setUpdatedData((prevData) => ({
      ...prevData,
      image: file, // Spara filen i updatedData
    }));
  };

  const handleResetFileInput = () => {
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) {
      fileInput.value = ""; // Återställ till tomt
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

  // Ange kolumner som ska in i tabellen
  const salesColumns = [
    { header: "Produkt", key: "item", style: { width: "20%" } },
    {
      header: "Pris",
      key: "price",
      render: (value) => `${value} SEK`,
      style: { width: "15%" },
    },
    {
      header: "Bild",
      key: "image",
      centerContent: true,
      render: (value) =>
        value ? (
          <img src={value} alt="Produktbild" width="100" />
        ) : (
          <p>Bild saknas</p>
        ),
      style: { width: "15%" },
    },
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

  return (
    <div className="sales-objects-container">
      <h1 className="page-title mx-auto">Till salu</h1>
      <div className="object-cards-container">
        {sales.length > 0 ? (
          sales.map((sale) => (
            <div key={sale.id} className="card custom-sales-object-card">
              <img
                src={sale.image || "https://via.placeholder.com/300"}
                className="card-img-top img-fluid custom-card-image"
                alt={sale.item}
              />
              <h5 className="card-title text-center mt-3 fw-bold">
                {sale.item}
              </h5>
              <div className="card-body">
                {truncateText(sale.description, 130)}
              </div>
            </div>
          ))
        ) : (
          <p className="fw-bold">Inga säljannonser tillgängliga</p>
        )}
      </div>
      {/* If (admin är inloggad && ....) */}
      <div className="existing-sale-items-table">
        <h4 className="text-center py-4">Alla produkter till salu</h4>
        <p className="text-center">(Administratörsvy)</p>
        <GenericTable data={sales} columns={salesColumns} />
      </div>
      <ConfirmModal
        show={showModal}
        message={
          itemToUpdate
            ? "Uppdatera produktens information:"
            : "Är du säker på att du vill ta bort denna produkt?"
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
              name="item"
              value={updatedData.item}
              onChange={handleInputChange}
            />

            <label className="form-label">Beskrivning</label>
            <textarea
              className="form-control mb-3"
              name="description"
              rows="3"
              value={updatedData.description}
              onChange={handleInputChange}
            ></textarea>

            <label className="form-label">Pris</label>
            <input
              type="number"
              className="form-control mb-3"
              name="price"
              value={updatedData.price}
              onChange={handleInputChange}
            />

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
                <p className="fw-bold m-3">{itemToDelete.item}</p>
                {itemToDelete.image ? (
                  <img
                    src={itemToDelete.image}
                    alt="Produktbild"
                    className="img-fluid"
                    width="200"
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

export default SalesObjects;
