import FormModalButtons from "@/@components/FormModalButtons";
import { TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useMemo } from "react";
import { toast } from "sonner";
import { usePatchPerson } from "./@services/patchPerson.service";
import { usePostPerson } from "./@services/postPerson.service";
import { personInitialValues, PersonSchema, personSchema } from "./personSchema";

interface FormPersonProps {
  initialValues?: PersonSchema;
}

export default function FormPerson({ initialValues }: FormPersonProps) {
  const isEditing = useMemo(() => {
    return Boolean(initialValues);
  }, [initialValues]);

  const { mutateAsync: createPersonMutation, isPending: isPendingCreate } = usePostPerson();
  const { mutateAsync: updatePersonMutation, isPending: isPendingUpdate } = usePatchPerson();

  const form = useForm({
    validate: zodResolver(personSchema),
    initialValues: isEditing ? personSchema.parse(initialValues) : personInitialValues
  });

  const handleSubmit = (values: PersonSchema) => {
    const { phone, identification, ...rest } = values;
    const schema: Partial<PersonSchema> = { ...rest };
    if (initialValues && phone !== initialValues?.phone) schema.phone = phone;
    if (initialValues && identification !== initialValues?.identification)
      schema.identification = identification;
    toast.promise(initialValues ? updatePersonMutation(schema) : createPersonMutation(values), {
      loading: isEditing ? "Actualizando..." : "Creando...",
      success: isEditing ? "Persona actualizada correctamente" : "Persona creada correctamente"
    });
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <TextInput label="Nombre" placeholder="Nombre" {...form.getInputProps("name")} required />
        <TextInput label="Apellido" placeholder="Apellido" required {...form.getInputProps("surname")} />
        <TextInput
          type="tel"
          label="Teléfono"
          placeholder="Teléfono"
          required
          {...form.getInputProps("phone")}
        />
        <TextInput
          label="Identificación"
          placeholder="Identificación"
          required
          {...form.getInputProps("identification")}
        />
        <TextInput
          className="col-span-2"
          label="Dirección"
          placeholder="Dirección"
          required
          {...form.getInputProps("address")}
        />
      </div>
      <FormModalButtons loading={isPendingCreate || isPendingUpdate} />
    </form>
  );
}
