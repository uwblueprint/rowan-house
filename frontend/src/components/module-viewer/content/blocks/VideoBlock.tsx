import React from "react";
import VideoPlayer from "../../../common/VideoPlayer";
import {
  ContentBlockProps,
  VideoBlockState,
} from "../../../../types/ContentBlockTypes";

const VideoBlock = ({
  block: { content },
}: ContentBlockProps<VideoBlockState>): React.ReactElement => {
  return <VideoPlayer url={content.link} />;
};

export default VideoBlock;
