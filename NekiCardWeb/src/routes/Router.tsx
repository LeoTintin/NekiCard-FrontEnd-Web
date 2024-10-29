import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../Pages/Login";
import Perfil from "../Pages/Perfil";
import Register from "../Pages/Register";
import PerfilPublic from "../Pages/PerfilPublic";
import { useAuth } from "../hooks/useAuth";

export const Router = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/perfil"
        element={
          isAuthenticated ? <Perfil /> : <Navigate to="/login" replace />
        }
      />
      <Route
        path="/register"
        element={
          isAuthenticated ? <Register /> : <Navigate to="/login" replace />
        }
      />
      <Route path="/perfil/:id" element={<PerfilPublic />} />
    </Routes>
  );
};
