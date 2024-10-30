import { useNavigate } from "react-router-dom";
import { LoginContainer, LoginInput, ErrorSpam } from "./styles";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { api } from "../../service/api";
import Button from "../../Components/Button";
import Tittle from "../../Components/Tittle";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    .refine(
      (email) =>
        email.endsWith("@neki-it.com.br") || email.endsWith("@neki.com.br"),
      {
        message: "O e-mail deve terminar com @neki-it.com.br ou @neki.com.br",
      }
    ),

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
        toast.success("Usuario logado com sucesso!", {
          position: "top-right",
          autoClose: 1700,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
        setOutput(JSON.stringify(data, null, 2));
        navigate("/perfil");
      } else {
        setErrorMessage(
          "Token não recebido. Verifique a resposta do servidor."
        );
      }
    } catch (error) {
      toast.error("Erro ao logar usuário. Credenciais invalidas", {
        position: "top-right",
        autoClose: 1700,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setErrorMessage("");
      console.error(
        "Erro ao logar usuário. Verifique os dados e tente novamente",
        error
      );
    }
  }

  return (
    <LoginContainer>
      <Tittle>Login</Tittle>
      <form>
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

        <Button onClick={handleSubmit(logIn)}>
          {loading ? "Carregando..." : "Entrar"}
        </Button>
      </form>
    </LoginContainer>
  );
}
