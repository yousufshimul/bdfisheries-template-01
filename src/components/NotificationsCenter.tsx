import React, { useState } from 'react';
import { 
  MoreHorizontal, 
  Settings, 
  CheckCheck, 
  Trash2, 
  EyeOff, 
  VolumeX, 
  ExternalLink,
  Filter
} from 'lucide-react';

export interface NotificationItem {
  id: string;
  avatar: string;
  sourceText: string; // e.g. "মাছের রোগ ও চিকিৎসা · ডা. রফিকুল ইসলাম পোস্ট করেছেন · ২০ অক্টোবর"
  title: string;
  snippet?: string;
  isUnread: boolean;
  date: string;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    sourceText: 'মাছের রোগ ও চিকিৎসা থেকে হাইলাইট · ডা. রফিকুল ইসলাম পোস্ট করেছেন · ২০ অক্টোবর',
    title: 'পুকুরে মাছের ফুলকা পচা এবং ক্ষতরোগের লক্ষণ দেখা দিলে দ্রত যে অ্যান্টিসেপটিক ও চুন প্রয়োগ করতে হবে...',
    isUnread: true,
    date: '২০ অক্টোবর'
  },
  {
    id: 'notif-2',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    sourceText: 'উন্নত মাছ চাষ পদ্ধতি · ইঞ্জি. সারোয়ার জাহান পোস্ট করেছেন · ১৮ অক্টোবর',
    title: 'বিদ্যুৎ সাশ্রয়ী প্যাডেল হুইল এয়ারেটর ও অটো ফিডার স্থাপনের বাস্তব অভিজ্ঞতা ও উৎপাদন বৃদ্ধির সঠিক হিসাব...',
    isUnread: true,
    date: '১৮ অক্টোবর'
  },
  {
    id: 'notif-3',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    sourceText: 'চিংড়ি চাষ ও রোগ নিয়ন্ত্রণ · মো. শফিকুল ইসলাম পোস্ট করেছেন · ১৫ অক্টোবর',
    title: 'লবণাক্ত ও আধা-লবণাক্ত পানিতে ভ্যানামেই ও বাগদা চিংড়ির পোনা ছাড়ার পূর্বে অ্যাক্লিমেটাইজেশন প্রক্রিয়া...',
    isUnread: true,
    date: '১৫ অক্টোবর'
  },
  {
    id: 'notif-4',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
    sourceText: 'মৎস্য পুষ্টি ও ফিড ফর্মুলেশন · আপনার পছন্দ হতে পারে এমন একটি বিষয় · ১৩ অক্টোবর',
    title: 'বাণিজ্যিক কার্প ও পাবদা চাষে প্রোটিন পার্সেন্টেজ অনুযায়ী ফ্লোটিং ফিডের দৈনিক মাত্রা কীভাবে নির্ধারণ করবেন?',
    isUnread: false,
    date: '১৩ অক্টোবর'
  },
  {
    id: 'notif-5',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80',
    sourceText: 'হ্যাচারি ও পোনা উৎপাদন · তানভীর আহমেদ পোস্ট করেছেন · ১০ অক্টোবর',
    title: 'দেশি শিং, মাগুর ও গুলশা মাছের কৃত্রিম প্রজনন এবং ব্রুডস্টক পরিচর্যার অত্যাধুনিক গাইডলাইন...',
    isUnread: false,
    date: '১০ অক্টোবর'
  },
  {
    id: 'notif-6',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
    sourceText: 'বাজার দর ও পাইকারি বিপণন · বিডি ফিশারিজ অফিশিয়াল · ০৮ অক্টোবর',
    title: 'সারা দেশের পাইকারি মাছের আড়তে আজকের লাইভ বাজার দর হালনাগাদ করা হয়েছে, যাচাই করে নিন...',
    isUnread: false,
    date: '০৮ অক্টোবর'
  },
  {
    id: 'notif-7',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80',
    sourceText: 'বায়োফ্লক ও আরএএস (RAS) প্রযুক্তি · কবির হোসেন পোস্ট করেছেন · ০৫ অক্টোবর',
    title: 'শীতকালে বায়োফ্লক ট্যাঙ্কের ওয়াটার টেম্পারেচার এবং সি/এন রেশিও ঠিক রাখার সহজ পদ্ধতি...',
    isUnread: false,
    date: '০৫ অক্টোবর'
  },
  {
    id: 'notif-8',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80',
    sourceText: 'প্রশ্নোত্তর ও জিজ্ঞাসা · আপনার পোস্টটিতে একটি নতুন উত্তর দেওয়া হয়েছে · ০২ অক্টোবর',
    title: '“পুকুরে অ্যামোনিয়া গ্যাস বৃদ্ধি পেলে তাৎক্ষণিক করণীয় কী?” — ৩ জন মাৎস্য কর্মকর্তা উত্তর দিয়েছেন।',
    isUnread: false,
    date: '০২ অক্টোবর'
  }
];

