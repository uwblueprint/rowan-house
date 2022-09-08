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
import { UserCountForTown } from "../../APIClients/types/UserClientTypes";
import { Modal } from "../common/Modal";
import { GET_USER_COUNT_BY_TOWN } from "../../APIClients/queries/UserQueries";

const DatePicker = ({ label }: { label: string }): React.ReactElement => {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    <Stack direction="column">
      <Text>{label}</Text>
      <Stack direction="row">
        <Select
          placeholder="Month"
          size="sm"
          value={month}
          onChange={(event) => setMonth(event.target.value)}
        >
          {months.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </Select>
        <Input
          placeholder="Year"
          value={year}
          onChange={(event) => setYear(event.target.value)}
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

  const { data, loading, error } = useQuery<{
    userCounts: Array<UserCountForTown>;
  }>(GET_USER_COUNT_BY_TOWN, {
    variables: { startDate, endDate },
  });
  const { userCounts } = data ?? { userCounts: [] };

  const onDownloadConfirm = () => {
    console.log(userCounts);
    // download as CSV
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
            <Radio spacing="1rem" value="1">
              <Text as="b">Download all data</Text>
            </Radio>
          </Box>
          <Box borderWidth="1px" w="100%" padding="0.5rem" marginBottom="5px">
            <Radio spacing="1rem" value="2">
              <Text as="b">Download from selected range</Text>
            </Radio>
            <Stack direction="row" marginLeft="2rem" marginTop="0.5rem">
              <DatePicker label="Start Date" />
              <DatePicker label="End Date" />
            </Stack>
          </Box>
        </Stack>
      </RadioGroup>
    </Modal>
  );
};

export default DownloadDataModal;
