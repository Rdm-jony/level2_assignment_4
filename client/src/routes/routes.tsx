import Main from "@/layout/Main";
import { AddBook } from "@/pages/AddBook";
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
        }
    ]
  },
]);