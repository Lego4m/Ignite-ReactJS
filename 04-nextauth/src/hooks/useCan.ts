import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

type useCanParams = {
  permissions?: string[];
  roles?: string[]
}

export function useCan({ permissions, roles }: useCanParams) {
  const { user, isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return false;
  }

  if (permissions?.length > 0) {
    const hasAllPermisions = permissions.every(permission => {
      return user.permissions.includes(permission);
    });

    if (!hasAllPermisions) {
      return false;
    }
  }

  if (roles?.length > 0) {
    const hasSomeRole = roles.some(role => {
      return user.roles.includes(role);
    });

    if (!hasSomeRole) {
      return false;
    }
  }

  return true;
}