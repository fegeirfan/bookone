<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { Progressbar } from 'flowbite-svelte';
  import type { Book } from '../../types/app';

  export let myPrivateBooks: Book[] = [];
  export let storageUsedMb = 0;
  export let storageQuotaMb = 100;

  const dispatch = createEventDispatcher<{
    publishDraft: number;
    deleteDraft: number;
  }>();
</script>

<section class="mx-auto max-w-4xl rounded-3xl border border-zinc-200 bg-white p-6 md:p-8">
  <h2 class="text-3xl font-semibold">Ruang Simpan</h2>
  <p class="mt-1 text-sm text-zinc-600">Simpan naskahmu terlebih dulu, lalu terbitkan saat sudah siap.</p>

  <div class="mt-6">
    <p class="text-sm">Naskah Tersimpan</p>
    <Progressbar progress={(storageUsedMb / storageQuotaMb) * 100} color="primary" size="h-3" />
    <p class="mt-2 text-sm text-zinc-500">{storageUsedMb}MB / {storageQuotaMb}MB</p>
  </div>

  <div class="mt-8 grid gap-3">
    {#if myPrivateBooks.length === 0}
      <p class="rounded-xl bg-zinc-50 p-4 text-sm text-zinc-500">Belum ada naskah tersimpan.</p>
    {/if}
    {#each myPrivateBooks as book}
      <article class="rounded-xl border border-zinc-200 px-4 py-3">
        <div class="flex flex-wrap items-center justify-between gap-3">
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
</section>
