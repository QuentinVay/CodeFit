import React from "react";
import "../reset.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import ReactDOM from "react-dom/client";
import RootLayout from "./RootLayout";
import Homepage from "./pages/homepage/homepage";
import Login, { authenticate } from "./pages/login/login";
import Profil from "./pages/profil/profil";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Homepage />} />
      <Route path="/login" element={<Login />} action={authenticate} />
      <Route path="/profil" element={<Profil />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={router} />);
