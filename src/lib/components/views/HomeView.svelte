<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { Heart, Eye } from 'lucide-svelte';
  import type { Book } from '../../types/app';

  export let trendingBooks: Book[] = [];
  export let latestBooks: Book[] = [];
  export let categories: string[] = [];

  const dispatch = createEventDispatcher<{
    openBook: Book;
    explore: void;
    writer: void;
    chooseCategory: string;
  }>();
</script>

<section class="grid gap-10 md:grid-cols-[1.4fr_1fr]">
  <div class="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-zinc-200">
    <p class="mb-2 text-xs uppercase tracking-[0.28em] text-zinc-500">Temukan Cerita Pilihan</p>
    <h2 class="max-w-xl text-4xl font-semibold leading-tight text-zinc-900 md:text-5xl">Buka buku favoritmu dan nikmati bacaan yang terasa ringan.</h2>
    <p class="mt-4 max-w-xl text-base text-zinc-600">Cari judul yang kamu suka, simpan favorit, dan lanjut membaca kapan pun kamu mau.</p>
    <div class="mt-8 flex flex-wrap gap-3">
      <button class="ui-btn ui-btn-primary" onclick={() => dispatch('explore')}>Jelajahi Semua Buku</button>
      <button class="ui-btn ui-btn-secondary" onclick={() => dispatch('writer')}>Upload Karya</button>
    </div>
  </div>

  <div class="rounded-3xl border border-zinc-200 bg-white p-6">
    <h3 class="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500">Kategori</h3>
    <div class="mt-4 flex flex-wrap gap-2">
      {#each categories as category}
        <button class="rounded-full bg-zinc-100 px-4 py-2 text-sm text-zinc-700" onclick={() => dispatch('chooseCategory', category)}>{category}</button>
      {/each}
    </div>
    <div class="mt-8 rounded-2xl border border-sky-100 bg-sky-50 p-5 text-zinc-700">
      <p class="text-xs uppercase tracking-[0.2em] text-sky-700">Mulai dari Sini</p>
      <p class="mt-2 text-sm">Jelajahi koleksi, buka buku yang kamu suka, lalu simpan bacaan favoritmu.</p>
    </div>
  </div>
</section>

<section class="mt-14">
  <div class="mb-6 flex items-end justify-between">
    <h3 class="text-2xl font-semibold">Trending</h3>
    <button class="ui-btn ui-btn-secondary ui-btn-small" onclick={() => dispatch('explore')}>Lihat semua</button>
  </div>
  <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {#each trendingBooks as book}
      <button type="button" class="book-card text-left" onclick={() => dispatch('openBook', book)}>
        <img src={book.coverUrl} alt={book.title} class="h-64 w-full rounded-xl object-cover" />
        <div class="mt-4">
          <h4 class="line-clamp-2 text-lg font-semibold">{book.title}</h4>
          <p class="mt-1 text-sm text-zinc-500">{book.author}</p>
          <div class="mt-3 flex items-center gap-4 text-sm text-zinc-600">
            <span class="inline-flex items-center gap-1.5"><Heart class="h-4 w-4" /> {book.likes}</span>
            <span class="inline-flex items-center gap-1.5"><Eye class="h-4 w-4" /> {book.views}</span>
          </div>
        </div>
      </button>
    {/each}
  </div>
</section>

<section class="mt-14">
  <h3 class="mb-6 text-2xl font-semibold">Buku Terbaru</h3>
  <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
    {#each latestBooks as book}
      <button class="rounded-2xl border border-zinc-200 bg-white p-4 text-left transition hover:border-zinc-400" onclick={() => dispatch('openBook', book)}>
        <p class="text-sm text-zinc-500">{book.genre}</p>
        <p class="mt-2 line-clamp-2 text-base font-semibold">{book.title}</p>
        <p class="mt-1 text-sm text-zinc-500">{book.author}</p>
      </button>
    {/each}
  </div>
</section>

<style>
  .book-card {
    border: 1px solid rgb(228 228 231);
    border-radius: 1rem;
    background: white;
    padding: 1rem;
    transition: transform 120ms ease, border-color 120ms ease;
  }

  .book-card:hover {
    transform: translateY(-4px);
    border-color: rgb(161 161 170);
  }
</style>
