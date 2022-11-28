import { createBrowserRouter } from "react-router-dom";
import Login from "../../Authentication/Login/Login";
import Register from "../../Authentication/Register/Register";
import DashboradLayout from "../../Layout/DashboradLayout";
import Main from "../../Layout/Main";
import Blog from "../../Pages/Blog/Blog";
import AddProduct from "../../Pages/Dashboard/SellerDashboard/AddProduct/AddProduct";
import MyOrders from "../../Pages/Dashboard/BuyerDashboard/MyOrders/MyOrders";
import CategoryProducts from "../../Pages/Home/Categories/CategoryProducts";
import Home from "../../Pages/Home/Home/Home";
import ErrorPage from "../../Shared/ErrorPage/ErrorPage";
import BuyerRoute from "../BuyerRoute/BuyerRoute";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import MyProducts from "../../Pages/Dashboard/SellerDashboard/MyProducts/MyProducts";
import SellerRoute from "../SellerRoute.js/SellerRoute";
import AdminRoute from "../AdminRoute/AdminRoute";
import AllBuyers from "../../Pages/Dashboard/AdminDashboard/AllBuyers/AllBuyers";
import AllSellers from "../../Pages/Dashboard/AdminDashboard/AllSellers/AllSellers";
import ReportedItems from "../../Pages/Dashboard/AdminDashboard/ReportedItems/ReportedItems";
import MyBuyers from "../../Pages/Dashboard/SellerDashboard/MyBuyers/MyBuyers";
import Payment from "../../Pages/Dashboard/BuyerDashboard/Payment/Payment";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/category/:id",
        loader: ({ params }) =>
          fetch(`${process.env.REACT_APP_URL}/category/${params.id}`),
        element: (
          <ProtectedRoute>
            <CategoryProducts />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboradLayout />
      </ProtectedRoute>
    ),

    children: [
      {
        path: "/dashboard/myorders",
        element: (
          <BuyerRoute>
            <MyOrders />
          </BuyerRoute>
        ),
      },
      {
        path: "/dashboard/payment/:id",
        loader: ({ params }) =>
          fetch(`${process.env.REACT_APP_URL}/orders/${params.id}`),
        element: (
          <BuyerRoute>
            <Payment />
          </BuyerRoute>
        ),
      },
      {
        path: "/dashboard/addproduct",
        element: (
          <SellerRoute>
            <AddProduct />
          </SellerRoute>
        ),
      },
      {
        path: "/dashboard/myproducts",
        element: (
          <SellerRoute>
            <MyProducts />
          </SellerRoute>
        ),
      },
      {
        path: "/dashboard/mybuyers",
        element: (
          <SellerRoute>
            <MyBuyers />
          </SellerRoute>
        ),
      },
      {
        path: "/dashboard/allsellers",
        element: (
          <AdminRoute>
            <AllSellers />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/allbuyers",
        element: (
          <AdminRoute>
            <AllBuyers />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/reporteditems",
        element: (
          <AdminRoute>
            <ReportedItems />
          </AdminRoute>
        ),
      },
    ],
  },
]);
