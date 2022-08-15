import React from "react";
import { ContentType } from "../../../../APIClients/types/LessonClientTypes";
import {
  ContentBlockProps,
  ContentBlockTypeToState,
} from "../../../../types/ContentBlockTypes";
import { EditContentModalProps } from "../../../../types/ModuleEditorTypes";
import ContentBlockRenderer from "./ContentBlockRenderer";

export interface ConfigEntry<T extends ContentType> {
  renderBlock: React.ComponentType<
    ContentBlockProps<ContentBlockTypeToState<T>>
  >;
  renderEditModal: React.ComponentType<
    EditContentModalProps<ContentBlockTypeToState<T>>
  >;
}

export type ContentBlockRendererConfig = {
  [Type in ContentType]: ConfigEntry<Type>;
};

export type ContentBlockRendererOverrideConfig = Partial<ContentBlockRendererConfig>;

export type ContentBlockPropsMap = {
  [K in ContentType]: ContentBlockProps<ContentBlockTypeToState<K>>;
};

export type EditContentModalPropsMap = {
  [K in ContentType]: EditContentModalProps<ContentBlockTypeToState<K>>;
};

export type ContentBlocks = ContentBlockRenderer<
  ContentBlockProps,
  ContentBlockPropsMap
>;
export type ContentBlockModals = ContentBlockRenderer<
  EditContentModalProps,
  EditContentModalPropsMap
>;
