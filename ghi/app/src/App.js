import { useEffect, useState, useSyncExternalStore } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./Nav";
import HomePage from "./HomePage";
import Footer from "./Footer";
import About from "./About";
import AllProducts from "./product_pages/AllProducts";
import BodyProducts from "./product_pages/BodyProducts";
import HomeProducts from "./product_pages/HomeProducts";
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
            <Route exact path="/products/:sku"  element={ <ProductDetails />} />
            <Route path="/products//body" element={<BodyProducts />} />
            <Route path="/products//home" element={<HomeProducts />} />
            <Route path="/products/all" element={<AllProducts />} />
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
