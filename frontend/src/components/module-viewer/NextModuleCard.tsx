import React, { useState } from "react";
import { Flex, Heading, Image, Text } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { DEFAULT_IMAGE } from "../../constants/DummyData";
import RouterLink from "../common/RouterLink";
import { COURSE_OVERVIEW_BASE_ROUTE } from "../../constants/Routes";

interface NextModuleCardProps {
  courseID: string;
  nextModuleIndex: number;
}

const NextModuleCard = ({
  courseID,
  nextModuleIndex,
}: NextModuleCardProps): React.ReactElement => {
  const [focused, setFocused] = useState<boolean>(false);
  const [hovered, setHovered] = useState<boolean>(false);
  const handleFocus = () => setFocused(true);
  const handleBlur = () => setFocused(false);
  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);

  const expanded = focused || hovered;

  return (
    <RouterLink
      to={`${COURSE_OVERVIEW_BASE_ROUTE}/${courseID}/${nextModuleIndex}`}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      width="67%"
      height="10%"
    >
      <Flex
        borderRadius="0.5em"
        overflow="hidden"
        position="relative"
        alignItems="center"
        justifyContent="space-around"
        border="solid"
        borderWidth="0.15em"
        borderColor={hovered ? "brand.royal" : "#F4F4F4"}
        padding="1em"
      >
        <Image
          src={DEFAULT_IMAGE}
          alt="course-preview"
          width="5em"
          height="5em"
          fit="cover"
          borderRadius="0.15em"
        />
        <Flex direction="column" padding="24px" flex={1}>
          <Flex
            justifyItems="space-around"
            alignItems="center"
            marginBottom="0.5em"
          >
            <Flex
              width="1em"
              height="1em"
              backgroundColor="#2F855A"
              borderRadius="50%"
            />
            <Text marginLeft="0.5em" color="#2F855A">
              In Progress
            </Text>
          </Flex>
          <Heading
            textOverflow="ellipsis"
            overflow="hidden"
            display="-webkit-box"
            color="#666666"
            size="md"
            sx={{
              "-webkit-line-clamp": expanded ? "3" : "2",
              "-webkit-box-orient": "vertical",
            }}
          >
            Module {nextModuleIndex + 1}: Next Module Title
          </Heading>
        </Flex>
        <ChevronRightIcon w={6} h={6} color="brand.royal" />
      </Flex>
    </RouterLink>
  );
};

export default NextModuleCard;
