export const clipFrames = Array.from({ length: 20 }).map((_, i) => {
    const num = String(i + 109).padStart(4, '0');
    return `/clips/Sousou no Frieren - 01_${num}.gif`;
});
