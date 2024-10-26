import { useNavigate } from "react-router-dom";
import {
  ResgisterContainer,
  ResgisterTitle,
  ResgisterInput,
  RegisterButton,
  NameFormInput,
  NameResgisterInput,
  ErrorSpam,
} from "./styles";
import { z } from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const CreateUserFormSchema = z.object({
  nome: z
    .string()
    .nonempty("Nome é obrigatório!")
    .transform((nome) => {
      return nome
        .trim()
        .split(" ")
        .map((word) => word[0].toLocaleUpperCase() + word.substring(1))
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
      message: "Por favor, insira uma data válida",
    }
  ),
});

type CreateUserFormData = z.infer<typeof CreateUserFormSchema>;

export default function Register() {
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(CreateUserFormSchema),
  });

  function criarPerfil(data: CreateUserFormData) {
    setLoading(true);
    setOutput(JSON.stringify(data, null, 2));

    setTimeout(() => {
      alert("Perfil criado com sucesso!");
      navigate("/home");
      setLoading(false);
    }, 1000); // Simulando um delay
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
          <NameResgisterInput type="text" placeholder="Nome Social" />
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

        <ResgisterInput type="text" placeholder="Telefone" />

        <ResgisterInput type="text" placeholder="Rede Social" />

        <RegisterButton type="submit" disabled={loading}>
          {loading ? "Carregando..." : "Criar Perfil"}
        </RegisterButton>
      </form>
    </ResgisterContainer>
  );
}
