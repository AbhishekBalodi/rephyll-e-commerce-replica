const AUTH_EXPIRED_EVENT = "rephyl-auth-expired";

export const isUnauthorizedError = (error: unknown): boolean => {
  const message =
    typeof error === "string"
      ? error
      : error && typeof error === "object" && "message" in error
        ? String((error as { message?: unknown }).message || "")
        : "";

  return /401|unauthorized|forbidden|token|expired/i.test(message);
};

export const handleAuthExpired = () => {
  localStorage.removeItem("rephyl_token");
  localStorage.removeItem("rephyl_user");
  localStorage.removeItem("rephyl_personId");
  localStorage.removeItem("rephyl_tenantId");
  window.dispatchEvent(new Event(AUTH_EXPIRED_EVENT));
};

export const getAuthExpiredEventName = () => AUTH_EXPIRED_EVENT;