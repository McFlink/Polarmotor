import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = ({ setAdmin, closeModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );

      if (userCredential.user.email === "mail@polarmotor.se") {
        setAdmin(true);
        closeModal();
        navigate("/");
      } else {
        setError("Du är inte admin.");
      }
    } catch (err) {
      console.log("Error while logging in:", err);
      setError(err.message);
    }
  };

  return (
    <div className="login-form">
      {error && <p className="login-error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-post"
          required
          className="login-input mb-2"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Lösenord"
          required
          className="login-input mb-2"
        />
        <button type="submit" className="btn btn-primary login-submit mt-2">
          Logga in
        </button>
      </form>
    </div>
  );
};

export default Login;
