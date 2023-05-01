import { createBrowserRouter, redirect } from "react-router-dom";
import BaseLayout from "../layouts/BaseLayout";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import BookListPage from "../pages/BookListPage";
import ReadingPage from "../pages/ReadingPage";

const router = createBrowserRouter([
  {
    loader: () => {
      if (localStorage.access_token) {
        return redirect("/");
      }

      return null;
    },
    path: "/login",
    element: <LoginPage />,
  },
  {
    loader: () => {
      if (!localStorage.access_token) {
        return redirect("/login");
      }

      return null;
    },
    element: <BaseLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/book-lists",
        element: <BookListPage />,
      },
      {
        path: "/read-books",
        element: <ReadingPage />,
      },
    ],
  },
]);

export default router;
