"use client";

import { useState } from "react";

type ClickEvent = {
  _id: string;
  x: number;
  y: number;
  page_url: string;
};

export default function HeatmapPage() {
  const [pageUrl, setPageUrl] = useState("");
  const [clicks, setClicks] = useState<ClickEvent[]>([]);

  async function loadHeatmap() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");

    if (!apiUrl) {
      console.error("NEXT_PUBLIC_API_URL is not defined in the client environment");
      return;
    }

    const res = await fetch(
      `${apiUrl}/analytics/heatmap?page_url=${encodeURIComponent(pageUrl)}`
    );

    if (!res.ok) {
      console.error("Heatmap load failed:", res.status, await res.text());
      return;
    }

    const data = await res.json();
    setClicks(data);
  }

  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <div className="mx-auto max-w-5xl rounded-xl bg-white p-8 shadow">
        <h1 className="text-3xl font-bold">Click Heatmap</h1>

        <div className="mt-6 flex gap-3">
          <input
            value={pageUrl}
            onChange={(e) => setPageUrl(e.target.value)}
            placeholder="Enter page URL"
            className="w-full rounded border px-4 py-2"
          />

          <button
            onClick={loadHeatmap}
            className="rounded bg-black px-5 py-2 text-white"
          >
            Load
          </button>
        </div>

        <div className="relative mt-8 h-[600px] rounded-xl border bg-gray-50 overflow-hidden">
          {clicks.map((click) => (
            <div
              key={click._id}
              className="absolute h-4 w-4 rounded-full bg-red-500 opacity-70"
              style={{
                left: click.x,
                top: click.y,
              }}
            />
          ))}
        </div>
      </div>
    </main>
  );
}