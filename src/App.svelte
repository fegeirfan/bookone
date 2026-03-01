<script lang="ts">
  import { onMount } from 'svelte';
  import AppHeader from './lib/components/layout/AppHeader.svelte';
  import MobileBottomNav from './lib/components/layout/MobileBottomNav.svelte';
  import LoginModal from './lib/components/modals/LoginModal.svelte';
  import HomeView from './lib/components/views/HomeView.svelte';
  import ExploreView from './lib/components/views/ExploreView.svelte';
  import BookDetailView from './lib/components/views/BookDetailView.svelte';
  import ReaderView from './lib/components/views/ReaderView.svelte';
  import LibraryView from './lib/components/views/LibraryView.svelte';
  import WriterDashboardView from './lib/components/views/WriterDashboardView.svelte';
  import UploadView from './lib/components/views/UploadView.svelte';
  import StorageView from './lib/components/views/StorageView.svelte';
  import ProfileView from './lib/components/views/ProfileView.svelte';
  import { uploadImageToCloudinary } from './lib/api/cloudinary';
  import {
    applySessionFromUrlHash,
    loginWithEmail,
    loginWithGoogle,
    readStoredSession,
    registerWithEmail
  } from './lib/api/auth';
  import { createBook, getBooks } from './lib/api/supabase';
  import type { Book, BookStatus, SortBy, View } from './lib/types/app';

  let books: Book[] = [];
  let isLoadingBooks = true;
  let dataError = '';
  let currentView: View = 'home';
  let selectedBook: Book | null = null;

  let isLoggedIn = false;
  let showLoginModal = false;
  let loginReason = '';
  let pendingAction: (() => void | Promise<void>) | null = null;
  let authError = '';
  let authLoading = false;

  let searchQuery = '';
  let selectedGenre = 'Semua';
  let sortBy: SortBy = 'popular';

  let likedBookIds = new Set<number>();
  let bookmarkIds = new Set<number>([1]);
  let readHistoryIds = [1, 3];
  let followedAuthors = new Set<string>();
  let comments: Record<number, string[]> = {
    1: ['Suka banget sama world-building di chapter awal.'],
    2: ['Chemistry tokohnya halus dan realistis.']
  };

  let pendingComment = '';
  let currentPage = 0;

  let uploadTitle = '';
  let uploadDescription = '';
  let uploadGenre = 'Fantasy';
  let uploadStatus: BookStatus = 'public';
  let uploadCover = '';
  let uploadCoverFile: File | null = null;
  let uploadCoverName = '';
  let uploadCoverPreviewUrl = '';

  const meAuthorId = 'me';

  $: publicBooks = books.filter((book) => book.status === 'public');
  $: trendingBooks = [...publicBooks].sort((a, b) => b.likes - a.likes).slice(0, 3);
  $: latestBooks = [...publicBooks].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 4);
  $: categories = ['Semua', ...new Set(publicBooks.map((book) => book.genre))];

  $: exploreBooks = publicBooks
    .filter((book) => {
      const matchesSearch =
        `${book.title} ${book.author} ${book.genre}`.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGenre = selectedGenre === 'Semua' || book.genre === selectedGenre;
      return matchesSearch && matchesGenre;
    })
    .sort((a, b) => (sortBy === 'popular' ? b.likes - a.likes : b.createdAt.localeCompare(a.createdAt)));

  $: myPublicBooks = books.filter((book) => book.authorId === meAuthorId && book.status === 'public');
  $: myPrivateBooks = books.filter((book) => book.authorId === meAuthorId && book.status === 'private');

  $: bookmarkBooks = books.filter((book) => bookmarkIds.has(book.id));
  $: historyBooks = books.filter((book) => readHistoryIds.includes(book.id));

  $: storageUsedMb = myPrivateBooks.length * 15;
  $: storageQuotaMb = 100;

  $: selectedBookComments = selectedBook ? comments[selectedBook.id] || [] : [];
  $: isFollowingAuthor = selectedBook ? followedAuthors.has(selectedBook.authorId) : false;
  $: readerProgress =
    selectedBook && selectedBook.content.length > 0
      ? Math.round(((currentPage + 1) / selectedBook.content.length) * 100)
      : 0;

  onMount(async () => {
    if (applySessionFromUrlHash() || readStoredSession()) {
      isLoggedIn = true;
    }
    await loadBooks();
  });

  async function loadBooks() {
    isLoadingBooks = true;
    dataError = '';
    try {
      books = await getBooks();
    } catch (error) {
      dataError = error instanceof Error ? error.message : 'Gagal memuat data buku';
    } finally {
      isLoadingBooks = false;
    }
  }

  function navigate(view: View) {
    currentView = view;
  }

  function openBook(book: Book) {
    selectedBook = book;
    currentView = 'detail';
    pendingComment = '';
  }

  function startReading(book: Book) {
    selectedBook = book;
    selectedBook.views += 1;
    if (!readHistoryIds.includes(book.id)) {
      readHistoryIds = [book.id, ...readHistoryIds].slice(0, 8);
    }
    currentPage = 0;
    currentView = 'reader';
  }

  function runAction(action: () => void | Promise<void>) {
    Promise.resolve(action()).catch((error) => {
      dataError = error instanceof Error ? error.message : 'Terjadi kesalahan';
    });
  }

  function requestLogin(reason: string, action: () => void | Promise<void>) {
    if (isLoggedIn) {
      runAction(action);
      return;
    }
    loginReason = reason;
    pendingAction = action;
    showLoginModal = true;
  }

  function login() {
    isLoggedIn = true;
    authError = '';
    showLoginModal = false;
    if (pendingAction) {
      const action = pendingAction;
      pendingAction = null;
      runAction(action);
    }
  }

  function handleAuthClick() {
    if (isLoggedIn) {
      navigate('profile');
      return;
    }
    authError = '';
    showLoginModal = true;
  }

  async function handleEmailLogin(email: string, password: string) {
    authLoading = true;
    authError = '';
    try {
      await loginWithEmail(email, password);
      login();
    } catch (error) {
      authError = error instanceof Error ? error.message : 'Login gagal';
    } finally {
      authLoading = false;
    }
  }

  async function handleRegister(email: string, password: string) {
    authLoading = true;
    authError = '';
    try {
      await registerWithEmail(email, password);
      login();
    } catch (error) {
      authError = error instanceof Error ? error.message : 'Registrasi gagal';
    } finally {
      authLoading = false;
    }
  }

  function handleGoogleLogin() {
    loginWithGoogle();
  }

  function goUpload() {
    requestLogin('upload karya', () => {
      currentView = 'upload';
    });
  }

  function goLibrary() {
    requestLogin('membuka perpustakaanmu', () => {
      currentView = 'library';
    });
  }

  function goWriter() {
    requestLogin('membuka halaman menulis', () => {
      currentView = 'writer';
    });
  }

  function likeBook(book: Book) {
    requestLogin('menyukai buku', () => {
      if (likedBookIds.has(book.id)) return;
      likedBookIds = new Set([...likedBookIds, book.id]);
      book.likes += 1;
    });
  }

  function bookmarkBook(book: Book) {
    requestLogin('menyimpan bookmark', () => {
      if (bookmarkIds.has(book.id)) return;
      bookmarkIds = new Set([...bookmarkIds, book.id]);
    });
  }

  function followAuthor(authorId: string) {
    requestLogin('mengikuti penulis', () => {
      followedAuthors = new Set([...followedAuthors, authorId]);
    });
  }

  function submitComment(book: Book) {
    if (!pendingComment.trim()) return;
    requestLogin('berkomentar', () => {
      comments = {
        ...comments,
        [book.id]: [...(comments[book.id] || []), pendingComment]
      };
      pendingComment = '';
    });
  }

  function saveUpload() {
    requestLogin('menerbitkan buku', () => {
      if (!uploadTitle.trim() || !uploadDescription.trim()) return;
      const newBookPayload: Omit<Book, 'id'> = {
        title: uploadTitle,
        author: 'Kamu',
        authorId: meAuthorId,
        genre: uploadGenre,
        likes: 0,
        views: 0,
        description: uploadDescription,
        coverUrl:
          uploadCover ||
          'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&auto=format&fit=crop',
        status: uploadStatus,
        createdAt: new Date().toISOString().slice(0, 10),
        content: ['Naskah awal sudah tersimpan. Kamu bisa lanjutkan kapan saja.']
      };

      return Promise.resolve()
        .then(async () => {
          if (uploadCoverFile) {
            const cloudinaryUrl = await uploadImageToCloudinary(uploadCoverFile);
            newBookPayload.coverUrl = cloudinaryUrl;
          }
          return createBook(newBookPayload);
        })
        .then((createdBook) => {
        books = [createdBook, ...books];
        uploadTitle = '';
        uploadDescription = '';
        uploadCover = '';
        if (uploadCoverPreviewUrl) {
          URL.revokeObjectURL(uploadCoverPreviewUrl);
          uploadCoverPreviewUrl = '';
        }
        uploadCoverFile = null;
        uploadCoverName = '';
        uploadStatus = 'public';
        currentView = 'writer';
      });
    });
  }

  function handleCoverSelected(file: File | null) {
    if (uploadCoverPreviewUrl) {
      URL.revokeObjectURL(uploadCoverPreviewUrl);
      uploadCoverPreviewUrl = '';
    }

    uploadCoverFile = file;
    uploadCoverName = file?.name || '';
    if (!file) {
      uploadCover = '';
      return;
    }
    uploadCoverPreviewUrl = URL.createObjectURL(file);
    uploadCover = uploadCoverPreviewUrl;
  }

  function publishDraft(bookId: number) {
    books = books.map((book) => (book.id === bookId ? { ...book, status: 'public' } : book));
  }

  function deleteDraft(bookId: number) {
    books = books.filter((book) => book.id !== bookId);
  }

  function prevPage() {
    if (!selectedBook) return;
    currentPage = Math.max(0, currentPage - 1);
  }

  function nextPage() {
    if (!selectedBook) return;
    currentPage = Math.min(selectedBook.content.length - 1, currentPage + 1);
  }

  function goExploreByCategory(category: string) {
    selectedGenre = category;
    navigate('explore');
  }
