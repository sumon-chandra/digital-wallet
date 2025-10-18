
import { role } from "@/constants/role";
import { adminSidebarItems } from "@/routes/adminSidebarItems";
import { agentSidebarItems } from "@/routes/agentSidebarItems";
import { userSidebarItems } from "@/routes/userSidebarItems";
import type { TRole } from "@/types/auth.type";

export const getSidebarItems = (userRole: TRole) => {
  switch (userRole) {
    case role.admin:
      return [...adminSidebarItems];
    case role.agent:
      return [...agentSidebarItems];
    case role.user:
      return [...userSidebarItems];
    default:
      return [];
  }
};
