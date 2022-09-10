import { Center } from "@chakra-ui/react";
import React, { useState } from "react";

const FlipBlock = ({ front, back }: { front: string, back: string }): React.ReactElement => {
  const [flipped, setFlipped] = useState(false);

  return (
    <Center
      minW="10rem"
      w="20%"
      padding="2rem"
      borderTopColor="brand.royal"
      borderTopWidth="7px"
      borderRadius="4px"
      boxShadow="lg"
      onClick={() => setFlipped(!flipped)}
    >
      {flipped ? back : front}
    </Center>
  );
};

export default FlipBlock;
