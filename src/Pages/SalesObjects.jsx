import { useState, useEffect } from "react";
import "./SalesObjects.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { getSaleItems } from "../Services/saleService";
import GenericTable from "../Components/GenericTable";
import CrudActions from "../Components/CrudActions";
import { deleteSaleItem } from "../Services/saleService";

const SalesObjects = () => {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const fetchSales = async () => {
      const salesData = await getSaleItems();
      const sortedSales = salesData.sort((a, b) => b.createdAt - a.createdAt);
      setSales(sortedSales);
      console.log("Sales data: ", sortedSales);
    };

    fetchSales();
  }, []);

  const handleDelete = async (id) => {
    const answer = window.confirm("Radera?");
    if (!answer) return;
    console.log("Delete sales object with id: ", id);
    try {
      await deleteSaleItem(id);
      setSales(sales.filter((sale) => sale.id !== id));
      console.log("Sale deleted: ", id);
    } catch (error) {
      console.error("Error deleting sale:", error);
    }
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
            id={item.id}
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
    </div>
  );
};

export default SalesObjects;
