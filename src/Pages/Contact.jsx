import "./Contact.css";
import React from "react";
import { Table } from "react-bootstrap";
import mcImage from "../tempimages/mc.jfif";

const Contact = () => {
  return (
    <div className="contact-container">
      <h1 className="mt-3">Kontakt</h1>
      <div>
        <Table striped bordered hover className="mt-4 contact-table">
          <tbody>
            <tr>
              <td>Ägare</td>
              <td>Kenneth Forsberg</td>
            </tr>
            <tr>
              <td>Adress</td>
              <td>Polarvägen 7, 136 49 Haninge</td>
            </tr>
            <tr>
              <td>Tele</td>
              <td>08-745 26 55</td>
            </tr>
            <tr>
              <td>Mobil</td>
              <td>070-644 39 88</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>
                <a href="mailto:kenneth@example.com">mail@polarmotor.se</a>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
      <div className="image-div">
        <img
          src={mcImage}
          alt="motorcycle"
          className="img-fluid"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default Contact;
