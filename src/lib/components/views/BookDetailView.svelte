<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { Heart, Eye, Bookmark, MessageCircle, UserPlus } from 'lucide-svelte';
  import type { Book } from '../../types/app';

  export let book: Book;
  export let comments: string[] = [];
  export let pendingComment = '';
  export let isFollowingAuthor = false;

  const dispatch = createEventDispatcher<{
    read: void;
    bookmark: void;
    like: void;
    follow: void;
    submitComment: void;
  }>();
</script>

<section class="grid gap-8 rounded-3xl border border-zinc-200 bg-white p-6 md:grid-cols-[320px_1fr] md:p-8">
  <img src={book.coverUrl} alt={book.title} class="w-full rounded-2xl object-cover" />
  <div>
    <p class="text-xs uppercase tracking-[0.22em] text-zinc-500">{book.genre}</p>
    <h2 class="mt-2 text-4xl font-semibold">{book.title}</h2>
    <p class="mt-2 text-zinc-600">oleh {book.author}</p>

    <div class="mt-5 flex flex-wrap items-center gap-4 text-sm text-zinc-600">
      <span class="inline-flex items-center gap-1.5"><Heart class="h-4 w-4" /> {book.likes}</span>
      <span class="inline-flex items-center gap-1.5"><Eye class="h-4 w-4" /> {book.views}</span>
      <button class="ui-btn ui-btn-secondary ui-btn-small" onclick={() => dispatch('bookmark')}>
        <Bookmark class="h-3.5 w-3.5" /> Bookmark
      </button>
    </div>

    <p class="mt-6 max-w-2xl leading-relaxed text-zinc-700">{book.description}</p>

    <div class="mt-8 flex flex-wrap gap-3">
      <button class="ui-btn ui-btn-primary" onclick={() => dispatch('read')}>Baca Sekarang</button>
      <button class="ui-btn ui-btn-secondary" onclick={() => dispatch('like')}><Heart class="h-4 w-4" /> Like</button>
      <button class="ui-btn ui-btn-secondary" onclick={() => dispatch('follow')}>
        <UserPlus class="h-4 w-4" /> {isFollowingAuthor ? 'Sudah Follow' : 'Follow Penulis'}
      </button>
    </div>

    <div class="mt-10 border-t border-zinc-200 pt-6">
      <h3 class="text-lg font-semibold">Komentar</h3>
      <div class="mt-4 space-y-3">
        {#each comments as comment}
          <p class="rounded-xl bg-zinc-50 px-4 py-3 text-sm text-zinc-700">{comment}</p>
        {/each}
      </div>
      <div class="mt-4 flex gap-2">
        <input class="ui-field flex-1" placeholder="Tulis komentar..." bind:value={pendingComment} />
        <button class="ui-btn ui-btn-primary" onclick={() => dispatch('submitComment')}>
          <MessageCircle class="h-4 w-4" /> Kirim
        </button>
      </div>
    </div>
  </div>
</section>
