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
  const [documentLink, setDocumentLinkState] = useState<string | null>(null);
  const [documentName, setDocumentNameState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Flag untuk menunjukkan bahwa data sudah di-load dari localStorage
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLink = localStorage.getItem("documentLink");
      const storedName = localStorage.getItem("documentName");
      if (storedLink) setDocumentLinkState(storedLink);
      if (storedName) setDocumentNameState(storedName);
      setInitialized(true);
    }
  }, []);

  const setDocumentLink = (link: string) => {
    setDocumentLinkState(link);
    if (typeof window !== "undefined") {
      localStorage.setItem("documentLink", link);
    }
  };

  const setDocumentName = (name: string) => {
    setDocumentNameState(name);
    if (typeof window !== "undefined") {
      localStorage.setItem("documentName", name);
    }
  };

  useEffect(() => {
    if (initialized && typeof window !== "undefined") {
      if (!documentLink) localStorage.removeItem("documentLink");
      if (!documentName) localStorage.removeItem("documentName");
    }
  }, [documentLink, documentName, initialized]);

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
  if (!context) {
    throw new Error("useDocument must be used within a DocumentProvider");
  }
  return context;
};

