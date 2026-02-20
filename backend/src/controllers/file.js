import dotenv from "dotenv";
dotenv.config();

import { nanoid } from "nanoid";
import { authorizeB2 } from "../connections/storageCon.js";
import File from "../models/file.js";
import User from "../models/user.js";

// export const getUploadUrl = async (req, res) => {
//   try {
//     const { fileSize, originalName } = req.body;

//     if (!fileSize || !originalName)
//       return res.status(400).json({ message: "Invalid request" });

//     const user = await User.findById(req.user.id);
//     if (!user) return res.status(401).json({ message: "User not found" });

//     if (user.creditsUsed + fileSize > user.creditLimit) {
//       return res.status(403).json({
//         message: "Credit limit exceeded",
//         remaining: Math.max(0, user.creditLimit - user.creditsUsed),
//       });
//     }

//     const B2 = await authorizeB2();
//     const { data } = await B2.getUploadUrl({
//       bucketId: process.env.B2_BUCKET_ID,
//     });

//     // 🔥 INCLUDE extension + folder
//     const extension = originalName.split(".").pop();
//     const uniqueName = `filestoresys/${nanoid(16)}.${extension}`;

//     res.json({
//       uploadUrl: data.uploadUrl,
//       authorizationToken: data.authorizationToken,
//       fileName: uniqueName,
//     });

//   } catch (err) {
//     console.error("getUploadUrl error:", err);
//     res.status(500).json({ message: "Failed to get upload URL" });
//   }
// };

export const uploadFile = async (req, res) => {
  try {
    const { isPublic = false } = req.body;
    const file = req.file; // using multer

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const user = await User.findById(req.user.id);
    if (!user) return res.status(401).json({ message: "User not found" });

    if (user.creditsUsed + file.size > user.creditLimit) {
      return res.status(403).json({ message: "Credit limit exceeded" });
    }

    const B2 = await authorizeB2();

    const { data } = await B2.getUploadUrl({
      bucketId: process.env.B2_BUCKET_ID,
    });

    const extension = file.originalname.split(".").pop();
    const uniqueName = `filestoresys/${nanoid(16)}.${extension}`;

    const uploadResponse = await B2.uploadFile({
      uploadUrl: data.uploadUrl,
      uploadAuthToken: data.authorizationToken,
      fileName: uniqueName,
      data: file.buffer,
    });

    const storageUrl = `${process.env.B2_DOWNLOAD_URL}/file/${process.env.B2_BUCKET_NAME}/${uniqueName}`;

    const savedFile = await File.create({
      owner: req.user.id,
      filename: uniqueName,
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      b2FileId: uploadResponse.data.fileId,
      storageUrl,
      access: isPublic ? "public" : "private",
    });

    await User.findByIdAndUpdate(req.user.id, {
      $inc: { creditsUsed: file.size },
    });

    res.status(201).json({ message: "Uploaded successfully", file: savedFile });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Upload failed" });
  }
};
export const saveFileMeta = async (req, res) => {
  try {
    const { fileName, originalName, mimeType, fileId, fileSize, isPublic = false } = req.body;

    if (!fileName || !originalName || !mimeType || !fileId || !fileSize) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const user = await User.findById(req.user.id);
    if (!user) return res.status(401).json({ message: "User not found" });

    const storageUrl = `${process.env.B2_DOWNLOAD_URL}/file/${process.env.B2_BUCKET_NAME}/${fileName}`;

    const file = await File.create({
      owner: req.user.id,
      filename: fileName,
      originalName,
      mimeType,
      size: fileSize,
      b2FileId: fileId,
      storageUrl,
      access: isPublic ? "public" : "private",
      publicLink: null,
    });

    await User.findByIdAndUpdate(req.user.id, { $inc: { creditsUsed: fileSize } });

    res.status(201).json({ message: "File uploaded successfully", file });
  } catch (err) {
    console.error("saveFileMeta error:", err);
    res.status(500).json({ message: "Metadata save failed" });
  }
};

export const getMyFiles = async (req, res) => {
  try {
    const files = await File.find({ owner: req.user.id }).sort({ createdAt: -1 });
    res.json(files);
  } catch (err) {
    console.error("getMyFiles error:", err);
    res.status(500).json({ message: "Failed to fetch files" });
  }
};

