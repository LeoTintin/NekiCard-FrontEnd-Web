import { useNavigate } from "react-router-dom";
import { HomeContainer, PerfilList,HomeButton,PerfilTitle } from "./styles";
import PerfilCard from "../../Components/PerfilCard";

export default function Home() {
  const navigate = useNavigate();

  return (
    <HomeContainer>
      <PerfilTitle>Perfis</PerfilTitle>
      <PerfilList>
        <PerfilCard />
      </PerfilList>
      <HomeButton onClick={() => navigate("/register")}>Novo Perfil</HomeButton>
    </HomeContainer>
  );
}
