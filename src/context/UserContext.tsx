import React from "react";

export const UserContext = React.createContext<{
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
}>({
  username: "",
  setUsername: () => {},
});
