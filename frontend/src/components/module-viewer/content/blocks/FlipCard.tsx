import { Center, SimpleGrid } from "@chakra-ui/react";
import React, { useState } from "react";

const FlipBlock = ({
  front,
  back,
}: {
  front: string;
  back: string;
}): React.ReactElement => {
  const [flipped, setFlipped] = useState(false);

  return (
    <Center className="card-container">
      <SimpleGrid
        w="100%"
        minH="10rem"
        padding="2rem"
        borderTopColor="brand.royal"
        borderTopWidth="7px"
        borderRadius="4px"
        boxShadow="lg"
        columns={1}
        className={`card ${flipped ? "card-flipped" : ""}`}
        onClick={() => setFlipped(!flipped)}
      >
        <Center className="front">{front}</Center>
        <Center className="back">{back}</Center>
      </SimpleGrid>
    </Center>
  );
};

export default FlipBlock;
