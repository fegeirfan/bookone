<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { Heart, Eye } from 'lucide-svelte';
  import type { Book, SortBy } from '../../types/app';

  export let books: Book[] = [];
  export let categories: string[] = [];
  export let searchQuery = '';
  export let selectedGenre = 'Semua';
  export let sortBy: SortBy = 'popular';

  const dispatch = createEventDispatcher<{ openBook: Book }>();
</script>

<section class="rounded-3xl border border-zinc-200 bg-white p-6 md:p-8">
  <div class="grid gap-4 md:grid-cols-[1fr_auto_auto]">
    <input class="ui-field" placeholder="Search books..." bind:value={searchQuery} />
    <select class="ui-field ui-select" bind:value={selectedGenre}>
      {#each categories as category}
        <option value={category}>{category}</option>
      {/each}
    </select>
    <select class="ui-field ui-select" bind:value={sortBy}>
      <option value="popular">Popular</option>
      <option value="latest">Latest</option>
    </select>
  </div>

  <div class="mt-8 grid gap-4">
    {#if books.length === 0}
      <p class="rounded-xl bg-zinc-50 p-6 text-sm text-zinc-500">Tidak ada buku sesuai filter.</p>
    {/if}

    {#each books as book}
      <article class="grid gap-4 rounded-2xl border border-zinc-200 p-4 md:grid-cols-[88px_1fr_auto] md:items-center">
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
</section>
