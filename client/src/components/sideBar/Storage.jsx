import React, { useEffect, useState } from "react";
import { HardDrive } from "lucide-react";
import axios from "../../API/axios";

const styles = {
  card: { background: "#111827", borderRadius: 12, padding: 20, marginBottom: 16, border: "1px solid #1f2937" },
  heading: { display: "flex", alignItems: "center", gap: 8, color: "#e5e7eb", fontSize: 16, fontWeight: 600, marginBottom: 16 },
  label: { marginBottom: 8, color: "#9ca3af", fontSize: 14 },
  barContainer: { background: "#1f2937", height: 8, borderRadius: 4, overflow: "hidden" },
  bar: percent => ({
    background: `hsl(${percent > 80 ? 0 : 180},100%,50%)`,
    width: `${percent}%`,
    height: "100%",
    transition: "width 0.3s",
  }),
};

const StorageCard = () => {
  const [storage, setStorage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/auth/profile")
      .then(res => {
        const profile = res.data;
        setStorage({
          used: profile.storageUsed,
          limit: profile.storageLimit,
          percent: profile.storagePercent,
        });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ color: "#6b7280" }}>Loading storage...</div>;
  if (!storage) return <div style={{ color: "#ef4444" }}>Failed to load storage</div>;

  return (
    <div style={styles.card}>
      <h2 style={styles.heading}><HardDrive size={18} /> Storage</h2>
      <div style={styles.label}>
        {(storage.used / 1024 / 1024).toFixed(2)} MB / {(storage.limit / 1024 / 1024).toFixed(2)} MB • {storage.percent}%
      </div>
      <div style={styles.barContainer}>
        <div style={styles.bar(storage.percent)} />
      </div>
    </div>
  );
};

export default StorageCard;
