import React, { useState } from 'react';
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
  Send
} from 'lucide-react';
import { Post } from '../data/mockData';

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
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00A3E0] fill-[#00A3E0]/20 shrink-0" />
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

          {/* Share Button */}
          <button className="flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl hover:bg-[#F4F8FA] text-slate-700 font-semibold transition">
            <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0F9473]" />
            <span className="hidden md:inline">শেয়ার</span>
            <span className="text-slate-400 hidden xs:inline">({post.shares})</span>
          </button>
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
