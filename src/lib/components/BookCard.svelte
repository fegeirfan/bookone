<script lang="ts">
  export let title: string;
  export let author: string;
  export let coverUrl: string;
</script>

<div class="bg-white rounded-lg shadow-md overflow-hidden">
  <img src={coverUrl} alt="Book Cover" class="w-full h-64 object-cover">
  <div class="p-4">
    <h4 class="font-bold text-lg">{title}</h4>
    <p class="text-gray-600">{author}</p>
  </div>
</div>
