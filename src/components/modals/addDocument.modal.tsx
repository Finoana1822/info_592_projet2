import React, { useState } from "react";
import Swal from "sweetalert2";
import { createDocument } from "../../services/document.service";
import { UserState } from "../../context/authContext/authContext";
import { DocumentType } from "../../@types/document.type";

interface AddDocumentModalProps {
  onClose: () => void;
  addDocumentToList: (newDocument: DocumentType) => void;
  parentId?: number | null;
}

const AddDocumentModal: React.FC<AddDocumentModalProps> = ({ onClose, addDocumentToList, parentId }) => {
  const { userInfo } = UserState();
  const [name, setName] = useState<string>("");
  const [type, setType] = useState<"folder" | "file">("file");
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false); // État pour gérer le chargement

  const user_id = userInfo?.id || 0;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return; // Ne rien faire si déjà en cours de chargement

    setIsLoading(true);
    try {
      if (type === "file" && !file) {
        throw new Error("Veuillez sélectionner un fichier.");
      }

      const formData = new FormData();
      formData.append("name", name);
      formData.append("type", type);
      formData.append("user_id", String(user_id));
      if (type === "file") {
        formData.append("file", file!);
      }
      if (parentId !== null && parentId !== undefined) {
        formData.append("parent_id", String(parentId)); // Ajouter parent_id si non null
      }

      const addedDocument = await createDocument(formData);
      Swal.fire({
        icon: "success",
        title: "Document ajouté",
        text: `Le document "${addedDocument.name}" a été ajouté avec succès.`,
      });
      setName("");
      setType("file");
      setFile(null);
      addDocumentToList(addedDocument); // Mettre à jour la liste des documents dans Home
      onClose(); // Fermer le modal après l'ajout du document
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Une erreur est survenue lors de l'ajout du document.",
      });
      console.error("Error creating document:", error);
    } finally {
      setIsLoading(false); // Assurez-vous de désactiver le chargement
    }
  };

  return (
    <div className="modal fade show" tabIndex={-1} role="dialog" style={{ display: "block" }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">Ajouter un document</h5>
              <button type="button" className="close" onClick={onClose}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="documentName">Nom du document</label>
                <input
                  type="text"
                  className="form-control"
                  id="documentName"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="documentType">Type de document</label>
                <select
                  className="form-control"
                  id="documentType"
                  value={type}
                  onChange={(e) => setType(e.target.value as "folder" | "file")}
                  required
                >
                  <option value="file">Fichier</option>
                  <option value="folder">Dossier</option>
                </select>
              </div>
              {type === "file" && (
                <div className="form-group">
                  <label htmlFor="documentFile">Sélectionner un fichier</label>
                  <input
                    type="file"
                    className="form-control"
                    id="documentFile"
                    onChange={handleFileChange}
                    required
                  />
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose} disabled={isLoading}>
                Annuler
              </button>
              <button type="submit" className="btn btn-primary" disabled={isLoading}>
                {isLoading ? "Chargement..." : "Ajouter"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDocumentModal;