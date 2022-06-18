import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  Flex,
  Image,
  VStack,
  Center,
  Text,
  Button,
  Spinner,
} from "@chakra-ui/react";
import { useQuery, useMutation } from "@apollo/client";
import { Redirect } from "react-router-dom";
import RHSLogo from "../../assets/RHSlogo.png";
import AuthContext from "../../contexts/AuthContext";
import { GET_EMAIL_VERIFIED_BY_EMAIL } from "../../APIClients/queries/UserQueries";
import { MANAGE_COURSES_PAGE } from "../../constants/Routes";
import authAPIClient from "../../APIClients/AuthAPIClient";
import { SEND_EMAIL_VERIFICATION_LINK } from "../../APIClients/mutations/AuthMutations";

enum VerifyEmailState {
  default = "default",
  requested = "requested",
  sent = "sent",
  error = "error",
}

interface VerifyEmailProps {
  verifyEmailRequestState: VerifyEmailState;
  setVerifyEmailRequestState: Dispatch<SetStateAction<VerifyEmailState>>;
}

const VerifyEmailContent = ({
  verifyEmailRequestState,
  setVerifyEmailRequestState,
}: VerifyEmailProps): React.ReactElement<VerifyEmailProps> => {
  switch (verifyEmailRequestState) {
    case VerifyEmailState.default:
      return (
        <>
          <Text variant="display-md" paddingBottom="1vw">
            Please verify your email to continue
          </Text>
          <Button
            variant="sm"
            width="full"
            marginBottom="2vh"
            onClick={() =>
              setVerifyEmailRequestState(VerifyEmailState.requested)
            }
          >
            Resend verification email
          </Button>
        </>
      );
    case VerifyEmailState.requested:
      return <Spinner />;
    case VerifyEmailState.sent:
      return (
        <Text variant="display-md" paddingBottom="1vw">
          Verification email has been sent
        </Text>
      );
    case VerifyEmailState.error:
      return (
        <Text variant="display-md" paddingBottom="1vw">
          An error has occurred while resending your verification email
        </Text>
      );
    // Invalid VerifyEmail page state
    default:
      return <></>;
  }
};

const VerifyEmail = (): React.ReactElement => {
  const { authenticatedUser, setAuthenticatedUser } = useContext(AuthContext);

  const [verifyEmailRequestState, setVerifyEmailRequestState] = useState(
    VerifyEmailState.default,
  );

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
    // TODO: Add rate limiting for button presses
    const onButtonPress = async () => {
      if (
        authenticatedUser &&
        verifyEmailRequestState === VerifyEmailState.requested
      ) {
        try {
          const result = await sendEmailVerificationLink({
            variables: { email: authenticatedUser.email },
          });
          const success = result.data?.sendEmailVerificationLink ?? null;
          if (result && success) {
            setVerifyEmailRequestState(VerifyEmailState.sent);
            return;
          }
          setVerifyEmailRequestState(VerifyEmailState.error);
        } catch (error: unknown) {
          // TODO: Add frontend logging
        }
      }
    };
    onButtonPress();
  }, [authenticatedUser, verifyEmailRequestState, sendEmailVerificationLink]);

  if (authenticatedUser?.emailVerified) {
    return <Redirect to={MANAGE_COURSES_PAGE} />;
  }

  return (
    <Flex minH="100vh">
      <Center flex="1">
        <VStack spacing="2vh">
          <Image height="13vh" marginBottom="2.5vh" src={RHSLogo} />
          <VerifyEmailContent
            verifyEmailRequestState={verifyEmailRequestState}
            setVerifyEmailRequestState={setVerifyEmailRequestState}
          />
        </VStack>
      </Center>
    </Flex>
  );
};

export default VerifyEmail;
