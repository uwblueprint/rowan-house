import React from "react";
import { Box, Image } from "@chakra-ui/react";
import RHSLogo from "../../assets/RHSlogo.png";

const SideBar = ({
  children,
}: {
  children?: React.ReactNode;
}): React.ReactElement => {
  return (
    <Box
      className="sidebar"
      width="280px"
      minWidth="280px"
      backgroundColor="brand.royal"
    >
      <Image
        src={RHSLogo}
        alt="Rowan House logo"
        width="150px"
        mx={16}
        my={8}
      />
      {children}
      <p>Test element</p>
    </Box>
  );
};

export default SideBar;
