<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let book: any;

  const dispatch = createEventDispatcher();

  function readBook() {
    dispatch('read');
  }

  function goBack() {
      dispatch('back');
  }
</script>

<div class="p-8 bg-white rounded-lg shadow-2xl max-w-4xl mx-auto my-12 relative animate-fade-in">
  <button on:click={goBack} class="absolute top-4 left-4 text-gray-600 hover:text-gray-900 text-sm">
    &larr; Back to list
  </button>
  <div class="flex flex-col md:flex-row gap-8 mt-8">
    <div class="md:w-1/3">
      <img src={book.coverUrl} alt="{book.title} cover" class="w-full h-auto object-cover rounded-md shadow-lg">
    </div>
    <div class="md:w-2/3">
      <h2 class="text-4xl font-lora font-bold mb-2">{book.title}</h2>
      <p class="text-xl text-gray-600 mb-4">by {book.author}</p>
      <div class="flex items-center mb-6">
        <span class="text-yellow-500">★★★★☆</span>
        <span class="ml-2 text-gray-500">4.5 (2,188 reviews)</span>
      </div>
      <p class="text-gray-700 font-lora leading-relaxed mb-6">{book.description}</p>
      <div class="flex gap-4">
        <button on:click={readBook} class="bg-blue-600 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-700 transition-all duration-300 shadow-md">
          Read Now
        </button>
        <button class="border border-gray-300 text-gray-700 font-bold py-3 px-6 rounded-full hover:bg-gray-100 transition-all">
          Add to Library
        </button>
      </div>
    </div>
  </div>
</div>

<style>
    .animate-fade-in {
        animation: fadeIn 0.5s ease-in-out;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
</style>
