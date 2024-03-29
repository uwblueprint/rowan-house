import React from "react";
import { Box } from "@chakra-ui/react";
import { Draggable, DraggableProvided } from "react-beautiful-dnd";
import { ContentTypeEnum } from "../../types/ContentBlockTypes";
import { ReactComponent as ImageIcon } from "../../assets/image.svg";
import { ReactComponent as ColumnIcon } from "../../assets/column.svg";
import { ReactComponent as HeadingIcon } from "../../assets/heading.svg";
import { ReactComponent as MatchIcon } from "../../assets/match.svg";
import { ReactComponent as ParagraphIcon } from "../../assets/paragraph.svg";
import { ReactComponent as LinkIcon } from "../../assets/link.svg";
import { ReactComponent as ButtonIcon } from "../../assets/button.svg";
import { ReactComponent as VideoIcon } from "../../assets/video.svg";
import { ReactComponent as AudioIcon } from "../../assets/audio.svg";
import { ReactComponent as FlipCardIcon } from "../../assets/flipcard.svg";
import { ReactComponent as QuizIcon } from "../../assets/quiz.svg";

const BlockStyle = ({
  content,
  className,
}: {
  className?: string;
  content: ContentTypeEnum;
}): React.ReactElement => {
  let contentIcon: React.ReactElement;
  switch (content.preview) {
    case "column.svg":
      contentIcon = <ColumnIcon width="100%" height="100%" />;
      break;
    case "heading.svg":
      contentIcon = <HeadingIcon width="100%" height="100%" />;
      break;
    case "match.svg":
      contentIcon = <MatchIcon width="100%" height="100%" />;
      break;
    case "text.svg":
      contentIcon = <ParagraphIcon width="100%" height="100%" />;
      break;
    case "link.svg":
      contentIcon = <LinkIcon width="100%" height="100%" />;
      break;
    case "button.svg":
      contentIcon = <ButtonIcon width="100%" height="100%" />;
      break;
    case "image.svg":
      contentIcon = <ImageIcon width="100%" height="100%" />;
      break;
    case "video.svg":
      contentIcon = <VideoIcon width="100%" height="100%" />;
      break;
    case "audio.svg":
      contentIcon = <AudioIcon width="100%" height="100%" />;
      break;
    case "cards.svg":
      contentIcon = <FlipCardIcon width="100%" height="100%" />;
      break;
    case "quiz.svg":
      contentIcon = <QuizIcon width="100%" height="100%" />;
      break;
    default:
      contentIcon = <ImageIcon width="100%" height="100%" />;
  }
  return (
    <Box textAlign="center" mr="12px">
      <Box
        padding="0.75rem"
        mb="0.5rem"
        mt="1rem"
        bg="background.grey"
        w="72px"
        h="72px"
        justifyContent="center"
        overflow="auto"
        className={className}
        _hover={{
          background: "brand.purple",
          opacity: 0.5,
          color: "black",
        }}
      >
        {contentIcon}
      </Box>
      {content.title}
    </Box>
  );
};

interface BlockPreviewProps {
  content: ContentTypeEnum;
  index: number;
}

const BlockPreview = ({
  content,
  index,
}: BlockPreviewProps): React.ReactElement => {
  return (
    <Draggable key={content.id} draggableId={content.id} index={index}>
      {(provided: DraggableProvided, _snapshot) => (
        <>
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={provided.draggableProps.style}
          >
            <BlockStyle content={content} />
          </div>
          {_snapshot.isDragging && (
            <BlockStyle content={content} className="clone" />
          )}
        </>
      )}
    </Draggable>
  );
};

export default BlockPreview;
