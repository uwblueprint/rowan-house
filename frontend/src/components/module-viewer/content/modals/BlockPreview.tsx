import { Center, FormLabel } from "@chakra-ui/react";
import React from "react";

const BlockPreview = ({
  children,
}: {
  children?: React.ReactNode;
}): React.ReactElement => {
  return (
    <>
      <FormLabel variant="caption-md" marginTop="1rem" marginBottom=".5rem">
        Preview
      </FormLabel>
      {children && (
        <Center borderWidth="1px" borderRadius="6px" padding="4rem">
          {children}
        </Center>
      )}
    </>
  );
};

export default BlockPreview;
