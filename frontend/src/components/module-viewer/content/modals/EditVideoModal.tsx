import { Flex, VStack } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { VideoBlockState } from "../../../../types/ContentBlockTypes";
import { Modal } from "../../../common/Modal";
import EditorContext from "../../../../contexts/ModuleEditorContext";

import { TextArea } from "../../../common/TextArea";
import { EditContentModalProps } from "../../../../types/ModuleEditorTypes";

const EditVideoModal = ({
  block,
  index,
  isOpen,
  onClose,
}: EditContentModalProps<VideoBlockState>): React.ReactElement => {
  const [link, setLink] = useState(block.content.link ?? "");
  const [invalid, setInvalid] = useState(false);
  const context = useContext(EditorContext);

  if (!context) return <></>;
  const { dispatch } = context;

  const onSave = () => {
    if (!link) {
      setInvalid(true);
      return;
    }
    const newBlock = {
      ...block,
      content: {
        ...block.content,
        link,
      },
    };

    dispatch({
      type: "update-block",
      value: {
        index,
        block: newBlock,
      },
    });

    onClose();
  };

  return (
    <Modal
      size="xl"
      header="Edit Video Component"
      onConfirm={onSave}
      onCancel={onClose}
      isOpen={isOpen}
    >
      <Flex>
        <VStack flex="1">
          <TextArea
            label="Text Content:"
            defaultValue={link}
            onChange={setLink}
            isInvalid={invalid}
            errorMessage="This field is required."
          />
        </VStack>
      </Flex>
    </Modal>
  );
};

export default EditVideoModal;
