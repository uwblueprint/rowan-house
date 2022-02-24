

export interface ModulePreviewProps {
  title: String,
  description?: String,
  published: Boolean,
}
  
export interface CoursePreviewProps {
  title: String,
  description?: String,
  isPrivate: Boolean,
  modules: Array<ModulePreviewProps>,
}