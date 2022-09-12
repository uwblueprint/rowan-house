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

  const flip = () => {
    setFlipped((state) => !state);
  };

  return (
    <Center style={{ perspective: "500px" }}>
      <SimpleGrid
        w="100%"
        maxW="400px"
        minH="10rem"
        padding="2rem"
        borderTopColor="brand.royal"
        borderTopWidth="7px"
        borderRadius="4px"
        boxShadow="lg"
        columns={1}
        transition="all 0.6s ease"
        transform={flipped ? "rotateY(180deg)" : ""}
        style={{ transformStyle: "preserve-3d" }}
        _hover={{ cursor: "pointer" }}
        onClick={flip}
      >
        <Center
          width="100%"
          style={{ backfaceVisibility: "hidden" }}
          gridColumnStart="1"
          gridRowStart="1"
        >
          {front}
        </Center>
        <Center
          width="100%"
          style={{ backfaceVisibility: "hidden" }}
          gridColumnStart="1"
          gridRowStart="1"
          transform="rotateY(180deg)"
        >
          {back}
        </Center>
      </SimpleGrid>
    </Center>
  );
};

export default FlipBlock;
