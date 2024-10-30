import { useNavigate } from "react-router-dom";
import {
  ResgisterContainer,
  ResgisterInput,
  NameFormInput,
  NameResgisterInput,
  ErrorSpam,
  FileInputContainer,
  HiddenFileInput,
  IconButton,
  RegisterFooter,
  ImagePreview,
  RegisterButton,
} from "./styles";
import { z } from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { api } from "../../service/api";
import { Camera } from "phosphor-react";
import Tittle from "../../Components/Tittle";
import { toast } from "react-toastify";
const CreateUserFormSchema = z.object({
  nome: z
    .string()
    .nonempty("Nome é obrigatório!")
    .transform((nome) => {
      return nome
        .trim()
        .split(" ")
        .map((word) => word[0].toUpperCase() + word.substring(1))
        .join(" ");
    }),
  email: z
    .string()
    .nonempty("E-mail obrigatório!")
    .email("Formato de e-mail inválido!")
    .refine(
      (email) =>
        email.endsWith("@neki-it.com.br") || email.endsWith("@neki.com.br"),
      {
        message: "O e-mail deve terminar com @neki-it.com.br ou @neki.com.br",
      }
    ),
  birthDate: z.string().refine(
    (value) => {
      const date = new Date(value);
      return !isNaN(date.getTime());
    },
    {
      message: "Por favor, insira uma data válida!",
    }
  ),
  nomeSocial: z.string().optional(),
  telefone: z.string().optional(),
  redeSocial: z.string().optional(),
  foto: z.instanceof(File).optional(),
});

type CreateUserFormData = z.infer<typeof CreateUserFormSchema>;

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(CreateUserFormSchema),
  });

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);

    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
    } else {
      setPreviewUrl(null);
    }
  }

  function criarPerfil(data: CreateUserFormData) {
    setLoading(true);

    const formData = new FormData();
    formData.append("nome", data.nome);
    formData.append("email", data.email);
    formData.append("nomeSocial", data.nomeSocial || "");
    formData.append("dataNascimento", data.birthDate);
    formData.append("telefone", data.telefone || "");
    formData.append("redeSocial", data.redeSocial || "");

    if (selectedFile) {
      formData.append("foto", selectedFile);
    }

    const token = localStorage.getItem("token");
    api
      .post("/perfil", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        toast.success("Perfil criado com sucesso!", {
          position: "top-right",
          autoClose: 1700,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        navigate("/perfil");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Erro ao criar usuário. Credenciais invalidas", {
          position: "top-right",
          autoClose: 1700,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <ResgisterContainer>
      <Tittle>Novo Perfil</Tittle>
      <form onSubmit={handleSubmit(criarPerfil)}>
        <NameFormInput>
          <NameResgisterInput
            type="text"
            placeholder="Nome *"
            {...register("nome")}
          />
          <NameResgisterInput
            type="text"
            placeholder="Nome Social"
            {...register("nomeSocial")}
          />
        </NameFormInput>
        {errors.nome && <ErrorSpam>{errors.nome.message}</ErrorSpam>}

        <ResgisterInput
          type="text"
          placeholder="Email *"
          {...register("email")}
        />
        {errors.email && <ErrorSpam>{errors.email.message}</ErrorSpam>}

        <ResgisterInput
          type="date"
          placeholder="Data de Nascimento *"
          {...register("birthDate")}
        />
        {errors.birthDate && <ErrorSpam>{errors.birthDate.message}</ErrorSpam>}

        <ResgisterInput
          type="text"
          placeholder="Telefone"
          {...register("telefone")}
        />

        <ResgisterInput
          type="text"
          placeholder="Rede Social"
          {...register("redeSocial")}
        />

        <FileInputContainer>
          <HiddenFileInput
            type="file"
            id="file"
            onChange={handleFileChange}
            accept="image/*"
          />
          <IconButton
            type="button"
            onClick={() => document.getElementById("file").click()}
          >
            {previewUrl ? (
              <ImagePreview src={previewUrl} alt="Pré-visualização da foto" />
            ) : (
              <Camera size={32} color="#ea8720" />
            )}
          </IconButton>
          <RegisterFooter>
            <RegisterButton type="submit" disabled={loading}>
              {loading ? "Carregando..." : "Criar Perfil"}
            </RegisterButton>
          </RegisterFooter>
        </FileInputContainer>
      </form>
    </ResgisterContainer>
  );
}
