import React, { useState, useRef, useEffect } from 'react';
import { 
  Home, 
  Compass, 
  Edit3, 
  Users2, 
  Bell, 
  Search, 
  Globe, 
  ChevronDown,
  Menu,
  X,
  Plus,
  User,
  Settings,
  ShoppingBag,
  Activity,
  HelpCircle,
  LogOut,
  ChevronRight
} from 'lucide-react';

interface HeaderProps {
  onOpenCreateModal: (defaultTab?: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  activeNav: string;
  setActiveNav: (nav: string) => void;
  onToggleMobileSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenCreateModal,
  searchQuery,
  setSearchQuery,
  activeNav,
  setActiveNav,
  onToggleMobileSidebar
}) => {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    }
    if (isProfileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileMenuOpen]);

  // Exact Quora icon navbar items
  const navItems = [
    { id: 'home', icon: Home, tooltip: 'হোম' },
    { id: 'following', icon: Compass, tooltip: 'অনুসরণ' },
    { id: 'answers', icon: Edit3, tooltip: 'উত্তর দিন' },
    { id: 'spaces', icon: Users2, tooltip: 'স্পেস / কমিউনিটি' },
    { id: 'notifications', icon: Bell, badge: '৪', tooltip: 'বিজ্ঞপ্তি' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200/90 shadow-2xs">
      <div className="max-w-[1240px] mx-auto px-2.5 sm:px-4 h-[56px] sm:h-[60px] flex items-center justify-between gap-1.5 sm:gap-3">
        
        {/* Left: Mobile menu toggle + Logo */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button 
            onClick={onToggleMobileSidebar}
            className="md:hidden p-1.5 text-slate-700 hover:bg-slate-100 rounded-lg transition active:scale-95"
            title="ক্যাটাগরি মেনু"
            aria-label="ক্যাটাগরি মেনু"
          >
            <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <a 
            href="/" 
            onClick={(e) => {
              e.preventDefault();
              setActiveNav('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center group select-none"
            title="বিডি ফিশারিজ হোম"
          >
            <img 
              src="/images/bdfisheries_logo_tight.png" 
              alt="বিডি ফিশারিজ" 
              className="h-9 sm:h-11 md:h-[48px] w-auto max-w-[140px] sm:max-w-[200px] object-contain transition-transform group-hover:scale-102"
            />
          </a>
        </div>

        {/* Center: Quora Icon Navigation Bar */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-4 h-full">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                className={`relative h-full px-3.5 sm:px-4 flex items-center justify-center transition-colors border-b-[3px] ${
                  isActive 
                    ? 'border-[#0B5A9C] text-[#0B5A9C]' 
                    : 'border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                }`}
                title={item.tooltip}
              >
                <Icon className={`w-5 h-5 lg:w-6 lg:h-6 ${isActive ? 'fill-[#0B5A9C] stroke-[1.5]' : 'stroke-[1.8]'}`} />
                {item.badge && (
                  <span className="absolute top-2.5 right-1.5 sm:right-2 bg-[#0F9473] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full min-w-[16px] text-center shadow-xs">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Middle Right: Desktop Search input */}
        <div className="flex-1 max-w-[240px] lg:max-w-[300px] relative hidden lg:block">
          <div className="relative flex items-center">
            <Search className="absolute left-3 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="বিডি ফিশারিজ-এ খুঁজুন"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#F4F8FA] hover:bg-slate-50 focus:bg-white text-[13.5px] text-[#1A2530] placeholder:text-slate-400 border border-slate-300 focus:border-[#00A3E0] rounded-md pl-9 pr-3 py-1.5 outline-none transition-all"
            />
          </div>
        </div>

        {/* Right Action buttons */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          
          {/* Mobile search toggle button */}
          <button
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            className="lg:hidden p-2 text-slate-600 hover:text-[#0B5A9C] hover:bg-slate-100 rounded-full transition"
            title="সার্চ করুন"
          >
            {mobileSearchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
          </button>

          {/* User Profile Avatar with Author Name 'yousuf' + Custom Dropdown Menu */}
          <div className="relative" ref={profileMenuRef}>
            <button 
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className={`flex items-center gap-1.5 p-1 rounded-full sm:rounded-xl transition group outline-none ${
                isProfileMenuOpen ? 'bg-sky-50 ring-2 ring-[#0B5A9C]/20' : 'hover:bg-slate-100'
              }`}
              title="ইউজার প্রোফাইল মেনু"
            >
              <img
                src="/images/yousuf_profile.png"
                alt="yousuf"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover border border-slate-200"
              />
              <span className="text-[13px] sm:text-[14px] font-bold text-[#1A2530] group-hover:text-[#0B5A9C] hidden sm:inline-block leading-none">
                yousuf
              </span>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 hidden sm:inline-block transition-transform duration-200 ${
                isProfileMenuOpen ? 'rotate-180 text-[#0B5A9C]' : ''
              }`} />
            </button>

            {/* Profile Dropdown Popover */}
            {isProfileMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-[220px] sm:w-[240px] bg-white rounded-2xl shadow-xl border border-slate-200/90 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                {/* Header User Brief */}
                <div className="px-3.5 py-2.5 border-b border-slate-100 flex items-center gap-2.5">
                  <img
                    src="/images/yousuf_profile.png"
                    alt="yousuf"
                    className="w-9 h-9 rounded-full object-cover border border-sky-200"
                  />
                  <div className="min-w-0">
                    <p className="text-[14px] font-bold text-[#0B5A9C] truncate leading-tight">yousuf</p>
                    <p className="text-[11px] text-slate-400 truncate">মৎস্য খামারি ও সদস্য</p>
                  </div>
                </div>

                {/* Dropdown Options List */}
                <div className="py-1 px-1.5 space-y-0.5 text-xs sm:text-[13px]">
                  
                  {/* 1. Profile */}
                  <a
                    href="#profile"
                    onClick={() => setIsProfileMenuOpen(false)}
                    className="flex items-center justify-between px-3 py-2 rounded-xl text-slate-700 hover:bg-sky-50 hover:text-[#0B5A9C] font-semibold transition"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="p-1.5 rounded-lg bg-sky-50 text-[#0B5A9C]">
                        <User className="w-4 h-4" />
                      </span>
                      <span>Profile</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                  </a>

                  {/* 2. Settings */}
                  <a
                    href="#settings"
                    onClick={() => setIsProfileMenuOpen(false)}
                    className="flex items-center justify-between px-3 py-2 rounded-xl text-slate-700 hover:bg-sky-50 hover:text-[#0B5A9C] font-semibold transition"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="p-1.5 rounded-lg bg-slate-100 text-slate-600">
                        <Settings className="w-4 h-4" />
                      </span>
                      <span>Settings</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                  </a>

                  {/* 3. Orders */}
                  <a
                    href="#orders"
                    onClick={() => setIsProfileMenuOpen(false)}
                    className="flex items-center justify-between px-3 py-2 rounded-xl text-slate-700 hover:bg-sky-50 hover:text-[#0B5A9C] font-semibold transition"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="p-1.5 rounded-lg bg-emerald-50 text-[#0F9473]">
                        <ShoppingBag className="w-4 h-4" />
                      </span>
                      <span>Orders</span>
                    </div>
                    <span className="text-[10px] font-bold bg-[#0F9473] text-white px-1.5 py-0.2 rounded-full">২টি</span>
                  </a>

                  {/* 4. Recent Activities */}
                  <a
                    href="#recent-activities"
                    onClick={() => setIsProfileMenuOpen(false)}
                    className="flex items-center justify-between px-3 py-2 rounded-xl text-slate-700 hover:bg-sky-50 hover:text-[#0B5A9C] font-semibold transition"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="p-1.5 rounded-lg bg-blue-50 text-[#0B5A9C]">
                        <Activity className="w-4 h-4" />
                      </span>
                      <span>Recent Activities</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                  </a>

                  {/* 5. Help */}
                  <a
                    href="#help"
                    onClick={() => setIsProfileMenuOpen(false)}
                    className="flex items-center justify-between px-3 py-2 rounded-xl text-slate-700 hover:bg-sky-50 hover:text-[#0B5A9C] font-semibold transition"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="p-1.5 rounded-lg bg-amber-50 text-amber-600">
                        <HelpCircle className="w-4 h-4" />
                      </span>
                      <span>Help</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                  </a>

                </div>

                {/* Footer Sign out item */}
                <div className="pt-1 mt-1 border-t border-slate-100 px-1.5">
                  <button
                    onClick={() => setIsProfileMenuOpen(false)}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-red-600 hover:bg-red-50 text-xs sm:text-[13px] font-bold transition text-left"
                  >
                    <LogOut className="w-4 h-4 text-red-500" />
                    <span>লগআউট (Logout)</span>
                  </button>
                </div>

              </div>
            )}
          </div>

          {/* Globe language icon (desktop) */}
          <button
            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-full transition hidden sm:block"
            title="ভাষা নির্বাচন"
          >
            <Globe className="w-5 h-5 stroke-[1.8]" />
          </button>

          {/* Theme Color Split Button: 'প্রশ্ন যোগ করুন' | ChevronDown */}
          <div className="inline-flex rounded-full shadow-xs overflow-hidden transition-transform active:scale-95">
            <button
              onClick={() => onOpenCreateModal('general')}
              className="bg-[#0F9473] hover:bg-[#0c7c60] text-white text-[12.5px] sm:text-[13.5px] font-bold px-2.5 sm:px-4 py-1.5 flex items-center gap-1 transition"
            >
              <Plus className="w-3.5 h-3.5 sm:hidden" />
              <span className="whitespace-nowrap hidden xs:inline">প্রশ্ন যোগ করুন</span>
              <span className="whitespace-nowrap xs:hidden">পোস্ট</span>
            </button>
            <button
              onClick={() => onOpenCreateModal('general')}
              className="bg-[#0c7c60] hover:bg-[#0a664f] text-white px-1.5 sm:px-2 py-1.5 border-l border-emerald-800/40 flex items-center justify-center transition"
              title="অন্যান্য অপশন"
            >
              <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>

        </div>

      </div>

      {/* Expandable Mobile Search Bar */}
      {mobileSearchOpen && (
        <div className="lg:hidden px-3 py-2 bg-[#F4F8FA] border-t border-slate-200 animate-in slide-in-from-top-2 duration-150">
          <div className="relative flex items-center">
            <Search className="absolute left-3 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              autoFocus
              placeholder="বিডি ফিশারিজ-এ খুঁজুন বা প্রশ্ন করুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white text-[14px] text-[#1A2530] placeholder:text-slate-400 border border-slate-300 focus:border-[#00A3E0] rounded-lg pl-9.5 pr-8 py-2 outline-none shadow-xs"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
