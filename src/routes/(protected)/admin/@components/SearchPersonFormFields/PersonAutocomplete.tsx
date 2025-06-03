import { Person } from "@/@models/user.model";
import { Autocomplete, AutocompleteProps, Group, Text } from "@mantine/core";
import { useDebouncedValue, useShallowEffect } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { useMemo, useState } from "react";
import { useSearchByIdentification } from "./@services/searchByIdentification.service";

interface PersonAutocompleteProps {
  onSelectPerson: (value: Person | null) => void;
}

export default function PersonAutocomplete({ onSelectPerson: onSelect }: PersonAutocompleteProps) {
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [data, setData] = useState<Record<string, Person> | null>(null);

  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebouncedValue(search, 500);
  const { data: persons } = useSearchByIdentification(debouncedSearch);

  const handleClear = () => {
    setSearch("");
    setSelectedPerson(null);
    onSelect(null);
    setData(null);
  };

  const handleSelect = (person: Person, value: string) => {
    setSelectedPerson(person);
    setSearch(value);
    onSelect(person);
  };

  const handleChangeSearch = (value: string) => {
    if (value === "") {
      setSelectedPerson(null);
      onSelect(null);
    }
    setSearch(value);
  };

  const handleChangePersons = () => {
    if (selectedPerson) {
      return;
    }
    const newData = persons?.reduce(
      (acc, lr) => {
        const { name, surname, identification } = lr;
        const key = `${name} ${surname} - ${identification}`;
        acc[key] = lr;
        return acc;
      },
      {} as Record<string, Person>
    );
    setData(newData ?? {});
  };

  const renderSelectOption: AutocompleteProps["renderOption"] = useMemo(
    () =>
      ({ option }) => {
        const person = data?.[option.value] as Person;
        return (
          <Group onClick={() => handleSelect(person, option.value)} flex="1" gap="xs">
            <Text size="sm">{option.value}</Text>
          </Group>
        );
      },
    [data]
  );

  useShallowEffect(() => {
    handleChangePersons();
  }, [persons]);

  return (
    <Autocomplete
      aria-label="Buscar por nombre o documento"
      className="flex-1"
      renderOption={renderSelectOption}
      placeholder="Buscar por nombre o documento"
      data={data ? Object.keys(data) : []}
      onChangeCapture={(e) => handleChangeSearch(e.currentTarget.value)}
      value={search}
      rightSection={search == "" ? <IconSearch /> : null}
      clearable
      onClear={handleClear}
    />
  );
}
