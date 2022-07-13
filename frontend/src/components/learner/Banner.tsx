import React, { useContext } from "react";
import { Box, Button, ButtonGroup, Flex, Image } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import * as Routes from "../../constants/Routes";
import AuthContext from "../../contexts/AuthContext";
import RHSLogo from "../../assets/RHSLogo-horizontal.png";
import LogoutButton from "../auth/LogoutButton";
import RouterLink from "../common/RouterLink";

const softActionButtonProps = {
  variant: "outline-md",
  border: "none",
  color: "brand.royal",
};

const Banner = ({
  asBlock = false,
}: {
  asBlock?: boolean;
}): React.ReactElement => {
  const { authenticatedUser } = useContext(AuthContext);
  const history = useHistory();

  const goTo = (route: string) => () => history.push(route);

  return (
    <Box height="80px" width="100%">
      <Flex
        alignItems="center"
        justifyContent="space-between"
        height="80px"
        boxShadow="0px 2px 16px rgba(0, 0, 0, 0.1)"
        background="white"
        px="40px"
        position={asBlock ? "static" : "fixed"}
        width="100%"
        zIndex={999}
      >
        <RouterLink to={Routes.HOME_PAGE}>
          <Image src={RHSLogo} alt="Rowan House logo" h="18px" />
        </RouterLink>
        {authenticatedUser ? (
          <LogoutButton {...softActionButtonProps} />
        ) : (
          <ButtonGroup spacing={5}>
            <Button
              {...softActionButtonProps}
              onClick={goTo(Routes.LOGIN_PAGE)}
            >
              Log in
            </Button>
            <Button variant="md" onClick={goTo(Routes.SIGNUP_PAGE)}>
              Sign up
            </Button>
          </ButtonGroup>
        )}
      </Flex>
    </Box>
  );
};

export default Banner;
