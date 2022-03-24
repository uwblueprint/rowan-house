import { VStack } from "@chakra-ui/react";
import React from "react";
import { Droppable } from "react-beautiful-dnd";

import { ContentTypeEnum } from "../../types/ModuleEditorTypes";
import BlockPreview from "./BlockPreview";

const options = [
  ContentTypeEnum.TEXT,
  ContentTypeEnum.IMAGE,
];

const SideBarContentKiosk = (): React.ReactElement => {
  return (
    <Droppable droppableId="KIOSK" isDropDisabled>
      {(provided, snapshot) => (
        <VStack ref={provided.innerRef}>
          {options.map((option, index) => (
            <BlockPreview
              content={option}
              key={index}
              index={index}
            />
          ))}
          {provided.placeholder}
        </VStack>
      )}
    </Droppable>
  );
};

export default SideBarContentKiosk;
