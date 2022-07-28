import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { VideoBlockState } from "../../../../types/ContentBlockTypes";
import { Modal } from "../../../common/Modal";
import EditorContext from "../../../../contexts/ModuleEditorContext";
import VideoPlayer from "../../../common/VideoPlayer";
import { TextInput } from "../../../common/TextInput";
import { EditContentModalProps } from "../../../../types/ModuleEditorTypes";

interface InvalidLinkProps {
  link: string;
}

const InvalidLinkPreview = ({ link }: InvalidLinkProps): React.ReactElement => {
  return (
    <Flex
      height="350px"
      justifyContent="center"
      alignItems="center"
      background="background.dark"
    >
      <Text variant="sm" color="white">
        {link ? "Invalid Link" : "Paste a link..."}
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
      <VStack alignItems="left">
        <TextInput
          label="Link"
          defaultValue={link}
          onChange={(newLink) => {
            setInvalid(true);
            setLink(newLink);
          }}
          isInvalid={invalid}
        />
        <Text variant="sm">Preview</Text>
        <Box display={invalid ? "initial" : "none"}>
          <InvalidLinkPreview link={link} />
        </Box>
        <Box display={invalid ? "none" : "initial"}>
          <VideoPlayer
            url={link}
            error={invalid}
            onError={() => setInvalid(true)}
            onReady={() => setInvalid(false)}
          />
        </Box>
      </VStack>
    </Modal>
  );
};

export default EditVideoModal;
