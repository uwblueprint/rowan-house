import React from "react";
import { Text, Stack, Select, Input } from "@chakra-ui/react";

type DatePickerProps = {
  label: string;
  month: string;
  year: string;
  setMonth: (month: string) => void;
  setYear: (year: string) => void;
  invalid?: boolean;
};

const DatePicker = ({
  label,
  month,
  year,
  setMonth,
  setYear,
  invalid,
}: DatePickerProps): React.ReactElement => {
  enum Months {
    January = "01",
    February = "02",
    March = "03",
    April = "04",
    May = "05",
    June = "06",
    July = "07",
    August = "08",
    September = "09",
    October = "10",
    November = "11",
    December = "12",
  }

  const handleYearInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setYear(event.target.value.replace(/\D/g, ""));
  };

  const handleMonthInput = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMonth(Months[event.target.value as keyof typeof Months]);
  };

  return (
    <Stack direction="column">
      <Text>{label}</Text>
      <Stack direction="row">
        <Select
          placeholder="Month"
          isInvalid={invalid}
          size="sm"
          value={Object.keys(Months)[Number(month) - 1]}
          onChange={handleMonthInput}
        >
          {Object.keys(Months).map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </Select>
        <Input
          isInvalid={invalid}
          placeholder="Year"
          value={year}
          onChange={handleYearInput}
          size="sm"
        />
      </Stack>
    </Stack>
  );
};

export default DatePicker;
