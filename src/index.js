import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import About from "./pages/About";
import BlogDetails from "./pages/BlogDetails";
import Blogs from "./pages/Blogs";
import ProductDetails from "./pages/ProductDetails";
import Dashborad from "./pages/Dashborad";
import UploadBook from "./pages/UploadBook";
import DashboardPage from "./pages/DashboardPage";
import ManageOrders from "./pages/ManageOrders";
import { Signin } from "./components/Signin";
import SignUp from "./components/Signup";
import ManageBlogs from "./pages/ManageBlogs";
import { LoginConextProvider } from "./contexts/LogInContext";
import { LoadingProvider } from "./contexts/LoadingContext";
import { Provider } from "react-redux";
import { store } from "./store/slices/main";
import Checkout from "./pages/Checkout";
import MyAccount from "./pages/MyAccount";
import OrderAccount from "./AccountPages/OrderAccount";
import PaymentAccount from "./AccountPages/PaymentAccount";
import AddressAccount from "./AccountPages/AddressAccount";
import AccountDetails from "./AccountPages/AccountDetails";
import BestSellingForm from "./pages/BestSellingForm";
import EBookSaveForm from "./pages/EBookSaveForm";
import ManageEbook from "./pages/ManageEbook";
import EBookPage from "./pages/EBookPage";
import AreYouSure from "./modals/AreYouSure";
import ProductContextProvider from "./contexts/ProductsContext";
import ProtectedRoute from "./pages/ProtectedRoute";
import Orders from "./pages/Orders";
import BooksCategories from "./components/BooksCategories";
import BlogsContextProvider from "./contexts/blogs.context";
import { EBooksDetailsPageComponent } from "./pages/eBookDetailsPage";
import { GoogleOAuthProvider } from "@react-oauth/google";
import VerifyEmail from "./components/VerifyEmail";
import NotFoundPage from "./pages/NotFoundPage ";

const root = createRoot(document.getElementById("root"));
console.log("Client ID:", process.env.REACT_APP_CLIENT_ID);

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
        <Provider store={store}>
          <LoadingProvider>
            <LoginConextProvider>
              <ProductContextProvider>
                <BlogsContextProvider>
                  <App />
                </BlogsContextProvider>
              </ProductContextProvider>
            </LoginConextProvider>
          </LoadingProvider>
        </Provider>
      </GoogleOAuthProvider>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/ebook",
        element: <EBookPage />,
      },
      {
        path: "/ebookdetail/:id",
        element: <EBooksDetailsPageComponent />,
      },
      {
        path: "/blogDetails",
        element: <BlogDetails />,
      },
      {
        path: "/blogs",
        element: <Blogs />,
      },
      {
        path: "/blogs/:id",
        element: <BlogDetails />,
      },
      {
        path: "/productDetails/:id",
        element: <ProductDetails />,
      },
      {
        path: "/signin",
        element: <Signin />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/verify-email/:token",
        element: <VerifyEmail />,
      },

      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/category",
        element: <BooksCategories />,
      },
      {
        path: "/myaccount",
        element: <MyAccount />,
        children: [
          {
            path: "orders",
            element: <OrderAccount />,
          },
          {
            path: "payment",
            element: <PaymentAccount />,
          },
          {
            path: "address",
            element: <AddressAccount />,
          },
          {
            path: "accountdetails",
            element: <AccountDetails />,
          },
        ],
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <LoadingProvider>
        <LoginConextProvider>
          <ProtectedRoute>
            <Dashborad />
          </ProtectedRoute>
        </LoginConextProvider>
      </LoadingProvider>
    ),
    children: [
      {
        path: "dashboardPage",
        element: <DashboardPage />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "upload",
        element: <UploadBook />,
      },
      {
        path: "manage",
        element: <ManageOrders />,
      },
      {
        path: "ebook",
        element: <EBookSaveForm />,
      },
      {
        path: "manageEbook",
        element: <ManageEbook />,
      },
      {
        path: "blogManage",
        element: <ManageBlogs />,
      },
      {
        path: "bestselling",
        element: <BestSellingForm />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

root.render(<RouterProvider router={appRouter} />);
