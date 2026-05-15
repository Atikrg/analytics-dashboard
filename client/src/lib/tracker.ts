const API_URL = process.env.NEXT_PUBLIC_API_URL;

function generateSessionId() {
  return "sess_" + crypto.randomUUID();
}

function getSessionId() {
  let sessionId = localStorage.getItem("session_id");

  if (!sessionId) {
    sessionId = generateSessionId();
    localStorage.setItem("session_id", sessionId);
  }

  return sessionId;
}

async function sendEvent(data: any) {
  if (!API_URL) {
    console.error("Tracking failed: NEXT_PUBLIC_API_URL is not defined");
    return;
  }

  const url = `${API_URL.replace(/\/$/, '')}/analytics/events`;

  try {
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error("Tracking failed:", error);
  }
}

export function trackPageView() {
  sendEvent({
    session_id: getSessionId(),
    event_type: "page_view",
    page_url: window.location.href,
    timestamp: new Date().toISOString(),
  });
}

export function trackClick(event: MouseEvent) {
  sendEvent({
    session_id: getSessionId(),
    event_type: "click",
    page_url: window.location.href,
    timestamp: new Date().toISOString(),
    x: event.clientX,
    y: event.clientY,
  });
}