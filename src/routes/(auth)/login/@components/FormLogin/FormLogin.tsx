import { useSessionStore } from "@/@stores/session.store";
import { Button, PasswordInput, Text, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useNavigate } from "@tanstack/react-router";
import { useLogin } from "../../@services/login.service";
import { loginInitialValues, LoginSchema, loginSchema } from "./loginSchema";

export default function FormLogin() {
  const navigate = useNavigate();
  const setSession = useSessionStore((state) => state.setSession);
  const { mutateAsync: login, isPending } = useLogin();

  const form = useForm({
    mode: "uncontrolled",
    validate: zodResolver(loginSchema),
    initialValues: loginInitialValues
  });

  const handleSubmit = async (values: LoginSchema) => {
    const session = await login(values);
    setSession(session);
    navigate({
      to: "/admin"
    });
  };

  return (
    <form
      className="sha flex w-[60dvh] flex-col gap-4 rounded-md border-2 p-10 shadow-xl shadow-white/20"
      onSubmit={form.onSubmit(handleSubmit)}
    >
      <Text className="text-center text-2xl font-bold uppercase" size="xl">
        Ingreso
      </Text>
      <TextInput
        type="email"
        label="Email"
        placeholder="Ingrese su correo electrónico"
        {...form.getInputProps("email")}
        key={form.key("email")}
      />
      <PasswordInput
        label="Contraseña"
        placeholder="Ingrese su contraseña"
        {...form.getInputProps("password")}
        key={form.key("password")}
      />
      <Button loading={isPending} fullWidth type="submit">
        Iniciar sesión
      </Button>
    </form>
  );
}
