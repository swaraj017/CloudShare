import API from "../../../API/axios";

export const getPublicFileInfo = async (fileId) => {
  try {
    const response = await API.get(`/file/public/${fileId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to get public file info:", error);
    throw error;
  }
};

export const downloadPublicFile = async (file) => {
  try {
    const res = await API.get(`/file/public/download/${file._id}`, {
      responseType: "blob",
    });

    const blob = new Blob([res.data], { type: file.mimeType });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = file.originalName;
    document.body.appendChild(a);
    a.click();
    a.remove();

    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error("Download error:", err);
    throw err;
  }
};
