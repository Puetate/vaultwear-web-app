import DataSelect from "@/@components/DataSelect";
import FormModalButtons from "@/@components/FormModalButtons";
import { cn } from "@/@lib/utils";
import SearchPersonFormFields from "@/routes/(protected)/admin/@components/SearchPersonFormFields/SearchPersonFormFields";
import { PasswordInput, Text, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useMemo } from "react";
import { toast } from "sonner";
import { useGetRoles } from "./@services/getRoles.service";
import { usePatchUser } from "./@services/patchUser.service";
import { usePostUser } from "./@services/postUser.service";
import { createUserSchema, userInitialValues, UserSchema } from "./userSchema";

interface FormUserProps {
  user?: UserSchema;
}

export default function FormUser({ user }: FormUserProps) {
  const isEditing = useMemo(() => Boolean(user?.userID), [user?.userID]);
  const { data: roles } = useGetRoles();

  const { mutateAsync: createUserMutation, isPending: isPendingCreate } = usePostUser();
  const { mutateAsync: editUserMutation, isPending: isPendingEdit } = usePatchUser();

  const form = useForm({
    validate: zodResolver(createUserSchema(user?.userID)),
    initialValues: Boolean(user) ? createUserSchema(user?.userID).parse(user) : userInitialValues
  });

  const disableFiled = useMemo(
    () => Boolean(form.values?.person?.personID),
    [form.values?.person?.personID]
  );

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
        <TextInput label="Correo" placeholder="Correo" {...form.getInputProps("email")} required />
        {!isEditing && (
          <PasswordInput
            label="Contraseña"
            placeholder="Contraseña"
            {...form.getInputProps("password")}
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
          {...form.getInputProps("role.roleID")}
        />
      </section>
      {!isEditing && (
        <>
          <Text className="font-bold" component="h2">
            Persona
          </Text>
          <SearchPersonFormFields
            form={form}
            disableFields={disableFiled}
            initialValues={userInitialValues.person}
          />
        </>
      )}

      <FormModalButtons loading={isPendingCreate || isPendingEdit} />
    </form>
  );
}
