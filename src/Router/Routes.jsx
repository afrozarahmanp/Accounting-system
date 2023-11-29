import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Groups from "../Layout/Groups/Groups";
import Navbar from "../Shared/Navbar/Navbar";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar></Navbar>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/groupEntry",
        element: <Groups></Groups>
      },
    ],
  },
]);
