import React, { useState } from "react";
import {
  Box,
  Collapse,
  Flex,
  Heading,
  Image,
  Spacer,
  Tag,
  TagLabel,
  TagLeftIcon,
} from "@chakra-ui/react";
import { DEFAULT_IMAGE } from "../../../constants/DummyData";
import RouterLink from "../../common/RouterLink";
import { COURSE_OVERVIEW_BASE_ROUTE } from "../../../constants/Routes";
import { CourseResponse } from "../../../APIClients/types/CourseClientTypes";
import ModuleLessonCount from "../ModuleLessonCount";
import { ReactComponent as StatusCompleteIcon } from "../../../assets/statuscomplete.svg";
import { ReactComponent as StatusInProgressIcon } from "../../../assets/statusinprogress.svg";
import { ReactComponent as StatusNotStartedIcon } from "../../../assets/statusnotstarted.svg";

interface CourseCardProps {
  course: CourseResponse;
  status: string | null;
}

const StatusTag = (courseProgress: string | null) => {
  if (!courseProgress) {
    return null;
  }
  if (courseProgress === "In Progress") {
    return (
      <Tag
        size="md"
        position="absolute"
        top="15px"
        left="5px"
        background="white"
      >
        <TagLeftIcon boxSize="12px" as={StatusInProgressIcon} />
        <TagLabel color="green">In Progress</TagLabel>
      </Tag>
    );
  }
  if (courseProgress === "Complete") {
    return (
      <Tag
        size="md"
        position="absolute"
        top="15px"
        left="5px"
        background="white"
      >
        <TagLeftIcon boxSize="12px" as={StatusCompleteIcon} />
        <TagLabel color="purple">Completed</TagLabel>
      </Tag>
    );
  }
  return (
    <Tag size="md" position="absolute" top="15px" left="5px" background="white">
      <TagLeftIcon boxSize="12px" as={StatusNotStartedIcon} />
      <TagLabel color="gray">Not Started</TagLabel>
    </Tag>
  );
};

const CourseCard = ({
  course,
  status,
}: CourseCardProps): React.ReactElement => {
  const [focused, setFocused] = useState<boolean>(false);
  const [hovered, setHovered] = useState<boolean>(false);
  const handleFocus = () => setFocused(true);
  const handleBlur = () => setFocused(false);
  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);
  const moduleCount = course.modules?.length || 0;
  const lessonCount =
    course.modules?.reduce(
      (currSum, module) => currSum + (module?.lessons?.length || 0),
      0,
    ) || 0;
  const expanded = focused || hovered;

  return (
    <RouterLink
      to={`${COURSE_OVERVIEW_BASE_ROUTE}/${course.id}`}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Flex
        boxShadow="0px 4px 12px rgba(0, 0, 0, 0.1)"
        direction="column"
        width="100%"
        height="350px"
        borderRadius="8px"
        overflow="hidden"
        position="relative"
      >
        <Collapse startingHeight="120px" endingHeight="105px" in={expanded}>
          <Image
            src={course.previewImage || DEFAULT_IMAGE}
            alt="course-preview"
            width="100%"
            height="100%"
            fit="cover"
          />
          {StatusTag(status)}
        </Collapse>
        <Flex direction="column" padding="24px" flex={1}>
          <Box>
            <Heading as="h3" size="md" marginBottom="6px">
              {course.title}
            </Heading>
          </Box>
          <Box
            textOverflow="ellipsis"
            overflow="hidden"
            display="-webkit-box"
            sx={{
              WebkitLineClamp: expanded ? "4" : "3",
              WebkitBoxOrient: "vertical",
            }}
          >
            {course.description}
          </Box>
          <Spacer />
          <Box>
            <ModuleLessonCount
              moduleCount={moduleCount}
              lessonCount={lessonCount}
            />
          </Box>
        </Flex>
      </Flex>
    </RouterLink>
  );
};

export default CourseCard;
