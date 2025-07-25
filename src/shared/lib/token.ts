export const saveToken = (token: string) => {
  localStorage.setItem("@taller/auth-token", token);
};

export const deleteToken = () => {
  localStorage.removeItem("@taller/auth-token");
};

export const getToken = () => {
  return typeof window !== "undefined"
    ? localStorage.getItem("@taller/auth-token")
    : null;
};
