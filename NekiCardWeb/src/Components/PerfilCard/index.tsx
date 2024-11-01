import { Camera, NotePencil, Trash } from "phosphor-react";
import { useState } from "react";
import { api } from "../../service/api";

import {
  ButtonsContainer,
  CloseButton,
  DataNascimento,
  FileInputContainer,
  HiddenFileInput,
  IconButton,
  ImagePreview,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  PerfilButton,
  PerfilCardContainer,
  PerfilEmail,
  PerfilId,
  PerfilImage,
  PerfilName,
  PerfilRedirectButton,
  PerfilSocialName,
  RedeSocial,
  TelephoneNumber,
} from "./styles";

import Button from "../Button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function PerfilCard({ perfil, refetch }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedPerfil, setEditedPerfil] = useState(perfil);
  const [foto, setFoto] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const navigation = useNavigate();

  const formatDate = (dateString) => {
    if (!dateString) return "Data não informada";
    const [datePart] = dateString.split("T");
    const [year, month, day] = datePart.split("-");
    return `${day}/${month}/${year}`;
  };

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] || null;
    setFoto(file);

    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
    } else {
      setPreviewUrl(null);
    }
  }

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

        toast.success("Perfil excluido com sucesso!", {
          position: "top-right",
          autoClose: 1700,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        navigation("/perfil");
      } catch (error) {
        toast.error("Erro ao deletar perfil", {
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
    } else {
      toast("Exclusão cancelada", {
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
    refetch();
  };

  const handleEdit = async () => {
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

    try {
      const formData = new FormData();
      formData.append("nome", editedPerfil.nome);
      formData.append("email", editedPerfil.email);
      formData.append("nomeSocial", editedPerfil.nomeSocial);
      formData.append("telefone", editedPerfil.telefone);
      formData.append("redeSocial", editedPerfil.redeSocial);
      formData.append("dataNascimento", editedPerfil.dataNascimento);

      if (foto) {
        formData.append("foto", foto);
      }

      const response = await api.put(`/perfil/${editedPerfil.id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setEditedPerfil(response.data);
      toast.success("Perfil atualizado com sucesso!.", {
        position: "top-right",
        autoClose: 1700,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setIsModalOpen(false);
      refetch();
    } catch (error) {
      toast.error("Erro ao atualizar perfil.", {
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
  };

  const imgSrc = `http://localhost:8080/imagens/${
    perfil.foto
  }?_=${new Date().getTime()}`;

  return (
    <PerfilCardContainer>
      <PerfilRedirectButton onClick={() => navigation(`/perfil/${perfil.id}`)}>
        <PerfilId>{perfil.id}</PerfilId>
      </PerfilRedirectButton>

      <PerfilRedirectButton onClick={() => navigation(`/perfil/${perfil.id}`)}>
        <PerfilImage src={imgSrc} alt="Foto de Perfil" />
      </PerfilRedirectButton>

      <PerfilEmail>{perfil.email}</PerfilEmail>

      <PerfilName>{perfil.nome}</PerfilName>

      <PerfilSocialName>{perfil.nomeSocial || "..."}</PerfilSocialName>

      <DataNascimento>{formatDate(perfil.dataNascimento)}</DataNascimento>

      <TelephoneNumber>{perfil.telefone || "..."}</TelephoneNumber>

      <RedeSocial>{perfil.redeSocial || "..."}</RedeSocial>

      <ButtonsContainer>
        <PerfilButton onClick={() => setIsModalOpen(true)}>
          <NotePencil size={22} />
        </PerfilButton>
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
                  onChange={handleFileChange}
                />
                <IconButton
                  onClick={() => document.getElementById("file").click()}
                >
                  {previewUrl ? (
                    <ImagePreview
                      src={previewUrl}
                      alt="Pré-visualização da foto"
                    />
                  ) : (
                    <Camera size={32} color="#349c98" />
                  )}
                </IconButton>
                <ModalFooter>
                  <Button onClick={handleEdit}>Salvar</Button>
                </ModalFooter>
              </FileInputContainer>
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      )}
    </PerfilCardContainer>
  );
}
