import React, { useState } from "react";
import {
  Box,
  Collapse,
  Flex,
  Heading,
  Icon,
  Image,
  Spacer,
} from "@chakra-ui/react";
import { ReactComponent as DocumentIcon } from "../../../assets/document.svg";
import { DEFAULT_IMAGE } from "../../../constants/DummyData";
import RouterLink from "../../common/RouterLink";
import { makeDeferredCallback } from "../../../utils/CallbackUtils";

const CourseCard = (): React.ReactElement => {
  const [focused, setFocused] = useState<boolean>(false);
  const [hovered, setHovered] = useState<boolean>(false);
  const onFocusChange = makeDeferredCallback(setFocused);
  const onHoverChange = makeDeferredCallback(setHovered);

  const expanded = focused || hovered;

  return (
    <RouterLink
      onFocus={onFocusChange(true)}
      onBlur={onFocusChange(false)}
      onMouseEnter={onHoverChange(true)}
      onMouseLeave={onHoverChange(false)}
    >
      <Flex
        boxShadow="0px 4px 12px rgba(0, 0, 0, 0.1)"
        direction="column"
        width="240px"
        height="300px"
        borderRadius="8px"
        overflow="hidden"
      >
        <Collapse startingHeight="120px" endingHeight="105px" in={expanded}>
          <Image
            src={DEFAULT_IMAGE}
            alt="course-preview"
            width="100%"
            height="100%"
            fit="cover"
          />
        </Collapse>
        <Flex direction="column" padding="24px" flex={1}>
          <Box>
            <Heading as="h3" size="md" marginBottom="6px">
              insert course title
            </Heading>
          </Box>
          <Box
            textOverflow="ellipsis"
            overflow="hidden"
            display="-webkit-box"
            sx={{
              "-webkit-line-clamp": expanded ? "3" : "2",
              "-webkit-box-orient": "vertical",
            }}
          >
            Description description description description description
            description description
          </Box>
          <Spacer />
          <Box>
            <Icon as={DocumentIcon} marginTop="-5px" marginRight="5px" />
            insert course info
          </Box>
        </Flex>
      </Flex>
    </RouterLink>
  );
};

export default CourseCard;
