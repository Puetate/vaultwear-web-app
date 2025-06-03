import { Person } from "@/@models/user.model";
import { TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { PersonSchema } from "../../(pages)/users/@components/FormPerson/personSchema";
import PersonAutocomplete from "./PersonAutocomplete";

interface SearchPersonFormFieldsProps {
  disableFields?: boolean;
  hideFields?: boolean;
  form: UseFormReturnType<{ person: PersonSchema } | any>;
  initialValues?: PersonSchema;
}

export default function SearchPersonFormFields({
  hideFields = false,
  disableFields = false,
  form,
  initialValues
}: SearchPersonFormFieldsProps) {
  const handleSelectPerson = (person: Person | null) => {
    if (!person) {
      form.setValues({ person: initialValues });
    } else {
      form.setValues({ person });
    }
  };

  return (
    <>
      <PersonAutocomplete onSelectPerson={handleSelectPerson} />
      {!hideFields && (
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextInput
            disabled={disableFields}
            label="Nombre"
            placeholder="Nombre"
            {...form.getInputProps("person.name")}
            required
          />
          <TextInput
            disabled={disableFields}
            label="Apellido"
            placeholder="Apellido"
            required
            {...form.getInputProps("person.surname")}
          />
          <TextInput
            disabled={disableFields}
            type="tel"
            label="Teléfono"
            placeholder="Teléfono"
            required
            {...form.getInputProps("person.phone")}
          />
          <TextInput
            disabled={disableFields}
            label="Identificación"
            placeholder="Identificación"
            required
            {...form.getInputProps("person.identification")}
          />
          <TextInput
            disabled={disableFields}
            className="col-span-2"
            label="Dirección"
            placeholder="Dirección"
            required
            {...form.getInputProps("person.address")}
          />
        </section>
      )}
    </>
  );
}
