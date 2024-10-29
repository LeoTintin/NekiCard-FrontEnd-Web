import { Route, Routes } from "react-router-dom";
import Login from "../Pages/Login";
import Perfil from "../Pages/Perfil";
import Register from "../Pages/Register";
import PerfilPublic from "../Pages/PerfilPublic";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/perfil" element={<Perfil />} />
      <Route path="/register" element={<Register />} />
      <Route path="/perfil/:id" element={<PerfilPublic />} />
    </Routes>
  );
};
