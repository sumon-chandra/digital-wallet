export const getDashboardPath = (role: string) => {
  switch (role) {
    case "ADMIN":
      return "/admin/dashboard";
    case "AGENT":
      return "/agent/dashboard";
    case "USER":
      return "/user/dashboard";
    default:
      return "/"; // fallback
  }
};
