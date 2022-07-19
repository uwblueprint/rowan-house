import { Spinner } from "@chakra-ui/react";
import React from "react";
import ReactPlayer from "react-player";
import {
  ContentBlockProps,
  VideoBlockState,
} from "../../../types/ContentBlockTypes";

const VideoBlock = ({
  block: { content },
}: ContentBlockProps<VideoBlockState>): React.ReactElement => {
  return (
    <ReactPlayer
      url={content.link}
      fallback={<Spinner />}
      config={{
        youtube: {
          playerVars: { modestbranding: 1 },
        },
      }}
      controls
    />
  );
};

export default VideoBlock;
