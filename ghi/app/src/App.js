import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./Nav";
import HomePage from "./HomePage";
import Footer from "./Footer";
import About from "./About";
import ProductList from "./product_pages/ProductList";
import ProductDetails from "./product_pages/ProductDetail";
import Login from "./Login";
import SignUp from "./SignUp";

function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/products">
            <Route exact path="/products/:sku" element={<ProductDetails />} />
            <Route
              path="/products/body"
              element={<ProductList category="Body" />}
            />
            <Route
              path="/products/home"
              element={<ProductList category="Home" />}
            />
            <Route path="/products/all" element={<ProductList />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
