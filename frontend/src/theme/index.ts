import { extendTheme } from "@chakra-ui/react";

import styles from "./styles";

import colors from "./foundations/colors";

import fontSizes from "./foundations/fontSizes";
import { Button } from "./components";
import fonts from "./fonts";
/**
 * This file is generated for providing a custom theme to Chakra UI
 *
 * To learn more about custom themes
 * please visit https://chakra-ui.com/docs/getting-started#add-custom-theme-optional
 */

const overrides = {
    ...styles,
    components: {
        Button,
    },
    colors,
    fontSizes,
    fonts,
};

const adminOverrides = {
    ...styles,
    components: {
        Button,
    },
    colors,
    fontSizes,
};
const defaultTheme = extendTheme(overrides);
const adminTheme = extendTheme(adminOverrides);
export { defaultTheme, adminTheme };
