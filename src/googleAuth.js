const GOOGLE_CLIENT_ID = "604435714988-9etr937faqpnbo2p0p537bsc2d75bdnl.apps.googleusercontent.com";
const CHANNEL_NAME = "os_google_login";

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

// Google se wapas aayi redirect page (popup) isko chalati hai:
// hash me id_token ho to opener tab ko BroadcastChannel se bhej kar popup band kar do.
export function processOAuthHash() {
  if (typeof window === "undefined") return null;
  const h = window.location.hash || "";
  if (!h) return null;
  const idM = h.match(/[#&]id_token=([^&]+)/);
  const errM = h.match(/[#&]error=([^&]+)/);
  if (!idM && !errM) return null;
  const result = idM ? { token: decodeURIComponent(idM[1]) } : { error: decodeURIComponent(errM[1]) };
  try {
    window.history.replaceState(null, "", window.location.pathname + window.location.search);
  } catch (e) {}
  try {
    const bc = new BroadcastChannel(CHANNEL_NAME);
    bc.postMessage(idM ? { id_token: result.token } : { error: result.error });
    bc.close();
  } catch (e) {}
  try {
    if (window.opener) {
      setTimeout(() => {
        try {
          window.close();
        } catch (e) {}
      }, 600);
    }
  } catch (e) {}
  return result;
}

// Main tab: Google login popup kholo, BroadcastChannel par id_token ka wait karo.
export function signInWithGoogleOAuth(onCredential, onError) {
  return new Promise((resolve) => {
    let bc = null;
    try {
      bc = new BroadcastChannel(CHANNEL_NAME);
    } catch (e) {
      if (onError) onError("Ye browser support nahi karta — Chrome ya Edge me kholo.");
      resolve({ error: "no-channel" });
      return;
    }
    let done = false;
    const finish = (val) => {
      if (done) return;
      done = true;
      clearTimeout(timer);
      try {
        bc.close();
      } catch (e) {}
      resolve(val);
    };
    const timer = setTimeout(() => {
      if (onError) onError("Google login ka response time-out ho gaya — dobara try karo.");
      finish({ error: "timeout" });
    }, 180000);
    bc.onmessage = (ev) => {
      const d = (ev && ev.data) || {};
      if (d.id_token) {
        onCredential(d.id_token);
        finish({ ok: true });
      } else if (d.error) {
        const e = String(d.error);
        if (onError) {
          onError(
            e.includes("access_denied")
              ? "Google login cancel ho gaya — dobara try karo."
              : "Google login fail ho gaya — dobara try karo."
          );
        }
        finish({ error: e });
      }
    };
    const nonce = Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
    const ru = window.location.origin + "/account";
    const url =
      "https://accounts.google.com/o/oauth2/v2/auth?client_id=" +
      encodeURIComponent(GOOGLE_CLIENT_ID) +
      "&redirect_uri=" +
      encodeURIComponent(ru) +
      "&response_type=id_token&scope=" +
      encodeURIComponent("openid email profile") +
      "&nonce=" +
      encodeURIComponent(nonce) +
      "&prompt=select_account&display=popup";
    let w = null;
    try {
      w = window.open(url, "os_google_login", "width=520,height=640,menubar=no,toolbar=no");
    } catch (e) {
      w = null;
    }
    if (!w) {
      if (onError) onError("Browser ne Google window block ki — popup allow karke dobara try karo.");
      finish({ error: "blocked" });
    }
  });
}
