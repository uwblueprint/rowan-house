import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { Flex, Image, VStack, Center, Text, Button } from "@chakra-ui/react";
import { useQuery, useMutation } from "@apollo/client";
import { Redirect } from "react-router-dom";
import RHSLogo from "../../assets/RHSlogo.png";
import AuthContext from "../../contexts/AuthContext";
import { GET_EMAIL_VERIFIED_BY_EMAIL } from "../../APIClients/queries/UserQueries";
import { MANAGE_COURSES_PAGE } from "../../constants/Routes";
import authAPIClient from "../../APIClients/AuthAPIClient";
import { SEND_EMAIL_VERIFICATION_LINK } from "../../APIClients/mutations/AuthMutations";

interface VerifyEmailProps {
  hasError: boolean;
  hasBeenPressed: boolean;
  setHasBeenPressed: Dispatch<SetStateAction<boolean>>;
}

const VerifyEmailContent = ({
  hasError,
  hasBeenPressed,
  setHasBeenPressed,
}: VerifyEmailProps): React.ReactElement<VerifyEmailProps> => {
  if (hasError) {
    return (
      <Text variant="display-sm" paddingBottom="1vw">
        An error has occurred while resending your verification email
      </Text>
    );
  }
  if (hasBeenPressed) {
    return (
      <Text variant="display-sm" paddingBottom="1vw">
        Verification email has been sent
      </Text>
    );
  }
  return (
    <>
      <Text variant="display-md" paddingBottom="1vw">
        Please verify your email to continue
      </Text>
      <Button
        variant="sm"
        width="full"
        marginBottom="2vh"
        onClick={() => setHasBeenPressed(true)}
      >
        Resend verification email
      </Button>
    </>
  );
};

const VerifyEmail = (): React.ReactElement => {
  const { authenticatedUser, setAuthenticatedUser } = useContext(AuthContext);

  const [hasBeenPressed, setHasBeenPressed] = useState(false);
  const [hasError, setHasError] = useState(false);

  // refetch used to call query lazily with non-void function output
  const { refetch } = useQuery<
    { emailVerifiedByEmail: boolean },
    { email: string }
    // skip set to true prevents premature query call without valid authenticatedUser
  >(GET_EMAIL_VERIFIED_BY_EMAIL, { skip: true });

  const [sendEmailVerificationLink] = useMutation<{
    sendEmailVerificationLink: boolean;
  }>(SEND_EMAIL_VERIFICATION_LINK);
  useEffect(() => {
    if (authenticatedUser) {
      authAPIClient.updateAuthenticatedUser(
        authenticatedUser,
        refetch,
        setAuthenticatedUser,
      );
    }
  }, [authenticatedUser, setAuthenticatedUser, refetch]);

  useEffect(() => {
    const onButtonPress = async () => {
      if (authenticatedUser && hasBeenPressed) {
        try {
          const result = await sendEmailVerificationLink({
            variables: { email: authenticatedUser.email },
          });
          if (result) {
            const success = result.data?.sendEmailVerificationLink ?? null;
            if (success) {
              // TODO: Add rate limiting for button presses
              setHasBeenPressed(true);
              return;
            }
            setHasError(true);
          }
        } catch (error: unknown) {
          // TODO: Add frontend logging
        }
      }
    };
    onButtonPress();
  }, [authenticatedUser, hasBeenPressed, sendEmailVerificationLink]);

  if (authenticatedUser?.emailVerified) {
    return <Redirect to={MANAGE_COURSES_PAGE} />;
  }

  return (
    <Flex minH="100vh">
      <Center flex="1">
        <VStack spacing="4vh">
          <Image height="13vh" marginBottom="2.5vh" src={RHSLogo} />
          <VerifyEmailContent
            hasError={hasError}
            hasBeenPressed={hasBeenPressed}
            setHasBeenPressed={setHasBeenPressed}
          />
        </VStack>
      </Center>
    </Flex>
  );
};

export default VerifyEmail;
