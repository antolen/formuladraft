// 1st = 20 points down to 20th = 1 point; 21st and below, DNFs, etc. score 0
export const getPointsForPosition = (pos: string | number): number => {
  const position = Number(pos);
  if (!position) return 0;
  return Math.max(0, 21 - position);
}
