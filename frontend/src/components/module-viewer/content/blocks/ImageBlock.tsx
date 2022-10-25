import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";

import {
  ContentBlockProps,
  ImageBlockState,
} from "../../../../types/ContentBlockTypes";
import { GET_CONTENT_IMAGE } from "../../../../APIClients/queries/CourseQueries";
import { DEFAULT_IMAGE } from "../../../../constants/DummyData";

const ImageBlock = ({
  block: {
    content: { path, description },
  },
}: ContentBlockProps<ImageBlockState>): React.ReactElement => {
  const [image, setImage] = useState<string | undefined>();
  const [getContentImage] = useLazyQuery(GET_CONTENT_IMAGE);
  useEffect(() => {
    (async () => {
      if (!path) {
        setImage(DEFAULT_IMAGE);
        return;
      }
      const { data } = await getContentImage({
        variables: { path },
      });
      setImage(data?.contentImage);
    })();
  }, [path]);
  return <img src={image} alt={description} />;
};

export default ImageBlock;
