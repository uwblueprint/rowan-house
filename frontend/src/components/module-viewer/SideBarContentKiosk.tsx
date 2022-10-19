import { Container, Flex, Text, HStack, Spacer } from "@chakra-ui/react";
import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import {
  ContentTypeEnum,
  ContentTypeCategories,
} from "../../types/ContentBlockTypes";
import BlockPreview from "./BlockPreview";

const options: Record<string, Array<ContentTypeEnum>> = {
  Layout: [ContentTypeEnum.COLUMN],
  Basic: [
    ContentTypeEnum.HEADING,
    ContentTypeEnum.TEXT,
    ContentTypeEnum.BUTTON,
  ],
  Media: [ContentTypeEnum.IMAGE, ContentTypeEnum.VIDEO],
  Interactive: [
    ContentTypeEnum.MATCH,
    ContentTypeEnum.FLIPCARD,
    ContentTypeEnum.QUIZ,
  ],
};

const SideBarContentKiosk = (): React.ReactElement => {
  const [hideContent, setHideContent] = React.useState<Record<string, boolean>>(
    {
      Layout: false,
      Basic: false,
      Media: false,
      Interactive: false,
    },
  );

  return (
    <Droppable droppableId="KIOSK" isDropDisabled>
      {(provided) => (
        <Flex direction="column" ref={provided.innerRef}>
          {ContentTypeCategories.map((type, i) => (
            <Container
              key={i}
              onClick={() =>
                setHideContent((prevState) => {
                  const newState = {
                    ...prevState,
                  };
                  newState[type] = !prevState[type];
                  return newState;
                })
              }
              borderTop="1px"
              borderColor="background.grey"
              padding="0.5rem"
            >
              <Flex>
                <Text variant="body-bold">{type}</Text>
                <Spacer />
                {hideContent[type] ? (
                  <ChevronUpIcon boxSize={6} />
                ) : (
                  <ChevronDownIcon boxSize={6} />
                )}
              </Flex>
              {!hideContent[type] && (
                <HStack key={i} mb="1rem" wrap="wrap" spacing="0">
                  {options[type].map((option, index) => (
                    <BlockPreview content={option} key={index} index={index} />
                  ))}
                </HStack>
              )}
            </Container>
          ))}
          {provided.placeholder}
        </Flex>
      )}
    </Droppable>
  );
};

export default SideBarContentKiosk;
