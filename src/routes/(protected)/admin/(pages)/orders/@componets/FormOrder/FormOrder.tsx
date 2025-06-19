import DataSelect from "@/@components/DataSelect";
import FormModalButtons from "@/@components/FormModalButtons";
import { dayjs } from "@/@lib/dayjs/dayjs";
import { Person, User } from "@/@models/user.model";
import { ActionIcon, Button, Card, Checkbox, NumberInput, Text, TextInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm, zodResolver } from "@mantine/form";
import { modals } from "@mantine/modals";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import FormUser from "../../../users/@components/FormUser/FormUser";
import { useGetContentType } from "./@services/getContentType.service";
import { usePostOrder } from "./@services/postOrder.service";
import { usePutWithDetailsOrder } from "./@services/putOrderWithDetails.service";
import { createOrderSchema, defaultDetail, orderInitialValues, OrderSchema } from "./orderSchema";
import UserAutocomplete from "./UserAutoComplete/UserAutoComplete";

interface FormOrderProps {
  initialValues?: OrderSchema;
  person?: Person;
}

export default function FormOrder({ initialValues, person: orderPerson }: FormOrderProps) {
  const [person, setPerson] = useState<Person | null>(orderPerson || null);
  const isEdit = useMemo(() => {
    return Boolean(initialValues?.order.orderID);
  }, [initialValues?.order.orderID]);

  const orderSchema = useMemo(() => createOrderSchema(isEdit), [isEdit]);
  const { data: contentTypes } = useGetContentType();
  const { mutateAsync: createOrderMutation, isPending: isPendingCreate } = usePostOrder();
  const { mutateAsync: editOrderMutation, isPending: isPendingEdit } = usePutWithDetailsOrder();

  const form = useForm({
    validate: zodResolver(orderSchema),
    initialValues: initialValues ? initialValues : orderInitialValues
  });

  const formattedDate = useMemo(() => dayjs().format("DDMMYYYYHHss"), []);

  const handleAddDetail = () => {
    if (!person?.name || !person?.surname) {
      return toast.error("Se requiere un cliente para agregar el detalle");
    }
    if (isEdit) {
      form.insertListItem("details", {
        ...defaultDetail,
        orderID: initialValues?.order.orderID
      });
    } else {
      const index = form.getValues().details.length;
      form.insertListItem("details", {
        ...defaultDetail,
        orderDetailCode: `${person?.name.charAt(0)}${person?.surname.charAt(0)}-${formattedDate}-${index + 1}`
      });
    }
  };

  const handleRemoveDetail = (index: number) => {
    form.removeListItem("details", index);
  };

  const handleAddContent = (indexDetail: number) => {
    form.insertListItem(`details.${indexDetail}.contents`, {
      urlContent: "",
      contentTypeID: -1,
      contentTypeName: ""
    });
  };

  const handleSelectContentType = (indexDetail: number, indexContent: number, value: number) => {
    const contentType = contentTypes?.find((type) => type.contentTypeID === value);
    if (contentType) {
      form.setFieldValue(
        `details.${indexDetail}.contents.${indexContent}.contentTypeName`,
        contentType.contentTypeName
      );
    } else {
      form.setFieldValue(`details.${indexDetail}.contents.${indexContent}.contentTypeName`, "");
    }
  };

  const handleSelectClient = (user: User | null) => {
    if (!user) return;
    form.setFieldValue("order.userID", user.userID);
    setPerson(user.person);
  };

  const handleCreateUser = () => {
    const modalID = modals.open({});
    modals.updateModal({
      modalId: modalID,
      title: (
        <Text size="lg" className="font-bold">
          Crear usuario
        </Text>
      ),
      children: <FormUser modalID={modalID} />,
      size: "lg"
    });
  };

  const handleSubmit = (values: OrderSchema) => {
    const schema = orderSchema.parse(values);
    toast.promise(isEdit ? editOrderMutation(schema) : createOrderMutation(schema), {
      loading: `${isEdit ? "Editando" : "Creando"} orden..`,
      success: `Orden ${isEdit ? "editada" : "creada"}`
    });
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} className="flex flex-col gap-4">
      <Text className="font-bold">Orden</Text>
      <section className="grid grid-cols-2 gap-4">
        <DatePickerInput
          required
          label="Fecha de la orden"
          placeholder="Fecha de la orden"
          {...form.getInputProps("order.orderDate")}
        />
        <DatePickerInput
          required
          label="Fecha de entrega"
          placeholder="Fecha de entrega"
          {...form.getInputProps("order.deliveryDate")}
        />
        <TextInput
          label="Dirección de entrega"
          placeholder="Dirección de entrega"
          required
          {...form.getInputProps("order.deliveryAddress")}
        />
        <div className="flex items-center">
          <Checkbox
            label="¿Incluye entrega?"
            {...form.getInputProps("order.includeDelivery", { type: "checkbox" })}
          />
        </div>
      </section>
      <Text className="font-bold">Cliente</Text>
      <UserAutocomplete onSelectUser={handleSelectClient} />
      {Boolean(form.getValues().order.orderID) ? (
        <Text>
          {person?.name} {person?.surname} - {person?.phone}
        </Text>
      ) : (
        <></>
      )}

      <div className="flex items-center justify-between">
        <Text className="font-bold">Detalle</Text>
        <ActionIcon onClick={handleAddDetail}>
          <IconPlus />
        </ActionIcon>
      </div>
      <div>
        {form.getInputProps("details").error && (
          <Text c="red" size="sm">
            {form.getInputProps("details").error}
          </Text>
        )}
      </div>
      <section className="flex flex-col gap-4">
        {form.getValues().details.map((_, index) => (
          <Card className="relative" key={index}>
            <ActionIcon
              disabled={isEdit}
              className="absolute top-0 right-0"
              variant="subtle"
              color="red"
              onClick={() => handleRemoveDetail(index)}
            >
              <IconTrash />
            </ActionIcon>
            <div className="grid w-full grid-cols-2 gap-4">
              <NumberInput
                label="Cantidad"
                placeholder="Cantidad"
                required
                min={1}
                {...form.getInputProps(`details.${index}.quantity`)}
              />

              <TextInput
                label="Descripción"
                placeholder="Descripción del contenido"
                required
                {...form.getInputProps(`details.${index}.description`)}
              />
              <NumberInput
                label="Precio"
                placeholder="Precio"
                required
                min={0}
                {...form.getInputProps(`details.${index}.price`)}
              />
              <TextInput
                disabled
                label="Código del detalle"
                placeholder="Código del detalle"
                required
                {...form.getInputProps(`details.${index}.orderDetailCode`)}
              />

              <div className="col-span-2 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <Text className="font-bold">Contenido</Text>
                  <ActionIcon onClick={() => handleAddContent(index)}>
                    <IconPlus />
                  </ActionIcon>
                </div>
                <div>
                  {form.getInputProps("details").error && (
                    <Text c="red" size="sm">
                      {form.getInputProps("details").error}
                    </Text>
                  )}
                </div>
                {form.getValues().details[index].contents &&
                  form.getValues().details[index].contents.length > 0 &&
                  form.getValues().details[index].contents.map((_, contentIndex) => (
                    <Card className="relative grid w-full border border-white" key={contentIndex}>
                      <ActionIcon
                        disabled={isEdit}
                        className="absolute top-0 right-0"
                        variant="subtle"
                        color="red"
                        onClick={() => handleRemoveDetail(index)}
                      >
                        <IconTrash />
                      </ActionIcon>
                      <div className="grid grid-cols-2 gap-2">
                        <DataSelect
                          label="Tipo de contenido"
                          data={contentTypes ?? []}
                          accessorLabel="contentTypeName"
                          accessorValue="contentTypeID"
                          {...form.getInputProps(
                            `details.${index}.contents.${contentIndex}.contentTypeID`
                          )}
                          onChange={(value) => {
                            handleSelectContentType(index, contentIndex, value);
                            form
                              .getInputProps(`details.${index}.contents.${contentIndex}.contentTypeID`)
                              .onChange(value);
                          }}
                        />
                        <TextInput
                          label="URL del contenido"
                          placeholder="URL del contenido"
                          {...form.getInputProps(`details.${index}.contents.${contentIndex}.urlContent`)}
                        />
                        <TextInput
                          className="col-span-2"
                          label="Descripción"
                          placeholder="Descripción del contenido"
                          required
                          {...form.getInputProps(
                            `details.${index}.contents.${contentIndex}.description`
                          )}
                        />
                      </div>
                    </Card>
                  ))}
              </div>
            </div>
          </Card>
        ))}
      </section>
      <section className="flex justify-end gap-4">
        <Button variant="outline" onClick={handleCreateUser}>
          Crear usuario
        </Button>
        <FormModalButtons loading={isPendingCreate || isPendingEdit} />
      </section>
    </form>
  );
}
