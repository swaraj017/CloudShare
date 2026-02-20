import api from "../../API/axios.js";

export async function uploadFile(file, isPublic = false) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("isPublic", isPublic);

  await api.post("/file/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return { success: true };
}
