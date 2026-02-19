import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Download, AlertCircle, Loader2 } from "lucide-react";
import {
  getPublicFileInfo,
  downloadPublicFile,
} from "./sideBar/sideBarApis/publicShare";

export default function SharePage() {
  const { fileId } = useParams();
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | error | ready
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const fetchFile = async () => {
      try {
        const data = await getPublicFileInfo(fileId);
        setFile(data);
        setStatus("ready");
      } catch (err) {
        setStatus("error");
      }
    };
    fetchFile();
  }, [fileId]);

  const handleDownload = async () => {
    if (!file) return;
    setDownloading(true);
    try {
      await downloadPublicFile(file);
    } catch {
      setStatus("error");
    } finally {
      setDownloading(false);
    }
  };

  const extension =
    file?.originalName?.split(".")?.pop()?.toUpperCase() || "FILE";

  return (
    <div className="min-h-screen bg-black text-gray-200 flex flex-col items-center justify-center p-6 relative">

      {/* 🔥 Promotion Header */}
      <Link
        to="/"
        className="absolute top-8 text-center hover:opacity-80 transition"
      >
       <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
  <img 
    src="https://img.icons8.com/?size=100&id=4iopi8K1fYnj&format=png&color=ffffff" 
    alt="CloudShare logo"
    className="w-9 h-9"
  />
  CloudShare
</h1>

        <p className="text-sm text-gray-500">
          Fast • Secure • Simple File Sharing
        </p>
      </Link>

      {/* Main Card */}
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-xl text-center space-y-6">

        {/* Loading */}
        {status === "loading" && (
          <>
            <Loader2 className="animate-spin mx-auto text-teal-400" size={40} />
            <p className="text-gray-400">Loading file...</p>
          </>
        )}

        {/* Error */}
        {status === "error" && (
          <>
            <AlertCircle className="mx-auto text-red-400" size={40} />
            <h2 className="text-xl font-semibold text-white">
              File Not Found
            </h2>
            <p className="text-gray-500 text-sm">
              This file may have been removed or is not publicly available.
            </p>
          </>
        )}

        {/* Ready */}
        {status === "ready" && file && (
          <>
            <div className="w-20 h-20 mx-auto rounded-xl bg-teal-600/20 flex items-center justify-center text-teal-400 font-bold text-xl">
              {extension}
            </div>

            <h2 className="text-lg font-semibold break-words text-white">
              {file.originalName}
            </h2>

            <button
              onClick={handleDownload}
              disabled={downloading}
              className="w-full bg-teal-600 hover:bg-teal-700 disabled:opacity-50 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition"
            >
              {downloading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Downloading...
                </>
              ) : (
                <>
                  <Download size={18} />
                  Download File
                </>
              )}
            </button>

            <p className="text-xs text-gray-500">
              Public file — anyone with this link can download.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
