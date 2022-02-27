const Button = {
  baseStyle: {},
  sizes: {},
  variants: {
    default: {
      bg: "brand.royal",
      color: "white",
      padding: "10px 24px",
      borderRadius: "md",
      boxShadow: "0px 2px 1px rgba(0, 0, 0, 0.08)",
      // _hover: { bg: "brand.purple" },
      // _active: { bg: "brand.blue" },
    },
    md: {
      bg: "brand.royal",
      color: "white",
      padding: "8px 16px",
      borderRadius: "md",
      boxShadow: "0px 2px 1px rgba(0, 0, 0, 0.08)",
    },
    sm: {
      bg: "brand.royal",
      color: "white",
      padding: "8px 16px",
      borderRadius: "md",
      fontSize: "sm",
      boxShadow: "0px 2px 1px rgba(0, 0, 0, 0.08)",
    },
    xs: {
      bg: "brand.royal",
      color: "white",
      padding: "8px 16px",
      borderRadius: "md",
      fontSize: "xs",
      boxShadow: "0px 2px 1px rgba(0, 0, 0, 0.08)",
    },

    'outline-lg': {
      borderColor: "background.grey",
      borderWidth: "1px",
      bg: "transparent",
      padding: "10px 24px",
      borderRadius: "md",
      boxShadow: "0px 2px 1px rgba(0, 0, 0, 0.08)",
      _hover: {
        bg: "gray.100",
      },
    },
    'outline-md': {
      borderColor: "background.grey",
      borderWidth: "1px",
      bg: "transparent",
      padding: "8px 16px",
      borderRadius: "md",
      boxShadow: "0px 2px 1px rgba(0, 0, 0, 0.08)",
      _hover: {
        bg: "gray.100",
      },
    },
    'outline-sm': {
      borderColor: "background.grey",
      borderWidth: "1px",
      bg: "transparent",
      padding: "8px 16px",
      borderRadius: "md",
      fontSize: "sm",
      boxShadow: "0px 2px 1px rgba(0, 0, 0, 0.08)",
      _hover: {
        bg: "gray.100",
      },
    },
    'outline-xs': {
      borderColor: "background.grey",
      borderWidth: "1px",
      bg: "transparent",
      padding: "8px 16px",
      borderRadius: "md",
      fontSize: "xs",
      boxShadow: "0px 2px 1px rgba(0, 0, 0, 0.08)",
      _hover: {
        bg: "gray.100",
      },
    },
  },
  defaultProps: {
    variant: "default",
  },
};

export default Button;
