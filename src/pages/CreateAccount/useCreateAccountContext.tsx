import React from "react";
import CreateAccountContext from "./createAccountContext";

export const useCreateAccountContext = () => {
  const context = React.useContext(CreateAccountContext);
  if (context === undefined) {
    throw new Error(
      "useCreateAccountContext must be used within a CreateAccountContextProvider"
    );
  }
  return context;
};
