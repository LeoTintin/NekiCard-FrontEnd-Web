import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../service/api";
import {
  PerfilPublicContainer,
  PerfilPublicContent,
  PerfilPublicHeader,
  PerfilBackButton,
} from "./styles";
import { ArrowLeft } from "phosphor-react";
import PerfilCard from "../../Components/PerfilCard";
import Tittle from "../../Components/Tittle";

export default function PerfilPublic() {
  const { id } = useParams();
  const [specificPerfil, setSpecificPerfil] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPerfil() {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get(`/perfil/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSpecificPerfil(response.data);
      } catch (error) {
        console.error("Erro ao buscar perfil:", error);
      }
    }

    fetchPerfil();
  }, [id]);

  if (!specificPerfil) {
    return (
      <p
        style={{
          textAlign: "center",
          color: "#ea8720",
          fontWeight: "bold",
          fontSize: "1.6rem",
          marginTop: 170,
        }}
      >
        Perfil não encontrado...
      </p>
    );
  }

  const handleBackButtonClick = () => {
    navigate("/perfil");
  };

  return (
    <PerfilPublicContainer>
      <PerfilPublicHeader>
        <Tittle>Perfil: {specificPerfil.nome} </Tittle>
        <PerfilBackButton onClick={handleBackButtonClick}>
          <ArrowLeft size={32} />
        </PerfilBackButton>
      </PerfilPublicHeader>
      <PerfilPublicContent>
        <PerfilCard perfil={specificPerfil} />
      </PerfilPublicContent>
    </PerfilPublicContainer>
  );
}
