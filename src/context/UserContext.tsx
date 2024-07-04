import React from "react";

export const UserContext = React.createContext<{
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
}>({
  name: "",
  setName: () => {},
});
