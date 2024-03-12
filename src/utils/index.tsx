export const getCurrentAccount: any = () => {
  return JSON.parse(localStorage.getItem("account") ?? "{}");
};
