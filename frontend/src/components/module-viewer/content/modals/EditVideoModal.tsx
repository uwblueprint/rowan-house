import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { VideoBlockState } from "../../../../types/ContentBlockTypes";
import { Modal } from "../../../common/Modal";
import VideoPlayer from "../../../common/VideoPlayer";
import { TextInput } from "../../../common/TextInput";
import { EditContentModalProps } from "../../../../types/ModuleEditorTypes";
import BlockPreview from "./BlockPreview";

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
  isOpen,
  onSave,
  onCancel,
}: EditContentModalProps<VideoBlockState>): React.ReactElement => {
  const [link, setLink] = useState(block.content.link ?? "");
  const [invalid, setInvalid] = useState(true);

  const onConfirm = () => {
    if (!link) {
      setInvalid(true);
    } else {
      onSave({ link });
    }
  };

  return (
    <Modal
      size="xl"
      header="Edit Video Component"
      onConfirm={onConfirm}
      onCancel={onCancel}
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
        <BlockPreview />
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
