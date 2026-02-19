import React from "react";
import { Download, Copy, Lock, Unlock, Trash2 } from "lucide-react";

const FileCard = ({
  file,
  loadingId,
  downloadingId,
  copiedId,
  onToggleAccess,
  onCopy,
  onDownload,
  onDelete
}) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4 space-y-3 shadow-sm">

      <div className="flex justify-between items-start">
        <div className="max-w-[70%] truncate font-medium text-white text-sm">
          {file.originalName}
        </div>

        <span
          className={`text-xs px-2 py-1 rounded ${
            file.access === "public"
              ? "bg-teal-100 text-teal-600"
              : "bg-gray-700 text-gray-400"
          }`}
        >
          {file.access}
        </span>
      </div>

      <div className="text-xs text-gray-400 flex justify-between">
        <span>{file.originalName.split(".").pop().toUpperCase()}</span>
        <span>{new Date(file.createdAt).toLocaleDateString()}</span>
      </div>

      <div className="flex gap-2 pt-2">
        <button
          onClick={() => onToggleAccess(file)}
          disabled={loadingId === file._id}
          className="p-2 bg-gray-700 rounded hover:bg-gray-600"
        >
          {file.access === "public" ? <Lock size={16} /> : <Unlock size={16} />}
        </button>

        {file.access === "public" && file.publicLink && (
          <button
            onClick={() => onCopy(file._id, file.publicLink)}
            className={`p-2 bg-gray-700 rounded hover:bg-gray-600 ${
              copiedId === file._id ? "text-green-500" : ""
            }`}
          >
            <Copy size={16} />
          </button>
        )}

        <button
          onClick={() => onDownload(file)}
          disabled={downloadingId === file._id}
          className="p-2 bg-gray-700 rounded hover:bg-gray-600"
        >
          <Download size={16} />
        </button>

        <button
          onClick={() => onDelete(file)}
          className="p-2 bg-gray-700 rounded hover:bg-gray-600 text-red-400"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default FileCard;
