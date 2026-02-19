import API from "../../../API/axios";

export const toggleFileAccess = async (fileId, isPublic) => {
  try {
    const response = await API.put(`/file/toggle-access/${fileId}`, { isPublic });
    return response.data.file;
  } catch (error) {
    console.error("Failed to toggle file access:", error);
    throw error;
  }
};
