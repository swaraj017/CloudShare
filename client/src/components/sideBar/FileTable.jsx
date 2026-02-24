import React, { useEffect, useState } from "react";
import { Download, Share, Lock, Unlock, Trash2 } from "lucide-react";
import { downloadFile } from "./sideBarApis/getFile";
import { toggleFileAccess } from "./sideBarApis/toggleFileAccess";
import { deleteFile } from "./sideBarApis/deleteFile";

const FileTable = ({ files }) => {
  const [list, setList] = useState(files || []);
  const [selected, setSelected] = useState([]);
  const [copiedId, setCopiedId] = useState(null);
  const [toggledId, setToggledId] = useState(null);

  useEffect(() => {
    setList(files || []);
    setSelected([]);
  }, [files]);
 

  const toggleOne = (id) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );

  const toggleAll = () =>
    setSelected(
      selected.length === list.length ? [] : list.map((f) => f._id)
    );

  const bulkDelete = async () => {
    await Promise.all(selected.map(deleteFile));
    setList(list.filter((f) => !selected.includes(f._id)));
    setSelected([]);
  };
 

  const removeOne = async (file) => {
    await deleteFile(file._id);
    setList(list.filter((f) => f._id !== file._id));
  };

  const toggleAccess = async (file) => {
    const updated = await toggleFileAccess(
      file._id,
      file.access !== "public"
    );

    setList(list.map((f) => (f._id === file._id ? updated : f)));

    setToggledId(file._id);
    setTimeout(() => setToggledId(null), 400);
  };

  const copyLink = (file) => {
    navigator.clipboard.writeText(file.publicLink);
    setCopiedId(file._id);
    setTimeout(() => setCopiedId(null), 800);
  };

  return (
    <div className="bg-gray-900 rounded-xl p-5">

      {/* Bulk Bar */}
      {selected.length > 0 && (
        <div className="mb-4 flex justify-between items-center">
          <span className="text-sm text-gray-400">
            {selected.length} selected
          </span>
          <button
            onClick={bulkDelete}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-sm transition"
          >
            Delete Selected
          </button>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full min-w-[750px] border-collapse text-sm">
          <thead className="text-gray-400 text-left">
            <tr>
              <th className="pb-3">
                <input
                  type="checkbox"
                  checked={
                    selected.length === list.length && list.length > 0
                  }
                  onChange={toggleAll}
                />
              </th>
              <th className="pb-3">Name</th>
              <th className="pb-3">Access</th>
              <th className="pb-3">Type</th>
              <th className="pb-3">Uploaded</th>
              <th className="pb-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {list.length ? (
              list.map((file) => (
                <tr
                  key={file._id}
                  className="border-t border-gray-800 hover:bg-gray-800/40 transition"
                >
                  <td className="py-3">
                    <input
                      type="checkbox"
                      checked={selected.includes(file._id)}
                      onChange={() => toggleOne(file._id)}
                    />
                  </td>

                  <td className="py-3 max-w-[200px] truncate">
                    {file.originalName}
                  </td>

                  <td className="py-3">
                    <button
                      onClick={() => toggleAccess(file)}
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded text-xs font-medium transition-all duration-200 
                      ${
                        toggledId === file._id
                          ? "bg-green-600 scale-105"
                          : file.access === "public"
                          ? "bg-teal-600/20 text-teal-400 hover:bg-teal-600/30 hover:scale-105"
                          : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:scale-105"
                      }`}
                    >
                      {file.access === "public" ? (
                        <Unlock size={14} />
                      ) : (
                        <Lock size={14} />
                      )}
                      {file.access}
                    </button>
                  </td>

                  <td className="py-3">
                    {file.originalName.split(".").pop().toUpperCase()}
                  </td>

                  <td className="py-3">
                    {new Date(file.createdAt).toLocaleDateString()}
                  </td>

                  <td className="py-3 text-right">
                    <div className="flex gap-2 justify-end">

                      {file.access === "public" && file.publicLink && (
                        <button
                          onClick={() => copyLink(file)}
                          className={`p-2 rounded transition-all duration-200 
                          ${
                            copiedId === file._id
                              ? "bg-green-600 scale-110"
                              : "bg-gray-800 hover:bg-gray-700 hover:scale-110"
                          }`}
                        >
                          <Share size={16} />
                        </button>
                      )}

                      <button
                        onClick={() => downloadFile(file)}
                        className="p-2 bg-gray-800 hover:bg-gray-700 hover:scale-110 transition rounded"
                      >
                        <Download size={16} />
                      </button>

                      <button
                        onClick={() => removeOne(file)}
                        className="p-2 bg-gray-800 hover:bg-red-600/20 hover:scale-110 transition rounded text-red-400"
                      >
                        <Trash2 size={16} />
                      </button>

                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-6 text-center text-gray-400">
                  No files uploaded yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FileTable;