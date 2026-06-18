export const getVeinOriginsSquare = (cx, cy, R) => {
  const STEP = 48;
  const OFFSET = 24;

  const aMin = Math.floor((cx - OFFSET - R) / STEP);
  const aMax = Math.ceil((cx - OFFSET + R) / STEP);
  const bMin = Math.floor((cy - OFFSET - R) / STEP);
  const bMax = Math.ceil((cy - OFFSET + R) / STEP);

  const results = [];

  for (let a = aMin; a <= aMax; a++) {
    const px = a * STEP + OFFSET;
    const dx = px - cx;
    if (Math.abs(dx) > R) continue;

    for (let b = bMin; b <= bMax; b++) {
      const py = b * STEP + OFFSET;
      const dy = py - cy;
      if (Math.abs(dy) > R) continue;
      results.push([px, py]);
    }
  }
	
	results.push([cx, cy])
  return results;
}