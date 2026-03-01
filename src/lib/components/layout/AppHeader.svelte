<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { Search } from 'lucide-svelte';
  import type { View } from '../../types/app';

  export let isLoggedIn = false;
  export let searchQuery = '';
  let searchExpanded = false;
  let mobileSearchOpen = false;

  const dispatch = createEventDispatcher<{
    navigate: View;
    writer: void;
    library: void;
    auth: void;
  }>();

  const navigate = (view: View) => dispatch('navigate', view);

  function openSearch() {
    searchExpanded = true;
    navigate('explore');
  }

  function closeSearch() {
    if (searchQuery.trim()) return;
    searchExpanded = false;
  }

  function toggleMobileSearch() {
    mobileSearchOpen = !mobileSearchOpen;
    if (mobileSearchOpen) {
      navigate('explore');
    }
  }

  function closeMobileSearch() {
    if (searchQuery.trim()) return;
    mobileSearchOpen = false;
  }
</script>

<header class="sticky top-0 z-20 border-b border-zinc-200/80 bg-stone-50/90 backdrop-blur">
  <div class="mx-auto flex w-full max-w-[1880px] items-center gap-3 px-4 py-4 md:px-3 lg:px-4">
    <button class="text-left" onclick={() => navigate('home')}>
      <p class="text-xs uppercase tracking-[0.3em] text-zinc-500">Molk</p>
    </button>

    <button class="ml-auto rounded-lg border border-zinc-200 bg-white p-2 md:hidden" aria-label="Cari" onclick={toggleMobileSearch}>
      <Search class="h-4 w-4 text-zinc-600" />
    </button>

    <div class="ml-auto hidden items-center gap-6 md:flex">
      <nav class="items-center gap-5 md:flex">
        <button class="nav-link-desktop" onclick={() => navigate('home')}>Home</button>
        <button class="nav-link-desktop" onclick={() => navigate('explore')}>Explore</button>
        <button class="nav-link-desktop" onclick={() => dispatch('writer')}>Write</button>
        <button class="nav-link-desktop" onclick={() => dispatch('library')}>Library</button>
      </nav>
      <button class="nav-auth" onclick={() => dispatch('auth')}>
        {isLoggedIn ? 'Profil' : 'Masuk'}
      </button>
      <div class={`search-wrap ${searchExpanded ? 'search-wrap-expanded' : ''}`}>
        <Search class="h-4 w-4 text-zinc-500" />
        <input
          class="search-input ui-field-borderless"
          placeholder="Cari buku..."
          bind:value={searchQuery}
          onfocus={openSearch}
          onclick={openSearch}
          onblur={closeSearch}
        />
      </div>
    </div>
  </div>

  {#if mobileSearchOpen}
    <div class="mx-auto w-full max-w-[1880px] px-4 pb-3 md:hidden">
      <div class="search-wrap-mobile">
        <Search class="h-4 w-4 text-zinc-500" />
        <input
          class="search-input ui-field-borderless"
          placeholder="Cari buku..."
          bind:value={searchQuery}
          onfocus={() => navigate('explore')}
          onblur={closeMobileSearch}
        />
      </div>
    </div>
  {/if}
</header>

<style>
  .search-wrap {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    width: 160px;
    border: 1px solid rgb(228 228 231);
    border-radius: 0.8rem;
    background: white;
    padding: 0.5rem 0.65rem;
    transition: width 160ms ease, border-color 120ms ease;
  }

  .search-wrap-expanded {
    width: 320px;
  }

  .search-wrap:focus-within {
    border-color: rgb(147 197 253);
  }

  .search-input {
    width: 100%;
    background: transparent;
    color: rgb(39 39 42);
    font-size: 0.88rem;
  }

  .search-wrap-mobile {
    display: inline-flex;
    width: 100%;
    align-items: center;
    gap: 0.45rem;
    border: 1px solid rgb(228 228 231);
    border-radius: 0.8rem;
    background: white;
    padding: 0.5rem 0.65rem;
  }
</style>
