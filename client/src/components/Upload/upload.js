import api from "../../API/axios.js";

export async function uploadFile(file, isPublic = false) {
  if (!file) throw new Error("Select a file");

  try {
    // Get upload URL
    const { data } = await api.post("/file/upload-url", {
      fileSize: file.size,
      originalName: file.name,
    });

    const { uploadUrl, authorizationToken, fileName } = data;

    // Upload to B2
    const b2Res = await fetch(uploadUrl, {
      method: "POST",
      headers: {
        Authorization: authorizationToken,
        "X-Bz-File-Name": encodeURIComponent(fileName),
        "Content-Type": file.type || "application/octet-stream",
        "X-Bz-Content-Sha1": "do_not_verify",
      },
      body: file,
    });

    if (!b2Res.ok) throw new Error("B2 upload failed");

    const result = await b2Res.json();

    // Save metadata
    await api.post("/file/metadata", {
      fileId: result.fileId,
      fileName: result.fileName,
      originalName: file.name,
      mimeType: file.type,
      fileSize: file.size,
      isPublic,
    });

    return { success: true };

  } catch (err) {
    console.error("Upload failed:", err);
    const message =
      err.response?.data?.message || err.message || "Upload failed";
    throw new Error(message);
  }
}
