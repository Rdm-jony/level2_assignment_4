import Main from "@/layout/Main";
import { BookForm } from "@/pages/BookForm";
import AllBook from "@/pages/AllBook";
import Home from "@/pages/Home";
import { createBrowserRouter } from "react-router";
import Summery from "@/pages/Summery";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "/addBook",
        element: <BookForm />
      },
      {
        path: "/allBook",
        element: <AllBook />
      },
      {
        path: "/summery",
        element: <Summery />
      }
    ]
  },
]);