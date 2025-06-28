import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Menuu from "./pages/Menuu"; // Be sure this matches your export
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            fontSize: "0.875rem",
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menuu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </>
  );
}

export default App;
