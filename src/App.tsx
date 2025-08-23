
import "./scss/app.scss";

import Home from "./components/pages/Home";
import Cart from "./components/pages/Cart";
import Notfound from "./components/pages/Notfound";
import Fullpizza from "./components/Fullpizza";

import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/layouts/MainLayout";

function App() {
  return (
    <Routes>
      <Route path = '/' element = {<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="/pizza/:id" element={<Fullpizza />} />
        <Route path="*" element={<Notfound />} />
      </Route>
    </Routes>
  );
}

export default App;
