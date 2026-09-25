const GOOGLE_CLIENT_ID = "604435714988-9etr937faqpnbo2p0p537bsc2d75bdnl.apps.googleusercontent.com";

let scriptPromise = null;

function loadGsiScript() {
  if (typeof window === "undefined") return Promise.reject(new Error("no-window"));
  if (window.google && window.google.accounts && window.google.accounts.id) return Promise.resolve();
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = "https://accounts.google.com/gsi/client";
    s.async = true;
    s.defer = true;
    s.onload = () => resolve();
    s.onerror = () => {
      scriptPromise = null;
      reject(new Error("gsi-script-failed"));
    };
    document.head.appendChild(s);
  });
  return scriptPromise;
}

export function parseGoogleCredential(credential) {
  const part = String(credential || "").split(".")[1];
  if (!part) throw new Error("bad-credential");
  const b64 = part.replace(/-/g, "+").replace(/_/g, "/");
  const json = decodeURIComponent(
    atob(b64)
      .split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join("")
  );
  const payload = JSON.parse(json);
  if (!payload.email && !payload.sub) throw new Error("empty-profile");
  return payload;
}

export async function renderGoogleButton(container, onCredential, onError) {
  if (!container) return;
  await loadGsiScript();
  window.google.accounts.id.initialize({
    client_id: GOOGLE_CLIENT_ID,
    callback: (resp) => {
      if (resp && resp.credential) onCredential(resp.credential);
      else if (onError) onError("Google se response nahi mila — dobara try karo.");
    },
    error_callback: (err) => {
      const type = String(err && err.type);
      if (!onError) return;
      if (type === "popup_closed" || type === "cancelled") {
        onError("Google login cancel ho gaya — dobara try karo.");
      } else if (type === "popup_failed_to_open") {
        onError("Browser ne Google window block ki — popup allow karke dobara try karo.");
      } else {
        onError("Google login fail ho gaya — dobara try karo.");
      }
    },
  });
  container.innerHTML = "";
  window.google.accounts.id.renderButton(container, {
    theme: "outline",
    size: "large",
    type: "standard",
    text: "continue_with",
    width: 320,
  });
}
