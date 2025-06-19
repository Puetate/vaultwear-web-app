import { User } from "@/@models/user.model";
import { Autocomplete, AutocompleteProps, Group, Text } from "@mantine/core";
import { useDebouncedValue, useShallowEffect } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { useMemo, useState } from "react";
import { useSearchByIdentificationOrName } from "./@services/searchByIdentificationOrName.service";

interface PersonAutocompleteProps {
  onSelectUser: (value: User | null) => void;
}

export default function UserAutocomplete({ onSelectUser: onSelect }: PersonAutocompleteProps) {
  const [selectedPerson, setSelectedPerson] = useState<User | null>(null);
  const [data, setData] = useState<Record<string, User> | null>(null);

  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebouncedValue(search, 500);
  const { data: users } = useSearchByIdentificationOrName(debouncedSearch);

  const handleClear = () => {
    setSearch("");
    setSelectedPerson(null);
    onSelect(null);
    setData(null);
  };

  const handleSelect = (person: User, value: string) => {
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
    const newData = users?.reduce(
      (acc, lr) => {
        const {
          person: { name, surname, identification }
        } = lr;
        const key = `${name} ${surname} - ${identification}`;
        acc[key] = lr;
        return acc;
      },
      {} as Record<string, User>
    );
    setData(newData ?? {});
  };

  const renderSelectOption: AutocompleteProps["renderOption"] = useMemo(
    () =>
      ({ option }) => {
        const user = data?.[option.value] as User;
        return (
          <Group onClick={() => handleSelect(user, option.value)} flex="1" gap="xs">
            <Text size="sm">{option.value}</Text>
          </Group>
        );
      },
    [data]
  );

  useShallowEffect(() => {
    handleChangePersons();
  }, [users]);

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
