import { Center, Box, Spinner } from "@chakra-ui/react";
import React from "react";
import ReactPlayer from "react-player";

interface PlayerConfigProps {
  url: string;
  error?: boolean;
  onError?: () => void;
  onReady?: () => void;
}

const VideoPlayer = ({
  url,
  error = false,
  onError,
  onReady,
}: PlayerConfigProps): React.ReactElement => {
  return (
    <Center display={error ? "none" : "flex"} width="100%" maxWidth="640px">
      <Box width="100%" position="relative" pt="56.25%">
        <ReactPlayer
          url={url}
          fallback={<Spinner />}
          controls
          config={{
            youtube: {
              playerVars: { modestbranding: 1 },
            },
          }}
          onError={onError}
          onReady={onReady}
          className="lesson-content-react-player"
          width="100%"
          height="100%"
        />
      </Box>
    </Center>
  );
};

export default VideoPlayer;
