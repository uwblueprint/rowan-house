import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { Center, Image, Spinner } from "@chakra-ui/react";

import {
  ContentBlockProps,
  ImageBlockState,
} from "../../../../types/ContentBlockTypes";
import { GET_CONTENT_IMAGE } from "../../../../APIClients/queries/CourseQueries";
import { DEFAULT_IMAGE } from "../../../../constants/DummyData";

const ImageBlock = ({
  block: {
    content: { path, description, maxSize },
  },
}: ContentBlockProps<ImageBlockState>): React.ReactElement => {
  const [image, setImage] = useState<string | undefined>(
    path ? undefined : DEFAULT_IMAGE,
  );
  const [getContentImage] = useLazyQuery(GET_CONTENT_IMAGE);
  useEffect(() => {
    (async () => {
      if (!path) {
        setImage(DEFAULT_IMAGE);
        return;
      }
      setImage(undefined);
      const { data } = await getContentImage({
        variables: { path },
      });
      setImage(data?.contentImage);
    })();
  }, [path, getContentImage]);
  return (
    <Image
      src={image}
      alt={description}
      maxW={maxSize}
      maxH={maxSize}
      fit="contain"
      fallback={
        <Center maxW={maxSize} maxH={maxSize}>
          <Spinner />
        </Center>
      }
    />
  );
};

export default ImageBlock;
