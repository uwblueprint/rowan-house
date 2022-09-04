import React from "react";
import { useHistory } from "react-router-dom";
import { AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Flex, Spacer, Button, VStack, Text, Box } from "@chakra-ui/react";
import { ModuleResponse } from "../../APIClients/types/CourseClientTypes";
import { COURSE_OVERVIEW_BASE_ROUTE } from "../../constants/Routes";
import { Step, Steps } from "../common/steps";

type ModuleDropdownProps = {
  module: ModuleResponse | null,
  index: number,
  courseID: string,
};

const ModuleDropdown = ({
  module,
  index,
  courseID
}: ModuleDropdownProps): React.ReactElement => {
  const history = useHistory();
  if (!module) return <></>;

  const startModule = ()  => {
    history.push(`${COURSE_OVERVIEW_BASE_ROUTE}/${courseID}/${index}`)
  }

  return (
    <AccordionItem>
      {({ isExpanded }) => (
        <>
          <AccordionButton
            paddingX="2rem"
            paddingY="1rem"
            _expanded={{ bg: "brand.royal", color: "white" }}
          >
            <Flex w="100%">
              <Text variant="subheading">{`Module ${index + 1}: ${module.title}`}</Text>
              <Spacer />
              <Text variant="subheading">{`${module.lessons?.length} Lessons`}</Text>
            </Flex>
            <AccordionIcon />
          </AccordionButton>
          <Box
            border="1px"
            borderBottomRadius="6px"
            borderColor={isExpanded ? "brand.royal" : "background.lightgrey"}
            bg={isExpanded ? "#F9F7FB" : "white"}
          >
            <AccordionPanel pb={4}>
              <VStack align="left">
              <Text>{module.description}</Text>
              <Text variant="subheading">Lessons</Text>
              <Steps currentStep={0}>
                {module.lessons?.map((lessonID, i) => (
                  <Step label={`${i + 1}. ${lessonID}`} index={i} key={i} />
                ))}
              </Steps>
              <Button variant="sm" w="fit-content" paddingX="4rem" onClick={startModule}>
                Start Module
              </Button>
              </VStack>
            </AccordionPanel>
          </Box>
        </>
      )}
    </AccordionItem>
  );
};

export default ModuleDropdown;
