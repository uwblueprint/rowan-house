import { Box, Spinner } from "@chakra-ui/react";
import React from "react";
import ReactPlayer from "react-player";

interface PlayerConfigProps {
  url: string;
  error?: boolean;
  inEditVideoModal?: boolean;
  onError?: () => void;
  onReady?: () => void;
}

const VideoPlayer = ({
  url,
  error = false,
  inEditVideoModal = false,
  onError,
  onReady,
}: PlayerConfigProps): React.ReactElement => {
  return (
    <Box display={error ? "none" : "initial"}>
      <ReactPlayer
        url={url}
        fallback={<Spinner />}
        config={{
          youtube: {
            playerVars: { modestbranding: 1 },
          },
        }}
        controls
        width={inEditVideoModal ? "100%" : "640px"} // default 640
        onError={onError}
        onReady={onReady}
      />
    </Box>
  );
};

export default VideoPlayer;
