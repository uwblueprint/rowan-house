import React, { useContext, useEffect } from "react";
import { Flex, Image, VStack, Center, Text } from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import { Redirect } from "react-router-dom";
import RHSLogo from "../../assets/RHSlogo.png";
import AuthContext from "../../contexts/AuthContext";
import { GET_EMAIL_VERIFIED_BY_EMAIL } from "../../APIClients/queries/UserQueries";
import { MANAGE_COURSES_PAGE } from "../../constants/Routes";
import authAPIClient from "../../APIClients/AuthAPIClient";

const VerifyEmail = (): React.ReactElement => {
  const { authUser, setAuthUser } = useContext(AuthContext);
  // refetch used to call query lazily with non-void function output
  const { refetch } = useQuery<
    { emailVerifiedByEmail: boolean },
    { email: string }
    // skip set to true prevents premature query call without valid authUser
  >(GET_EMAIL_VERIFIED_BY_EMAIL, { skip: true });
  useEffect(() => {
    if (authUser) {
      authAPIClient.updateAuthUser(
        authUser,
        refetch,
        setAuthUser,
      );
    }
  }, [authUser, setAuthUser, refetch]);

  if (authUser?.emailVerified) {
    return <Redirect to={MANAGE_COURSES_PAGE} />;
  }

  return (
    <Flex minH="100vh">
      <Center flex="1">
        <VStack>
          <Image height="13vh" marginBottom="2.5vh" src={RHSLogo} />
          <Text variant="display-md" paddingBottom="1vw">
            Please Verify your Email to Continue
          </Text>
        </VStack>
      </Center>
    </Flex>
  );
};

export default VerifyEmail;
