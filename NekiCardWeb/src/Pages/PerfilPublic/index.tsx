import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../service/api";
import {
  PerfilPublicContainer,
  PerfilName,
  PerfilEmail,
  PerfilSocialName,
  DataNascimento,
  TelephoneNumber,
  RedeSocial,
  PublicPerfilTitle,
  PerfilPublicContent,
  PerfilPublicHeader,
  PerfilBackButton,
} from "./styles";
import { ArrowLeft } from "phosphor-react";

export default function PerfilPublic() {
  const { id } = useParams();
  const [perfil, setPerfil] = useState(null);
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  useEffect(() => {
    async function fetchPerfil() {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get(`/perfil/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPerfil(response.data);
      } catch (error) {
        console.error("Erro ao buscar perfil:", error);
      }
    }

    fetchPerfil();
  }, [id]);

  if (!perfil) {
    return (
      <p style={{ textAlign: "center", color: "#ea8720",fontWeight:"bold",fontSize:"1.6rem"}}>
        Perfil não encontrado...
      </p>
    );
  }

  const handleBackButtonClick = () => {
    navigate("/perfil");
  };

  const imgSrc = `http://localhost:8080/imagens/${
    perfil.foto
  }?_=${new Date().getTime()}`;

  return (
    <PerfilPublicContainer>
      <PerfilPublicHeader>
        <PublicPerfilTitle>Perfil</PublicPerfilTitle>
        <PerfilBackButton onClick={handleBackButtonClick}>
          <ArrowLeft size={32} />
        </PerfilBackButton>
      </PerfilPublicHeader>
      <PerfilPublicContent>
        <img src={imgSrc} alt="Foto de Perfil" />
        <PerfilEmail>{perfil.email}</PerfilEmail>
        <PerfilName>{perfil.nome}</PerfilName>
        <PerfilSocialName>
          {perfil.nomeSocial || "Nome social não informado"}
        </PerfilSocialName>
        <DataNascimento>
          {perfil.dataNascimento
            ? formatDate(perfil.dataNascimento)
            : "Data de nascimento não informada"}
        </DataNascimento>
        <TelephoneNumber>
          {perfil.telefone || "Telefone não informado"}
        </TelephoneNumber>
        <RedeSocial>
          {perfil.redeSocial || "Rede social não informada"}
        </RedeSocial>
      </PerfilPublicContent>
    </PerfilPublicContainer>
  );
}
