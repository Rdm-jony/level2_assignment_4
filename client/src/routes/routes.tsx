import Main from "@/layout/Main";
import { AddBook } from "@/pages/AddBook";
import AllBook from "@/pages/AllBook";
import Home from "@/pages/Home";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main/>,
    children:[
        {
            path:"",
            element:<Home/>
        },
        {
            path:"/addBook",
            element:<AddBook/>
        },
        {
          path:"/allBook",
          element:<AllBook/>
        }
    ]
  },
]);