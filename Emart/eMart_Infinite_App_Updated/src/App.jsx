import { Routes, Route, Navigate } from "react-router-dom";
import AppShell from "./components/layout/AppShell";
import Home from "./pages/Home/Home";
import ServicePage from "./pages/ServicePage";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Compare from "./pages/Compare/Compare";
import AuthPage from "./pages/Auth/AuthPage";
import AccountPage from "./pages/Account/AccountPage";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route path="/auth/:mode" element={<AuthPage />} />
      <Route element={<AppShell />}>
        <Route path="/" element={<Home />} />
        <Route path="/service/:slug" element={<ServicePage />} />
        <Route path="/compare/:category?" element={<Compare />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/product" element={<Navigate to="/service/shopping" replace />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
