export type DraftPick = {
  driverSlug: string;
  participant: string;
  pickNumber: number;
};

export type DraftState = {
  picks: DraftPick[];
  saved: boolean;
  startedAt: string | null;
};

export type GetDraftResponse = {
  draftState: DraftState;
  pickOrder: string[];
  currentPicker: string | null;
  availableDriverSlugs: string[];
};
