export const PARTICIPANTS = ['Anton', 'Swim', 'Michelle', 'Mike', 'Anna'] as const;
export type Participant = typeof PARTICIPANTS[number];

export const TOTAL_DRIVERS = 22;

export function generatePickOrder(): Participant[] {
  const order: Participant[] = [];
  let slot = 0;
  while (order.length < TOTAL_DRIVERS) {
    const roundIndex = Math.floor(slot / PARTICIPANTS.length);
    const isReversed = roundIndex % 2 === 1;
    const round = isReversed ? [...PARTICIPANTS].reverse() : [...PARTICIPANTS];
    for (const p of round) {
      if (order.length < TOTAL_DRIVERS) order.push(p);
      slot++;
    }
  }
  return order;
}

export function currentPicker(picksCount: number): Participant | null {
  const order = generatePickOrder();
  return picksCount < order.length ? order[picksCount] : null;
}
