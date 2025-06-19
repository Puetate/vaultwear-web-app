import DataSelect from "@/@components/DataSelect";
import FormModalButtons from "@/@components/FormModalButtons";
import { cn } from "@/@lib/utils";
import { PasswordInput, Text, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useMemo } from "react";
import { toast } from "sonner";
import { useGetRoles } from "./@services/getRoles.service";
import { usePostUser } from "./@services/postUser.service";
import { usePutUser } from "./@services/putUser.service";
import { createUserSchema, editUserSchema, userInitialValues, UserSchema } from "./userSchema";

interface FormUserProps {
  userSchema?: UserSchema;
  modalID?: string;
}

export default function FormUser({ userSchema, modalID }: FormUserProps) {
  const isEditing = useMemo(() => Boolean(userSchema?.user.userID), [userSchema?.user.userID]);
  const { data: roles } = useGetRoles();

  const { mutateAsync: createUserMutation, isPending: isPendingCreate } = usePostUser();
  const { mutateAsync: editUserMutation, isPending: isPendingEdit } = usePutUser();

  const form = useForm({
    validate: zodResolver(userSchema?.user.userID ? editUserSchema : createUserSchema),
    initialValues: userSchema?.user.userID ? editUserSchema.parse(userSchema) : userInitialValues
  });

  const handleSubmit = async (values: UserSchema) => {
    toast.promise(isEditing ? editUserMutation(values) : createUserMutation(values), {
      loading: isEditing ? "Editando usuario..." : "Creando usuario...",
      success: isEditing ? "Usuario editado correctamente" : "Usuario creado correctamente"
    });
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} className="flex flex-col gap-4">
      <Text className="font-bold" component="h2">
        Usuario
      </Text>
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextInput label="Correo" placeholder="Correo" {...form.getInputProps("user.email")} required />
        {!isEditing && (
          <PasswordInput
            label="Contraseña"
            placeholder="Contraseña"
            {...form.getInputProps("user.password")}
          />
        )}
        <DataSelect
          data={roles ?? []}
          className={cn("col-span-2", isEditing && "col-span-1")}
          accessorLabel="roleName"
          accessorValue="roleID"
          placeholder="Seleccione un rol"
          label="Rol"
          required
          {...form.getInputProps("user.roleID")}
        />
      </section>
      <Text className="font-bold" component="h2">
        Persona
      </Text>
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextInput label="Nombre" placeholder="Nombre" {...form.getInputProps("person.name")} required />
        <TextInput
          label="Apellido"
          placeholder="Apellido"
          required
          {...form.getInputProps("person.surname")}
        />
        <TextInput
          type="tel"
          label="Teléfono"
          placeholder="Teléfono"
          required
          {...form.getInputProps("person.phone")}
        />
        <TextInput
          label="Identificación"
          placeholder="Identificación"
          required
          {...form.getInputProps("person.identification")}
        />
        <TextInput
          className="col-span-2"
          label="Dirección"
          placeholder="Dirección"
          required
          {...form.getInputProps("person.address")}
        />
      </section>
      <FormModalButtons loading={isPendingCreate || isPendingEdit} modalID={modalID} />
    </form>
  );
}
