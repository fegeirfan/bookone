export type View =
  | 'home'
  | 'explore'
  | 'detail'
  | 'reader'
  | 'library'
  | 'writer'
  | 'upload'
  | 'storage'
  | 'profile';

export type BookStatus = 'public' | 'private';
export type SortBy = 'popular' | 'latest';

export type Book = {
  id: number;
  title: string;
  author: string;
  authorId: string;
  genre: string;
  likes: number;
  views: number;
  description: string;
  coverUrl: string;
  status: BookStatus;
  createdAt: string;
  content: string[];
};
