export interface FaqItem {
  id: string
  question: string
  answer: string
}

interface FaqResponse {
  items: FaqItem[]
}

const API_BASE = (import.meta.env.VITE_ADMIN_API_URL as string || 'http://localhost:3001').replace(/\/$/, '')

export async function fetchFaqItems(): Promise<FaqItem[]> {
  const res = await fetch(`${API_BASE}/api/faq`)
  if (!res.ok) {
    throw new Error(`FAQ fetch failed: ${res.status}`)
  }
  const payload = (await res.json()) as FaqResponse
  return payload.items || []
}
