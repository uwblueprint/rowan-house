import React, { useState } from "react";
import { Box, Collapse, Flex, Heading, Image, Spacer } from "@chakra-ui/react";
import { DEFAULT_IMAGE } from "../../../constants/DummyData";
import RouterLink from "../../common/RouterLink";
import { COURSE_OVERVIEW_BASE_ROUTE } from "../../../constants/Routes";
import { CourseResponse } from "../../../APIClients/types/CourseClientTypes";
import ModuleLessonCount from "../ModuleLessonCount";

interface CourseCardProps {
  course: CourseResponse;
}

const CourseCard = ({ course }: CourseCardProps): React.ReactElement => {
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
      to={`${COURSE_OVERVIEW_BASE_ROUTE}/123`}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
              {course.title}
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
