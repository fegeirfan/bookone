<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { Progressbar } from 'flowbite-svelte';
  import { ArrowLeft, ChevronLeft, ChevronRight, Settings2, MoonStar, Type } from 'lucide-svelte';
  import type { Book } from '../../types/app';

  export let book: Book;
  export let currentPage = 0;
  export let readerProgress = 0;

  const dispatch = createEventDispatcher<{
    back: void;
    prev: void;
    next: void;
  }>();
</script>

<section class="mx-auto max-w-4xl rounded-3xl border border-zinc-200 bg-white p-6 md:p-10">
  <div class="mb-8 flex items-center justify-between border-b border-zinc-200 pb-4">
    <button class="ui-btn ui-btn-secondary ui-btn-small" onclick={() => dispatch('back')}><ArrowLeft class="h-4 w-4" /> {book.title}</button>
    <button class="ui-btn ui-btn-secondary ui-btn-small"><Settings2 class="h-4 w-4" /> Reader</button>
  </div>

  <article class="space-y-6 text-lg leading-9 text-zinc-800">
    <p>{book.content[currentPage]}</p>
  </article>

  <div class="mt-12 space-y-4 border-t border-zinc-200 pt-6">
    <Progressbar progress={readerProgress} color="primary" size="h-2" />
    <div class="flex items-center justify-between text-sm">
      <button class="ui-btn ui-btn-secondary ui-btn-small" onclick={() => dispatch('prev')}><ChevronLeft class="h-4 w-4" /> Prev</button>
      <span>{readerProgress}%</span>
      <button class="ui-btn ui-btn-secondary ui-btn-small" onclick={() => dispatch('next')}>Next <ChevronRight class="h-4 w-4" /></button>
    </div>
    <div class="flex justify-end gap-2 text-xs text-zinc-600">
      <span class="rounded-full border border-zinc-300 px-3 py-1"><MoonStar class="mr-1 inline h-3.5 w-3.5" /> Dark Mode</span>
      <span class="rounded-full border border-zinc-300 px-3 py-1"><Type class="mr-1 inline h-3.5 w-3.5" /> Font</span>
    </div>
  </div>
</section>
