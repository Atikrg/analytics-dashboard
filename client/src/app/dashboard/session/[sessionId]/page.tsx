"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Event = {
  _id: string;
  event_type: string;
  page_url: string;
  timestamp: string;
  x?: number;
  y?: number;
};

export default function SessionJourneyPage() {
  const { sessionId } = useParams();
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");

    if (!apiUrl) {
      console.error("NEXT_PUBLIC_API_URL is not defined in the client environment");
      return;
    }

    fetch(`${apiUrl}/analytics/sessions/${sessionId}/events`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to load events: ${res.status}`);
        }
        return res.json();
      })
      .then(setEvents)
      .catch((error) => {
        console.error("Failed to load session events:", error);
      });
  }, [sessionId]);

  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <div className="mx-auto max-w-4xl rounded-xl bg-white p-8 shadow">
        <h1 className="text-3xl font-bold">User Journey</h1>
        <p className="mt-2 text-gray-500">{sessionId}</p>

        <div className="mt-8 space-y-4">
          {events.map((event, index) => (
            <div key={event._id} className="rounded-lg border p-4">
              <p className="font-bold">
                {index + 1}. {event.event_type}
              </p>

              <p className="text-sm text-gray-600">{event.page_url}</p>

              <p className="text-sm text-gray-500">
                {new Date(event.timestamp).toLocaleString()}
              </p>

              {event.event_type === "click" && (
                <p className="text-sm">
                  X: {event.x}, Y: {event.y}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}