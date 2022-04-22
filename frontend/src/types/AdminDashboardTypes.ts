import { Module } from "../APIClients/types/CourseClientTypes";
import { UserResponse } from "../APIClients/types/UserClientTypes";

export interface ModulePreviewProps {
  index: number;
  courseId: string;
  title: string;
  image: string | null;
  published: boolean;
}

export interface CoursePreviewProps {
  courseId: string;
  title: string;
  description: string | null;
  isPrivate: boolean;
  modules: Module[] | null;
}

export enum AdminPage {
  ManageCourses,
  ManageUsers,
}

export interface SidebarProps {
  currentPage: AdminPage;
}

export type UserCardProps = UserResponse;

export interface SearchUsersBarProps {
  onUserSelect: (user: UserCardProps) => void;
}
