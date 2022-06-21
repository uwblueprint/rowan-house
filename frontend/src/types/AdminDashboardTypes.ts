import { UserResponse } from "../APIClients/types/UserClientTypes";

export enum AdminPage {
  ManageCourses,
  ManageUsers,
}

export interface SidebarProps {
  currentPage: AdminPage;
}

export interface SearchUsersBarProps {
  onUserSelect: (user: UserResponse) => void;
}

export type UserCardProps = UserResponse & SearchUsersBarProps;
