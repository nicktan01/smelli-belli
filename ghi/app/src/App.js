import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./Nav";
import HomePage from "./HomePage";
import About from "./About";
import AllProducts from "./product_pages/AllProducts";
import BodyProducts from "./product_pages/BodyProducts";
import HomeProducts from "./product_pages/HomeProducts";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/shopall" element={<AllProducts/>} />
        <Route path="/body" element={<BodyProducts />} />
        <Route path="/home" element={<HomeProducts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
