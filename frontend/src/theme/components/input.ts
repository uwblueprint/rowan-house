const Input = {
    baseStyle: {},
    sizes: {},
    variants: {
        default: {
            bg: "background.dark",
            color: "white",
            _hover: { bg: "gray.700" },
            _active: { bg: "gray.600" },
        },
        outlineBlack: {
            borderColor: "black",
            borderWidth: "1px",
            bg: "transparent",
            _hover: {
                bg: "gray.100",
            },
        },
        outlineBlue: {
            borderColor: "#3182CE",
            color: "#3182CE",
            borderWidth: "1px",
            bg: "transparent",
            _hover: {
                bg: "#EBF8FF",
            },
        },
        brand: {
            bg: "brand.green",
            color: "white",
            _active: { bg: "brand.lime" },
        },
        moduleGreen: {
            bg: "brand.lime",
            color: "black",
            borderRadius: 0,
            textTransform: "uppercase",
        },
        moduleBlack: {
            bg: "black",
            color: "white",
            borderRadius: 0,
            textTransform: "uppercase",
        },
    },
    defaultProps: {
        variant: "default",
    },
};

export default Input;
