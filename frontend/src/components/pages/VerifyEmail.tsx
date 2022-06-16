import React, { useContext, useEffect, useState } from "react";
import { Flex, Image, VStack, Center, Text, Button } from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import { Redirect } from "react-router-dom";
import RHSLogo from "../../assets/RHSlogo.png";
import AuthContext from "../../contexts/AuthContext";
import { GET_EMAIL_VERIFIED_BY_EMAIL } from "../../APIClients/queries/UserQueries";
import { MANAGE_COURSES_PAGE } from "../../constants/Routes";
import authAPIClient from "../../APIClients/AuthAPIClient";

const VerifyEmail = (): React.ReactElement => {
  const { authenticatedUser, setAuthenticatedUser } = useContext(AuthContext);
  // refetch used to call query lazily with non-void function output
  const { refetch } = useQuery<
    { emailVerifiedByEmail: boolean },
    { email: string }
    // skip set to true prevents premature query call without valid authenticatedUser
  >(GET_EMAIL_VERIFIED_BY_EMAIL, { skip: true });
  useEffect(() => {
    if (authenticatedUser) {
      authAPIClient.updateAuthenticatedUser(
        authenticatedUser,
        refetch,
        setAuthenticatedUser,
      );
    }
  }, [authenticatedUser, setAuthenticatedUser, refetch]);

  const [hasBeenPressed, setHasBeenPressed] = useState(false);

  const onResendEmailButtonPress = () => {
    // call backend function to send email
    setHasBeenPressed(true);
    // TODO: add rate limiting
  };

  if (authenticatedUser?.emailVerified) {
    return <Redirect to={MANAGE_COURSES_PAGE} />;
  }

  return (
    <Flex minH="100vh">
      <Center flex="1">
        <VStack spacing="4vh">
          <Image height="13vh" marginBottom="2.5vh" src={RHSLogo} />
          {hasBeenPressed ? (
            <Text variant="display-sm" paddingBottom="1vw">
              Verification email has been sent
            </Text>
          ) : (
            <>
              <Text variant="display-md" paddingBottom="1vw">
                Please verify your email to continue
              </Text>
              <Button
                variant="sm"
                width="full"
                marginBottom="2vh"
                onClick={onResendEmailButtonPress}
              >
                Resend verification email
              </Button>
            </>
          )}
        </VStack>
      </Center>
    </Flex>
  );
};

export default VerifyEmail;
