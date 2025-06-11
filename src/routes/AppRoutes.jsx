import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import HomePage from "../pages/HomePage";
import TeachersPage from "../pages/TeachersPage";
import FavoritesPage from "../pages/FavoritesPage";
import NotFoundPage from "../pages/NotFoundPage";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
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
    </Routes>
  );
};

export default AppRoutes;
