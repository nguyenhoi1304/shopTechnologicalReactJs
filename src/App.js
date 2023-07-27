import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/Root";
import HomePage from "./pages/Home";
import ShopPage from "./pages/Shop";
import DetailPage from "./pages/Detail";
import CartPage from "./pages/Cart";
import CheckoutPage from "./pages/Checkout";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { index: true, element: <HomePage /> },
        {
          path: "detail",
          element: <DetailPage />,
          children: [{ path: ":productId", element: <DetailPage /> }],
        },
        { path: "shop", element: <ShopPage /> },
        { path: "cart", element: <CartPage /> },
        { path: "checkout", element: <CheckoutPage /> },
      ],
    },
    { path: "login", element: <LoginPage /> },
    { path: "register", element: <RegisterPage /> },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
