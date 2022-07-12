import React, { useEffect } from "react";
import { Flex, Box, Spinner } from "@chakra-ui/react";
import useLogout from "../../hooks/useLogout";

const Logout = (): React.ReactElement => {
  const logout = useLogout();

  useEffect(() => {
    logout();
  }, [logout]);

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100%"
    >
      <Spinner marginRight="2" />
      <Box>Logging out...</Box>
    </Flex>
  );
};

export default Logout;
