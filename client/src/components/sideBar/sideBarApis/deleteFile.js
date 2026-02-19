import API from "../../../API/axios";

export const deleteFile = async (fileId) => {
  try {
    const response = await API.delete(`/file/delete/${fileId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to delete file:", error);
    throw error;
  }
};
