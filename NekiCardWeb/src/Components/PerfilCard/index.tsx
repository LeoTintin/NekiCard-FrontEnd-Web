import { Camera, NotePencil, Trash } from "phosphor-react";
import { useState } from "react";
import { api } from "../../service/api";
import {
  ButtonsContainer,
  CloseButton,
  DataNascimento,
  EditButton,
  FileInputContainer,
  HiddenFileInput,
  IconButton,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  PerfilButton,
  PerfilCardContainer,
  PerfilEmail,
  PerfilName,
  PerfilSocialName,
  RedeSocial,
  TelephoneNumber,
} from "./styles";

export default function PerfilCard({ perfil, onDelete }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedPerfil, setEditedPerfil] = useState(perfil);
  const [foto, setFoto] = useState<File | null>(null);

  const formatDate = (dateString) => {
    if (!dateString) return "Data não informada";
    const [datePart] = dateString.split("T");
    const [year, month, day] = datePart.split("-");
    return `${day}/${month}/${year}`;
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Você tem certeza que deseja deletar este perfil?"
    );

    if (confirmed) {
      try {
        const token = localStorage.getItem("token");

        await api.delete(`/perfil/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        alert("Perfil excluído com sucesso!");
        onDelete(id);
      } catch (error) {
        console.error("Erro ao deletar perfil!", error);
        alert("Erro ao deletar perfil!");
      }
    } else {
      alert("A operação de exclusão foi cancelada.");
    }
  };

  const handleEdit = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Token não encontrado. Faça login novamente.");
      console.warn("Token não encontrado ao tentar editar perfil.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("nome", editedPerfil.nome);
      formData.append("email", editedPerfil.email);
      formData.append("nomeSocial", editedPerfil.nomeSocial);
      formData.append("telefone", editedPerfil.telefone);
      formData.append("redeSocial", editedPerfil.redeSocial);
      formData.append("dataNascimento", editedPerfil.dataNascimento);

      if (foto) {
        formData.append("arquivo", foto);
      }

      const response = await api.put(`/perfil/${editedPerfil.id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setEditedPerfil(response.data);
      alert("Perfil atualizado com sucesso!");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Erro ao atualizar perfil!", error);
      alert("Erro ao atualizar perfil!");
    }
  };

  const imgSrc = `http://localhost:8080/imagens/${
    perfil.foto
  }?_=${new Date().getTime()}`;

  return (
    <PerfilCardContainer>
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
      <ButtonsContainer>
        <EditButton onClick={() => setIsModalOpen(true)}>
          <NotePencil size={22} />
        </EditButton>
        <PerfilButton onClick={() => handleDelete(perfil.id)}>
          <Trash size={22} />
        </PerfilButton>
      </ButtonsContainer>
      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>
              <h2>Editar Perfil</h2>
              <CloseButton onClick={() => setIsModalOpen(false)}>X</CloseButton>
            </ModalHeader>
            <ModalBody>
              <input
                type="text"
                value={editedPerfil.nome}
                onChange={(e) =>
                  setEditedPerfil({ ...editedPerfil, nome: e.target.value })
                }
                placeholder="Nome"
              />
              <input
                type="text"
                value={editedPerfil.nomeSocial}
                onChange={(e) =>
                  setEditedPerfil({
                    ...editedPerfil,
                    nomeSocial: e.target.value,
                  })
                }
                placeholder="Nome Social"
              />
              <input
                type="email"
                value={editedPerfil.email}
                onChange={(e) =>
                  setEditedPerfil({ ...editedPerfil, email: e.target.value })
                }
                placeholder="E-mail"
              />
              <input
                type="text"
                value={editedPerfil.telefone}
                onChange={(e) =>
                  setEditedPerfil({
                    ...editedPerfil,
                    telefone: e.target.value,
                  })
                }
                placeholder="Número de telefone"
              />
              <input
                type="text"
                value={editedPerfil.redeSocial}
                onChange={(e) =>
                  setEditedPerfil({
                    ...editedPerfil,
                    redeSocial: e.target.value,
                  })
                }
                placeholder="Rede social"
              />
              <input
                type="date"
                value={editedPerfil.dataNascimento}
                onChange={(e) =>
                  setEditedPerfil({
                    ...editedPerfil,
                    dataNascimento: e.target.value,
                  })
                }
              />
              <FileInputContainer>
                <HiddenFileInput
                  type="file"
                  id="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      setFoto(e.target.files[0]);
                    }
                  }}
                />
                <IconButton
                  onClick={() => document.getElementById("file").click()}
                >
                  <Camera size={32} color="#ea8720" />
                </IconButton>
              </FileInputContainer>
            </ModalBody>
            <ModalFooter>
              <button onClick={handleEdit}>Salvar</button>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      )}
    </PerfilCardContainer>
  );
}
