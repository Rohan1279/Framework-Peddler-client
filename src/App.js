import logo from "./logo.svg";
import "./App.css";
import AuthProvider from "./contexts/AuthProvider";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes/Routes";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="App max-w-7xl mx-auto">
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster />
      </AuthProvider>
    </div>
  );
}

export default App;
