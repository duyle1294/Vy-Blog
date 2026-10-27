export const DUMMY_IMAGES = [
  '/images/dummy-images/artboard-1.png',
  '/images/dummy-images/artboard-2.png',
  '/images/dummy-images/artboard-3.png',
  '/images/dummy-images/artboard-4.png',
  '/images/dummy-images/artboard-5.png'
] as const

// Deterministic pick (same on server and client, avoids hydration mismatch).
export function pickDummyImage(seed: string | number = 0): string {
  const key = String(seed)
  let hash = 0
  for (let i = 0; i < key.length; i++) {
    hash = (hash * 31 + key.charCodeAt(i)) >>> 0
  }
  return DUMMY_IMAGES[hash % DUMMY_IMAGES.length] as string
}
