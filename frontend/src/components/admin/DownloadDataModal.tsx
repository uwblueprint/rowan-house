import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import {
  Box,
  Text,
  Radio,
  RadioGroup,
  Stack,
  Select,
  Input,
} from "@chakra-ui/react";
import { Modal } from "../common/Modal";
import { GET_USER_COUNT_BY_TOWN } from "../../APIClients/queries/UserQueries";
import { downloadCSV } from "../../utils/CSVUtils";

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

type DownloadProps = {
  isOpen: boolean;
  onClose: () => void;
};

const DownloadDataModal = ({
  isOpen,
  onClose,
}: DownloadProps): React.ReactElement => {
  const [timeframe, setTimeframe] = useState("1");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { data: counts } = useQuery(GET_USER_COUNT_BY_TOWN, {
    variables: { startDate, endDate },
  });

  const onDownloadConfirm = () => {
    const startDS = new Date(startDate);
    const endDS = new Date(endDate);
    if (startDS > endDS) {
      console.log("date range invalid");
      return;
    }
    if (counts) {
      const csvString = counts.userCountByTown
        .replaceAll(/{|}/g, "")
        .replaceAll(",", "\n")
        .replaceAll(":", ",");
      downloadCSV(csvString, "user_counts_export.csv");
    }
  };

  return (
    <Modal
      size="2xl"
      header="Pick timeframe to download data"
      onConfirm={onDownloadConfirm}
      onCancel={onClose}
      isOpen={isOpen}
    >
      <RadioGroup onChange={setTimeframe} value={timeframe}>
        <Stack orientation="vertical">
          <Box borderWidth="1px" w="100%" padding="0.5rem" marginBottom="5px">
            <Radio spacing="1rem" value="1" w="100%">
              <Text as="b">Download all data</Text>
            </Radio>
          </Box>
          <Box borderWidth="1px" w="100%" padding="0.5rem" marginBottom="5px">
            <Radio spacing="1rem" value="2" w="100%">
              <Text as="b">Download from selected range</Text>
            </Radio>
            <Stack direction="row" marginLeft="2rem" marginTop="0.5rem">
              <DatePicker label="Start Date" day="01" setDate={setStartDate} />
              <DatePicker label="End Date" day="31" setDate={setEndDate} />
            </Stack>
          </Box>
        </Stack>
      </RadioGroup>
    </Modal>
  );
};

export default DownloadDataModal;
