<script lang="ts">
  export let book: { title: string; author: string; coverUrl: string; description: string; };
  export let onBack: () => void;

  const ratings = [5, 5, 4, 5, 4];
  const averageRating = ratings.reduce((a, b) => a + b, 0) / ratings.length;

  const reviews = [
    {
      user: 'Alex D.',
      comment: 'An absolute masterpiece! The story is captivating and the characters are so well-developed.'
    },
    {
      user: 'Sarah P.',
      comment: 'I couldn\'t put it down. Highly recommended for any sci-fi fan.'
    }
  ];

</script>

<div class="container mx-auto px-4 py-8">
  <button on:click={onBack} class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mb-8"> &larr; Back to Home </button>

  <div class="flex flex-col md:flex-row gap-8">
    <div class="md:w-1/3">
      <img src={book.coverUrl} alt="Book Cover" class="w-full rounded-lg shadow-lg">
    </div>
    <div class="md:w-2/3">
      <h2 class="text-4xl font-bold">{book.title}</h2>
      <p class="text-xl text-gray-700 mt-2">by {book.author}</p>

      <div class="flex items-center mt-4">
        <div class="flex text-yellow-400">
          {#each {length: Math.floor(averageRating)} as _}
            <span>&#9733;</span>
          {/each}
          {#if averageRating % 1 !== 0}
            <span>&#9734;</span>
          {/if}
        </div>
        <span class="text-gray-600 ml-2">({ratings.length} reviews)</span>
      </div>

      <p class="mt-6 text-gray-800">{book.description}</p>

      <div class="mt-8">
        <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg">Add to Library</button>
        <button class="ml-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg">Write a Review</button>
      </div>
    </div>
  </div>

  <!-- Reviews Section -->
  <div class="mt-12">
    <h3 class="text-2xl font-bold mb-6">Community Reviews</h3>
    <div class="space-y-6">
      {#each reviews as review}
        <div class="bg-white p-6 rounded-lg shadow">
          <p class="font-bold">{review.user}</p>
          <p class="text-gray-700 mt-2">{review.comment}</p>
        </div>
      {/each}
    </div>
  </div>

</div>
