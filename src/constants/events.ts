export const EventTypes = {
  degustation: 'degustation',
  wineCasino: 'wineCasino',
} as const;

export type TEventTypes = typeof EventTypes[keyof typeof EventTypes];

export const EventNameByType: Record<TEventTypes, string> = {
  [EventTypes.degustation]: 'Дегустация',
  [EventTypes.wineCasino]: 'Винное казино',
}
