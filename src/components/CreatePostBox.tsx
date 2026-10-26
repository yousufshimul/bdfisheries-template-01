import React from 'react';
import { 
  Edit3, 
  Image as ImageIcon, 
  HelpCircle
} from 'lucide-react';

interface CreatePostBoxProps {
  onOpenModal: (tab: 'post' | 'media' | 'need') => void;
}

export const CreatePostBox: React.FC<CreatePostBoxProps> = ({ onOpenModal }) => {
  return (
    <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-2xs p-3 sm:p-4 mb-3 sm:mb-4">
      {/* Top row: Avatar + Modern placeholder button */}
      <div className="flex items-center gap-2 sm:gap-3">
        <img
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
          alt="User Profile"
          className="w-9 h-9 sm:w-11 sm:h-11 rounded-full object-cover border-2 border-sky-100 shrink-0"
        />
        <button
          onClick={() => onOpenModal('post')}
          className="flex-1 text-left bg-[#F4F8FA] hover:bg-sky-50 text-slate-500 hover:text-slate-800 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-[13px] sm:text-[14px] border border-slate-200/80 transition-all cursor-pointer truncate"
        >
          <span className="hidden sm:inline">আপনার কী প্রশ্ন বা অভিজ্ঞতা ফোরামে শেয়ার করতে চান?</span>
          <span className="sm:hidden">কী জানতে বা শেয়ার করতে চান?</span>
        </button>
      </div>

      {/* Divided into 3 Specific User Requested Sections */}
      <div className="grid grid-cols-3 gap-1 pt-2.5 sm:pt-3 mt-2.5 sm:mt-3 border-t border-slate-100 text-center">
        {/* 1. পোস্ট করুন */}
        <button
          onClick={() => onOpenModal('post')}
          className="flex items-center justify-center gap-1 sm:gap-1.5 py-1.5 sm:py-2 px-1 rounded-lg sm:rounded-xl text-[#0B5A9C] hover:bg-sky-50 font-bold text-[13px] sm:text-[14px] transition active:scale-95"
        >
          <Edit3 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0B5A9C] shrink-0" />
          <span className="truncate">পোস্ট করুন</span>
        </button>

        {/* 2. ইমেজ / ভিডিও */}
        <button
          onClick={() => onOpenModal('media')}
          className="flex items-center justify-center gap-1 sm:gap-1.5 py-1.5 sm:py-2 px-1 rounded-lg sm:rounded-xl text-[#0F9473] hover:bg-emerald-50 font-bold text-[13px] sm:text-[14px] transition active:scale-95 border-x border-slate-100"
        >
          <ImageIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0F9473] shrink-0" />
          <span className="truncate">ইমেজ / ভিডিও</span>
        </button>

        {/* 3. কি লাগবে */}
        <button
          onClick={() => onOpenModal('need')}
          className="flex items-center justify-center gap-1 sm:gap-1.5 py-1.5 sm:py-2 px-1 rounded-lg sm:rounded-xl text-[#0B5A9C] hover:bg-sky-50 font-bold text-[13px] sm:text-[14px] transition active:scale-95"
        >
          <HelpCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00A3E0] shrink-0" />
          <span className="truncate">কি লাগবে</span>
        </button>
      </div>
    </div>
  );
};
