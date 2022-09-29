import React, { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { Box, Text, Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { Modal } from "../common/Modal";
import { GET_USER_COUNT_BY_TOWN } from "../../APIClients/queries/UserQueries";
import { downloadCSV } from "../../utils/CSVUtils";
import DatePicker from "./DatePicker";

type DownloadProps = {
  isOpen: boolean;
  onClose: () => void;
};

const DownloadDataModal = ({
  isOpen,
  onClose,
}: DownloadProps): React.ReactElement => {
  const [radioOption, setRadioOption] = useState("1");
  const [startMonth, setStartMonth] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endMonth, setEndMonth] = useState("");
  const [endYear, setEndYear] = useState("");
  const [getCounts, { loading, error, data }] = useLazyQuery(
    GET_USER_COUNT_BY_TOWN,
  );
  const [downloadEnabled, setDownloadEnabled] = useState(true);
  const [rangeInvalid, setRangeInvalid] = useState(false);

  useEffect(() => {
    if (radioOption === "2") {
      if (
        startMonth === "" ||
        startYear === "" ||
        endMonth === "" ||
        endYear === "" ||
        startYear.length !== 4 ||
        endYear.length !== 4
      ) {
        setDownloadEnabled(false);
        setRangeInvalid(false);
      } else {
        setDownloadEnabled(true);
        const startDS = new Date(Number(startYear), Number(startMonth) - 1, 1);
        const endDS = new Date(Number(endYear), Number(endMonth), 0);
        if (startDS > endDS) {
          setRangeInvalid(true);
        } else {
          setRangeInvalid(false);
        }
      }
    } else {
      setDownloadEnabled(true);
      setRangeInvalid(false);
    }
  });

  const onDownloadConfirm = async () => {
    const startDS = new Date(Number(startYear), Number(startMonth) - 1, 1);
    const endDS = new Date(Number(endYear), Number(endMonth), 0);
    let startDate = startDS.toLocaleDateString("en-ZA");
    let endDate = endDS.toLocaleDateString("en-ZA");

    if (radioOption === "1") {
      startDate = "";
      endDate = "";
    }
    const counts = await getCounts({ variables: { startDate, endDate } });
    const csvString = counts.data.userCountByTown
      .replaceAll(/{|}/g, "")
      .replaceAll(",", "\n")
      .replaceAll(":", ",");
    downloadCSV(csvString, "user_counts_export.csv");
  };

  const boxProps = {
    borderWidth: "1px",
    w: "100%",
    padding: "1rem",
  };
  const radioProps = { spacing: "1rem", w: "100%" };
  return (
    <Modal
      size="2xl"
      header="Pick timeframe to download data"
      confirmText={loading ? "Downloading..." : "Download"}
      canSubmit={downloadEnabled && !rangeInvalid}
      onConfirm={onDownloadConfirm}
      onCancel={() => {
        setRadioOption("1");
        setStartMonth("");
        setStartYear("");
        setEndMonth("");
        setEndYear("");
        setRangeInvalid(false);
        onClose();
      }}
      isOpen={isOpen}
    >
      <RadioGroup
        onChange={setRadioOption}
        value={radioOption}
        colorScheme="purple"
      >
        <Stack orientation="vertical">
          <Box {...boxProps}>
            <Radio value="1" {...radioProps}>
              <Text as="b">Download all data</Text>
            </Radio>
          </Box>
          <Box
            {...boxProps}
            onClick={() => {
              setRadioOption("2");
            }}
          >
            <Radio value="2" {...radioProps}>
              <Text as="b">Download from selected range</Text>
            </Radio>
            <Stack direction="row" marginLeft="2rem" marginTop="0.5rem">
              <DatePicker
                label="Start Date"
                month={startMonth}
                year={startYear}
                setMonth={setStartMonth}
                setYear={setStartYear}
                invalid={rangeInvalid}
              />
              <DatePicker
                label="End Date"
                month={endMonth}
                year={endYear}
                setMonth={setEndMonth}
                setYear={setEndYear}
                invalid={rangeInvalid}
              />
            </Stack>
            {rangeInvalid ? (
              <Text
                marginLeft="2rem"
                marginTop="0.5rem"
                color="red"
                fontSize="sm"
              >
                Please enter a valid date range
              </Text>
            ) : (
              <></>
            )}
          </Box>
        </Stack>
      </RadioGroup>
    </Modal>
  );
};

export default DownloadDataModal;
