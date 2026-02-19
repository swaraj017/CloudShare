import API from "../../../API/axios";

export const createApiKey = async (name) => {
  try {
    const response = await API.post("/apikeys/create", { name });
    return response.data;
  } catch (error) {
    console.error("Failed to create API key:", error);
    throw error;
  }
};

export const getUsage = async () => {
  try {
    const response = await API.get("/apikeys/key-usage");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch usage:", error);
    throw error;  // Propagate error to caller so it can handle it
  }
};
