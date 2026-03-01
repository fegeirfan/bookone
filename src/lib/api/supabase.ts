import type { Book, BookStatus } from '../types/app';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase env vars: VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY');
}

type MolkBookRow = {
  id: number;
  title: string;
  author: string;
  author_id: string;
  genre: string;
  likes: number;
  views: number;
  description: string;
  cover_url: string;
  status: BookStatus;
  created_at: string;
  content: unknown;
};

function toBook(row: MolkBookRow): Book {
  const content = Array.isArray(row.content)
    ? row.content.filter((item): item is string => typeof item === 'string')
    : [];

  return {
    id: row.id,
    title: row.title,
    author: row.author,
    authorId: row.author_id,
    genre: row.genre,
    likes: row.likes,
    views: row.views,
    description: row.description,
    coverUrl: row.cover_url,
    status: row.status,
    createdAt: row.created_at,
    content
  };
}

function authHeaders() {
  return {
    apikey: supabaseAnonKey,
    Authorization: `Bearer ${supabaseAnonKey}`
  };
}

export async function getBooks(): Promise<Book[]> {
  const select = 'id,title,author,author_id,genre,likes,views,description,cover_url,status,created_at,content';
  const url = `${supabaseUrl}/rest/v1/molk_books?select=${encodeURIComponent(select)}&order=created_at.desc`;

  const response = await fetch(url, {
    headers: {
      ...authHeaders()
    }
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch books: ${errorText}`);
  }

  const rows = (await response.json()) as MolkBookRow[];
  return rows.map(toBook);
}

export async function createBook(input: Omit<Book, 'id'>): Promise<Book> {
  const payload = {
    title: input.title,
    author: input.author,
    author_id: input.authorId,
    genre: input.genre,
    likes: input.likes,
    views: input.views,
    description: input.description,
    cover_url: input.coverUrl,
    status: input.status,
    created_at: input.createdAt,
    content: input.content
  };

  const select = 'id,title,author,author_id,genre,likes,views,description,cover_url,status,created_at,content';
  const response = await fetch(`${supabaseUrl}/rest/v1/molk_books?select=${encodeURIComponent(select)}`, {
    method: 'POST',
    headers: {
      ...authHeaders(),
      'Content-Type': 'application/json',
      Prefer: 'return=representation'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to create book: ${errorText}`);
  }

  const rows = (await response.json()) as MolkBookRow[];
  if (!rows.length) throw new Error('Failed to create book: empty response');
  return toBook(rows[0]);
}
