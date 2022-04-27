import { UserResponse } from "../APIClients/types/UserClientTypes";

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
