import { createBrowserRouter, redirect } from "react-router-dom";
import { MainLayout } from "../components/MainLayout";
import { HomePage } from "../pages/HomePage";
import { FavouritePage } from "../pages/FavouritePage";
import { UpdateForm } from "../components/UpdateForm";
import { RegisterPage } from "../pages/RegisterPage";
import { LoginPage } from "../pages/LoginPage";

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
        },
        {
          path: "/favourites",
          element: <FavouritePage/>      
        },
        {
          path: "/update/:bookId",
          element: <UpdateForm/>      
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

  export default router;