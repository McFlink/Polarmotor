import React from "react";
import { Table } from "react-bootstrap";
import "./GenericTable.css";

const GenericTable = ({ data, columns }) => {
  return (
    <Table striped bordered hover className="table-dark w-50 mx-auto mb-5">
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index} style={column.style}>
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id} className="table-row">
            {columns.map((column, colIndex) => (
              <td
                key={colIndex}
                style={column.style}
                className={column.centerContent ? "centeredCell" : ""}
              >
                {column.render
                  ? column.render(item[column.key], item)
                  : item[column.key] || "-"}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default GenericTable;
