/**
 * Extracts the file ID from a Google Drive URL
 * Supports various Google Drive URL formats:
 * - https://drive.google.com/file/d/{fileId}/view
 * - https://drive.google.com/open?id={fileId}
 * - https://docs.google.com/document/d/{fileId}/edit
 * - https://drive.google.com/uc?id={fileId}
 * - https://drive.google.com/uc?export=view&id={fileId}
 */
export const extractGoogleDriveFileId = (url: string): string | null => {
  try {
    // Return null for invalid/empty URLs
    if (!url) return null;

    const urlObj = new URL(url);

    // Handle different URL patterns
    if (urlObj.hostname === "drive.google.com" || urlObj.hostname === "docs.google.com") {
      // Pattern: /file/d/{fileId}/view
      const filePathMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
      if (filePathMatch) return filePathMatch[1];

      // Pattern: ?id={fileId}
      const searchParams = new URLSearchParams(urlObj.search);
      const fileId = searchParams.get("id");
      if (fileId) return fileId;

      // Pattern: /document/d/{fileId}
      const docPathMatch = url.match(/\/document\/d\/([a-zA-Z0-9_-]+)/);
      if (docPathMatch) return docPathMatch[1];
    }

    return null;
  } catch (error) {
    console.error("Error extracting Google Drive file ID:", error);
    return null;
  }
};
