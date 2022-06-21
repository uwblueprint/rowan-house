export interface ModuleRequest {
  id?: string;
  title: string;
  description?: string | null;
  image?: string | null;
  previewImage?: string | null;
  published?: boolean;
  lessons?: string[] | null;
}

export interface ModuleResponse {
  id?: string;
  title: string;
  description?: string | null;
  image?: string | null;
  previewImage?: string | null;
  published?: boolean;
  lessons?: string[] | null;
}

export interface CourseRequest {
  title: string;
  description?: string | null;
  image?: string | null;
  previewImage?: string | null;
  modules?: (ModuleRequest | null)[] | null;
  private?: boolean;
}

export interface CourseResponse {
  id: string;
  title: string;
  description: string | null;
  image: string | null;
  previewImage: string | null;
  modules: (ModuleResponse | null)[] | null;
  private: boolean;
  fileName: string;
}
