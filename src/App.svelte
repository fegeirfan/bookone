<script lang="ts">
  import Header from './lib/components/Header.svelte';
  import BookCard from './lib/components/BookCard.svelte';
  import Footer from './lib/components/Footer.svelte';
  import BookDetail from './components/BookDetail.svelte';
  import ReadingView from './components/ReadingView.svelte';

  let selectedBook: any = null;
  let isReading = false;

  const trendingBooks = [
    {
      title: 'The Midnight Library',
      author: 'Matt Haig',
      coverUrl: 'https://images-na.ssl-images-amazon.com/images/I/81T2soR4TlL.jpg',
      description: 'Between life and death there is a library... Would you have done anything different, if you had the chance to undo your regrets?'
    },
    {
      title: 'Project Hail Mary',
      author: 'Andy Weir',
      coverUrl: 'https://images-na.ssl-images-amazon.com/images/I/91+N9A8f2FL.jpg',
      description: 'Ryland Grace is the sole survivor on a desperate, last-chance mission—and if he fails, humanity and the earth itself will perish.'
    },
    {
      title: 'The Four Winds',
      author: 'Kristin Hannah',
      coverUrl: 'https://images-na.ssl-images-amazon.com/images/I/91j+5dJcYjL.jpg',
      description: 'Texas, 1921. A time of abundance. The Great War is over, the bounty of the land is plentiful, and America is on the brink of a new and optimistic era.'
    },
    {
      title: 'Klara and the Sun',
      author: 'Kazuo Ishiguro',
      coverUrl: 'https://images-na.ssl-images-amazon.com/images/I/71Y-4-TSZDL.jpg',
      description: 'Here is the story of Klara, an Artificial Friend with outstanding observational qualities, who watches carefully the behavior of those who come in to browse.'
    }
  ];

  const latestBooks = [...trendingBooks].reverse();
  const popularCategories = ['Fiction', 'Science Fiction', 'Mystery', 'Fantasy', 'Non-Fiction'];
  const popularAuthors = [
    { name: 'Matt Haig', avatarUrl: 'https://via.placeholder.com/100' },
    { name: 'Andy Weir', avatarUrl: 'https://via.placeholder.com/100' },
    { name: 'Kristin Hannah', avatarUrl: 'https://via.placeholder.com/100' },
    { name: 'Kazuo Ishiguro', avatarUrl: 'https://via.placeholder.com/100' },
    { name: 'J.K. Rowling', avatarUrl: 'https://via.placeholder.com/100' },
    { name: 'George R.R. Martin', avatarUrl: 'https://via.placeholder.com/100' }
  ];

  function showBookDetail(book: any) {
    selectedBook = book;
  }

  function hideBookDetail() {
    selectedBook = null;
  }

  function startReading() {
    isReading = true;
  }

  function stopReading() {
    isReading = false;
  }

</script>

<main class="bg-gray-50 text-gray-800">
  <Header />

  {#if isReading && selectedBook}
    <ReadingView book={selectedBook} on:back={stopReading} />
  {:else if selectedBook}
    <BookDetail book={selectedBook} on:read={startReading} on:back={hideBookDetail} />
  {:else}
    <!-- Hero Section -->
    <section class="bg-white">
      <div class="container mx-auto px-4 py-20 text-center">
        <h1 class="text-5xl font-lora font-bold text-gray-900 mb-4">Find Your Next Great Read</h1>
        <p class="text-xl text-gray-600 mb-8">Discover a world of stories, from timeless classics to modern masterpieces.</p>
        <div class="mt-8 max-w-xl mx-auto">
            <div class="flex items-center shadow-lg">
                <input type="text" placeholder="Search for books, authors, genres..." class="w-full px-6 py-4 rounded-l-full border-t border-b border-l text-gray-800 border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <button class="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-r-full">
                    Search
                </button>
            </div>
        </div>
      </div>
    </section>

    <div class="container mx-auto px-4">
      <!-- Trending Books -->
      <section class="py-12">
        <h3 class="text-3xl font-bold font-lora mb-8">Trending Books</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {#each trendingBooks as book}
            <div on:click={() => showBookDetail(book)} class="cursor-pointer text-left transform hover:-translate-y-2 transition-transform duration-300">
              <BookCard title={book.title} author={book.author} coverUrl={book.coverUrl} />
            </div>
          {/each}
        </div>
      </section>

      <!-- Latest Books -->
      <section class="py-12 bg-white -mx-4 px-4">
        <div class="container mx-auto">
          <h3 class="text-3xl font-bold font-lora mb-8">Latest Releases</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {#each latestBooks as book}
                <div on:click={() => showBookDetail(book)} class="cursor-pointer text-left transform hover:-translate-y-2 transition-transform duration-300">
                    <BookCard title={book.title} author={book.author} coverUrl={book.coverUrl} />
                </div>
            {/each}
          </div>
        </div>
      </section>

      <!-- Popular Categories -->
      <section class="py-12">
        <h3 class="text-3xl font-bold font-lora mb-8">Popular Categories</h3>
        <div class="flex flex-wrap gap-4">
          {#each popularCategories as category}
            <a href="#!" class="bg-gray-200 hover:bg-blue-500 hover:text-white transition-colors duration-300 text-gray-800 font-semibold px-5 py-3 rounded-full shadow-sm">{category}</a>
          {/each}
        </div>
      </section>

      <!-- Popular Authors -->
      <section class="py-12 bg-white -mx-4 px-4">
        <div class="container mx-auto">
          <h3 class="text-3xl font-bold font-lora mb-8">Popular Authors</h3>
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 text-center">
            {#each popularAuthors as author}
              <div class="transform hover:scale-110 transition-transform duration-300">
                <img src={author.avatarUrl} alt={author.name} class="w-24 h-24 rounded-full mx-auto mb-3 shadow-md border-4 border-white">
                <p class="font-semibold text-gray-800">{author.name}</p>
              </div>
            {/each}
          </div>
        </div>
      </section>
    </div>

    <Footer />
  {/if}

</main>

<style global>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Lora:wght@400;700&display=swap');

  body {
    font-family: 'Inter', sans-serif;
  }

  .font-lora {
    font-family: 'Lora', serif;
  }
</style>
