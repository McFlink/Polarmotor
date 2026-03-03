import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useAdmin } from "../Context/AdminContext";
import { getAboutInfo, updateAboutInfo } from "../Services/aboutService";
import "./About.css";

const About = () => {
  const { isAdmin } = useAdmin();
  const [aboutText, setAboutText] = useState("");
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadAbout = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getAboutInfo();
        console.log("Loaded about data:", data);
        const safeText = data?.aboutus || "";
        setAboutText(safeText);
        setDraft(safeText);
      } catch (err) {
        console.error("Kunde inte ladda Om oss", err);
        setError("Kunde inte ladda informationen just nu.");
      } finally {
        setLoading(false);
      }
    };

    loadAbout();
  }, []);

  const handleEdit = () => {
    setDraft(aboutText);
    setEditMode(true);
    setSaveStatus("");
  };

  const handleCancel = () => {
    setDraft(aboutText);
    setEditMode(false);
    setSaveStatus("");
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    setSaveStatus("");
    try {
      await updateAboutInfo(draft);
      setAboutText(draft);
      setEditMode(false);
      setSaveStatus("Sparat!");
    } catch (err) {
      console.error("Kunde inte spara Om oss", err);
      setError("Kunde inte spara ändringar.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="about-container">
      <h1 className="mt-3 mb-3">Om Polarmotor</h1>
      {isAdmin && !editMode && (
        <Button
          size="sm"
          variant="outline-light"
          className="mb-4"
          onClick={handleEdit}
        >
          Redigera
        </Button>
      )}
      {saveStatus && (
        <div className="text-success small mt-1">{saveStatus}</div>
      )}
      {error && <div className="text-danger small mt-1">{error}</div>}

      <div className="about-card card-surface">
        {loading ? (
          <p>Laddar...</p>
        ) : editMode ? (
          <textarea
            className="about-textarea"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
          />
        ) : (
          <p className="about-text">{aboutText}</p>
        )}
      </div>

      {isAdmin && editMode && (
        <div className="d-flex gap-2 mt-2">
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

export default About;