</script>

<div class="min-h-screen bg-gradient-to-b from-stone-50 via-stone-50 to-zinc-100 pb-20 text-zinc-900 md:pb-0">
  <AppHeader
    bind:searchQuery
    {isLoggedIn}
    on:navigate={(event) => navigate(event.detail)}
    on:writer={goWriter}
    on:library={goLibrary}
    on:auth={handleAuthClick}
  />

  <main class="mx-auto w-full max-w-[1880px] px-4 py-8 md:px-3 md:py-12 lg:px-4">
    {#if dataError}
      <div class="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
        {dataError}
      </div>
    {/if}

    {#if isLoadingBooks}
      <div class="rounded-xl border border-zinc-200 bg-white px-4 py-6 text-sm text-zinc-500">Memuat data buku...</div>
    {:else}
    {#if currentView === 'home'}
      <HomeView
        trendingBooks={trendingBooks}
        latestBooks={latestBooks}
        categories={categories.slice(1)}
        on:openBook={(event) => openBook(event.detail)}
        on:explore={() => navigate('explore')}
        on:writer={goWriter}
        on:chooseCategory={(event) => goExploreByCategory(event.detail)}
      />
    {/if}

    {#if currentView === 'explore'}
      <ExploreView
        books={exploreBooks}
        categories={categories}
        bind:searchQuery
        bind:selectedGenre
        bind:sortBy
        on:openBook={(event) => openBook(event.detail)}
      />
    {/if}

    {#if currentView === 'detail' && selectedBook}
      <BookDetailView
        book={selectedBook}
        comments={selectedBookComments}
        bind:pendingComment
        {isFollowingAuthor}
        on:read={() => startReading(selectedBook!)}
        on:bookmark={() => bookmarkBook(selectedBook!)}
        on:like={() => likeBook(selectedBook!)}
        on:follow={() => followAuthor(selectedBook!.authorId)}
        on:submitComment={() => submitComment(selectedBook!)}
      />
    {/if}

    {#if currentView === 'reader' && selectedBook}
      <ReaderView
        book={selectedBook}
        {currentPage}
        {readerProgress}
        on:back={() => navigate('detail')}
        on:prev={prevPage}
        on:next={nextPage}
      />
    {/if}

    {#if currentView === 'library'}
      <LibraryView
        {bookmarkBooks}
        {historyBooks}
        on:openBook={(event) => openBook(event.detail)}
        on:readBook={(event) => startReading(event.detail)}
      />
    {/if}

    {#if currentView === 'writer'}
      <WriterDashboardView
        {myPublicBooks}
        {myPrivateBooks}
        on:openStorage={() => navigate('storage')}
        on:openUpload={goUpload}
        on:publishDraft={(event) => publishDraft(event.detail)}
        on:deleteDraft={(event) => deleteDraft(event.detail)}
      />
    {/if}

    {#if currentView === 'upload'}
      <UploadView
        bind:uploadTitle
        bind:uploadDescription
        bind:uploadGenre
        bind:uploadStatus
        bind:uploadCover
        {uploadCoverName}
        on:coverSelected={(event) => handleCoverSelected(event.detail)}
        on:save={saveUpload}
      />
    {/if}

    {#if currentView === 'storage'}
      <StorageView
        {myPrivateBooks}
        {storageUsedMb}
        {storageQuotaMb}
        on:publishDraft={(event) => publishDraft(event.detail)}
        on:deleteDraft={(event) => deleteDraft(event.detail)}
      />
    {/if}

    {#if currentView === 'profile'}
      <ProfileView />
    {/if}
    {/if}
  </main>

  <LoginModal
    bind:open={showLoginModal}
    reason={loginReason}
    {authError}
    {authLoading}
    on:emailLogin={(event) => handleEmailLogin(event.detail.email, event.detail.password)}
    on:register={(event) => handleRegister(event.detail.email, event.detail.password)}
    on:google={handleGoogleLogin}
  />
  <MobileBottomNav
    {isLoggedIn}
    on:navigate={(event) => navigate(event.detail)}
    on:writer={goWriter}
    on:library={goLibrary}
    on:auth={handleAuthClick}
  />
</div>
