import React, { useEffect, useState } from "react";
import { Table, Text, Button, Flex, Heading, Dialog, TextField } from "@radix-ui/themes";
import { Copy, Plus, Trash2 } from "lucide-react";
import api from "../../API/axios";
import { createApiKey } from "./sideBarApis/apiKey";

export default function ApiKeys() {
  const [keys, setKeys] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [keyName, setKeyName] = useState("");
  const [loading, setLoading] = useState(false);
  const [newKey, setNewKey] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => { api.get("/apikeys").then(r => setKeys(r.data)); }, []);

  const maskKey = k => `${k.slice(0, 6)}••••••••${k.slice(-4)}`;
  const handleCreateKey = async () => {
    if (!keyName.trim()) return alert("Enter a name for the API key");
    setLoading(true);
    try {
      const res = await createApiKey(keyName);
      setKeys([...keys, { key: res.key, name: res.name, createdAt: res.createdAt, _id: res.id }]);
      setNewKey(res.key);
      setKeyName("");
    } catch { alert("Failed to create API key"); }
    finally { setLoading(false); }
  };
  const copyKey = () => {
    navigator.clipboard.writeText(newKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Flex justify="between" align="center" mb="3">
        <Heading size="5">API Keys</Heading>
        <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
          <Dialog.Trigger>
            <Button size="2"><Plus size={16} /> Add Key</Button>
          </Dialog.Trigger>
          <Dialog.Content style={{ maxWidth: 450 }}>
            <Dialog.Title>Create New API Key</Dialog.Title>
            <Dialog.Description size="2" mb="4">
              {newKey
                ? "Your API key has been created. Copy it now—you won't see it again."
                : "Enter a name for your new API key"}
            </Dialog.Description>

            {newKey ? (
              <>
                <div className="mb-4 p-3 bg-gray-100 rounded font-mono text-sm break-all">{newKey}</div>
                <Flex gap="3" justify="end">
                  <Button onClick={copyKey} variant="soft"><Copy size={16} /> {copied ? "Copied!" : "Copy Key"}</Button>
                  <Dialog.Close><Button>Done</Button></Dialog.Close>
                </Flex>
              </>
            ) : (
              <>
                <TextField.Root
                  placeholder="Enter API key name"
                  value={keyName}
                  onChange={e => setKeyName(e.target.value)}
                  onKeyPress={e => e.key === "Enter" && handleCreateKey()}
                  className="mb-4"
                />
                <Flex gap="3" justify="end">
                  <Dialog.Close><Button variant="soft">Cancel</Button></Dialog.Close>
                  <Button onClick={handleCreateKey} disabled={loading}>{loading ? "Creating..." : "Create Key"}</Button>
                </Flex>
              </>
            )}
          </Dialog.Content>
        </Dialog.Root>
      </Flex>

      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {["Name","Key","Created",""].map(h => <Table.ColumnHeaderCell key={h}>{h}</Table.ColumnHeaderCell>)}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {keys.map(k => (
            <Table.Row key={k.key}>
              <Table.Cell>{k.name}</Table.Cell>
              <Table.Cell className="font-mono">{maskKey(k.key)}</Table.Cell>
              <Table.Cell>{new Date(k.createdAt).toLocaleDateString()}</Table.Cell>
              <Table.Cell>
                <Flex gap="2">
                  <Button size="1" variant="ghost"><Copy size={16} /></Button>
                  <Button size="1" variant="ghost" color="red"><Trash2 size={16} /></Button>
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
}
