import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { Header } from './components/Header';
import { LeftSidebar } from './components/LeftSidebar';
import { RightSidebar } from './components/RightSidebar';
import { CreatePostBox } from './components/CreatePostBox';
import { PostCard } from './components/PostCard';
import { CreatePostModal } from './components/CreatePostModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Footer } from './components/Footer';
import { Post } from './data/mockData';
import { generate50FisheryPosts } from './data/posts50';
import { Layers, X, Loader2 } from 'lucide-react';
import { StudentsBatchPage } from './components/StudentsBatchPage';
import { FishMarketPage } from './components/FishMarketPage';

export function App() {
  const [posts, setPosts] = useState<Post[]>(() => generate50FisheryPosts());
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedFeedType, setSelectedFeedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeNav, setActiveNav] = useState<string>('home');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDefaultTab, setModalDefaultTab] = useState<'post' | 'media' | 'need'>('post');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Pagination states: Show 15 posts initially, then load 15 more upon scroll
  const [visibleCount, setVisibleCount] = useState<number>(15);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [isCategoryLoading, setIsCategoryLoading] = useState<boolean>(false);

  const loaderRef = useRef<HTMLDivElement | null>(null);

  // Filter posts based on Category, Feed Type Tab, and Search Query
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      // Category filter (supports single or multiple categories per post)
      if (selectedCategory) {
        const matchesPrimary = post.category === selectedCategory;
        const matchesMultiple = post.categories?.includes(selectedCategory);
        if (!matchesPrimary && !matchesMultiple) {
          return false;
        }
      }
      // Feed type filter
      if (selectedFeedType === 'faq' && post.type !== 'faq') return false;
      if (selectedFeedType === 'media' && post.type !== 'image' && post.type !== 'video') return false;
      if (selectedFeedType === 'consultation' && post.type !== 'consultation') return false;
      if (selectedFeedType === 'market' && post.type !== 'sale' && post.type !== 'job') return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inTitle = post.title?.toLowerCase().includes(q);
        const inQuestion = post.question?.toLowerCase().includes(q);
        const inContent = post.content.toLowerCase().includes(q);
        const inAuthor = post.author.name.toLowerCase().includes(q);
        const inCategory = post.category.toLowerCase().includes(q);
        return inTitle || inQuestion || inContent || inAuthor || inCategory;
      }

      return true;
    });
  }, [posts, selectedCategory, selectedFeedType, searchQuery]);

  // Paginated visible posts slice
  const displayedPosts = useMemo(() => {
    return filteredPosts.slice(0, visibleCount);
  }, [filteredPosts, visibleCount]);

  const hasMorePosts = visibleCount < filteredPosts.length;

  // Handle Category selection with a fast simple spinning loader before content changes
  const handleSelectCategory = useCallback((cat: string | null) => {
    setIsCategoryLoading(true);
    setVisibleCount(15);
    setTimeout(() => {
      setSelectedCategory(cat);
      setIsCategoryLoading(false);
    }, 380); // Realistic short smooth delay
  }, []);

  const handleSelectFeedType = useCallback((type: string) => {
    setIsCategoryLoading(true);
    setVisibleCount(15);
    setTimeout(() => {
      setSelectedFeedType(type);
      setIsCategoryLoading(false);
    }, 300);
  }, []);

  // Infinite Scroll Observer: Detects when bottom is reached and loads +15 posts with spinning loader
  useEffect(() => {
    if (!hasMorePosts || isLoadingMore || isCategoryLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsLoadingMore(true);
          setTimeout(() => {
            setVisibleCount((prev) => prev + 15);
            setIsLoadingMore(false);
          }, 650); // Clean smooth loading simulation
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) observer.unobserve(currentLoader);
    };
  }, [hasMorePosts, isLoadingMore, isCategoryLoading]);

  const handleOpenModal = (tab: 'post' | 'media' | 'need' = 'post') => {
    setModalDefaultTab(tab);
    setIsModalOpen(true);
  };

  const handleAddNewPost = (newPostData: Partial<Post>) => {
    const created: Post = {
      id: `post-${Date.now()}`,
      type: newPostData.type || 'general',
      category: newPostData.category || 'পরামর্শ',
      author: newPostData.author || {
        name: 'yousuf',
        avatar: '/images/yousuf_profile.png',
        tagline: 'মৎস্য উদ্যোক্তা ও পরিচালক',
        isVerified: true,
        date: 'এখন মাত্র'
      },
      title: newPostData.title,
      question: newPostData.question,
      content: newPostData.content || '',
      image: newPostData.image,
      price: newPostData.price,
      phone: newPostData.phone,
      location: newPostData.location,
      upvotes: 1,
      shares: 0,
      commentsCount: 0,
      views: '১'
    };

    setPosts([created, ...posts]);
  };

  return (
    <div className="min-h-screen bg-[#F4F8FA] text-[#1A2530] flex flex-col font-sans pb-16 md:pb-0 selection:bg-[#00A3E0]/30 selection:text-[#0B5A9C]">
      
      {/* 1. FIXED AUTHORITY HEADER */}
      <Header
        onOpenCreateModal={() => handleOpenModal('post')}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
      />

      {/* 2. MAIN CONTAINER */}
      <div className="max-w-[1240px] w-full mx-auto px-2 sm:px-4 py-3 sm:py-4 flex-1">

        {/* CONDITIONAL VIEW: IF SPACES / STUDENTS TAB OR MARKET IS ACTIVE */}
        {activeNav === 'spaces' ? (
          <StudentsBatchPage onBackToHome={() => setActiveNav('home')} />
        ) : activeNav === 'market' ? (
          <FishMarketPage onBackToHome={() => setActiveNav('home')} />
        ) : (
          /* 3-COLUMN QUORA-STYLE FORUM FEED */
          <div className="flex justify-between items-start gap-4 lg:gap-5">
            
            {/* LEFT SIDEBAR (Sticky on Tablet & Desktop) */}
            <aside className="hidden md:block w-[200px] lg:w-[220px] shrink-0 sticky top-[72px] max-h-[calc(100vh-85px)] overflow-y-auto no-scrollbar">
              <LeftSidebar 
                selectedCategory={selectedCategory}
                onSelectCategory={handleSelectCategory}
                onOpenCreateModal={() => handleOpenModal('post')}
              />
            </aside>

            {/* MIDDLE FEED (Main Scrollable Timeline) */}
            <main className="flex-1 max-w-[660px] min-w-0 w-full">
            
            {/* Create Post Action Box */}
            <CreatePostBox onOpenModal={handleOpenModal} />

            {/* Feed Filter Bar (Horizontally scrollable with smooth touch) */}
            <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 px-3 sm:px-3.5 py-1.5 sm:py-2 mb-3 sm:mb-3.5 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar text-xs shadow-2xs">
              <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
                <button
                  onClick={() => handleSelectFeedType('all')}
                  className={`px-3 py-1.5 rounded-lg sm:rounded-xl font-bold transition text-xs sm:text-[13px] ${
                    selectedFeedType === 'all'
                      ? 'bg-[#0B5A9C] text-white shadow-2xs'
                      : 'text-slate-600 hover:bg-[#F4F8FA]'
                  }`}
                >
                  সকল ফিড
                </button>
                <button
                  onClick={() => handleSelectFeedType('faq')}
                  className={`px-3 py-1.5 rounded-lg sm:rounded-xl font-bold transition text-xs sm:text-[13px] ${
                    selectedFeedType === 'faq'
                      ? 'bg-[#0B5A9C] text-white shadow-2xs'
                      : 'text-slate-600 hover:bg-[#F4F8FA]'
                  }`}
                >
                  FAQ / প্রশ্ন
                </button>
                <button
                  onClick={() => handleSelectFeedType('consultation')}
                  className={`px-3 py-1.5 rounded-lg sm:rounded-xl font-bold transition text-xs sm:text-[13px] ${
                    selectedFeedType === 'consultation'
                      ? 'bg-[#0B5A9C] text-white shadow-2xs'
                      : 'text-slate-600 hover:bg-[#F4F8FA]'
                  }`}
                >
                  পরামর্শ ও রোগ
                </button>
                <button
                  onClick={() => handleSelectFeedType('media')}
                  className={`px-3 py-1.5 rounded-lg sm:rounded-xl font-bold transition text-xs sm:text-[13px] ${
                    selectedFeedType === 'media'
                      ? 'bg-[#0F9473] text-white shadow-2xs'
                      : 'text-slate-600 hover:bg-[#F4F8FA]'
                  }`}
                >
                  ছবি ও ভিডিও
                </button>
                <button
                  onClick={() => handleSelectFeedType('market')}
                  className={`px-3 py-1.5 rounded-lg sm:rounded-xl font-bold transition text-xs sm:text-[13px] ${
                    selectedFeedType === 'market'
                      ? 'bg-[#0B5A9C] text-white shadow-2xs'
                      : 'text-slate-600 hover:bg-[#F4F8FA]'
                  }`}
                >
                  বাজার ও নিয়োগ
                </button>
              </div>

              {selectedCategory && (
                <div className="flex items-center gap-1 bg-sky-100 text-[#0B5A9C] text-[11px] sm:text-[11.5px] font-bold px-2.5 py-0.5 sm:py-1 rounded-full shrink-0">
                  <span className="max-w-[100px] truncate">{selectedCategory}</span>
                  <button 
                    onClick={() => handleSelectCategory(null)} 
                    className="hover:bg-sky-200 rounded-full p-0.5"
                    title="ক্যাটাগরি রিসেট"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>

            {/* Content Area: Category Changing Simple Spinning Loader */}
            {isCategoryLoading ? (
              <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 p-12 text-center shadow-2xs flex flex-col items-center justify-center space-y-3">
                <Loader2 className="w-8 h-8 text-[#0B5A9C] animate-spin" />
                <p className="text-xs sm:text-[13.5px] font-semibold text-slate-500">
                  কন্টেন্ট ও পোস্ট লোড হচ্ছে...
                </p>
              </div>
            ) : displayedPosts.length > 0 ? (
              <>
                {/* List of Posts */}
                {displayedPosts.map((post) => (
                  <PostCard 
                    key={post.id} 
                    post={post} 
                    onSelectCategory={handleSelectCategory}
                  />
                ))}

                {/* Bottom Observer Target & Spinning Loader for Infinite Scroll (+15 items) */}
                {hasMorePosts ? (
                  <div 
                    ref={loaderRef} 
                    className="py-6 flex flex-col items-center justify-center space-y-2 text-center"
                  >
                    <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-2xs">
                      <Loader2 className="w-4 h-4 text-[#0B5A9C] animate-spin" />
                      <span className="text-xs font-bold text-slate-600">
                        পরবর্তী ১৫টি পোস্ট লোড হচ্ছে...
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="py-6 text-center text-xs text-slate-400 font-medium">
                    🎉 আপনি সব সাম্প্রতিক ফোরাম পোস্ট দেখেছেন!
                  </div>
                )}
              </>
            ) : (
              <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 p-8 text-center text-slate-500 shadow-2xs">
                <Layers className="w-10 h-10 mx-auto text-slate-400 mb-2 stroke-1" />
                <h4 className="font-bold text-slate-800 text-sm">কোনো পোস্ট পাওয়া যায়নি</h4>
                <p className="text-xs text-slate-500 mt-1">
                  অন্য কোনো ক্যাটাগরি নির্বাচন করুন বা নতুন পোস্ট প্রকাশ করুন।
                </p>
                <button
                  onClick={() => { handleSelectCategory(null); handleSelectFeedType('all'); setSearchQuery(''); }}
                  className="mt-3 inline-flex items-center gap-1 text-xs text-[#0B5A9C] font-bold hover:underline"
                >
                  সবগুলো পোস্ট দেখুন
                </button>
              </div>
            )}
          </main>

          {/* RIGHT SIDEBAR (Sticky on Desktop) */}
          <aside className="hidden lg:block w-[280px] xl:w-[300px] shrink-0 sticky top-[72px] max-h-[calc(100vh-85px)] overflow-y-auto no-scrollbar">
            <RightSidebar onOpenMarketPrices={() => setActiveNav('market')} />
          </aside>

        </div>
        )}
      </div>

      {/* MOBILE DRAWER SIDEBAR */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-2xs transition-opacity" 
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative w-[300px] max-w-[85%] bg-white h-full shadow-2xl p-4 overflow-y-auto flex flex-col justify-between animate-in slide-in-from-left duration-200">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-2">
                <div className="flex items-center gap-2">
                  <img 
                    src="/images/bdfisheries_logo_tight.png" 
                    alt="Logo" 
                    className="h-8 w-auto object-contain"
                  />
                  <span className="font-extrabold text-[#0B5A9C] text-[15px]">ক্যাটাগরি</span>
                </div>
                <button 
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <LeftSidebar 
                selectedCategory={selectedCategory}
                onSelectCategory={(cat) => {
                  handleSelectCategory(cat);
                  setMobileSidebarOpen(false);
                }}
                onOpenCreateModal={() => {
                  setMobileSidebarOpen(false);
                  handleOpenModal('post');
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* MOBILE NATIVE BOTTOM NAVIGATION BAR */}
      <MobileBottomNav 
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        onOpenCreateModal={() => handleOpenModal('post')}
      />

      {/* TRUSTWORTHY FOOTER */}
      <Footer />

      {/* POPUP MODAL FOR CREATING POST */}
      <CreatePostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddPost={handleAddNewPost}
        defaultTab={modalDefaultTab}
      />

    </div>
  );
}

export default App;