interface NotificationsCenterProps {
  onBackToHome?: () => void;
  onClearCount?: () => void;
}

export const NotificationsCenter: React.FC<NotificationsCenterProps> = ({ onClearCount }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  // Mark all as read
  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isUnread: false })));
    if (onClearCount) onClearCount();
  };

  // Toggle single read status
  const handleToggleRead = (id: string) => {
    setNotifications(prev => prev.map(n => {
      if (n.id === id) {
        return { ...n, isUnread: !n.isUnread };
      }
      return n;
    }));
    setOpenMenuId(null);
  };

  // Delete notification
  const handleDelete = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    setOpenMenuId(null);
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
      
      {/* 1. TOP HEADER (Exact Quora Design) */}
      <div className="px-4 sm:px-6 py-3.5 border-b border-slate-200/80 flex items-center justify-between">
        <h2 className="text-[17px] sm:text-[18px] font-bold text-slate-800">
          বিজ্ঞপ্তিসমূহ
        </h2>
        
        <div className="flex items-center gap-3 text-xs sm:text-[13px] text-slate-600">
          <button 
            onClick={handleMarkAllAsRead}
            className="hover:text-[#0B5A9C] hover:underline transition font-medium"
          >
            সবগুলি 'পড়া হয়ে গেছে' চিহ্নিত করুন
          </button>
          <span className="text-slate-300">•</span>
          <button className="hover:text-[#0B5A9C] hover:underline transition font-medium flex items-center gap-1">
            <span>সেটিংস</span>
          </button>
        </div>
      </div>

      {/* 2. NOTIFICATIONS LIST (Clean Quora row style with bubble cards) */}
      <div className="divide-y divide-slate-100">
        {notifications.length === 0 ? (
          <div className="py-12 text-center text-slate-400">
            <p className="text-sm">বর্তমানে কোনো নতুন বিজ্ঞপ্তি নেই</p>
          </div>
        ) : (
          notifications.map((item) => (
            <div 
              key={item.id}
              className={`p-3.5 sm:p-4.5 transition-colors relative flex items-start gap-3 sm:gap-3.5 hover:bg-slate-50/70 ${
                item.isUnread ? 'bg-[#F0F7FF]/50' : 'bg-white'
              }`}
            >
              {/* Unread dot indicator (if unread) */}
              {item.isUnread && (
                <div className="absolute left-1.5 top-5 w-2 h-2 rounded-full bg-[#0F9473]" />
              )}

              {/* Author / Space Avatar */}
              <div className="relative shrink-0 mt-0.5">
                <img 
                  src={item.avatar} 
                  alt="avatar" 
                  className="w-10 h-10 rounded-full object-cover border border-slate-200 shadow-2xs"
                />
              </div>

              {/* Notification Content Body */}
              <div className="flex-1 min-w-0 pr-6 sm:pr-8">
                {/* Source & Date Header text */}
                <div className="text-xs text-slate-500 line-clamp-1 mb-1.5">
                  {item.sourceText}
                </div>

                {/* Quora Style Highlight Box */}
                <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-xl p-2.5 sm:p-3 hover:border-slate-300 transition cursor-pointer">
                  <p className="text-[13.5px] sm:text-[14px] font-bold text-slate-800 leading-snug line-clamp-2 hover:text-[#0B5A9C]">
                    {item.title}
                  </p>
                </div>
              </div>

              {/* Right: Three dots dropdown menu button */}
              <div className="absolute right-3 top-4">
                <button 
                  onClick={() => setOpenMenuId(openMenuId === item.id ? null : item.id)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition"
                  title="আরও অপশন"
                >
                  <MoreHorizontal className="w-4.5 h-4.5" />
                </button>

                {/* Dropdown Popover */}
                {openMenuId === item.id && (
                  <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-30 animate-in fade-in zoom-in-95 text-xs text-slate-700">
                    <button 
                      onClick={() => handleToggleRead(item.id)}
                      className="w-full px-3 py-2 text-left hover:bg-slate-50 flex items-center gap-2"
                    >
                      <CheckCheck className="w-3.5 h-3.5 text-[#0F9473]" />
                      <span>{item.isUnread ? 'পড়া হয়েছে হিসেবে চিহ্নিত করুন' : 'অপঠিত হিসেবে চিহ্নিত করুন'}</span>
                    </button>
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="w-full px-3 py-2 text-left hover:bg-rose-50 text-rose-600 flex items-center gap-2"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>বিজ্ঞপ্তিটি মুছুন</span>
                    </button>
                  </div>
                )}
              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
};
