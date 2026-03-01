-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create profiles table
create table profiles (
  id uuid not null references auth.users on delete cascade,
  username text,
  avatar_url text,
  primary key (id)
);

-- Create books table
create table books (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  author text not null,
  description text,
  cover_url text
);

-- Create user_books table
create table user_books (
  user_id uuid references profiles (id) on delete cascade,
  book_id uuid references books (id) on delete cascade,
  status text default 'reading',
  primary key (user_id, book_id)
);

-- Enable Row Level Security
alter table profiles enable row level security;
alter table books enable row level security;
alter table user_books enable row level security;

-- Policies (simplified for example)
create policy profile_policy on profiles for select using (true);
create policy books_policy on books for select using (true);
create policy user_books_policy on user_books for select using (true);