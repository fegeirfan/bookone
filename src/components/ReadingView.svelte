<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let book: any;

  const dispatch = createEventDispatcher();

  function goBack() {
    dispatch('back');
  }
</script>

<div class="fixed inset-0 bg-white z-20 p-8 overflow-y-auto">
  <button on:click={goBack} class="fixed top-6 right-8 text-gray-600 hover:text-gray-900 z-30 bg-white bg-opacity-70 rounded-full p-2">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
    <span class="sr-only">Close Reading View</span>
  </button>
  <div class="max-w-prose mx-auto mt-12 font-lora">
    <h1 class="text-4xl lg:text-5xl font-bold mb-4 text-gray-900">{book.title}</h1>
    <p class="text-xl text-gray-600 mb-10">by {book.author}</p>
    
    <div class="text-lg leading-loose space-y-6 text-gray-800">
      <p>This is a placeholder for the book's content. In a real application, you would fetch and display the full text of the book here.</p>
      <p>{book.description}</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
    </div>
  </div>
</div>
