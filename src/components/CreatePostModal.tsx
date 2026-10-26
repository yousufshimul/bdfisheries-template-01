import React, { useState } from 'react';
import { 
  X, 
  Edit3, 
  Image as ImageIcon, 
  HelpCircle, 
  Sparkles
} from 'lucide-react';
import { CATEGORIES, Post } from '../data/mockData';

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

  // Form states
  const [category, setCategory] = useState(CATEGORIES[0].label);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [postType, setPostType] = useState<'general' | 'faq' | 'sale' | 'job' | 'consultation'>('general');
  const [price, setPrice] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');

  // Sync tab when opened with defaultTab
  React.useEffect(() => {
    setActiveTab(defaultTab);
    if (defaultTab === 'need') {
      setPostType('consultation');
    }
  }, [defaultTab, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() && !title.trim()) return;

    let finalType: Post['type'] = 'general';
    if (activeTab === 'media' && imageUrl) finalType = 'image';
    else if (activeTab === 'need') finalType = 'consultation';
    else finalType = postType;

    const newPost: Partial<Post> = {
      type: finalType,
      category,
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
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-xs">
      <div 
        className="bg-white rounded-2xl w-full max-w-[620px] shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200 border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - Authority #0B5A9C */}
        <div className="flex items-center justify-between px-4 sm:px-5 py-3 sm:py-3.5 bg-[#0B5A9C] text-white">
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
        <div className="grid grid-cols-3 border-b border-slate-200 text-center font-bold text-[13px] sm:text-[14px] bg-[#F4F8FA]">
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
          
          {/* User badge + Category selector */}
          <div className="flex flex-wrap items-center justify-between gap-2 bg-[#F4F8FA] p-2.5 sm:p-3 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
                alt="user" 
                className="w-7 h-7 rounded-full object-cover border"
              />
              <span className="text-xs font-bold text-[#0B5A9C]">সোহাগ হোসেন</span>
            </div>

            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-slate-500 font-medium">ক্যাটাগরি:</span>
              <select 
                value={category} 
                onChange={(e) => setCategory(e.target.value)}
                className="bg-white border border-slate-300 text-[#0B5A9C] font-bold py-1 px-2.5 rounded-lg text-xs outline-none focus:border-[#00A3E0]"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.label}>{c.label}</option>
                ))}
              </select>
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
