import { useForm, SubmitHandler } from "react-hook-form";

import { Button, Input } from "@mui/material";

import axios from "@/api/axios";
import Form from "@/shared/Form";
import { setLoggedIn, setUserId } from "@/store/authorization";

type FormValues = {
  username: string;
  password: string;
};

type Token = {
  token: string;
  userId: string;
};

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    try {
      const request = await axios.post("/auth", JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      const response: Token = await request.data;
      setLoggedIn(true);
      setUserId(response.userId);
    } catch (err) {
      setLoggedIn(false);
      setUserId("");
      throw new Error("Что-то пошло не так");
    } finally {
      reset();
    }
  };

  return (
    <Form
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      width="300px"
      height="400px"
    >
      <label>Пароль</label>
      <Input
        {...register("username", {
          required: "Поле обязательно для заполнения",
        })}
        placeholder="Логин"
      />
      <p>{errors.username?.message}</p>

      <label>Пароль</label>
      <Input
        {...register("password", {
          required: "Поле обязательно для заполнения",
        })}
        placeholder="Пароль"
      />

      <p>{errors.password?.message}</p>
      <Button type="submit">Войти</Button>
    </Form>
  );
};

export default LoginForm;
