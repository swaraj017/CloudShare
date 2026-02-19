import React, { useState } from "react";
import { BarChart, Bar, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Cell } from "recharts";

const data = [
  { name: "Jan", value: 340 }, { name: "Feb", value: 320 }, { name: "Mar", value: 360 },
  { name: "Apr", value: 300 }, { name: "May", value: 330 }, { name: "Jun", value: 310 },
  { name: "Jul", value: 350 }, { name: "Aug", value: 410 },
];

const max = Math.max(...data.map(d => d.value));

const Tip = ({ active, payload, label }) =>
  active && payload?.length ? (
    <div style={{ background: "#111", border: "1px solid #222", borderRadius: 10, padding: "10px 16px" }}>
      <p style={{ color: "#888", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</p>
      <p style={{ color: "#fff", fontSize: 20, fontWeight: 600 }}> <span style={{ fontSize: 12, color: "#555" }}></span></p>
    </div>
  ) : null;

export default function Chart() {
  const [active, setActive] = useState(null);
  return (
    <div style={{ height: 240 }}>
      <ResponsiveContainer>
        <BarChart data={data} barCategoryGap="35%" margin={{ top: 4, right: 0, left: -20, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke="#ebebeb" />
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#aaa", fontSize: 12 }} dy={10} />
          <YAxis axisLine={false} tickLine={false} tick={{ fill: "#bbb", fontSize: 11 }} tickCount={5} />
          <Tooltip content={<Tip />} cursor={{ fill: "rgba(0,0,0,0.04)", radius: 6 }} />
          <Bar dataKey="value" radius={[6, 6, 2, 2]} onMouseEnter={(_, i) => setActive(i)} onMouseLeave={() => setActive(null)}>
            {data.map((d, i) => (
              <Cell key={i} fill={d.value === max ? "#111" : active === i ? "#333" : "#d4d4d4"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}