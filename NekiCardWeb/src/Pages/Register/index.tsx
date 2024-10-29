import { useNavigate } from "react-router-dom";
import {
  ResgisterContainer,
  ResgisterTitle,
  ResgisterInput,
  NameFormInput,
  NameResgisterInput,
  ErrorSpam,
  FileInputContainer,
  HiddenFileInput,
  IconButton,
  RegisterFooter,
  ImagePreview,
} from "./styles";
import { z } from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { api } from "../../service/api";
import { Camera } from "phosphor-react";
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
    .endsWith("@neki-it.com.br", "O e-mail deve terminar com @neki-it.com.br"),
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
  arquivo: z.instanceof(File).optional(),
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
      formData.append("arquivo", selectedFile);
    }

    const token = localStorage.getItem("token");
    api
      .post("/perfil", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        alert("Perfil criado com sucesso!");
        navigate("/perfil");
      })
      .catch((error) => {
        console.error(error);
        alert(
          "Erro ao criar perfil: " +
            (error.response?.data?.message || error.message)
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <ResgisterContainer>
      <ResgisterTitle>Novo Perfil</ResgisterTitle>
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
            <Camera size={32} color="#ea8720" />
          </IconButton>
        </FileInputContainer>

        {previewUrl && (
          <ImagePreview src={previewUrl} alt="Pré-visualização do arquivo" />
        )}

        <RegisterFooter>
          <button type="submit" disabled={loading}>
            {loading ? "Carregando..." : "Criar Perfil"}
          </button>
        </RegisterFooter>
      </form>
    </ResgisterContainer>
  );
}
