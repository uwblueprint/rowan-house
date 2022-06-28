const AutocompleteItem = {
  baseStyle: {
    width: "100%",
    bg: "background.light",
    boxShadow: "rgb(0 0 0 / 15%) 0px 8px 20px, rgb(0 0 0 / 90%) 0px 0px 1px",
    paddingTop: "10px",
    paddingBottom: "10px",
    paddingLeft: "7",
    zIndex: 999,
    cursor: "pointer",
    userSelect: "none",
    _hover: {
      bg: "gray.100",
    },
    _focus: {
      outline: "none",
      bg: "gray.200",
    },
    _disabled: {
      cursor: "not-allowed",
      bg: "background.lightgrey",
      color: "gray.400",
    },
    _first: {
      borderTopRadius: "6px",
    },
    _last: {
      borderBottomRadius: "6px",
    },
  },
  sizes: {},
  variants: {},
  defaultProps: {},
};

export default AutocompleteItem;
