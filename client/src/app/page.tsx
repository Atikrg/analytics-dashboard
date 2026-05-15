"use client";

import { useEffect } from "react";
import { trackClick, trackPageView } from "@/lib/tracker";
import Link from "next/link";

export default function Home() {
  useEffect(() => {
    trackPageView();
    document.addEventListener("click", trackClick);

    return () => {
      document.removeEventListener("click", trackClick);
    };
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <div className="mx-auto max-w-4xl rounded-xl bg-white p-8 shadow">
        <h1 className="text-3xl font-bold">Analytics Demo Page</h1>
        <p className="mt-2 text-gray-600">
          Click anywhere. Events will be sent to backend.
        </p>

        <div className="mt-8 flex gap-4">
          <button className="rounded bg-blue-600 px-5 py-3 text-white">
            Buy Now
          </button>

          <button className="rounded bg-green-600 px-5 py-3 text-white">
            Add To Cart
          </button>

          <Link
            href="/dashboard"
            className="rounded bg-black px-5 py-3 text-white"
          >
            Dashboard
          </Link>
        </div>

        <div className="mt-10 h-80 rounded-xl bg-blue-100 p-6">
          Click Area
        </div>
      </div>
    </main>
  );
}