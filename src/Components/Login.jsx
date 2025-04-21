import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

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
        password
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
    <div>
      <h2>Logga in som Admin</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-post"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Lösenord"
          required
        />
        <button type="submit">Logga in</button>
      </form>
    </div>
  );
};

export default Login;
