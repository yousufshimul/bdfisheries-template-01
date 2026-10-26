import React from 'react';
import { 
  Home, 
  Compass, 
  PlusCircle, 
  Users2, 
  Bell 
} from 'lucide-react';

interface MobileBottomNavProps {
  activeNav: string;
  setActiveNav: (nav: string) => void;
  onOpenCreateModal: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeNav,
  setActiveNav,
  onOpenCreateModal
}) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] px-2 py-1">
      <div className="flex items-center justify-around h-[52px]">
        {/* 1. Home */}
        <button
          onClick={() => setActiveNav('home')}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
            activeNav === 'home' ? 'text-[#0B5A9C] font-bold' : 'text-slate-500'
          }`}
        >
          <Home className={`w-5 h-5 ${activeNav === 'home' ? 'fill-[#0B5A9C] stroke-[1.5]' : 'stroke-[1.8]'}`} />
          <span className="text-[10px] mt-0.5">হোম</span>
        </button>

        {/* 2. Following */}
        <button
          onClick={() => setActiveNav('following')}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
            activeNav === 'following' ? 'text-[#0B5A9C] font-bold' : 'text-slate-500'
          }`}
        >
          <Compass className={`w-5 h-5 ${activeNav === 'following' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          <span className="text-[10px] mt-0.5">অনুসরণ</span>
        </button>

        {/* 3. Center Create Post Floating Action Button */}
        <button
          onClick={onOpenCreateModal}
          className="flex flex-col items-center justify-center -mt-5 mx-1 p-2 rounded-full bg-[#0F9473] hover:bg-[#0c7c60] text-white shadow-lg active:scale-95 transition-transform"
          title="নতুন পোস্ট"
        >
          <PlusCircle className="w-6 h-6 stroke-[2.2]" />
        </button>

        {/* 4. Spaces / Community */}
        <button
          onClick={() => setActiveNav('spaces')}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
            activeNav === 'spaces' ? 'text-[#0B5A9C] font-bold' : 'text-slate-500'
          }`}
        >
          <Users2 className={`w-5 h-5 ${activeNav === 'spaces' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          <span className="text-[10px] mt-0.5">স্পেস</span>
        </button>

        {/* 5. Notifications */}
        <button
          onClick={() => setActiveNav('notifications')}
          className={`relative flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
            activeNav === 'notifications' ? 'text-[#0B5A9C] font-bold' : 'text-slate-500'
          }`}
        >
          <Bell className={`w-5 h-5 ${activeNav === 'notifications' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          <span className="text-[10px] mt-0.5">বিজ্ঞপ্তি</span>
          <span className="absolute top-1 right-3.5 bg-[#0F9473] text-white text-[9px] font-bold px-1 rounded-full min-w-[14px] text-center">
            ৪
          </span>
        </button>
      </div>
    </div>
  );
};
