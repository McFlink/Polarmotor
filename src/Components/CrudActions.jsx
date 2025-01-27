import React from "react";

const CrudActions = ({ id, onUpdate, onDelete }) => (
  <div className="d-flex justify-content-center">
    <button
      className="btn btn-warning btn-sm me-4"
      onClick={() => onUpdate(id)}
    >
      Ändra
    </button>
    <button className="btn btn-danger btn-sm" onClick={() => onDelete(id)}>
      Radera
    </button>
  </div>
);

export default CrudActions;
