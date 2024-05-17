import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import { RegisterPage } from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";
import { HomePage } from "./pages/HomePage";
import { Navbar } from "./components/Navbar";
import { MainLayout } from "./components/MainLayout";

const router = createBrowserRouter([
  
  {
    element: <MainLayout/>,
    loader: () => {
      if (!localStorage.access_token) {
        return redirect("/login");
      }
      return null;
    },
    children: [
      {
        path: "/",
        element: <HomePage/>
      }
    ]
  },
  {
    path: "/register",
    element: <RegisterPage/>,
    loader: () => {
      if (localStorage.access_token) {
        return redirect("/");
      }
      return null;
    },
  },
  {
    path: "/login",
    element: <LoginPage/>,
    loader: () => {
      if (localStorage.access_token) {
        return redirect("/");
      }
      return null;
    },
  },
]);

function App() {
  return <RouterProvider router={router} />
}

export default App
