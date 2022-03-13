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
      fontWeight: "590",
      fontSize: "18px",
      lineHeight: "28px",
      // _hover: { bg: "brand.purple" },
      // _active: { bg: "brand.blue" },
    },
    md: {
      bg: "brand.royal",
      color: "white",
      padding: "8px 16px",
      borderRadius: "md",
      boxShadow: "0px 2px 1px rgba(0, 0, 0, 0.08)",
      fontWeight: "590",
      fontSize: "16px",
      lineHeight: "28px",
    },
    sm: {
      bg: "brand.royal",
      color: "white",
      padding: "8px 16px",
      borderRadius: "md",
      boxShadow: "0px 2px 1px rgba(0, 0, 0, 0.08)",
      fontWeight: "590",
      fontSize: "14px",
      lineHeight: "28px",
    },
    xs: {
      bg: "brand.royal",
      color: "white",
      padding: "8px 16px",
      borderRadius: "md",
      boxShadow: "0px 2px 1px rgba(0, 0, 0, 0.08)",
      fontWeight: "590",
      fontSize: "12px",
      lineHeight: "28px",
    },
    disabled: {
      bg: "brand.royal",
      opacity: "50%",
      color: "white",
      padding: "8px 16px",
      borderRadius: "md",
      fontSize: "xs",
      boxShadow: "0px 2px 1px rgba(0, 0, 0, 0.08)",
    },

    "outline-lg": {
      borderColor: "background.grey",
      borderWidth: "1px",
      bg: "transparent",
      padding: "10px 24px",
      borderRadius: "md",
      fontWeight: "590",
      fontSize: "18px",
      lineHeight: "28px",
      _hover: {
        bg: "gray.100",
      },
    },
    "outline-md": {
      borderColor: "background.grey",
      borderWidth: "1px",
      bg: "transparent",
      padding: "8px 16px",
      borderRadius: "md",
      fontWeight: "590",
      fontSize: "16px",
      lineHeight: "28px",
      _hover: {
        bg: "gray.100",
      },
    },
    "outline-sm": {
      borderColor: "background.grey",
      borderWidth: "1px",
      bg: "transparent",
      padding: "8px 16px",
      borderRadius: "md",
      fontWeight: "590",
      fontSize: "14px",
      lineHeight: "28px",
      _hover: {
        bg: "gray.100",
      },
    },
    "outline-xs": {
      borderColor: "background.grey",
      borderWidth: "1px",
      bg: "transparent",
      padding: "8px 16px",
      borderRadius: "md",
      fontWeight: "590",
      fontSize: "12px",
      lineHeight: "28px",
      _hover: {
        bg: "gray.100",
      },
    },
    "outline-disabled": {
      bg: "brand.royal",
      opacity: "50%",
      color: "white",
      padding: "8px 16px",
      borderRadius: "md",
      fontSize: "xs",
    },
  },
  defaultProps: {
    variant: "default",
  },
};

export default Button;
