import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import Error from "./pages/Error";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Library from "./pages/Library";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminHome from "./pages/admin/AdminHome";

if (!process.env.REACT_APP_API_URL) {
  console.log("Похоже не используется .env");
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
  },
  {
    path: "library",
    element: <Library />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "admin",
    element: <AdminLogin />,
  },
  {
    path: "admin/home",
    element: <AdminHome />,
  },
]);

function App() {
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
