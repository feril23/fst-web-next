"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface DocumentContextType {
  documentLink: string | null;
  setDocumentLink: (link: string) => void;
  documentName: string | null;
  setDocumentName: (name: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
}

const DocumentContext = createContext<DocumentContextType | undefined>(undefined);

export const DocumentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Ambil data dari localStorage saat pertama kali komponen dimuat
  const [documentLink, setDocumentLinkState] = useState<string | null>(
    () => localStorage.getItem("documentLink") || null
  );
  const [documentName, setDocumentNameState] = useState<string | null>(
    () => localStorage.getItem("documentName") || null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fungsi pembungkus untuk menyimpan ke localStorage
  const setDocumentLink = (link: string) => {
    setDocumentLinkState(link);
    localStorage.setItem("documentLink", link);
  };

  const setDocumentName = (name: string) => {
    setDocumentNameState(name);
    localStorage.setItem("documentName", name);
  };

  // Membersihkan localStorage saat documentLink atau documentName dihapus
  useEffect(() => {
    if (!documentLink) localStorage.removeItem("documentLink");
    if (!documentName) localStorage.removeItem("documentName");
  }, [documentLink, documentName]);

  return (
    <DocumentContext.Provider
      value={{
        documentLink,
        setDocumentLink,
        documentName,
        setDocumentName,
        isLoading,
        setIsLoading,
        error,
        setError,
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
};

export const useDocument = () => {
  const context = useContext(DocumentContext);
  if (context === undefined) {
    throw new Error("useDocument must be used within a DocumentProvider");
  }
  return context;
};

