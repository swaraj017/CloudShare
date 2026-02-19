import React, { useEffect, useState } from "react";
import { Heading, Dialog, Button, Flex, Box } from "@radix-ui/themes";
import { Search } from "lucide-react";
import { getMyFiles } from "./sideBarApis/getFile";
import Upload from "../Upload/Upload.jsx";
import FileTable from "./FileTable";

const Myfiles = () => {
  const [allFiles, setAllFiles] = useState([]);
  const [files, setFiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getMyFiles().then(setAllFiles).catch(console.error);
  }, []);

  useEffect(() => {
    const filtered = allFiles.filter(file =>
      file.originalName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFiles(filtered);
  }, [searchTerm, allFiles]);

  return (
    <Box style={{ width: "100%" }}>
      <Flex justify="between" align="center" mb="3">
        <Heading size="5">Recent Uploads</Heading>
        <Dialog.Root>
          <Dialog.Trigger>
            <Button size="2">Upload</Button>
          </Dialog.Trigger>
          <Dialog.Content maxWidth="420px">
            <Dialog.Title>Upload File</Dialog.Title>
            <Upload />
          </Dialog.Content>
        </Dialog.Root>
      </Flex>

      {/* Search Bar */}
      <div style={{
        display: "flex",
        alignItems: "center",
        background: "#111827",
        borderRadius: "8px",
        padding: "10px 12px",
        border: "1px solid #1f2937",
        marginBottom: "16px",
        maxWidth: "400px",
      }}>
        <Search size={18} style={{ color: "#6b7280", marginRight: "8px" }} />
        <input
          type="text"
          placeholder="Search files..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            outline: "none",
            color: "white",
            fontSize: "14px",
          }}
        />
      </div>

      {/* Table */}
      <Box style={{ width: "100%", overflowX: "auto" }}>
        <FileTable files={files} />
      </Box>
    </Box>
  );
};

export default Myfiles;
