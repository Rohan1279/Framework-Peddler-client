import { createBrowserRouter } from "react-router-dom";
import Login from "../../Authentication/Login/Login";
import Register from "../../Authentication/Register/Register";
import Main from "../../Layout/Main";
import Blog from "../../Pages/Blog/Blog";
import CategoryProducts from "../../Pages/Home/Categories/CategoryProducts";
import Home from "../../Pages/Home/Home/Home";
import ErrorPage from "../../Shared/ErrorPage/ErrorPage";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";

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
]);