export const toggleFileAccess = async (req, res) => {
  try {
    const { fileId } = req.params;
    const { isPublic } = req.body;

    if (typeof isPublic !== "boolean") return res.status(400).json({ message: "isPublic must be boolean" });

    const file = await File.findById(fileId);
    if (!file || file.owner.toString() !== req.user.id) return res.status(404).json({ message: "File not found" });

    const publicLink = isPublic ? `${process.env.FRONTEND_URL || "http://localhost:5173"}/public/${fileId}` : null;

    const updatedFile = await File.findByIdAndUpdate(
      fileId,
      { access: isPublic ? "public" : "private", publicLink },
      { new: true }
    );

    res.json({ message: `File is now ${isPublic ? "public" : "private"}`, file: updatedFile });
  } catch (err) {
    console.error("toggleFileAccess error:", err);
    res.status(500).json({ message: "Failed to toggle file access" });
  }
};

export const downloadFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file || file.owner.toString() !== req.user.id) return res.status(404).json({ message: "File not found" });

    const B2 = await authorizeB2();
    const response = await B2.downloadFileByName({
      bucketName: process.env.B2_BUCKET_NAME,
      fileName: file.filename,
      responseType: "arraybuffer",
    });

    const buffer = Buffer.from(response.data);
    res.set({
      "Content-Type": file.mimeType || "application/octet-stream",
      "Content-Disposition": `attachment; filename="${file.originalName}"`,
      "Content-Length": buffer.length,
    });
    
    res.send(buffer);
  } catch (err) {
    console.error("Download error:", err);
    res.status(500).json({ message: "Download failed" });
  }
};



export const deleteFile = async (req, res) => {
  try {
    const { fileId } = req.params;

    const file = await File.findById(fileId);
    if (!file || file.owner.toString() !== req.user.id) {
      return res.status(404).json({ message: "File not found" });
    }

    // Delete file from B2 storage
    try {
      const B2 = await authorizeB2();
      await B2.deleteFileVersion({
        fileId: file.b2FileId,
        fileName: file.filename,
      });
    } catch (b2Error) {
      console.error("B2 deletion error:", b2Error);
      // Continue with database deletion even if B2 deletion fails
    }

    // Delete file record from database
    await File.findByIdAndDelete(fileId);

    // Refund credits to user
    await User.findByIdAndUpdate(req.user.id, { $inc: { creditsUsed: -file.size } });

    res.json({ message: "File deleted successfully" });
  } catch (err) {
    console.error("deleteFile error:", err);
    res.status(500).json({ message: "Failed to delete file" });
  }
};

export const getPublicFileInfo = async (req, res) => {
  try {
    const { fileId } = req.params;

    const file = await File.findById(fileId);
    if (!file) return res.status(404).json({ message: "File not found" });
    if (file.access !== "public") return res.status(403).json({ message: "File is not public" });

    // Return file info without sensitive data
    res.json({
      _id: file._id,
      originalName: file.originalName,
      mimeType: file.mimeType,
      size: file.size,
      access: file.access,
      createdAt: file.createdAt,
    });
  } catch (err) {
    console.error("getPublicFileInfo error:", err);
    res.status(500).json({ message: "Failed to fetch file info" });
  }
};


export const downloadPublicFile = async (req, res) => {
  try {
    const { fileId } = req.params;

    const file = await File.findById(fileId);
    if (!file) return res.status(404).json({ message: "File not found" });
    if (file.access !== "public")
      return res.status(403).json({ message: "File is not public" });

    console.log("Downloading B2 file:", file.filename);

    const B2 = await authorizeB2();

    const response = await B2.downloadFileByName({
      bucketName: process.env.B2_BUCKET_NAME,
      fileName: file.filename, // must EXACTLY match
    });

    res.set({
      "Content-Type": file.mimeType || "application/octet-stream",
      "Content-Disposition": `attachment; filename="${file.originalName}"`,
    });

    res.send(response.data);
  } catch (err) {
    console.error("Download public file error:", err.response?.data || err);
    res.status(500).json({ message: "Download failed" });
  }
};
