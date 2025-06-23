import React from "react";
import AuthState from "./AuthState";

export default function AppProvider({ children }) {
  return <AuthState>{children}</AuthState>;
}
