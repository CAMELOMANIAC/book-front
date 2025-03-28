export enum EventTag {
  SOLO = "solo",
  GROUP = "group",
}

export type Event = {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  imageUrl: string;
  tag: EventTag;
  createdAt: string;
  updatedAt: string;
};

export type EventInput = {
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  location?: string;
  imageUrl?: string;
  tag: EventTag;
};
