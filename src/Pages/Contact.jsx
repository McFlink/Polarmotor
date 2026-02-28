import "./Contact.css";
import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { useAdmin } from "../Context/AdminContext";
import { getContactInfo, updateContactInfo } from "../Services/contactService";

const Contact = () => {
  const { isAdmin } = useAdmin();
  const [contact, setContact] = useState({
    owner: "",
    address: "",
    phonenumber: "",
    email: "",
  });
  const [draft, setDraft] = useState(contact);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadContact = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getContactInfo();
        console.log("Loaded contact data:", data);
        const safeData = {
          owner: data?.owner || "",
          address: data?.address || "",
          phonenumber: data?.phonenumber || "",
          email: data?.email || "",
        };
        setContact(safeData);
        setDraft(safeData);
      } catch (err) {
        console.error("Failed to load contact info", err);
        setError("Kunde inte ladda kontaktuppgifter.");
      } finally {
        setLoading(false);
        console.log("Finished loading contact data: ", contact);
      }
    };

    loadContact();
  }, []);

  const handleEdit = () => {
    setDraft(contact);
    setEditMode(true);
    setSaveStatus("");
  };

  const handleCancel = () => {
    setDraft(contact);
    setEditMode(false);
    setSaveStatus("");
  };

  const handleChange = (field, value) => {
    setDraft((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    setSaveStatus("");
    try {
      await updateContactInfo(draft);
      setContact(draft);
      setEditMode(false);
      setSaveStatus("Sparat!");
    } catch (err) {
      console.error("Failed to save contact info", err);
      setError("Kunde inte spara ändringar.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="contact-container">
      <h1 className="mt-3">Kontakt</h1>
      {isAdmin && !editMode && (
        <Button size="sm" variant="outline-light" onClick={handleEdit}>
          Redigera
        </Button>
      )}
      {saveStatus && (
        <div className="text-success small mt-1">{saveStatus}</div>
      )}
      {error && <div className="text-danger small mt-1">{error}</div>}
      <div className="contact-content">
        {loading ? (
          <p>Laddar...</p>
        ) : (
          <Table striped bordered hover className="mt-4 contact-table">
            <tbody>
              <tr>
                <td>Ägare</td>
                <td>
                  {editMode ? (
                    <input
                      className="form-control"
                      value={draft.owner}
                      onChange={(e) => handleChange("owner", e.target.value)}
                    />
                  ) : (
                    contact.owner
                  )}
                </td>
              </tr>
              <tr>
                <td>Adress</td>
                <td>
                  {editMode ? (
                    <input
                      className="form-control"
                      value={draft.address}
                      onChange={(e) => handleChange("address", e.target.value)}
                    />
                  ) : (
                    contact.address
                  )}
                </td>
              </tr>
              <tr>
                <td>Mobil</td>
                <td>
                  {editMode ? (
                    <input
                      className="form-control"
                      type="tel"
                      value={draft.phonenumber}
                      onChange={(e) =>
                        handleChange("phonenumber", e.target.value)
                      }
                    />
                  ) : (
                    contact.phonenumber
                  )}
                </td>
              </tr>
              <tr>
                <td>Email</td>
                <td>
                  {editMode ? (
                    <input
                      className="form-control"
                      type="email"
                      value={draft.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                    />
                  ) : (
                    <a href={`mailto:${contact.email}`}>{contact.email}</a>
                  )}
                </td>
              </tr>
            </tbody>
          </Table>
        )}
      </div>
      {isAdmin && editMode && (
        <div className="d-flex gap-2">
          <Button
            variant="outline-light"
            onClick={handleCancel}
            disabled={saving}
          >
            Avbryt
          </Button>
          <Button variant="primary" onClick={handleSave} disabled={saving}>
            {saving ? "Sparar..." : "Spara"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Contact;
