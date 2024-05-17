import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import { RegisterPage } from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
      
      </>
    )
  },
  {
    path: "/register",
    element: <RegisterPage/>
  },
  {
    path: "/login",
    element: <LoginPage/>
  },
]);

function App() {
  return <RouterProvider router={router} />
}

export default App
