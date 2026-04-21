const API_BASE_URL = import.meta.env.VITE_COUNTERAPI_URL;

export async function incrementDownload(): Promise<number | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/increment`, {
      method: "POST",
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();
    return data.value ?? null;
  } catch (err) {
    console.error("incrementDownload error", err);
    return null;
  }
}

export async function getDownloadCount(): Promise<number | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/count`, {
      method: "GET",
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();
    return data.value ?? null;
  } catch (err) {
    console.error("getDownloadCount error", err);
    return null;
  }
}