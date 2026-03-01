<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { Heart, Eye } from 'lucide-svelte';
  import type { Book } from '../../types/app';

  export let bookmarkBooks: Book[] = [];
  export let historyBooks: Book[] = [];

  const dispatch = createEventDispatcher<{
    openBook: Book;
    readBook: Book;
  }>();
</script>

<section class="space-y-8">
  <h2 class="text-3xl font-semibold">Perpustakaan Saya</h2>

  <div>
    <h3 class="mb-4 text-lg font-semibold">Bookmark</h3>
    <div class="grid gap-4">
      {#if bookmarkBooks.length === 0}
        <p class="rounded-xl bg-zinc-50 p-6 text-sm text-zinc-500">Belum ada bookmark.</p>
      {/if}
      {#each bookmarkBooks as book}
        <article class="grid gap-4 rounded-2xl border border-zinc-200 bg-white p-4 md:grid-cols-[88px_1fr_auto] md:items-center">
          <img src={book.coverUrl} alt={book.title} class="h-24 w-[88px] rounded-lg object-cover" />
          <div>
            <h3 class="font-semibold">{book.title}</h3>
            <p class="text-sm text-zinc-500">{book.author} • {book.genre}</p>
            <div class="mt-2 flex items-center gap-4 text-sm text-zinc-600">
              <span class="inline-flex items-center gap-1.5"><Heart class="h-4 w-4" /> {book.likes}</span>
              <span class="inline-flex items-center gap-1.5"><Eye class="h-4 w-4" /> {book.views}</span>
            </div>
          </div>
          <button class="ui-btn ui-btn-secondary ui-btn-small" onclick={() => dispatch('openBook', book)}>Detail</button>
        </article>
      {/each}
    </div>
  </div>

  <div>
    <h3 class="mb-4 text-lg font-semibold">Riwayat Baca</h3>
    <div class="grid gap-4">
      {#if historyBooks.length === 0}
        <p class="rounded-xl bg-zinc-50 p-6 text-sm text-zinc-500">Belum ada riwayat baca.</p>
      {/if}
      {#each historyBooks as book}
        <article class="grid gap-4 rounded-2xl border border-zinc-200 bg-white p-4 md:grid-cols-[88px_1fr_auto] md:items-center">
          <img src={book.coverUrl} alt={book.title} class="h-24 w-[88px] rounded-lg object-cover" />
          <div>
            <h3 class="font-semibold">{book.title}</h3>
            <p class="text-sm text-zinc-500">{book.author} • {book.genre}</p>
            <div class="mt-2 flex items-center gap-4 text-sm text-zinc-600">
              <span class="inline-flex items-center gap-1.5"><Heart class="h-4 w-4" /> {book.likes}</span>
              <span class="inline-flex items-center gap-1.5"><Eye class="h-4 w-4" /> {book.views}</span>
            </div>
          </div>
          <button class="ui-btn ui-btn-secondary ui-btn-small" onclick={() => dispatch('readBook', book)}>Baca</button>
        </article>
      {/each}
    </div>
  </div>
</section>
