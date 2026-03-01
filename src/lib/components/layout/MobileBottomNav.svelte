<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { House, Compass, SquarePen, LibraryBig, CircleUserRound } from 'lucide-svelte';
  import type { View } from '../../types/app';

  export let isLoggedIn = false;

  const dispatch = createEventDispatcher<{
    navigate: View;
    writer: void;
    library: void;
    auth: void;
  }>();
</script>

<nav class="fixed bottom-0 left-0 right-0 z-20 border-t border-zinc-200 bg-white/95 px-3 py-2 backdrop-blur md:hidden">
  <div class="grid grid-cols-5 gap-2">
    <button class="mobile-bottom-btn" aria-label="Home" onclick={() => dispatch('navigate', 'home')}>
      <House class="h-5 w-5" />
    </button>
    <button class="mobile-bottom-btn" aria-label="Explore" onclick={() => dispatch('navigate', 'explore')}>
      <Compass class="h-5 w-5" />
    </button>
    <button class="mobile-bottom-btn" aria-label="Write" onclick={() => dispatch('writer')}>
      <SquarePen class="h-5 w-5" />
    </button>
    <button class="mobile-bottom-btn" aria-label="Library" onclick={() => dispatch('library')}>
      <LibraryBig class="h-5 w-5" />
    </button>
    <button class="mobile-bottom-btn" aria-label={isLoggedIn ? 'Profil' : 'Masuk'} onclick={() => dispatch('auth')}>
      <CircleUserRound class="h-5 w-5" />
    </button>
  </div>
</nav>

<style>
  .mobile-bottom-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.8rem;
    border: 1px solid transparent;
    background: transparent;
    padding: 0.5rem;
    color: rgb(82 82 91);
  }

  .mobile-bottom-btn:active {
    border-color: rgb(212 212 216);
    background: rgb(250 250 250);
  }
</style>
