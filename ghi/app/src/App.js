import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./Nav";
import HomePage from "./HomePage";
import Footer from "./Footer";
import About from "./About";
import AccountPage from "./AccountPage";
import ProductList from "./product_pages/ProductList";
import ProductDetails from "./product_pages/ProductDetail";
import Login from "./Login";
import SignUp from "./SignUp";
import EditAccount from "./EditAccount";
import BodyQuiz from "./quizzes/BodyQuiz";
import HomeQuiz from "./quizzes/HomeQuiz";
import Cart from "./Cart/Cart";
import Checkout from "./Cart/Checkout";
import { AuthProvider } from "./authApi";
import InventoryList from "./employee_pages/Inventory";
import NewProductForm from "./employee_pages/NewProductForm";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
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
            <Route path="/employees">
              <Route path="/employees/inventory" element={<InventoryList />} />
              <Route
                path="/employees/newproduct"
                element={<NewProductForm />}
              />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/account/edit" element={<EditAccount />} />
            <Route path="/bodyquiz" element={<BodyQuiz />} />
            <Route path="/homequiz" element={<HomeQuiz />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
          <Footer />
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;

