import React from "react";
import "../reset.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import ReactDOM from "react-dom/client";
// import Login, { authenticate } from "./pages/Login/Loginpage";
import RootLayout from "./RootLayout";
// import App from "./App";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      {/* <Route path="home" element={<CardsList />} />
      <Route path="profil" element={<Profiluser />} />
      <Route path="login" element={<Login />} action={authenticate} /> */}
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={router} />);
