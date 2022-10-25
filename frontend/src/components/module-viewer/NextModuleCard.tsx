import React, { useState } from "react";
import { Flex, Heading, Image, Link, Text } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { DEFAULT_IMAGE } from "../../constants/DummyData";
import { COURSE_OVERVIEW_BASE_ROUTE } from "../../constants/Routes";
import { ModuleProgress } from "../../APIClients/types/ProgressClientTypes";
import { ModuleType } from "../../types/ModuleEditorTypes";

interface NextModuleStatusProps {
  nextModuleProgress: ModuleProgress | undefined;
}
interface NextModuleCardProps {
  courseID: string;
  courseImage: string | null; // used in case of module image not existing
  nextModuleIndex: number;
  nextModuleProgress: ModuleProgress | undefined;
  modules: ModuleType[];
}

const GREY = "#666666";

const NextModuleStatus = ({
  nextModuleProgress,
}: NextModuleStatusProps): React.ReactElement => {
  let color;
  let text;
  if (nextModuleProgress?.startedAt && nextModuleProgress?.completedAt) {
    color = "brand.royal";
    text = "Complete";
  } else if (nextModuleProgress?.startedAt) {
    color = "#2F855A";
    text = "In Progress";
  } else {
    color = GREY;
    text = "Not Started";
  }

  return (
    <Flex justifyItems="space-around" alignItems="center" marginBottom="0.5em">
      <Flex
        width="1em"
        height="1em"
        backgroundColor={color}
        borderRadius="50%"
      />
      <Text marginLeft="0.5em" color={color}>
        {text}
      </Text>
    </Flex>
  );
};

const NextModuleCard = ({
  courseID,
  nextModuleIndex,
  nextModuleProgress,
  modules,
  courseImage,
}: NextModuleCardProps): React.ReactElement => {
  const [hovered, setHovered] = useState<boolean>(false);
  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);
  const nextModuleData = modules[nextModuleIndex];
  return (
    <Link
      href={`${COURSE_OVERVIEW_BASE_ROUTE}/${courseID}/${nextModuleIndex}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      width={["100%", "100%", "67%"]}
      height="10%"
    >
      <Flex
        borderRadius="0.5em"
        overflow="auto"
        position="relative"
        alignItems="center"
        justifyContent="space-around"
        border="solid"
        borderWidth="0.15em"
        height="calc(100% - 0.125rem)"
        borderColor={hovered ? "brand.royal" : "#F4F4F4"}
        backgroundColor={hovered ? "rgba(114, 74, 150, 0.05)" : ""}
        padding="1em"
      >
        <Image
          src={nextModuleData.image ?? courseImage ?? DEFAULT_IMAGE}
          alt="course-preview"
          width="5em"
          height="5em"
          fit="cover"
          borderRadius="0.15em"
        />
        <Flex direction="column" padding="2em" flex={1}>
          <NextModuleStatus nextModuleProgress={nextModuleProgress} />
          <Heading
            textOverflow="ellipsis"
            overflow="hidden"
            display="-webkit-box"
            color={GREY}
            size="md"
          >
            Module {nextModuleIndex + 1}: {nextModuleData.title}
          </Heading>
        </Flex>
        <ChevronRightIcon w="2em" h="2em" color="brand.royal" />
      </Flex>
    </Link>
  );
};

export default NextModuleCard;
