import { Center, Text } from "@chakra-ui/react";
import React, { useState } from "react";

const FlipBlock = ({ front, back }: { front: string, back: string }): React.ReactElement => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="card-container">
      <Center
        minW="10rem"
        w="20%"
        padding="2rem"
        borderTopColor="brand.royal"
        borderTopWidth="7px"
        borderRadius="4px"
        boxShadow="lg"
        className={`card ${flipped ? 'card-flipped' : ''}`}
        onClick={() => setFlipped(!flipped)}
      >
        <Text className="front">{ front }</Text>
        <Text className="back">{ back }</Text>
      </Center>
    </div>
  );
};

export default FlipBlock;
