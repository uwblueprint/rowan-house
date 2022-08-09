import { Center, Spinner } from "@chakra-ui/react";
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
    <Center display={error ? "none" : "flex"} width="100%">
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
      />
    </Center>
  );
};

export default VideoPlayer;
