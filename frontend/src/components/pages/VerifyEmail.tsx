import React from "react";
import { Flex, Image, VStack, Center, Text, Button } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import RHSLogo from "../../assets/RHSlogo.png";

const VerifyEmail = (): React.ReactElement => {
  const history = useHistory();
  return (
    <Flex minH="100vh">
      <Center flex="1">
        <VStack>
          <Image height="13vh" marginBottom="2.5vh" src={RHSLogo} />
          <Text variant="display-md" paddingBottom="1vw">
            Please Verify your Email to Continue
          </Text>
          <Button colorScheme="purple" onClick={() => history.goBack()}>
            Go Back To Previous Page
          </Button>
        </VStack>
      </Center>
    </Flex>
  );
};

export default VerifyEmail;
