<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let open = false;
  export let reason = '';
  export let authError = '';
  export let authLoading = false;

  let mode: 'login' | 'register' = 'login';
  let email = '';
  let password = '';

  const dispatch = createEventDispatcher<{
    emailLogin: { email: string; password: string };
    register: { email: string; password: string };
    google: void;
  }>();

  function submit() {
    if (!email.trim() || !password.trim()) return;
    if (mode === 'login') {
      dispatch('emailLogin', { email: email.trim(), password });
      return;
    }
    dispatch('register', { email: email.trim(), password });
  }
</script>

{#if open}
  <div class="fixed inset-0 z-50 grid place-items-center bg-zinc-900/20 px-4">
    <div class="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl">
      <h3 class="text-xl font-semibold text-zinc-800">Masuk atau Daftar</h3>
      <p class="mt-2 text-sm text-zinc-600">Supaya aktivitasmu tersimpan, silakan lanjutkan untuk {reason || 'melanjutkan'}.</p>

      <div class="mt-4 grid grid-cols-2 gap-2 rounded-xl border border-zinc-200 bg-zinc-50 p-1">
        <button class={`rounded-lg px-3 py-2 text-sm ${mode === 'login' ? 'bg-white font-semibold text-zinc-800' : 'text-zinc-500'}`} onclick={() => (mode = 'login')}>Masuk</button>
        <button class={`rounded-lg px-3 py-2 text-sm ${mode === 'register' ? 'bg-white font-semibold text-zinc-800' : 'text-zinc-500'}`} onclick={() => (mode = 'register')}>Daftar</button>
      </div>

      <div class="mt-5 grid gap-3">
        <input class="ui-field" type="email" placeholder="email@contoh.com" bind:value={email} />
        <input class="ui-field" type="password" placeholder="Password" bind:value={password} />
        {#if authError}
          <p class="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{authError}</p>
        {/if}
        <button class="ui-btn ui-btn-primary" onclick={submit} disabled={authLoading}>
          {authLoading ? 'Memproses...' : mode === 'login' ? 'Masuk dengan Email' : 'Daftar dengan Email'}
        </button>
        <button class="ui-btn ui-btn-secondary" onclick={() => dispatch('google')} disabled={authLoading}>Lanjut dengan Google</button>
      </div>

      <button class="mt-4 w-full rounded-lg px-3 py-2 text-sm text-zinc-500 hover:bg-zinc-50" onclick={() => (open = false)}>
        Tutup
      </button>
    </div>
  </div>
{/if}
