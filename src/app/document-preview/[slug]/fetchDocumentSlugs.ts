import { useDocument } from "../../../contexts/DocumentContext";

const FethDocumentSlug = () => {
  const { documentName } = useDocument();
  return documentName;
};

export default FethDocumentSlug;
