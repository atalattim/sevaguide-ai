// Client-side anonymous analytics. Sends only an event name, service slug and language.
export function track(name: string, props: { slug?: string; lang?: string } = {}) {
  try {
    const body = JSON.stringify({ name, ...props });
    if (navigator.sendBeacon) navigator.sendBeacon("/api/events", new Blob([body], { type: "application/json" }));
    else fetch("/api/events", { method: "POST", headers: { "Content-Type": "application/json" }, body, keepalive: true });
  } catch { /* analytics must never break the page */ }
}
