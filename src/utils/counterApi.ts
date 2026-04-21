const API_URL = import.meta.env.VITE_COUNTERAPI_URL;

export async function incrementDownload(): Promise<number | null> {
  try {
    const res = await fetch(API_URL, { method: "POST" });
    const data = await res.json();
    return data.value ?? null;
  } catch (err) {
    console.error("incrementDownload error", err);
    return null;
  }
}

export async function getDownloadCount(): Promise<number | null> {
  try {
    const res = await fetch(API_URL, { method: "GET" });
    const data = await res.json();
    return data.value ?? null;
  } catch (err) {
    console.error("getDownloadCount error", err);
    return null;
  }
}