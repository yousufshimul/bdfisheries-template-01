import React from 'react';
import { 
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
  FlaskConical,
  Plus,
  Sparkles
} from 'lucide-react';
import { CATEGORIES } from '../data/mockData';

// Map icon strings to Lucide components
const iconMap: Record<string, React.ElementType> = {
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

interface LeftSidebarProps {
  selectedCategory: string | null;
  onSelectCategory: (id: string | null) => void;
  onOpenCreateModal: () => void;
}

export const LeftSidebar: React.FC<LeftSidebarProps> = ({
  selectedCategory,
  onSelectCategory,
  onOpenCreateModal
}) => {
  return (
    <aside className="w-full">
      {/* Create Topic / Space Shortcut */}
      <button 
        onClick={onOpenCreateModal}
        className="w-full flex items-center gap-2 px-2.5 py-1.5 text-[14.5px] text-[#0B5A9C] bg-white hover:bg-sky-50 rounded-lg border border-dashed border-slate-300 font-bold transition mb-1.5 group shadow-2xs"
      >
        <span className="w-5 h-5 rounded-md bg-sky-100 text-[#0B5A9C] flex items-center justify-center group-hover:scale-105 transition-transform">
          <Plus className="w-3.5 h-3.5" />
        </span>
        <span>নতুন টপিক যোগ করুন</span>
      </button>

      {/* "সব ক্যাটাগরি" / All Feed button */}
      <button
        onClick={() => onSelectCategory(null)}
        className={`w-full flex items-center justify-between px-2.5 py-1.5 text-[15.5px] rounded-lg transition-colors font-bold ${
          selectedCategory === null 
            ? 'bg-sky-100/70 text-[#0B5A9C]' 
            : 'text-[#1A2530] hover:bg-slate-200/50'
        }`}
      >
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#0B5A9C]" />
          <span>সকল পোস্ট ও ফিড</span>
        </div>
      </button>

      {/* Clean seamless category list directly on the background without a card container */}
      <div className="flex flex-col mt-0.5">
        {CATEGORIES.map((cat) => {
          const IconComponent = iconMap[cat.icon] || HelpCircle;
          const isSelected = selectedCategory === cat.label;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(isSelected ? null : cat.label)}
              className={`w-full flex items-center justify-between px-2.5 py-1 text-[15.5px] rounded-lg transition-colors text-left ${
                isSelected
                  ? 'bg-sky-100/70 text-[#0B5A9C] font-extrabold'
                  : 'text-[#1A2530] hover:bg-slate-200/50 hover:text-[#0B5A9C] font-semibold'
              }`}
            >
              <div className="flex items-center gap-2.5 truncate">
                <span className={`p-1 rounded-md shrink-0 ${isSelected ? 'bg-white text-[#0B5A9C]' : 'text-slate-500 bg-white/70'}`}>
                  <IconComponent className="w-4 h-4" />
                </span>
                <span className="truncate">{cat.label}</span>
              </div>
              <span className={`text-[12px] px-1.5 py-0.2 rounded font-bold shrink-0 ${
                isSelected ? 'bg-[#0B5A9C] text-white' : 'text-slate-400'
              }`}>
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Footer Info / Links */}
      <div className="mt-4 pt-3 border-t border-slate-200 px-1 text-[11.5px] text-slate-400 space-y-1">
        <div className="flex flex-wrap gap-x-2 gap-y-0.5 font-medium">
          <a href="#" className="hover:text-[#0B5A9C] hover:underline">সম্পর্কে</a> •
          <a href="#" className="hover:text-[#0B5A9C] hover:underline">ক্যারিয়ার</a> •
          <a href="#" className="hover:text-[#0B5A9C] hover:underline">নীতিমালা</a>
        </div>
        <p className="font-normal text-[11px]">© ২০২৬ বিডি ফিশারিজ</p>
      </div>
    </aside>
  );
};
