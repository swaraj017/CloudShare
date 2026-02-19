// getFile.js
import API from "../../../API/axios";
// attach token for all requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); 
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});


// fetch files
export const getMyFiles = async () => {
  try {
    const res = await API.get("/file/my-files");
    return res.data;
  } catch (err) 
  {
    console.error("getMyFiles error:", err);
    throw err;
  }
};

export const downloadFile = async (file) => {
  try {
    const res = await API.get(`/file/download/${file._id}`, {
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
  }
};
