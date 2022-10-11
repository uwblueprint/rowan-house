import { extendTheme } from "@chakra-ui/react";

import styles from "./styles";
import colors from "./foundations/colors";

import fonts from "./foundations/fonts";
import fontSizes from "./foundations/fontSizes";
import { Button, Text } from "./components";
/**
 * This file is generated for providing a custom theme to Chakra UI
 *
 * To learn more about custom themes
 * please visit https://chakra-ui.com/docs/getting-started#add-custom-theme-optional
 */

const overrides = {
  ...styles,
  components: { Button, Text },
  colors,
  fonts,
  fontSizes,
  breakpoints: {
    sm: "36em",
    md: "56em",
  },
};

export default extendTheme(overrides);
