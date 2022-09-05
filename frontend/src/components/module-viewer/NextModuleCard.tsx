import React, { useContext, useState } from "react";
import { Flex, Heading, Image, Text } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { DEFAULT_IMAGE } from "../../constants/DummyData";
import RouterLink from "../common/RouterLink";
import { COURSE_OVERVIEW_BASE_ROUTE } from "../../constants/Routes";
import EditorContext from "../../contexts/ModuleEditorContext";
import { ModuleProgress } from "../../APIClients/types/ProgressClientTypes";

interface NextModuleStatusProps {
  nextModuleProgress: ModuleProgress;
}
interface NextModuleCardProps {
  courseID: string;
  nextModuleIndex: number;
  nextModuleProgress: ModuleProgress;
}

const NextModuleStatus = ({
  nextModuleProgress,
}: NextModuleStatusProps): React.ReactElement => {
  let color;
  let text;
  if (nextModuleProgress.completedAt) {
    color = "brand.royal";
    text = "Complete";
  } else if (nextModuleProgress.startedAt) {
    color = "#2F855A";
    text = "In Progress";
  }
  return nextModuleProgress.startedAt ? (
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
  ) : (
    <> </>
  );
};

const NextModuleCard = ({
  courseID,
  nextModuleIndex,
  nextModuleProgress,
}: NextModuleCardProps): React.ReactElement => {
  const [hovered, setHovered] = useState<boolean>(false);
  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);
  const context = useContext(EditorContext);
  const { state } = context;
  if (!state) return <></>;
  const {
    course: { modules },
  } = state;
  const nextModuleData = modules[nextModuleIndex];

  return (
    <RouterLink
      to={`${COURSE_OVERVIEW_BASE_ROUTE}/${courseID}/${nextModuleIndex}`}
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
          src={nextModuleData.image || DEFAULT_IMAGE}
          alt="course-preview"
          width="5em"
          height="5em"
          fit="cover"
          borderRadius="0.15em"
        />
        <Flex direction="column" padding="24px" flex={1}>
          <NextModuleStatus nextModuleProgress={nextModuleProgress} />
          <Heading
            textOverflow="ellipsis"
            overflow="hidden"
            display="-webkit-box"
            color="#666666"
            size="md"
          >
            Module {nextModuleIndex + 1}: {nextModuleData.title}
          </Heading>
        </Flex>
        <ChevronRightIcon w={6} h={6} color="brand.royal" />
      </Flex>
    </RouterLink>
  );
};

export default NextModuleCard;
