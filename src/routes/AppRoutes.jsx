// src/routes/AppRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout/Layout"; // Ana sayfa düzeni
import HomePage from "../pages/HomePage";
import TeachersPage from "../pages/TeachersPage";
import FavoritesPage from "../pages/FavoritesPage";
import NotFoundPage from "../pages/NotFoundPage";
import ProtectedRoute from "./ProtectedRoute"; // Korumalı rota bileşenimiz

const AppRoutes = () => {
  return (
    <Routes>
      {/* Layout içindeki sayfalar */}
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="teachers" element={<TeachersPage />} />
        <Route
          path="favorites"
          element={
            <ProtectedRoute>
              <FavoritesPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      {/* Layout dışında kalacak özel sayfalar (varsa) */}
    </Routes>
  );
};

export default AppRoutes;
