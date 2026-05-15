"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Session = {
  _id: string;
  total_events: number;
  first_event: string;
  last_event: string;
};

export default function DashboardPage() {
  const [sessions, setSessions] = useState<Session[]>([]);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");

    if (!apiUrl) {
      console.error("NEXT_PUBLIC_API_URL is not defined in the client environment");
      return;
    }

    fetch(`${apiUrl}/analytics/sessions`)
      .then((res) => res.json())
      .then(setSessions)
      .catch((error) => {
        console.error("Failed to load sessions:", error);
      });
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <div className="mx-auto max-w-5xl rounded-xl bg-white p-8 shadow">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Sessions Dashboard</h1>

          <Link href="/heatmap" className="rounded bg-black px-4 py-2 text-white">
            Heatmap
          </Link>
        </div>

        <div className="mt-8 overflow-hidden rounded-lg border">
          <table className="w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3 text-left">Session ID</th>
                <th className="p-3 text-left">Total Events</th>
                <th className="p-3 text-left">Last Event</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {sessions.map((session) => (
                <tr key={session._id} className="border-t">
                  <td className="p-3">{session._id}</td>
                  <td className="p-3">{session.total_events}</td>
                  <td className="p-3">
                    {new Date(session.last_event).toLocaleString()}
                  </td>
                  <td className="p-3">
                    <Link
                      href={`/dashboard/session/${session._id}`}
                      className="text-blue-600 underline"
                    >
                      View Journey
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {sessions.length === 0 && (
            <p className="p-5 text-gray-500">No sessions found.</p>
          )}
        </div>
      </div>
    </main>
  );
}