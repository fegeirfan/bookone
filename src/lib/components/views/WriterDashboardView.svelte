<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { Badge } from 'flowbite-svelte';
  import { Eye, Plus, FolderArchive } from 'lucide-svelte';
  import type { Book } from '../../types/app';

  export let myPublicBooks: Book[] = [];
  export let myPrivateBooks: Book[] = [];

  const dispatch = createEventDispatcher<{
    openStorage: void;
    openUpload: void;
    publishDraft: number;
    deleteDraft: number;
  }>();
</script>

<section class="space-y-8">
  <div class="flex flex-wrap items-center justify-between gap-4">
    <div>
      <h2 class="text-3xl font-semibold">Halaman Menulis</h2>
      <p class="text-sm text-zinc-600">Pantau karya yang sudah terbit dan yang masih kamu siapkan.</p>
    </div>
    <div class="flex gap-2">
      <button class="ui-btn ui-btn-secondary" onclick={() => dispatch('openStorage')}><FolderArchive class="h-4 w-4" /> Ruang Simpan</button>
      <button class="ui-btn ui-btn-primary" onclick={() => dispatch('openUpload')}><Plus class="h-4 w-4" /> Upload Buku</button>
    </div>
  </div>

  <div class="grid gap-4 md:grid-cols-2">
    <article class="rounded-2xl border border-zinc-200 bg-white p-5">
      <p class="text-xs uppercase tracking-[0.2em] text-zinc-500">Sudah Terbit</p>
      <p class="mt-2 text-3xl font-semibold">{myPublicBooks.length}</p>
    </article>
    <article class="rounded-2xl border border-zinc-200 bg-white p-5">
      <p class="text-xs uppercase tracking-[0.2em] text-zinc-500">Sedang Disiapkan</p>
      <p class="mt-2 text-3xl font-semibold">{myPrivateBooks.length}</p>
    </article>
  </div>

  <div>
    <h3 class="mb-3 text-lg font-semibold">Karya Terbit</h3>
    <div class="grid gap-3">
      {#if myPublicBooks.length === 0}
        <p class="rounded-xl bg-white p-4 text-sm text-zinc-500">Belum ada buku publik.</p>
      {/if}
      {#each myPublicBooks as book}
        <article class="flex items-center justify-between rounded-xl border border-zinc-200 bg-white px-4 py-3">
          <p>{book.title}</p>
          <Badge color="gray"><Eye class="mr-1 h-3.5 w-3.5" /> {book.views}</Badge>
        </article>
      {/each}
    </div>
  </div>

  <div>
    <h3 class="mb-3 text-lg font-semibold">Belum Terbit</h3>
    <div class="grid gap-3">
      {#if myPrivateBooks.length === 0}
        <p class="rounded-xl bg-white p-4 text-sm text-zinc-500">Belum ada naskah yang disiapkan.</p>
      {/if}
      {#each myPrivateBooks as book}
        <article class="rounded-xl border border-zinc-200 bg-white px-4 py-3">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <p>{book.title}</p>
            <div class="flex gap-2">
              <button class="ui-btn ui-btn-secondary ui-btn-small">Edit</button>
              <button class="ui-btn ui-btn-secondary ui-btn-small" onclick={() => dispatch('publishDraft', book.id)}>Publish</button>
              <button class="ui-btn ui-btn-secondary ui-btn-small" onclick={() => dispatch('deleteDraft', book.id)}>Delete</button>
            </div>
          </div>
        </article>
      {/each}
    </div>
  </div>
</section>
