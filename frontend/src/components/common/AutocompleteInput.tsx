import React, { useState, useRef } from "react";
import {
  Input,
  InputGroup,
  InputRightElement,
  List,
  ListItem,
  Flex,
  Box,
  ScaleFade,
  useStyleConfig,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

/* eslint-disable react/jsx-props-no-spreading */

const AutocompleteItem = ({
  children,
  selected = false,
  onClick,
  ...props
}: {
  children: React.ReactNode;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  onFocus?: (e: React.FocusEvent<HTMLElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLElement>) => void;
}) => {
  const styles = useStyleConfig("AutocompleteItem");

  return (
    <Box
      __css={styles}
      tabIndex={0}
      role="option"
      aria-selected={selected}
      onClick={onClick}
      onKeyPress={(event: React.KeyboardEvent<HTMLElement>) => {
        if (event.key === "Enter" || event.key === " ") {
          onClick?.();
        }
      }}
      {...props}
    >
      <ListItem>{children}</ListItem>
    </Box>
  );
};

type AutocompleteInputProps = {
  options?: Array<string>;
  defaultOption?: string;
  query?: string;
  onChange?: (value: string) => void;
  onSelect?: () => boolean;
};

const AutocompleteInput = ({
  options = [],
  defaultOption = "No items to display",
  query = "",
  onChange,
  onSelect,
  ...props
}: AutocompleteInputProps): React.ReactElement<AutocompleteInputProps> => {
  const [suggestionsAreVisible, setSuggestionsAreVisible] = useState<boolean>(
    false,
  );
  const [textFieldHasFocus, setTextFieldHasFocus] = useState<boolean>(false);

  const useDefaultOption = !options?.length;
  const allOptions = useDefaultOption ? [defaultOption] : options;

  const textFieldRef = useRef<HTMLInputElement>(null);

  const handleSelect = () => {
    if (onSelect?.()) {
      setSuggestionsAreVisible(false);
      textFieldRef.current?.blur();
    }
  };

  return (
    <Flex flexDirection="column" alignItems="center" {...props}>
      <InputGroup w="500px">
        <Input
          ref={textFieldRef}
          type="email"
          value={query}
          placeholder="Search users by email"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            onChange?.(event.target.value);
          }}
          onFocus={() => {
            setTextFieldHasFocus(true);
          }}
          onBlur={() => setTextFieldHasFocus(false)}
          onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === "Enter") {
              handleSelect();
            }
          }}
        />
        <InputRightElement pointerEvents="none">
          <SearchIcon />
        </InputRightElement>
      </InputGroup>

      <ScaleFade
        in={textFieldHasFocus || suggestionsAreVisible}
        unmountOnExit
        style={{ width: "100%" }}
      >
        <List position="relative" width="100%" role="listbox">
          <Flex
            position="absolute"
            flexDirection="column"
            alignItems="center"
            width="100%"
          >
            {allOptions.map((option) => (
              <AutocompleteItem
                key={option}
                disabled={useDefaultOption}
                onClick={handleSelect}
                onFocus={() => setSuggestionsAreVisible(true)}
                onBlur={() => setSuggestionsAreVisible(false)}
              >
                {option}
              </AutocompleteItem>
            ))}
          </Flex>
        </List>
      </ScaleFade>
    </Flex>
  );
};

export default AutocompleteInput;
