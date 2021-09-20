import { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const formSchema = yup.object().shape({
    username: yup.string().required("Username obrigatório"),
    password: yup.string().required("Senha obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onSubmitFunction = (formData) => {
    console.log(formData);
    axios
      .post("https://kenzieshop.herokuapp.com/sessions/", formData)
      .then((response) => {
        console.log(response.status);
        if (response) {
          setMessage("Bem vindo!");
          setStatus("Success!!!");
        }
      })
      .catch((err) => {
        setMessage("Dados Incorretos!");
        setStatus("Error!");
      });
  };

  return (
    <section className="Login-container">
      <h3 className="Login-title">Formulário</h3>
      <form className="Login-form" onSubmit={handleSubmit(onSubmitFunction)}>
        <input placeholder="*Username" {...register("username")} />
        <input placeholder="*Senha" {...register("password")} />
        <section className="messages-err">
          <p>{errors.username?.message}</p>
          <p>{errors.password?.message}</p>
        </section>
        <button type="submit">Enviar!</button>
      </form>
      <h3 className="Login-permission">
        {status} {message}
      </h3>
    </section>
  );
};

export default Login;
