import { useNavigate } from "react-router-dom";

import {
  LoginContainer,
  LoginInput,
  ErrorSpam,
  LoginWrapper,
  InputIcon,
} from "./styles";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { api } from "../../service/api";
import Button from "../../Components/Button";
import Tittle from "../../Components/Tittle";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EnvelopeSimple, Eye, EyeClosed } from "phosphor-react";

const LogInUserFormSchema = z.object({

  email: z
    .string()
    .nonempty("E-mail é obrigatório!")
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
  const [showPassword, setShowPassword] = useState(false);
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
    }
  }

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (

    <LoginContainer>
      <Tittle>Login</Tittle>
      <form>
        <LoginWrapper>
          <LoginInput type="text" placeholder="Email" {...register("email")} />
          <InputIcon>
            <EnvelopeSimple size={24} />
          </InputIcon>

          {errors.email && <ErrorSpam>{errors.email.message}</ErrorSpam>}
        </LoginWrapper>

        <LoginWrapper>
          <LoginInput
            type={showPassword ? "text" : "password"}
            placeholder="Senha"
            {...register("senha")}
          />
          <InputIcon onClick={toggleShowPassword}>
            {showPassword ? <EyeClosed size={24} /> : <Eye size={24} />}
          </InputIcon>
        </LoginWrapper>
        {errors.senha && <ErrorSpam>{errors.senha.message}</ErrorSpam>}

        <Button onClick={handleSubmit(logIn)}>
          {loading ? "Carregando..." : "Entrar"}
        </Button>
      </form>
      
    </LoginContainer>
  );
}
