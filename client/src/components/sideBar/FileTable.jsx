import React, { useState, useEffect } from "react";
import { Download, Copy, Lock, Unlock, Trash2 } from "lucide-react";
import { downloadFile } from "./sideBarApis/getFile";
import { toggleFileAccess } from "./sideBarApis/toggleFileAccess";
import { deleteFile } from "./sideBarApis/deleteFile";
import FileCard from "./FileCard.jsx";

const FileTable = ({ files }) => {
  const [filesList, setFilesList] = useState(files || []);
  const [downloadingId, setDownloadingId] = useState(null);
  const [loadingId, setLoadingId] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    setFilesList(files || []);
  }, [files]);

  const handleDownload = async file => {
    setDownloadingId(file._id);
    try {
      await downloadFile(file);
    } catch {
      alert("Failed to download file");
    } finally {
      setDownloadingId(null);
    }
  };

  const handleToggleAccess = async file => {
    setLoadingId(file._id);
    try {
      const updated = await toggleFileAccess(file._id, file.access !== "public");
      setFilesList(filesList.map(f => f._id === file._id ? updated : f));
    } catch {
      alert("Failed to toggle file access");
    } finally {
      setLoadingId(null);
    }
  };

  const copyPublicUrl = (fileId, link) => {
    if (!link) return;
    navigator.clipboard.writeText(link);
    setCopiedId(fileId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDeleteFile = async (file) => {
    setDeletingId(file._id);
    try {
      await deleteFile(file._id);
      setFilesList(filesList.filter(f => f._id !== file._id));
      setDeleteConfirm(null);
    } catch {
      alert("Failed to delete file");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
      <div className="bg-gray-900 rounded-xl p-5 shadow-[0_0_40px_rgba(0,255,170,0.03)]">

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full min-w-[750px] border-collapse">
            <thead className="text-gray-400 text-left">
              <tr>
                <th className="pb-3">Name</th>
                <th className="pb-3">Access</th>
                <th className="pb-3">Type</th>
                <th className="pb-3">Uploaded</th>
                <th className="pb-3"></th>
              </tr>
            </thead>
            <tbody>
              {filesList.length ? filesList.map(file => (
                <tr key={file._id} className="border-t border-gray-800">
                  <td className="py-3 max-w-[200px] truncate">{file.originalName}</td>
                  <td>
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-sm ${
                      file.access === "public"
                        ? "bg-teal-100 text-teal-500"
                        : "bg-gray-700 text-gray-400"
                    }`}>
                      {file.access === "public" ? <Unlock size={14} /> : <Lock size={14} />}
                      {file.access}
                    </span>
                  </td>
                  <td>{file.originalName.split(".").pop().toUpperCase()}</td>
                  <td>{new Date(file.createdAt).toLocaleDateString()}</td>
                  <td className="text-right">
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => handleToggleAccess(file)}
                        disabled={loadingId === file._id}
                        className="px-3 py-2 rounded bg-gray-800 hover:bg-gray-700"
                      >
                        {file.access === "public" ? <Lock size={16} /> : <Unlock size={16} />}
                      </button>

                      {file.access === "public" && file.publicLink && (
                        <button
                          onClick={() => copyPublicUrl(file._id, file.publicLink)}
                          className={`px-3 py-2 rounded bg-gray-800 hover:bg-gray-700 ${
                            copiedId === file._id ? "text-green-500" : "text-gray-400"
                          }`}
                        >
                          <Copy size={16} />
                        </button>
                      )}

                      <button
                        onClick={() => handleDownload(file)}
                        disabled={downloadingId === file._id}
                        className="px-3 py-2 rounded bg-gray-800 hover:bg-gray-700"
                      >
                        <Download size={16} />
                      </button>

                      <button
                        onClick={() => setDeleteConfirm(file._id)}
                        className="px-3 py-2 rounded bg-gray-800 hover:bg-gray-700 text-red-400"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5" className="py-6 text-center text-gray-400">
                    No files uploaded yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-3">
  {filesList.length ? (
    filesList.map(file => (
      <FileCard
        key={file._id}
        file={file}
        loadingId={loadingId}
        downloadingId={downloadingId}
        copiedId={copiedId}
        onToggleAccess={handleToggleAccess}
        onCopy={copyPublicUrl}
        onDownload={handleDownload}
        onDelete={(file) => setDeleteConfirm(file._id)}
      />
    ))
  ) : (
    <div className="text-center text-gray-400 py-6">
      No files uploaded yet
    </div>
  )}
</div>

      </div>

      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-sm">
            <h3 className="text-lg font-semibold text-white mb-2">Delete File?</h3>
            <p className="text-gray-400 mb-6">
              Are you sure you want to delete{" "}
              <strong>{filesList.find(f => f._id === deleteConfirm)?.originalName}</strong>?
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={() =>
                  handleDeleteFile(filesList.find(f => f._id === deleteConfirm))
                }
                className="px-4 py-2 rounded bg-red-600 hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FileTable;
