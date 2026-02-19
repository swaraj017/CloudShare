import React, { useState } from "react";
import { uploadFile } from "./upload";
import { Upload as UploadIcon, CheckCircle, AlertCircle } from "lucide-react";

const Upload = ({ onUploadComplete }) => {
  const [file, setFile] = useState(null);
  const [isPublic, setIsPublic] = useState("private");
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true); setMessage(""); setIsError(false);
    try {
      await uploadFile(file, isPublic === "public");
      setMessage("Upload successful!"); setFile(null); setIsPublic("private");
      onUploadComplete?.();
    } catch (err) {
      setMessage(err.message); setIsError(true);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3">

      {/* Dropzone */}
      <label className="block border-2 border-dashed rounded-xl p-6 text-center cursor-pointer hover:border-gray-800">
        <input type="file" hidden disabled={uploading} onChange={e => setFile(e.target.files[0])} />
        <UploadIcon className="mx-auto mb-2 text-gray-400" size={28} />
        <p className="font-semibold">{file ? file.name : "Choose a file"}</p>
        <p className="text-xs text-gray-400">{file ? `${(file.size/1024/1024).toFixed(2)} MB` : "Click to browse"}</p>
      </label>

      {/* Access Toggle */}
      <div className="grid grid-cols-2 gap-2">
        {["private","public"].map(val => (
          <button key={val} disabled={uploading} onClick={() => setIsPublic(val)}
            className={`p-2 rounded-lg font-semibold text-sm border ${isPublic===val ? "bg-gray-900 text-white border-gray-900" : "bg-white text-gray-500 border-gray-300"}`}>
            {val==="private" ? "🔒 Private" : "🔓 Public"}
          </button>
        ))}
      </div>
      <p className="text-xs text-gray-400 -mt-1">
        {isPublic==="private" ? "Only you can access this file" : "Anyone with the link can download"}
      </p>

      {/* Upload Button */}
      <button disabled={!file || uploading} onClick={handleUpload}
        className={`w-full p-3 rounded-lg font-semibold text-sm ${!file || uploading ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-gray-900 text-white"}`}>
        <UploadIcon size={17} className="inline mr-1" /> {uploading ? "Uploading..." : "Upload File"}
      </button>

      {/* Message */}
      {message && (
        <div className={`flex items-center gap-2 p-2 rounded-lg text-sm border ${isError ? "bg-red-50 border-red-300 text-red-600" : "bg-green-50 border-green-300 text-green-600"}`}>
          {isError ? <AlertCircle size={16}/> : <CheckCircle size={16}/>} {message}
        </div>
      )}

    </div>
  );
};

export default Upload;
