import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowBigUp, 
  ArrowBigDown, 
  MessageCircle, 
  Share2, 
  MoreHorizontal, 
  CheckCircle2, 
  Bookmark, 
  AlertCircle,
  Phone,
  MapPin,
  Tag,
  DollarSign,
  Briefcase,
  Play,
  Send,
  Copy,
  Check,
  ExternalLink
} from 'lucide-react';
import { Post } from '../data/mockData';
import { VerifiedBadge } from './VerifiedBadge';

interface PostCardProps {
  post: Post;
  onSelectCategory?: (category: string) => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onSelectCategory }) => {
  const [upvotes, setUpvotes] = useState(post.upvotes);
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [hasDownvoted, setHasDownvoted] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<string[]>([
    'অনেক তথ্যবহুল ও সময়োপযোগী পোস্ট! ধন্যবাদ ভাইয়া।',
    'আমাদের এলাকায়ও এই সমস্যাটা দেখা দিয়েছিল, চুন ব্যবহারে ভালো ফল পেয়েছি।'
  ]);
  const [commentInput, setCommentInput] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const shareDropdownRef = useRef<HTMLDivElement>(null);

  // Close share menu on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (shareDropdownRef.current && !shareDropdownRef.current.contains(event.target as Node)) {
        setIsShareOpen(false);
      }
    }
    if (isShareOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isShareOpen]);

  const postUrl = typeof window !== 'undefined' ? `${window.location.origin}/#post-${post.id}` : `https://bdfisheries.com/#post-${post.id}`;
  const shareText = encodeURIComponent(`${post.title || post.question || 'বিডি ফিশারিজ পোস্ট'} - বিডি ফিশারিজ প্ল্যাটফর্মে দেখুন`);

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(postUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShareFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`;
    window.open(url, '_blank', 'noopener,noreferrer,width=600,height=500');
    setIsShareOpen(false);
  };

  const handleShareWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${shareText}%20${encodeURIComponent(postUrl)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsShareOpen(false);
  };

  const handleShareTelegram = () => {
    const url = `https://t.me/share/url?url=${encodeURIComponent(postUrl)}&text=${shareText}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsShareOpen(false);
  };

  const handleShareMessenger = () => {
    // Messenger sharing / FB dialog
    const url = `https://www.facebook.com/dialog/send?link=${encodeURIComponent(postUrl)}&app_id=291494419107518&redirect_uri=${encodeURIComponent(postUrl)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsShareOpen(false);
  };

  const handleShareInstagram = () => {
    // Instagram doesn't have direct web intent to create post, so we copy link and open Instagram web
    handleCopyLink();
    window.open('https://www.instagram.com', '_blank', 'noopener,noreferrer');
    setIsShareOpen(false);
  };

  const handleShareLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`;
    window.open(url, '_blank', 'noopener,noreferrer,width=600,height=500');
    setIsShareOpen(false);
  };

  const handleShareTwitter = () => {
    const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${shareText}`;
    window.open(url, '_blank', 'noopener,noreferrer,width=600,height=500');
    setIsShareOpen(false);
  };

  const handleUpvote = () => {
    if (hasUpvoted) {
      setUpvotes(prev => prev - 1);
      setHasUpvoted(false);
    } else {
      setUpvotes(prev => prev + 1);
      setHasUpvoted(true);
      if (hasDownvoted) setHasDownvoted(false);
    }
  };

  const handleDownvote = () => {
    if (hasDownvoted) {
      setHasDownvoted(false);
    } else {
      setHasDownvoted(true);
      if (hasUpvoted) {
        setUpvotes(prev => prev - 1);
        setHasUpvoted(false);
      }
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    setComments(prev => [...prev, commentInput.trim()]);
    setCommentInput('');
  };

  const getPostTypeBadge = () => {
    switch (post.type) {
      case 'faq':
        return <span className="bg-sky-50 text-[#0B5A9C] border border-[#00A3E0]/30 text-[11px] sm:text-[12px] font-bold px-2 sm:px-2.5 py-0.5 rounded-full shrink-0">এক্সপার্ট FAQ</span>;
      case 'consultation':
        return <span className="bg-amber-50 text-amber-800 border border-amber-200 text-[11px] sm:text-[12px] font-bold px-2 sm:px-2.5 py-0.5 rounded-full flex items-center gap-1 shrink-0"><AlertCircle className="w-3 h-3 text-amber-600" /> জরুরী পরামর্শ</span>;
      case 'sale':
        return <span className="bg-[#0F9473]/10 text-[#0F9473] border border-[#0F9473]/30 text-[11px] sm:text-[12px] font-bold px-2 sm:px-2.5 py-0.5 rounded-full flex items-center gap-1 shrink-0"><Tag className="w-3 h-3" /> বিক্রয়</span>;
      case 'job':
        return <span className="bg-[#0B5A9C]/10 text-[#0B5A9C] border border-[#0B5A9C]/30 text-[11px] sm:text-[12px] font-bold px-2 sm:px-2.5 py-0.5 rounded-full flex items-center gap-1 shrink-0"><Briefcase className="w-3 h-3" /> নিয়োগ</span>;
      case 'video':
        return <span className="bg-sky-50 text-[#0B5A9C] border border-[#00A3E0]/30 text-[11px] sm:text-[12px] font-bold px-2 sm:px-2.5 py-0.5 rounded-full flex items-center gap-1 shrink-0"><Play className="w-3 h-3 fill-[#00A3E0] text-[#00A3E0]" /> ভিডিও</span>;
      default:
        return <span className="bg-[#F4F8FA] text-slate-700 text-[11px] sm:text-[12px] font-semibold px-2 sm:px-2.5 py-0.5 rounded-full border border-slate-200 shrink-0">সাধারণ</span>;
    }
  };

  return (
    <article className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-2xs mb-3 sm:mb-4 overflow-hidden transition-all hover:shadow-md">
      
      {/* 1. Header: Author info, category, date */}
      <div className="p-3.5 sm:p-5 pb-2">
        <div className="flex items-start justify-between gap-1.5 sm:gap-2">
          
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <img 
              src={post.author.avatar} 
              alt={post.author.name}
              className="w-9 h-9 sm:w-11 sm:h-11 rounded-full object-cover border-2 border-sky-100 shrink-0"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
                <span className="font-bold text-[14px] sm:text-[15.5px] text-[#1A2530] hover:text-[#0B5A9C] cursor-pointer truncate">
                  {post.author.name}
                </span>
                {post.author.isVerified && (
                  <VerifiedBadge className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#1877F2] shrink-0" />
                )}
                <span className="text-slate-300 text-xs hidden xs:inline">•</span>
                {post.categories && post.categories.length > 1 ? (
                  <div className="flex items-center gap-1 flex-wrap">
                    {post.categories.map((c, i) => (
                      <button 
                        key={i}
                        onClick={() => onSelectCategory && onSelectCategory(c)}
                        className="text-[11.5px] sm:text-[12.5px] text-[#0B5A9C] hover:text-[#00A3E0] font-bold hover:underline"
                      >
                        {c}{i < (post.categories?.length || 0) - 1 ? ',' : ''}
                      </button>
                    ))}
                  </div>
                ) : (
                  <button 
                    onClick={() => onSelectCategory && onSelectCategory(post.category)}
                    className="text-[12px] sm:text-[13px] text-[#0B5A9C] hover:text-[#00A3E0] font-bold hover:underline truncate"
                  >
                    {post.category}
                  </button>
                )}
              </div>
              <p className="text-[11.5px] sm:text-[12.5px] text-slate-500 leading-tight truncate">
                {post.author.tagline} • <span className="text-slate-400">{post.author.date}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            {getPostTypeBadge()}
            <button className="text-slate-400 hover:text-slate-700 p-1 rounded-full hover:bg-slate-100">
              <MoreHorizontal className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </button>
          </div>

        </div>

        {/* Question / Title Header */}
        {post.question && (
          <h3 className="mt-2.5 sm:mt-3 text-[16px] sm:text-[18.5px] font-extrabold text-[#0B5A9C] leading-snug hover:text-[#00A3E0] transition cursor-pointer">
            {post.question}
          </h3>
        )}

        {post.title && (
          <h3 className="mt-2.5 sm:mt-3 text-[16px] sm:text-[18.5px] font-extrabold text-[#0B5A9C] leading-snug hover:text-[#00A3E0] transition cursor-pointer">
            {post.title}
          </h3>
        )}

        {/* Content Body */}
        <p className="mt-2 sm:mt-2.5 text-[14px] sm:text-[15.5px] text-[#1A2530] leading-relaxed whitespace-pre-line">
          {post.content}
        </p>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 sm:gap-1.5 mt-2.5 sm:mt-3">
            {post.tags.map((tag, i) => (
              <span key={i} className="text-[11.5px] sm:text-[12.5px] font-semibold bg-[#F4F8FA] hover:bg-sky-50 text-[#0B5A9C] border border-slate-200/60 px-2 sm:px-2.5 py-0.5 rounded-md sm:rounded-lg cursor-pointer transition">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Meta badges for Sale / Job Postings */}
        {(post.price || post.location || post.salary || post.deadline) && (
          <div className="mt-3 sm:mt-3.5 p-2.5 sm:p-3 bg-[#F4F8FA] border border-slate-200/80 rounded-xl grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-[13.5px]">
            {post.price && (
              <div className="flex items-center gap-1.5 text-[#0F9473] font-extrabold">
                <DollarSign className="w-4 h-4 text-[#0F9473] shrink-0" />
                <span>মূল্য: {post.price}</span>
              </div>
            )}
            {post.location && (
              <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                <MapPin className="w-4 h-4 text-[#0B5A9C] shrink-0" />
                <span className="truncate">স্থান: {post.location}</span>
              </div>
            )}
            {post.phone && (
              <div className="flex items-center gap-1.5 text-[#0B5A9C] font-bold">
                <Phone className="w-4 h-4 text-[#0F9473] shrink-0" />
                <span>যোগাযোগ: {post.phone}</span>
              </div>
            )}
            {post.salary && (
              <div className="flex items-center gap-1.5 text-[#0F9473] font-bold">
                <Briefcase className="w-4 h-4 text-[#0B5A9C] shrink-0" />
                <span>বেতন: {post.salary}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 2. Expert Consultation Answer Highlight */}
      {post.expertAnswer && (
        <div className="mx-3 sm:mx-4 mb-2.5 sm:mb-3 p-3 sm:p-3.5 bg-sky-50/70 border border-[#00A3E0]/30 rounded-xl text-xs sm:text-[13.5px]">
          <div className="flex items-center gap-2 mb-1.5">
            <img 
              src={post.expertAnswer.expertAvatar} 
              alt={post.expertAnswer.expertName} 
              className="w-6 h-6 sm:w-7 sm:h-7 rounded-full object-cover border border-[#00A3E0] shrink-0"
            />
            <span className="font-bold text-[#0B5A9C] truncate">{post.expertAnswer.expertName}</span>
            <span className="text-slate-600 font-medium hidden xs:inline truncate">({post.expertAnswer.expertTitle})</span>
            <span className="text-[10px] sm:text-[11px] text-slate-400 ml-auto shrink-0">{post.expertAnswer.date}</span>
          </div>
          <p className="text-[#1A2530] leading-relaxed pl-7 sm:pl-9">
            <span className="font-bold text-[#0F9473]">সমাধান:</span> {post.expertAnswer.answer}
          </p>
        </div>
      )}

      {/* 3. Media: Image or Video */}
      {post.image && (
        <div className="w-full bg-slate-100 max-h-[440px] overflow-hidden border-t border-b border-slate-100">
          <img 
            src={post.image} 
            alt={post.title || post.question || 'Post preview'} 
            className="w-full h-full object-cover hover:scale-[1.01] transition-transform duration-300"
            loading="lazy"
          />
        </div>
      )}

      {/* 4. Interaction Footer */}
      <div className="px-2.5 sm:px-4 py-2 sm:py-2.5 border-t border-slate-100 flex items-center justify-between text-xs sm:text-[13px] text-slate-600">
        
        {/* Left: Upvote/Downvote */}
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="inline-flex items-center bg-[#F4F8FA] rounded-lg sm:rounded-xl border border-slate-200 overflow-hidden">
            <button
              onClick={handleUpvote}
              className={`flex items-center gap-1 px-2.5 sm:px-3 py-1 sm:py-1.5 transition-colors font-bold ${
                hasUpvoted ? 'text-[#0B5A9C] bg-sky-100' : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              <ArrowBigUp className={`w-4 h-4 sm:w-4.5 sm:h-4.5 ${hasUpvoted ? 'fill-[#0B5A9C] text-[#0B5A9C]' : ''}`} />
              <span className="hidden xs:inline">আপভোট</span>
              <span className="text-slate-400 font-semibold">{upvotes}</span>
            </button>
            <div className="w-[1px] h-3.5 bg-slate-300" />
            <button
              onClick={handleDownvote}
              className={`px-1.5 sm:px-2 py-1 sm:py-1.5 transition-colors ${
                hasDownvoted ? 'text-red-600 bg-red-50' : 'text-slate-500 hover:bg-slate-200'
              }`}
              title="ডাউনভোট"
            >
              <ArrowBigDown className={`w-4 h-4 sm:w-4.5 sm:h-4.5 ${hasDownvoted ? 'fill-red-600 text-red-600' : ''}`} />
            </button>
          </div>

          {/* Comments Button */}
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl hover:bg-[#F4F8FA] text-slate-700 font-semibold transition"
          >
            <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0B5A9C]" />
            <span className="hidden sm:inline">মন্তব্য</span>
            <span>({comments.length})</span>
          </button>

          {/* Share Button & Popover Dropdown */}
          <div className="relative" ref={shareDropdownRef}>
            <button 
              onClick={() => setIsShareOpen(!isShareOpen)}
              className={`flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl transition font-semibold ${
                isShareOpen ? 'bg-emerald-50 text-[#0F9473]' : 'hover:bg-[#F4F8FA] text-slate-700'
              }`}
              title="সোশ্যাল মিডিয়ায় শেয়ার করুন"
            >
              <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0F9473]" />
              <span className="hidden md:inline">শেয়ার</span>
              <span className="text-slate-400 hidden xs:inline">({post.shares})</span>
            </button>

            {/* Share Popover Menu */}
            {isShareOpen && (
              <div className="absolute left-0 bottom-full mb-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200/90 p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="text-xs font-bold text-slate-700 mb-2 px-1 flex items-center justify-between">
                  <span>পোস্টটি শেয়ার করুন</span>
                  <span className="text-[10px] text-slate-400 font-normal">বিডি ফিশারিজ</span>
                </div>

                {/* Popular Bangladeshi Social Platforms */}
                <div className="grid grid-cols-4 gap-2 mb-3 pb-3 border-b border-slate-100">
                  
                  {/* 1. Facebook */}
                  <button
                    onClick={handleShareFacebook}
                    className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-slate-50 transition group"
                    title="ফেসবুকে শেয়ার করুন"
                  >
                    <div className="w-9 h-9 rounded-full bg-[#1877F2]/10 text-[#1877F2] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </div>
                    <span className="text-[10px] text-slate-600 mt-1 font-medium">Facebook</span>
                  </button>

                  {/* 2. WhatsApp */}
                  <button
                    onClick={handleShareWhatsApp}
                    className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-slate-50 transition group"
                    title="হোয়াটসঅ্যাপে পাঠান"
                  >
                    <div className="w-9 h-9 rounded-full bg-[#25D366]/10 text-[#25D366] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                      </svg>
                    </div>
                    <span className="text-[10px] text-slate-600 mt-1 font-medium">WhatsApp</span>
                  </button>

                  {/* 3. Instagram */}
                  <button
                    onClick={handleShareInstagram}
                    className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-slate-50 transition group"
                    title="ইনস্টাগ্রামে শেয়ার বা লিঙ্ক শেয়ার করুন"
                  >
                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs">
                      <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </div>
                    <span className="text-[10px] text-slate-600 mt-1 font-medium">Instagram</span>
                  </button>

                  {/* 4. Telegram */}
                  <button
                    onClick={handleShareTelegram}
                    className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-slate-50 transition group"
                    title="টেলিগ্রামে শেয়ার করুন"
                  >
                    <div className="w-9 h-9 rounded-full bg-[#229ED9]/10 text-[#229ED9] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                      </svg>
                    </div>
                    <span className="text-[10px] text-slate-600 mt-1 font-medium">Telegram</span>
                  </button>

                </div>

                {/* Second row: Messenger, LinkedIn, Twitter */}
                <div className="flex items-center justify-around mb-3 text-xs text-slate-600 px-1">
                  <button 
                    onClick={handleShareMessenger}
                    className="flex items-center gap-1.5 hover:text-[#0084FF] transition"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#0084FF]" />
                    <span>Messenger</span>
                  </button>
                  <button 
                    onClick={handleShareLinkedIn}
                    className="flex items-center gap-1.5 hover:text-[#0A66C2] transition"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#0A66C2]" />
                    <span>LinkedIn</span>
                  </button>
                  <button 
                    onClick={handleShareTwitter}
                    className="flex items-center gap-1.5 hover:text-slate-900 transition"
                  >
                    <span className="w-2 h-2 rounded-full bg-slate-800" />
                    <span>X (Twitter)</span>
                  </button>
                </div>

                {/* Copy Link URL Bar */}
                <div className="bg-[#F4F8FA] border border-slate-200 rounded-xl p-1.5 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 min-w-0 pl-1.5">
                    <span className="text-slate-400">🔗</span>
                    <span className="text-[11px] text-slate-600 truncate select-all font-mono">
                      {postUrl}
                    </span>
                  </div>
                  <button
                    onClick={handleCopyLink}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 shrink-0 ${
                      copied 
                        ? 'bg-[#0F9473] text-white shadow-2xs' 
                        : 'bg-[#0B5A9C] text-white hover:bg-[#084577]'
                    }`}
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>কপি হয়েছে</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>কপি লিংক</span>
                      </>
                    )}
                  </button>
                </div>

              </div>
            )}
          </div>
        </div>

        {/* Right: Bookmark / Views */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {post.views && (
            <span className="text-[11px] sm:text-[12px] text-slate-400 hidden sm:inline">
              {post.views} ভিউ
            </span>
          )}
          <button 
            onClick={() => setIsSaved(!isSaved)}
            className={`p-1 sm:p-1.5 rounded-lg hover:bg-slate-100 transition ${isSaved ? 'text-[#0B5A9C]' : 'text-slate-400'}`}
            title="সংরক্ষণ করুন"
          >
            <Bookmark className={`w-4 h-4 sm:w-4.5 sm:h-4.5 ${isSaved ? 'fill-[#0B5A9C] text-[#0B5A9C]' : ''}`} />
          </button>
        </div>

      </div>

      {/* Comments Expandable Section */}
      {showComments && (
        <div className="p-3 sm:p-4 bg-[#F4F8FA] border-t border-slate-100 space-y-2.5 sm:space-y-3">
          <form onSubmit={handleAddComment} className="flex gap-1.5 sm:gap-2">
            <input
              type="text"
              placeholder="মতামত বা সমাধান লিখুন..."
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              className="flex-1 bg-white border border-slate-300 rounded-lg sm:rounded-xl px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-[13.5px] outline-none focus:border-[#00A3E0]"
            />
            <button 
              type="submit" 
              className="bg-[#0F9473] hover:bg-[#0c7c60] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-[13px] font-bold flex items-center gap-1 transition shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">মন্তব্য</span>
            </button>
          </form>

          <div className="space-y-2 mt-2">
            {comments.map((c, idx) => (
              <div key={idx} className="bg-white p-2.5 sm:p-3 rounded-lg sm:rounded-xl border border-slate-200/70 text-xs sm:text-[13.5px] text-[#1A2530]">
                <div className="flex items-center gap-2 font-bold text-[#0B5A9C] mb-0.5">
                  <span className="w-4.5 h-4.5 rounded-md bg-sky-100 text-[#0B5A9C] flex items-center justify-center text-[10px] font-extrabold">ম</span>
                  <span>মাছ চাষী ইউজার</span>
                  <span className="text-[10px] text-slate-400 font-normal ml-auto">কিছুক্ষণ আগে</span>
                </div>
                <p className="text-slate-700 pl-5.5 leading-relaxed">{c}</p>
              </div>
            ))}
          </div>
        </div>
      )}

    </article>
  );
};
