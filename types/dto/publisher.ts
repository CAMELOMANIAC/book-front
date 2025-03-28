export type Publisher = {
  id: string;
  name: string;
  description: string;
  websiteUrl: string;
  logoUrl: string;
  newsletterUrl: string;
  playlistUrl: string;
  createdAt: string;
  updatedAt: string;
};

export type PublisherInput = {
  name: string;
  description?: string;
  websiteUrl?: string;
  logoUrl?: string;
  newsletterUrl?: string;
  playlistUrl?: string;
};
