import { createBrowserRouter } from "react-router-dom";
import Login from "../../Authentication/Login/Login";
import Register from "../../Authentication/Register/Register";
import Main from "../../Layout/Main";
import Home from "../../Pages/Home/Home/Home";
import ErrorPage from "../../Shared/ErrorPage/ErrorPage";

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
    ],
  },
]);
