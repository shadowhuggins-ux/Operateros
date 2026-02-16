"use client";
import { useState } from "react";

export default function Home() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    const res = await fetch("/api/generate", {
      method: "POST",
      body: JSON.stringify({ niche: "online side hustles" })
    });
    setResult(await res.json());
    setLoading(false);
  };

  const upgrade = async () => {
    const res = await fetch("/api/checkout", { method: "POST" });
    const data = await res.json();
    window.location.href = data.url;
  };

  return (
    <main style={{ padding: 40, maxWidth: 600, margin: "auto" }}>
      <h1>OperatorOS</h1>
      <p>Deploy AI workers that build online businesses for you.</p>

      <button onClick={generate} style={{ marginRight: 10 }}>
        {loading ? "Generating..." : "Generate AI Business"}
      </button>

      <button onClick={upgrade}>Upgrade</button>

      {result && (
        <pre style={{ marginTop: 20, background: "#f3f3f3", padding: 10 }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </main>
  );
}