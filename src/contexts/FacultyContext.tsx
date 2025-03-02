"use client";

import { createContext, useContext } from "react";

const FacultyContext = createContext(null);

export function FacultyProvider({ children, faculty }) {
  return <FacultyContext.Provider value={faculty}>{children}</FacultyContext.Provider>;
}

export function useFaculty() {
  return useContext(FacultyContext);
}
