import { useNavigate } from "react-router-dom";
import {
  LoginContainer,
  LoginTitle,
  LoginInput,
  LoginButton,
  ErrorSpam,
} from "./styles";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { api } from "../../service/api";

const LogInUserFormSchema = z.object({
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
    .nonempty("E-mail obrigatório")
    .email("Formato de e-mail inválido!")
    .endsWith("@neki-it.com.br", "O e-mail deve terminar com @neki-it.com.br"),

  senha: z.string().min(6, "Senha curta, insira pelo menos 6 caracteres!"),
});

type LogInUserFormData = z.infer<typeof LogInUserFormSchema>;

export default function Login() {
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LogInUserFormData>({
    resolver: zodResolver(LogInUserFormSchema),
  });

  async function logIn(data: LogInUserFormData) {
    try {
      const response = await api.post("/auth/login", data);

      const token = response.data.token;

      if (token) {
        localStorage.setItem("token", token);
        alert("Usuário logado com sucesso!");

        setOutput(JSON.stringify(data, null, 2));
        navigate("/perfil");
      } else {
        setErrorMessage(
          "Token não recebido. Verifique a resposta do servidor."
        );
      }
    } catch (error) {
      setErrorMessage(
        "Erro ao logar usuário. Verifique os dados e tente novamente"
      );
      console.error(
        "Erro ao logar usuário. Verifique os dados e tente novamente",
        error
      );
    }
  }

  return (
    <LoginContainer>
      <LoginTitle>Login</LoginTitle>
      <form onSubmit={handleSubmit(logIn)}>
        <LoginInput type="text" placeholder="Nome" {...register("nome")} />
        {errors.nome && <ErrorSpam>{errors.nome.message}</ErrorSpam>}

        <LoginInput type="text" placeholder="Email" {...register("email")} />
        {errors.email && <ErrorSpam>{errors.email.message}</ErrorSpam>}

        <LoginInput
          type="password"
          placeholder="Senha"
          {...register("senha")}
        />
        {errors.senha && <ErrorSpam>{errors.senha.message}</ErrorSpam>}

        <LoginButton type="submit" disabled={loading}>
          {loading ? "Carregando..." : "Entrar"}
        </LoginButton>
      </form>
    </LoginContainer>
  );
}
