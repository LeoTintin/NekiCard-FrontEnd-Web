import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HomeContainer, PerfilList, SearchInput } from "./styles";
import PerfilCard from "../../Components/PerfilCard";
import { api } from "../../service/api";
import Button from "../../Components/Button";
import Tittle from "../../Components/Tittle";

export default function Home() {
  const navigate = useNavigate();
  const [perfis, setPerfis] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchPerfis() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token não encontrado.");
          return;
        }

        const response = await api.get("/perfil", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log(response.data);
        setPerfis(response.data);
      } catch (error) {
        console.error("Erro ao buscar perfis:", error);
      }
    }

    fetchPerfis();
  }, [refresh]);

  const refetch = () => setRefresh((prev) => !prev);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const filterPerfil = perfis?.filter((perfil) =>
    perfil.nome.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <HomeContainer>
      <Tittle>Perfil</Tittle>

      <SearchInput
        type="text"
        placeholder="Pesquisar"
        value={search}
        onChange={handleSearchChange}
        className="cozinhaSearchInput"
      />
      <PerfilList>
        {filterPerfil.map((perfil) => (
          <PerfilCard key={perfil.id} perfil={perfil} refetch={refetch} />
        ))}
      </PerfilList>
      <Button onClick={() => navigate("/register")}>Novo Perfil</Button>
    </HomeContainer>
  );
}
