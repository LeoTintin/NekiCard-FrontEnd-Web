import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  HomeContainer,
  Loading,
  LoadingContainer,
  PerfilList,
  SearchIcon,
  SearchInput,
  SearchWrapper,
} from "./styles";

import PerfilCard from "../../Components/PerfilCard";
import { api } from "../../service/api";
import Button from "../../Components/Button";
import Tittle from "../../Components/Tittle";
import { MagnifyingGlass } from "phosphor-react";
import { toast } from "react-toastify";

export default function Home() {

  const navigate = useNavigate();
  const [perfis, setPerfis] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPerfis() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Usuario não encontrado", {
            position: "top-right",
            autoClose: 1700,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          return;
        }

        const response = await api.get("/perfil", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setPerfis(response.data);
      } catch (error) {
        toast.error("Erro ao buscar perfis", {
          position: "top-right",
          autoClose: 1700,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } finally {
        setLoading(false);
      }
    }

    fetchPerfis();
  }, [refresh]);

  const refetch = () => setRefresh((prev) => !prev);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  if (loading) {

    return (
      <LoadingContainer>
        <Loading></Loading>
      </LoadingContainer>
    );

  }

  const filterPerfil = perfis?.filter((perfil) =>
    perfil.nome.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <HomeContainer>
      <SearchWrapper>
        <Tittle>Perfis</Tittle>
        <SearchInput
          type="text"
          placeholder="Pesquisar"
          value={search}
          onChange={handleSearchChange}
          className="cozinhaSearchInput"
        />

        <SearchIcon>
          <MagnifyingGlass size={22} color="#349c98" />
        </SearchIcon>
      </SearchWrapper>

      <PerfilList>
        {filterPerfil && filterPerfil.length > 0 ? (
          <>
            {filterPerfil.map((perfil) => (
              <PerfilCard key={perfil.id} perfil={perfil} refetch={refetch} />
            ))}
          </>
        ) : (
          <Tittle>Nenhum perfil encontrado</Tittle>
        )}
      </PerfilList>
      
      <Button onClick={() => navigate("/register")}>Novo Perfil</Button>
    </HomeContainer>
  );
}
