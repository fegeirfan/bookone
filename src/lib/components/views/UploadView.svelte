<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { BookStatus } from '../../types/app';

  export let uploadTitle = '';
  export let uploadDescription = '';
  export let uploadGenre = 'Fantasy';
  export let uploadStatus: BookStatus = 'public';
  export let uploadCover = '';
  export let uploadCoverName = '';

  const dispatch = createEventDispatcher<{ save: void; coverSelected: File | null }>();

  function onCoverChange(event: Event) {
    const input = event.currentTarget as HTMLInputElement;
    const file = input.files?.[0] || null;
    dispatch('coverSelected', file);
  }
</script>

<section class="mx-auto max-w-3xl rounded-3xl border border-zinc-200 bg-white p-6 md:p-8">
  <h2 class="text-3xl font-semibold">Upload Buku</h2>
  <p class="mt-2 text-sm text-zinc-600">Atur visibilitas buku sesuai kebutuhanmu sebelum dipublikasikan.</p>

  <div class="mt-8 space-y-5">
    <div>
      <p class="mb-2 block text-sm">Pilih Naskah</p>
      <input class="ui-field" type="file" accept=".txt,.doc,.docx,.pdf" />
    </div>

    <div>
      <label class="ui-label" for="upload-title">Judul Buku</label>
      <input id="upload-title" class="ui-field" bind:value={uploadTitle} placeholder="Masukkan judul" />
    </div>

    <div>
      <label class="ui-label" for="upload-description">Deskripsi</label>
      <textarea id="upload-description" class="ui-field ui-textarea" rows={4} bind:value={uploadDescription} placeholder="Deskripsi singkat"></textarea>
    </div>

    <div>
      <label class="ui-label" for="upload-genre">Genre</label>
      <select id="upload-genre" class="ui-field ui-select" bind:value={uploadGenre}>
        <option>Fantasy</option>
        <option>Islami</option>
        <option>Romance</option>
        <option>Edukasi</option>
      </select>
    </div>

    <div>
      <label class="ui-label" for="upload-cover">Cover Buku</label>
      <input id="upload-cover" class="ui-field" type="file" accept="image/*" onchange={onCoverChange} />
      {#if uploadCoverName}
        <p class="mt-2 text-xs text-zinc-500">File: {uploadCoverName}</p>
      {/if}
      {#if uploadCover}
        <img src={uploadCover} alt="Preview cover" class="mt-3 h-32 w-24 rounded-md border border-zinc-200 object-cover" />
      {/if}
    </div>

    <fieldset class="space-y-2 rounded-xl border border-zinc-200 p-4">
      <legend class="px-1 text-sm">Status</legend>
      <label class="flex items-center gap-2 text-sm">
        <input class="ui-radio" type="radio" bind:group={uploadStatus} value="public" />
        Tampilkan untuk semua pembaca
      </label>
      <label class="flex items-center gap-2 text-sm">
        <input class="ui-radio" type="radio" bind:group={uploadStatus} value="private" />
        Simpan untuk saya dulu
      </label>
    </fieldset>

    <button class="ui-btn ui-btn-primary w-full" onclick={() => dispatch('save')}>Publish</button>
  </div>
</section>
