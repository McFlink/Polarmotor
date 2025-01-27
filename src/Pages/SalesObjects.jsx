import { useState, useEffect } from "react";
import "./SalesObjects.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { getSaleItems } from "../Services/saleService";
import GenericTable from "../Components/GenericTable";
import CrudActions from "../Components/CrudActions";
import { deleteSaleItem } from "../Services/saleService";
import ConfirmModal from "../Components/ConfirmModal";

const SalesObjects = () => {
  const [sales, setSales] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

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
    console.log("Item to delete: ", itemToDelete);
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

  const handleUpdate = async (id) => {};

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
      render: (value) => <img src={value} alt="Produktbild" width="100" />,
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
      <h1 className="page-title">Till salu</h1>
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
          <p>Laddar...</p>
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
        message="Är du säker på att du vill ta bort denna produkt?"
        onConfirm={handleConfirmDelete}
        onCancel={() => setShowModal(false)}
      />
    </div>
  );
};

export default SalesObjects;
