import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HomeContainer, PerfilList, HomeButton, PerfilTitle } from "./styles";
import PerfilCard from "../../Components/PerfilCard";
import { api } from "../../service/api"; 

export default function Home() {
  const navigate = useNavigate();
  const [perfis, setPerfis] = useState([]);

  useEffect(() => {
    async function fetchPerfis() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token não encontrado.");
          return;
        }
  
        const response = await api.get('/perfil', {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        console.log(response.data);
        setPerfis(response.data);
      } catch (error) {
        console.error("Erro ao buscar perfis:", error);
      }
    }
  
    fetchPerfis();
  }, []);

  return (
    <HomeContainer>
      <PerfilTitle>Perfis</PerfilTitle>
      <PerfilList>
        {perfis.map((perfil) => (
          <PerfilCard key={perfil.id} perfil={perfil} />
        ))}
      </PerfilList>
      <HomeButton onClick={() => navigate("/register")}>Novo Perfil</HomeButton>
    </HomeContainer>
  );
}
