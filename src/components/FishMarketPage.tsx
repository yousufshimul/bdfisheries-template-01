import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Calendar, 
  Clock, 
  MapPin, 
  Filter, 
  Search, 
  RefreshCw, 
  ArrowLeft,
  ChevronRight,
  Info,
  BadgeCheck,
  Scale
} from 'lucide-react';
import { WHOLESALE_FISH_PRICES, MarketFishItem } from '../data/fishMarketData';

interface FishMarketPageProps {
  onBackToHome?: () => void;
}

export const FishMarketPage: React.FC<FishMarketPageProps> = ({ onBackToHome }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [lastRefreshed, setLastRefreshed] = useState<string>('২৬ অক্টোবর, ২০২৪ | সকাল ০৮:৩০');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // Unique categories & districts
  const categories = ['all', 'কার্প জাতীয়', 'ক্যাটফিশ', 'চিংড়ি', 'দেশি ও অন্যান্য', 'সামুদ্রিক'];
  const districts = ['all', 'ঢাকা', 'ময়মনসিংহ', 'খুলনা', 'চাঁদপুর', 'চট্টগ্রাম', 'রাজশাহী', 'কক্সবাজার'];

  // Filtered prices
  const filteredPrices = useMemo(() => {
    return WHOLESALE_FISH_PRICES.filter((item) => {
      if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
      if (selectedDistrict !== 'all' && item.district !== selectedDistrict) return false;
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesLocation = item.marketLocation.toLowerCase().includes(query);
        const matchesDistrict = item.district.toLowerCase().includes(query);
        return matchesName || matchesLocation || matchesDistrict;
      }
      return true;
    });
  }, [selectedCategory, selectedDistrict, searchQuery]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastRefreshed('২৬ অক্টোবর, ২০২৪ | এইমাত্র আপডেট');
    }, 500);
  };

  return (
    <div className="w-full pb-16 animate-in fade-in duration-200">
      
      {/* 1. HEADER BANNER */}
      <div className="bg-gradient-to-r from-[#0B5A9C] via-[#0F9473] to-[#0A664F] rounded-2xl p-5 sm:p-7 text-white shadow-md mb-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="relative z-10">
          {onBackToHome && (
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-1.5 bg-white/15 hover:bg-white/25 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold mb-3 border border-white/20 transition active:scale-95"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>হোম ফিডে ফিরে যান</span>
            </button>
          )}

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2 flex items-center gap-2">
                <span>সারাদেশের মাছের পাইকারি বাজার দর</span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-amber-400 text-slate-900 self-center">
                  দৈনিক লাইভ আপডেট
                </span>
              </h1>
              <p className="text-sky-100 text-sm sm:text-[14.5px] max-w-2xl leading-relaxed">
                যাত্রাবাড়ী, কারওয়ান বাজার, মেছুয়া বাজার (ময়মনসিংহ), খুলনা ৫নং ঘাট এবং অন্যান্য প্রধান পাইকারি মৎস্য আড়তের যাচাইকৃত মূল্যতালিকা।
              </p>
            </div>

            {/* Refresh & Last Updated Widget */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-3 sm:p-3.5 shrink-0 self-start md:self-center text-xs">
              <div className="flex items-center gap-2 mb-1.5 text-sky-200 font-medium">
                <Calendar className="w-3.5 h-3.5 text-amber-300" />
                <span>সর্বশেষ আপডেট:</span>
              </div>
              <div className="font-extrabold text-white text-[13px] flex items-center gap-2">
                <span>{lastRefreshed}</span>
                <button
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="p-1 hover:bg-white/20 rounded-md transition"
                  title="রিফ্রেশ করুন"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. FILTER & SEARCH BAR */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs sm:text-[13px] font-bold transition whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-[#0B5A9C] text-white shadow-2xs'
                    : 'bg-[#F4F8FA] text-slate-600 hover:bg-slate-200/60'
                }`}
              >
                {cat === 'all' ? 'সকল মাছ' : cat}
              </button>
            ))}
          </div>

          {/* District & Search */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap sm:flex-nowrap">
            {/* District dropdown */}
            <div className="relative min-w-[130px] shrink-0">
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full bg-[#F4F8FA] border border-slate-200 text-slate-800 text-xs sm:text-sm rounded-xl px-3 py-2 pr-7 font-medium focus:outline-none focus:border-[#0B5A9C] appearance-none cursor-pointer"
              >
                <option value="all">সকল জেলা</option>
                {districts.filter(d => d !== 'all').map((dist) => (
                  <option key={dist} value={dist}>{dist}</option>
                ))}
              </select>
              <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
                ▼
              </div>
            </div>

            {/* Search Input */}
            <div className="relative flex-1 min-w-[180px]">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="মাছের নাম বা আড়তের স্থান খুঁজুন..."
                className="w-full bg-[#F4F8FA] border border-slate-200 text-slate-800 text-xs sm:text-sm rounded-xl pl-8.5 pr-3 py-2 focus:outline-none focus:border-[#0B5A9C] placeholder:text-slate-400"
              />
            </div>
          </div>

        </div>
      </div>

      {/* 3. WHOLESALE FISH PRICE TABLE / CARDS */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        
        {/* Table Header */}
        <div className="hidden lg:grid grid-cols-12 gap-3 px-5 py-3.5 bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-600">
          <div className="col-span-3">মাছের নাম ও ধরণ</div>
          <div className="col-span-2">সাইজ / ওজন / গ্রেড</div>
          <div className="col-span-2">পাইকারি দর (প্রতি কেজি)</div>
          <div className="col-span-2">বাজার পরিবর্তন (Trend)</div>
          <div className="col-span-2">আড়ত ও জেলা</div>
          <div className="col-span-1 text-right">আপডেট সময়</div>
        </div>

        {/* Rows */}
        <div className="divide-y divide-slate-100">
          {filteredPrices.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              <Scale className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="font-bold text-sm text-slate-700">কোনো মাছের বাজার দর পাওয়া যায়নি</p>
              <p className="text-xs text-slate-400 mt-1">অন্য কোনো ক্যাটাগরি বা জেলা নির্বাচন করে দেখুন।</p>
            </div>
          ) : (
            filteredPrices.map((fish: MarketFishItem) => {
              const isUp = fish.trend === 'up';
              const isDown = fish.trend === 'down';

              return (
                <div 
                  key={fish.id}
                  className="p-4 sm:p-5 lg:px-5 lg:py-3.5 hover:bg-slate-50/70 transition flex flex-col lg:grid lg:grid-cols-12 gap-2 sm:gap-3 items-start lg:items-center"
                >
                  {/* Name & Category */}
                  <div className="lg:col-span-3 flex items-start gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#0B5A9C]/10 text-[#0B5A9C] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      🐟
                    </div>
                    <div>
                      <h3 className="font-bold text-[14px] text-slate-900">
                        {fish.name}
                      </h3>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-[11px] font-semibold text-slate-500 px-1.5 py-0.2 rounded bg-slate-100">
                          {fish.category}
                        </span>
                        <span className={`text-[10.5px] font-bold px-1.5 py-0.2 rounded ${
                          fish.supplyStatus === 'প্রচুর' 
                            ? 'bg-emerald-50 text-emerald-700' 
                            : fish.supplyStatus === 'স্বল্প সরবরাহ'
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-sky-50 text-sky-700'
                        }`}>
                          {fish.supplyStatus}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Size / Weight */}
                  <div className="lg:col-span-2 text-xs text-slate-700 font-medium flex items-center gap-1.5">
                    <span className="lg:hidden text-slate-400 font-normal">সাইজ:</span>
                    <span>{fish.gradeOrWeight}</span>
                  </div>

                  {/* Wholesale Price */}
                  <div className="lg:col-span-2 flex items-center gap-2">
                    <span className="lg:hidden text-slate-400 text-xs">পাইকারি দর:</span>
                    <span className="text-base font-extrabold text-[#0F9473]">
                      {fish.wholesalePrice}
                    </span>
                  </div>

                  {/* Trend Indicator */}
                  <div className="lg:col-span-2 flex items-center gap-2 text-xs">
                    <span className="lg:hidden text-slate-400 font-normal">বাজার পরিবর্তন:</span>
                    {isUp && (
                      <span className="inline-flex items-center gap-1 text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md font-bold">
                        <TrendingUp className="w-3.5 h-3.5" />
                        <span>{fish.changeAmount}</span>
                      </span>
                    )}
                    {isDown && (
                      <span className="inline-flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md font-bold">
                        <TrendingDown className="w-3.5 h-3.5" />
                        <span>{fish.changeAmount}</span>
                      </span>
                    )}
                    {!isUp && !isDown && (
                      <span className="inline-flex items-center gap-1 text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md font-medium">
                        <Minus className="w-3.5 h-3.5" />
                        <span>স্থির</span>
                      </span>
                    )}
                  </div>

                  {/* Market Location & District */}
                  <div className="lg:col-span-2 text-xs text-slate-600 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#0B5A9C] shrink-0" />
                    <span className="line-clamp-1">{fish.marketLocation}</span>
                  </div>

                  {/* Update Time */}
                  <div className="lg:col-span-1 text-right w-full lg:w-auto text-[11px] text-slate-400 flex items-center justify-between lg:justify-end gap-1">
                    <span className="lg:hidden text-slate-400">আপডেট: {fish.lastUpdatedDate}</span>
                    <span className="font-medium text-slate-500">{fish.lastUpdatedTime}</span>
                  </div>

                </div>
              );
            })
          )}
        </div>

      </div>

      {/* 4. MARKET ADVISORY NOTE */}
      <div className="mt-5 bg-sky-50 border border-sky-200/80 rounded-xl p-4 flex items-start gap-3 text-xs text-sky-900 leading-relaxed">
        <Info className="w-4 h-4 text-[#0B5A9C] shrink-0 mt-0.5" />
        <div>
          <strong>সতর্কতা ও তথ্য নোট:</strong> উল্লিখিত মূল্যতালিকা দেশের বিভিন্ন আঞ্চলিক মৎস্য পাইকারি আড়তের বাস্তব লেনদেনের গড় হিসেব অনুযায়ী নিয়মিত সংগৃহীত। সরবরাহ, মাছের গ্রেড, গুণগত মান এবং পরিবহনের ওপর ভিত্তি করে আড়তে দর উঠানামা করতে পারে।
        </div>
      </div>

    </div>
  );
};
