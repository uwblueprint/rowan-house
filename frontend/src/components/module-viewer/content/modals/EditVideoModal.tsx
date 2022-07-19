import { Box, Flex, Spinner, Text, VStack } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import ReactPlayer from "react-player";
import { VideoBlockState } from "../../../../types/ContentBlockTypes";
import { Modal } from "../../../common/Modal";
import EditorContext from "../../../../contexts/ModuleEditorContext";

import { TextInput } from "../../../common/TextInput";
import { EditContentModalProps } from "../../../../types/ModuleEditorTypes";

const InvalidLinkPreview = (): React.ReactElement => {
  return (
    <Flex
      height="350px"
      justifyContent="center"
      alignItems="center"
      background="#383838"
    >
      <Text variant="sm" color="white">
        Invalid Link
      </Text>
    </Flex>
  );
};

const EditVideoModal = ({
  block,
  index,
  isOpen,
  onClose,
}: EditContentModalProps<VideoBlockState>): React.ReactElement => {
  const [link, setLink] = useState(block.content.link ?? "");
  const [invalid, setInvalid] = useState(true);
  const context = useContext(EditorContext);

  if (!context) return <></>;
  const { dispatch } = context;

  const onSave = () => {
    if (invalid) {
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
      canSubmit={!invalid}
    >
      <Flex>
        <VStack flex="1" alignItems="left">
          <TextInput
            label="Link:"
            defaultValue={link}
            onChange={(e) => {
              setInvalid(true);
              setLink(e);
            }}
            isInvalid={invalid}
            errorMessage={link ? "Invalid Link" : "This field is required."}
          />
          <Text variant="sm">Preview:</Text>
          <div style={{ display: `${invalid ? "initial" : "none"}` }}>
            <InvalidLinkPreview />
          </div>
          <Box display={invalid ? "none" : "initial"}>
            <ReactPlayer
              url={link}
              fallback={<Spinner />}
              config={{
                youtube: {
                  playerVars: { modestbranding: 1 },
                },
              }}
              controls
              width="100%"
              onError={() => setInvalid(true)}
              onReady={() => setInvalid(false)}
            />
          </Box>
          )
        </VStack>
      </Flex>
    </Modal>
  );
};

export default EditVideoModal;
