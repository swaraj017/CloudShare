import React, { useEffect, useState } from "react";
import { User, Mail, Calendar } from "lucide-react";
import axios from "../../API/axios";
import StorageCard from "./Storage.jsx"; // Optional, can include if you want below account

const styles = {
  container: { maxWidth: 600, margin: "0 auto", fontFamily: "sans-serif" },
  card: { background: "#111827", borderRadius: 12, padding: 20, marginBottom: 16, border: "1px solid #1f2937" },
  heading: { color: "#e5e7eb", fontSize: 16, fontWeight: 600, marginBottom: 16 },
  label: { display: "flex", alignItems: "center", gap: 8, color: "#9ca3af", fontSize: 14, marginBottom: 6 },
  value: { background: "#1f2937", padding: 10, borderRadius: 8, color: "#e5e7eb", fontSize: 14 },
};

const Field = ({ icon: Icon, label, value }) => (
  <div style={{ marginBottom: 12 }}>
    <div style={styles.label}><Icon size={18} /> {label}</div>
    <div style={styles.value}>{value}</div>
  </div>
);

const Settings = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/auth/profile")
      .then(res => setProfile(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ color: "#6b7280" }}>Loading...</div>;
  if (!profile) return <div style={{ color: "#ef4444" }}>Failed to load profile</div>;

  const fields = [
    { icon: User, label: "Username", value: profile.username },
    { icon: Mail, label: "Email", value: profile.email },
    { icon: Calendar, label: "Joined", value: new Date(profile.createdAt).toLocaleDateString() },
  ];

  return (
    <div style={styles.container}>
      <h1 style={{ color: "white", fontSize: 24, marginBottom: 24 }}>User Details</h1>

      <div style={styles.card}>
        <h2 style={styles.heading}>Account</h2>
        {fields.map(f => <Field key={f.label} {...f} />)}
      </div>

       
      <StorageCard />
    </div>
  );
};

export default Settings;
