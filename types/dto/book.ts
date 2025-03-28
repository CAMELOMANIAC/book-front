export type Book = {
  id: string;
  title: string;
  author: string;
  publisherId: string;
  publisher: string;
  publishDate: string;
  description: string;
  imageUrl: string;
  isbn: string;
  createdAt: string;
  updatedAt: string;
};

export type BookInput = {
  title: string;
  author: string;
  publisherId: string;
  publishDate: string;
  description?: string;
  imageUrl?: string;
  isbn?: string;
};
