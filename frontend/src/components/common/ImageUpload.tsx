import React, { useState, useRef } from "react";
import { Box, Center, Input, Spinner, Text, VStack } from "@chakra-ui/react";

import { ReactComponent as ImageIcon } from "../../assets/image_outline.svg";
import { DEFAULT_IMAGE } from "../../constants/DummyData";

type ImageUploadProps = {
  uploadImage: (file: File) => Promise<string>;
  width?: string | number;
  id?: string;
};

const CHAKRA_TRANSITIONS = {
  transitionProperty: "var(--chakra-transition-property-common)",
  transitionDuration: "var(--chakra-transition-duration-normal)",
};

const ImageUpload = ({
  uploadImage,
  id,
  ...rest
}: ImageUploadProps): React.ReactElement<ImageUploadProps> => {
  const [previewImage, setPreviewImage] = useState<string | undefined>();
  const [hovering, setHovering] = useState(false);
  const [focused, setFocused] = useState(false);
  const [loading, setLoading] = useState(false);

  const inputFile = useRef<HTMLInputElement>(null);
  const openFileBrowser = () => {
    if (inputFile.current) {
      inputFile.current.click();
    }
  };
  const fileChanged = async (e: { target: HTMLInputElement }) => {
    if (e.target.files) {
      const fileSize = e.target.files[0].size / 1024 / 1024;
      if (fileSize > 5) {
        // eslint-disable-next-line no-alert
        window.alert("Your file exceeds 5MB. Upload a smaller file.");
      } else {
        setLoading(true);
        try {
          const image = await uploadImage(e.target.files[0]);
          setPreviewImage(image ?? undefined);
        } finally {
          setLoading(false);
        }
      }
    }
  };

  return (
    <Box
      as="button"
      borderWidth="1px"
      borderColor="gray.200"
      borderRadius=".5rem"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      _focus={{
        borderColor: "#3182ce",
        boxShadow: "0 0 0 1px #3182ce",
        outline: "none",
      }}
      _hover={{
        borderColor: "gray.300",
      }}
      sx={CHAKRA_TRANSITIONS}
      cursor="pointer"
      onClick={openFileBrowser}
      tabIndex={0}
      h="0"
      w="214px"
      pb="100%"
      position="relative"
      {...rest}
    >
      <Box
        position="absolute"
        top="0"
        left="0"
        h="calc(100% + 1px)"
        w="calc(100% + 1px)"
      >
        <Box
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          backgroundImage={previewImage ?? DEFAULT_IMAGE}
          backgroundPosition="center"
          bgRepeat="no-repeat"
          backgroundSize="cover"
          zIndex="-1"
          opacity={hovering || focused || loading ? "0.5" : "1"}
          sx={CHAKRA_TRANSITIONS}
        />
        <Input
          type="file"
          display="none"
          ref={inputFile}
          onChange={fileChanged}
          accept="image/*"
          id={id}
        />
        <VStack
          height={loading ? "0" : "100%"}
          opacity={+(hovering || focused)}
          sx={CHAKRA_TRANSITIONS}
          direction="column"
          justify="center"
          align="center"
        >
          {loading || (
            <>
              <ImageIcon stroke="black" />
              <Text variant="caption-md" color="black">
                Upload image
              </Text>
            </>
          )}
        </VStack>
        {loading && (
          <Center height="100%">
            <Spinner />
          </Center>
        )}
      </Box>
    </Box>
  );
};

export default ImageUpload;
