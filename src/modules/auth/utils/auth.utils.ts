import type { AuthUser, UserRole } from "@/modules/auth/types/auth.types";

export function hasRole(user: AuthUser | null, roles: UserRole[]) {
  return Boolean(user && roles.includes(user.role));
}
