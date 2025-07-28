import { Route, Routes } from "react-router-dom";
import Home from "./_pages/Home";
import Login from "./_pages/_auth/Login";
import ProtectedRoute from "./layouts/ProtectedRoute";
import Admin from "./_pages/_admin/Admin";
import Signup from "./_pages/_auth/Signup";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import AdminLayout from "./layouts/AdminLayout";
import Categories from "./_pages/_admin/category/Categories";
import CategoryCreate from "./_pages/_admin/category/create";
import CategoryEdit from "./_pages/_admin/category/edit";
import AdminProduct from "./_pages/_admin/product";
import CreateProduct from "./_pages/_admin/product/CreateProduct";
import StoreLayout from "./layouts/StoreLayout";
import Products from "./_pages/Products";
import Cart from "./_pages/_protected/Cart";
import ProductDetail from "./_pages/ProductDetail";
import Order from "./_pages/_protected/Order";
import Payment from "./_pages/_protected/Payment";

function App() {
  return (
    <Routes>
      {/* main layout include session guard */}
      <Route element={<MainLayout />}>
        <Route element={<AuthLayout />}>
          <Route element={<Login />} path="/login" />
          <Route element={<Signup />} path="/signup" />
        </Route>

        {/* Store */}
        <Route element={<StoreLayout />}>
          <Route element={<Home />} index />
          <Route element={<Products />} path="/products/:parent" />
          <Route element={<ProductDetail />} path="/product/:id" />
          <Route element={<ProtectedRoute />}>
            <Route element={<Cart />} path="/cart" />
            <Route element={<Order />} path="/order/:id" />
            <Route element={<Payment />} path="/payment/:id" />
          </Route>
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />} path="/admin/*">
            <Route element={<Admin />} index />
            {/* products */}
            <Route element={<AdminProduct />} path="products" />
            <Route element={<CreateProduct />} path="products/create" />

            {/* category routes  */}
            <Route element={<Categories />} path="categories" />
            <Route element={<CategoryCreate />} path="categories/create" />
            <Route element={<CategoryEdit />} path="categories/edit/:id" />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
