import React from "react";
import { Draggable } from 'react-beautiful-dnd';

import {
  ContentType,
  ContentTextProps,
  ContentImageProps,
  ContentTypeEnum,
} from "../../types/ModuleEditorTypes";
import { TextBlock, ImageBlock } from "../common/content";

/* eslint-disable react/jsx-props-no-spreading */

const SelectContentBlock = (content: ContentType): React.ReactElement => {
  switch (content.type) {
    case ContentTypeEnum.TEXT:
      return <TextBlock content={content.content as ContentTextProps} />;
    case ContentTypeEnum.IMAGE:
      return <ImageBlock content={content.content as ContentImageProps} />;
    default:
      throw Error("Unknown content type given to EditableContentBlock");
  }
};

const EditableContentBlock = ({
  content,
  index
}: {
  content: ContentType;
  index: number;
}): React.ReactElement => {
  return (
    <Draggable
		draggableId={content.id}
		index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          style={provided.draggableProps.style}>
            {/* dragHandleProps allows the user to grab the Draggable */}
          <div
            className='handle'
            {...provided.dragHandleProps}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M3,15H21V13H3V15M3,19H21V17H3V19M3,11H21V9H3V11M3,5V7H21V5H3Z"
              />
            </svg>
          </div>
          {SelectContentBlock(content)}
          {/* {provided.placeholder} */}
        </div>
      )}
    </Draggable>
  );
};

export default EditableContentBlock;
