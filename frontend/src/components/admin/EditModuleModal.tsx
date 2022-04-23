import { Flex, VStack, Image } from "@chakra-ui/react";
import React, { useState } from "react";
import { TextInput } from "../common/TextInput";
import { Modal, ModalProps } from "../common/Modal";
import { SwitchInput } from "../common/SwitchInput";
import { TextArea } from "../common/TextArea";
import { DEFAULT_IMAGE } from "../../constants/DummyData";
import { Module } from "../../APIClients/types/CourseClientTypes";

export interface EditModuleModalProps extends ModalProps {
  module: Module;
}

const EditModuleModal: React.FC<EditModuleModalProps> = (props) => {
  const { module } = props;
  const [title, setTitle] = useState(module.title ?? "");
  const [isPublished, setVisibility] = useState(module.published ?? false);
  const [description, setDescription] = useState(module.description ?? "");

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Modal size="xl" header="Edit Module" {...props}>
      <Flex>
        <VStack flex="1" pr="1rem">
          <Image src={DEFAULT_IMAGE} borderRadius=".5rem" />
          <SwitchInput
            name="Published Status"
            enabledName="Published"
            disabledName="Draft"
            isEnabled={isPublished}
            isSpaced={false}
            onChange={(e) => setVisibility(e.target.checked)}
          />
        </VStack>
        <VStack flex="1">
          <TextInput
            name="Module Name:"
            label="Module Name:"
            defaultValue={title}
            onChange={(e) => setTitle(e.target.value)}
            isRequired
          />
          <TextArea
            name="Module Description:"
            label="Module Description:"
            defaultValue={description}
            onChange={(e) => setDescription(e.target.value)}
            isRequired
          />
        </VStack>
      </Flex>
    </Modal>
  );
};

export default EditModuleModal;
