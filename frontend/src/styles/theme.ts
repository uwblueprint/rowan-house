import { extendTheme } from "@chakra-ui/react";

import colors from "./colors";
// import textStyles from "./textStyles";

const customTheme = extendTheme({
  fonts: {
    // figure out how to get system fonts here
    // heading: "Inter, sans-serif",
    // body: "Inter, sans-serif",
  },
  // textStyles,
  colors,
  config: {
    initialColorMode: "light",
  },
});

export default customTheme;