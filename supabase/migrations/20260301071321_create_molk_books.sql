create table if not exists public.molk_books (
  id bigint generated always as identity primary key,
  title text not null,
  author text not null,
  author_id text not null default 'unknown',
  genre text not null default 'General',
  likes integer not null default 0,
  views integer not null default 0,
  description text not null default '',
  cover_url text not null default '',
  status text not null default 'public' check (status in ('public', 'private')),
  created_at date not null default current_date,
  content jsonb not null default '[]'::jsonb,
  inserted_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_molk_books_status on public.molk_books (status);
create index if not exists idx_molk_books_created_at on public.molk_books (created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_molk_books_updated_at on public.molk_books;
create trigger trg_molk_books_updated_at
before update on public.molk_books
for each row
execute function public.set_updated_at();

alter table public.molk_books enable row level security;

drop policy if exists "molk_books_select_all" on public.molk_books;
create policy "molk_books_select_all"
on public.molk_books
for select
using (true);

drop policy if exists "molk_books_insert_all" on public.molk_books;
create policy "molk_books_insert_all"
on public.molk_books
for insert
to anon, authenticated
with check (true);

drop policy if exists "molk_books_update_all" on public.molk_books;
create policy "molk_books_update_all"
on public.molk_books
for update
to anon, authenticated
using (true)
with check (true);

insert into public.molk_books
  (title, author, author_id, genre, likes, views, description, cover_url, status, created_at, content)
select *
from (
  values
    (
      'Lembah Senyap',
      'Alya N.',
      'alya',
      'Fantasy',
      120,
      1280,
      'Seorang gadis menemukan desa di balik kabut yang menyimpan sejarah gelap.',
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&auto=format&fit=crop',
      'public',
      date '2026-02-20',
      '["Kabut turun sejak subuh dan menelan lereng sampai tak menyisakan jejak.","Rina menuruni jalan setapak itu tanpa tahu bahwa ia sedang berjalan menuju lembah yang tak ada di peta.","Di gerbang kayu tua, seseorang berbisik: Selamat datang kembali."]'::jsonb
    ),
    (
      'Bintang di Atap Kota',
      'Arif M.',
      'arif',
      'Romance',
      88,
      940,
      'Kisah dua orang asing yang bertemu setiap malam di rooftop apartemen.',
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&auto=format&fit=crop',
      'public',
      date '2026-02-26',
      '["Malam itu lampu kota menyala seperti peta konstelasi yang jatuh ke bumi.","Nara membawa kopi hitam, sementara Dimas datang dengan catatan lagu yang belum selesai.","Mereka diam lama, lalu tertawa pada hal kecil yang sama."]'::jsonb
    ),
    (
      'Catatan Hujan Senja',
      'Kinan R.',
      'kinan',
      'Islami',
      154,
      1730,
      'Refleksi harian tentang sabar, syukur, dan perjalanan pulang ke diri sendiri.',
      'https://images.unsplash.com/photo-1474932430478-367dbb6832c1?w=800&auto=format&fit=crop',
      'public',
      date '2026-02-10',
      '["Hujan sore menunda langkah, tetapi tidak menunda doa yang sudah lama ingin dipanjatkan.","Aku belajar bahwa tenang bukan berarti tanpa masalah, melainkan tahu ke mana harus bersandar.","Hari ini aku menulis satu kalimat: cukupkan hatiku dengan yang cukup di sisi-Mu."]'::jsonb
    ),
    (
      'Draft Novel A',
      'Kamu',
      'me',
      'Fantasy',
      0,
      0,
      'Naskah awal tentang petualangan di kota bawah tanah.',
      'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&auto=format&fit=crop',
      'private',
      date '2026-02-28',
      '["Ini draft chapter pertama. Masih butuh revisi struktur konflik."]'::jsonb
    ),
    (
      'Draft Artikel B',
      'Kamu',
      'me',
      'Edukasi',
      0,
      0,
      'Naskah awal tentang teknik membaca cepat.',
      'https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?w=800&auto=format&fit=crop',
      'private',
      date '2026-03-01',
      '["Pembukaan artikel. Fokus pada ritme, retensi, dan kebiasaan membaca harian."]'::jsonb
    )
) as seed(title, author, author_id, genre, likes, views, description, cover_url, status, created_at, content)
where not exists (select 1 from public.molk_books limit 1);
