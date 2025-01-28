import "./App.css";
import Navbar from "./Components/Navbar.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import About from "./Pages/About.jsx";
import Contact from "./Pages/Contact.jsx";
import Gallery from "./Pages/Gallery.jsx";
import FindUs from "./Pages/FindUs.jsx";
import Sale from "./Pages/Sale.jsx";
import News from "./Pages/News.jsx";
import SalesObjects from "./Pages/SalesObjects.jsx";
import Purchase from "./Pages/Purchase.jsx";
import PurchaseObjects from "./Pages/PurchaseObjects.jsx";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/findus" element={<FindUs />} />
          <Route path="/sale" element={<Sale />} />
          <Route path="/purchase" element={<Purchase />} />
          <Route path="/news" element={<News />} />
          <Route path="/salesobjects" element={<SalesObjects />} />
          <Route path="/purchaseobjects" element={<PurchaseObjects />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
