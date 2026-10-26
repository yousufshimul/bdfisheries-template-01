import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Edit3, 
  Image as ImageIcon, 
  HelpCircle, 
  Sparkles,
  ChevronDown,
  Check,
  GraduationCap, 
  Users, 
  Fish, 
  UserCheck, 
  Wheat, 
  Wrench, 
  MessageSquareText, 
  Image, 
  ShoppingBag, 
  Home, 
  MapPin, 
  Activity, 
  Truck, 
  FlaskConical
} from 'lucide-react';
import { CATEGORIES, Post } from '../data/mockData';

// Map icon strings to Lucide components for each category in dropdown
const categoryIconMap: Record<string, React.ElementType> = {
  GraduationCap,
  Users,
  Fish,
  UserCheck,
  Wheat,
  Wrench,
  HelpCircle,
  MessageSquareText,
  Image,
  ShoppingBag,
  Home,
  MapPin,
  Activity,
  Truck,
  FlaskConical
};

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPost: (newPost: Partial<Post>) => void;
  defaultTab?: 'post' | 'media' | 'need';
}

export const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isOpen,
  onClose,
  onAddPost,
  defaultTab = 'post'
}) => {
  const [activeTab, setActiveTab] = useState<'post' | 'media' | 'need'>(defaultTab);

  // Multi-select categories state
  const [selectedCategories, setSelectedCategories] = useState<string[]>([CATEGORIES[0].label]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [postType, setPostType] = useState<'general' | 'faq' | 'sale' | 'job' | 'consultation'>('general');
  const [price, setPrice] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');

  // Sync tab when opened with defaultTab
  useEffect(() => {
    setActiveTab(defaultTab);
    if (defaultTab === 'need') {
      setPostType('consultation');
    }
  }, [defaultTab, isOpen]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  if (!isOpen) return null;

  // Toggle category in multi-select list
  const toggleCategory = (catLabel: string) => {
    if (selectedCategories.includes(catLabel)) {
      // Keep at least one category selected
      if (selectedCategories.length > 1) {
        setSelectedCategories(selectedCategories.filter(c => c !== catLabel));
      }
    } else {
      setSelectedCategories([...selectedCategories, catLabel]);
    }
  };

  const removeCategoryChip = (catLabel: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedCategories.length > 1) {
      setSelectedCategories(selectedCategories.filter(c => c !== catLabel));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() && !title.trim()) return;

    let finalType: Post['type'] = 'general';
    if (activeTab === 'media' && imageUrl) finalType = 'image';
    else if (activeTab === 'need') finalType = 'consultation';
    else finalType = postType;

    const primaryCategory = selectedCategories[0] || CATEGORIES[0].label;

    const newPost: Partial<Post> = {
      type: finalType,
      category: primaryCategory,
      categories: selectedCategories,
      title: title.trim() || undefined,
      question: finalType === 'faq' || finalType === 'consultation' ? (title.trim() || content.slice(0, 80) + '...?') : undefined,
      content,
      image: imageUrl.trim() || undefined,
      price: price.trim() || undefined,
      phone: phone.trim() || undefined,
      location: location.trim() || undefined,
      author: {
        name: 'সোহাগ হোসেন (আপনি)',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
        tagline: 'মৎস্য উদ্যোক্তা, বগুড়া',
        isVerified: true,
        date: 'এখন মাত্র'
      },
      upvotes: 1,
      shares: 0,
      commentsCount: 0,
      views: '১'
    };

    onAddPost(newPost);
    // Reset and close
    setTitle('');
    setContent('');
    setImageUrl('');
    setPrice('');
    setPhone('');
    setLocation('');
    setIsDropdownOpen(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-xs">
      <div 
        className="bg-white rounded-2xl w-full max-w-[620px] shadow-2xl overflow-visible flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200 border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - Authority #0B5A9C */}
        <div className="flex items-center justify-between px-4 sm:px-5 py-3 sm:py-3.5 bg-[#0B5A9C] text-white rounded-t-2xl shrink-0">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#00A3E0]" />
            <span className="font-extrabold text-[15px] sm:text-[16.5px]">নতুন পোস্ট বা ফোরাম আলোচনা</span>
          </div>
          <button 
            onClick={onClose}
            className="text-white/80 hover:text-white hover:bg-white/10 p-1 sm:p-1.5 rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3 Main Action Sub-Tabs */}
        <div className="grid grid-cols-3 border-b border-slate-200 text-center font-bold text-[13px] sm:text-[14px] bg-[#F4F8FA] shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('post')}
            className={`py-2.5 sm:py-3 flex items-center justify-center gap-1 sm:gap-1.5 transition-colors border-b-2 ${
              activeTab === 'post'
                ? 'border-[#0B5A9C] text-[#0B5A9C] bg-white font-extrabold'
                : 'border-transparent text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0B5A9C]" />
            <span>পোস্ট করুন</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('media')}
            className={`py-2.5 sm:py-3 flex items-center justify-center gap-1 sm:gap-1.5 transition-colors border-b-2 ${
              activeTab === 'media'
                ? 'border-[#0F9473] text-[#0F9473] bg-white font-extrabold'
                : 'border-transparent text-slate-600 hover:bg-slate-100'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0F9473]" />
            <span className="truncate">ইমেজ / ভিডিও</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('need');
              setPostType('consultation');
            }}
            className={`py-2.5 sm:py-3 flex items-center justify-center gap-1 sm:gap-1.5 transition-colors border-b-2 ${
              activeTab === 'need'
                ? 'border-[#00A3E0] text-[#0B5A9C] bg-white font-extrabold'
                : 'border-transparent text-slate-600 hover:bg-slate-100'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00A3E0]" />
            <span>কি লাগবে</span>
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-3.5 sm:p-5 space-y-3 sm:space-y-4">
          
          {/* User badge + Multi-Select Modern Category Dropdown */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 bg-[#F4F8FA] p-2.5 sm:p-3 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2">
              <img 
                src="/images/yousuf_profile.png" 
                alt="user" 
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover border border-sky-200 shadow-2xs"
              />
              <div>
                <span className="text-xs sm:text-[13px] font-bold text-[#0B5A9C] block leading-tight">yousuf</span>
                <span className="text-[10.5px] text-slate-400">মৎস্য উদ্যোক্তা</span>
              </div>
            </div>

            {/* Custom Multi-Select Dropdown Container */}
            <div className="relative flex-1 sm:max-w-[340px]" ref={dropdownRef}>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-slate-500 hidden sm:inline whitespace-nowrap">ক্যাটাগরি:</span>
                
                {/* Multi-Select Trigger Button */}
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`w-full flex items-center justify-between gap-1.5 bg-white hover:bg-sky-50/70 border text-xs sm:text-[13px] font-bold py-1.5 px-2.5 rounded-xl transition-all shadow-2xs outline-none ${
                    isDropdownOpen 
                      ? 'border-[#0B5A9C] ring-2 ring-[#0B5A9C]/15 text-[#0B5A9C]' 
                      : 'border-slate-300 text-[#1A2530] hover:border-slate-400'
                  }`}
                >
                  <div className="flex items-center gap-1.5 flex-wrap min-w-0 overflow-hidden py-0.5">
                    {/* Render Selected Categories Chips */}
                    {selectedCategories.slice(0, 2).map((catName) => (
                      <span 
                        key={catName}
                        className="inline-flex items-center gap-1 bg-sky-50 text-[#0B5A9C] border border-sky-200 px-2 py-0.5 rounded-lg text-[11px] font-bold"
                      >
                        <span className="truncate max-w-[85px] sm:max-w-[100px]">{catName}</span>
                        {selectedCategories.length > 1 && (
                          <X 
                            onClick={(e) => removeCategoryChip(catName, e)} 
                            className="w-3 h-3 hover:text-red-500 cursor-pointer"
                          />
                        )}
                      </span>
                    ))}
                    {selectedCategories.length > 2 && (
                      <span className="bg-[#0B5A9C] text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded-md">
                        +{selectedCategories.length - 2}
                      </span>
                    )}
                  </div>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180 text-[#0B5A9C]' : ''}`} />
                </button>
              </div>

              {/* Multi-Select Dropdown Popover Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 top-full mt-1.5 w-full sm:w-[280px] bg-white rounded-2xl shadow-xl border border-slate-200 py-1.5 z-50 max-h-[300px] overflow-y-auto no-scrollbar animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 mb-1 flex items-center justify-between">
                    <span>ক্যাটাগরি নির্বাচন করুন (একাধিক)</span>
                    <span className="text-[#0B5A9C] font-extrabold">{selectedCategories.length}টি নির্বাচিত</span>
                  </div>

                  <div className="space-y-0.5 px-1.5">
                    {CATEGORIES.map((cat) => {
                      const IconComp = categoryIconMap[cat.icon] || HelpCircle;
                      const isSelected = selectedCategories.includes(cat.label);

                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => toggleCategory(cat.label)}
                          className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-left text-xs sm:text-[13px] transition-colors ${
                            isSelected
                              ? 'bg-sky-50/90 text-[#0B5A9C] font-bold'
                              : 'text-slate-700 hover:bg-slate-100 hover:text-[#0B5A9C] font-medium'
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            {/* Checkbox Icon */}
                            <div className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                              isSelected 
                                ? 'bg-[#0B5A9C] border-[#0B5A9C] text-white' 
                                : 'border-slate-300 bg-white'
                            }`}>
                              {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>

                            <span className={`p-1 rounded-lg shrink-0 ${
                              isSelected ? 'bg-sky-100 text-[#0B5A9C]' : 'bg-slate-100 text-slate-500'
                            }`}>
                              <IconComp className="w-3.5 h-3.5" />
                            </span>
                            <span className="truncate">{cat.label}</span>
                          </div>

                          <span className={`text-[10.5px] px-1.5 py-0.2 rounded-full font-semibold shrink-0 ${
                            isSelected ? 'bg-sky-100 text-[#0B5A9C]' : 'bg-slate-100 text-slate-400'
                          }`}>
                            {cat.count}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Done button inside dropdown for easy mobile closing */}
                  <div className="p-2 border-t border-slate-100 mt-1 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(false)}
                      className="bg-[#0B5A9C] hover:bg-[#084577] text-white text-xs font-bold px-3 py-1 rounded-lg transition"
                    >
                      সম্পন্ন
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Conditional post type badges in 'পোস্ট করুন' tab */}
          {activeTab === 'post' && (
            <div className="flex flex-wrap gap-1 sm:gap-1.5 text-xs">
              {[
                { type: 'general', label: 'সাধারণ আলোচনা' },
                { type: 'faq', label: 'FAQ / প্রশ্ন' },
                { type: 'sale', label: 'পণ্য বিক্রয়' },
                { type: 'job', label: 'চাকরি / লোক নিয়োগ' },
              ].map(opt => (
                <button
                  type="button"
                  key={opt.type}
                  onClick={() => setPostType(opt.type as any)}
                  className={`px-2.5 sm:px-3 py-1 rounded-full border transition font-semibold text-[11.5px] sm:text-xs ${
                    postType === opt.type 
                      ? 'bg-sky-50 text-[#0B5A9C] border-[#00A3E0] font-bold' 
                      : 'bg-[#F4F8FA] text-slate-600 border-slate-200 hover:bg-slate-200'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}

          {/* Title / Question Input */}
          <div>
            <label className="block text-xs font-bold text-[#1A2530] mb-1">
              {activeTab === 'need' ? 'আপনার কী প্রয়োজন বা সমস্যা?' : 'পোস্টের শিরোনাম / প্রশ্ন'}
            </label>
            <input
              type="text"
              placeholder={
                activeTab === 'need'
                  ? 'যেমন: রুই মাছের জন্য জরুরি ভিটামিন প্রিমিক্স দরকার...'
                  : 'সংক্ষেপে আপনার বিষয় বা প্রশ্নের শিরোনাম লিখুন...'
              }
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-[13.5px] sm:text-[14.5px] bg-white border border-slate-300 focus:border-[#00A3E0] rounded-xl px-3 sm:px-3.5 py-2 sm:py-2.5 outline-none font-medium placeholder:text-slate-400"
            />
          </div>

          {/* Content TextArea */}
          <div>
            <label className="block text-xs font-bold text-[#1A2530] mb-1">
              বিস্তারিত বিবরণ
            </label>
            <textarea
              rows={4}
              placeholder="পুকুরের সাইজ, মাছের প্রজাতি, পানির বর্তমান অবস্থা বা প্রয়োজনীয় অন্যান্য বিস্তারিত লিখুন..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="w-full text-[13px] sm:text-[14px] bg-white border border-slate-300 focus:border-[#00A3E0] rounded-xl p-3 sm:p-3.5 outline-none placeholder:text-slate-400 resize-none"
            />
          </div>

          {/* Extra inputs for Media Tab */}
          {activeTab === 'media' && (
            <div className="p-3 bg-emerald-50/60 border border-[#0F9473]/30 rounded-xl space-y-1.5">
              <label className="block text-xs font-bold text-[#0F9473] flex items-center gap-1">
                <ImageIcon className="w-4 h-4 text-[#0F9473]" />
                <span>ইমেজ বা ভিডিও লিঙ্ক (URL)</span>
              </label>
              <input
                type="url"
                placeholder="https://images.unsplash.com/... বা ইউটিউব লিঙ্ক"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full text-xs bg-white border border-emerald-300 rounded-lg px-3 py-1.5 outline-none"
              />
            </div>
          )}

          {/* Extra inputs for Need / Sale */}
          {(activeTab === 'need' || postType === 'sale' || postType === 'job') && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-2.5 sm:p-3 bg-[#F4F8FA] border border-slate-200 rounded-xl text-xs">
              <div>
                <span className="text-slate-600 block mb-1 font-semibold">বাজেট / মূল্য</span>
                <input
                  type="text"
                  placeholder="যেমন: ৩৫০ টাকা"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 outline-none"
                />
              </div>
              <div>
                <span className="text-slate-600 block mb-1 font-semibold">যোগাযোগ নম্বর</span>
                <input
                  type="text"
                  placeholder="০১৭XXXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 outline-none"
                />
              </div>
              <div>
                <span className="text-slate-600 block mb-1 font-semibold">স্থান / জেলা</span>
                <input
                  type="text"
                  placeholder="যেমন: ময়মনসিংহ"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 outline-none"
                />
              </div>
            </div>
          )}

          {/* Footer Submit Buttons */}
          <div className="pt-2.5 border-t border-slate-200 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition"
            >
              বাতিল
            </button>
            <button
              type="submit"
              className="px-5 sm:px-6 py-2 sm:py-2.5 bg-[#0F9473] hover:bg-[#0c7c60] text-white text-xs sm:text-[13px] font-bold rounded-xl shadow-md transition-all active:scale-95"
            >
              পোস্ট প্রকাশ করুন
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
