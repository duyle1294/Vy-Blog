export const DUMMY_IMAGES = [
  '/images/dummy-images/beautiful-landscape-around-lake-kawaguchiko.jpg',
  '/images/dummy-images/lake-with-trees.jpg',
  '/images/dummy-images/waterfall-nature-thailand.jpg'
] as const

/**
 * Pick a dummy image from a seed. Deterministic so SSR and client render the same
 * markup (true Math.random would cause hydration mismatches).
 */
export function pickDummyImage(seed: string | number = 0): string {
  const key = String(seed)
  let hash = 0
  for (let i = 0; i < key.length; i++) {
    hash = (hash * 31 + key.charCodeAt(i)) >>> 0
  }
  return DUMMY_IMAGES[hash % DUMMY_IMAGES.length] as string
}
