import React, { useState } from "react";
import { Text, Stack, Select, Input } from "@chakra-ui/react";

type DatePickerProps = {
  label: string;
  day: string;
  setDate: (date: string) => void;
};

const DatePicker = ({
  label,
  day,
  setDate,
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

  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [invalidYear, setInvalidYear] = useState(false);

  const updateDate = () => {
    if (month !== "" && year !== "") {
      setDate(`${year}/${Months[month as keyof typeof Months]}/${day}`);
    }
  };

  const handleYearInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputYear = event.target.value;
    setYear(inputYear);
    setInvalidYear(!Number.isInteger(Number(inputYear)));
    if (!invalidYear) {
      updateDate();
    }
  };

  const handleMonthInput = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const inputMonth = event.target.value;
    setMonth(inputMonth);
    updateDate();
  };

  return (
    <Stack direction="column">
      <Text>{label}</Text>
      <Stack direction="row">
        <Select
          placeholder="Month"
          size="sm"
          value={month}
          onChange={handleMonthInput}
        >
          {Object.keys(Months).map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </Select>
        <Input
          isInvalid={invalidYear}
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
