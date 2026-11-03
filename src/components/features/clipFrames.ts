export const clipFrames = Array.from({ length: 20 }).map((_, i) => {
    const num = String(i).padStart(4, '0');
    return `/clips/frieren_v2_${num}.webp`;
});
