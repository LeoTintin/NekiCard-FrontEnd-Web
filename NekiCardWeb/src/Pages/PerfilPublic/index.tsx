import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../service/api";

import {
  PerfilPublicContainer,
  PerfilPublicContent,
  PerfilPublicHeader,
  PerfilBackButton,
  Name,
  ProfileNotFound,
  ProfileNotFoundContainer,
} from "./styles";

import { ArrowLeft } from "phosphor-react";
import PerfilCard from "../../Components/PerfilCard";
import Tittle from "../../Components/Tittle";
import { toast } from "react-toastify";

export default function PerfilPublic() {

  const { id } = useParams();
  const [specificPerfil, setSpecificPerfil] = useState(null);
  const [refresh, setRefresh] = useState(false);

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
        toast.error("Erro ao buscar perfil", {
          position: "top-right",
          autoClose: 1700,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    }

    fetchPerfil();
  }, [id, refresh]);

  const refetch = () => setRefresh((prev) => !prev);

  const handleBackButtonClick = () => {
    navigate("/perfil");
  };

  if (!specificPerfil) {

    return (
      <ProfileNotFoundContainer>
        <PerfilBackButton onClick={handleBackButtonClick}>
          <ArrowLeft size={32} />
        </PerfilBackButton>
        <ProfileNotFound>Perfil não encontrado...</ProfileNotFound>
      </ProfileNotFoundContainer>
    );

  }

  return (

    <PerfilPublicContainer>
      <PerfilPublicHeader>
        <Tittle>Perfil:</Tittle>
        <Name>{specificPerfil.nome}</Name>
        <PerfilBackButton onClick={handleBackButtonClick}>
          <ArrowLeft size={32} />
        </PerfilBackButton>
      </PerfilPublicHeader>
      <PerfilPublicContent>
        <PerfilCard perfil={specificPerfil} refetch={refetch} />
      </PerfilPublicContent>
    </PerfilPublicContainer>
    
  );
}
