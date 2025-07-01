import Main from "@/layout/Main";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main/>,
  },
]);