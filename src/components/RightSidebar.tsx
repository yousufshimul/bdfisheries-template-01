import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  TrendingUp, 
  Award, 
  PhoneCall,
  ChevronLeft,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { RECENT_ACTIVITIES } from '../data/mockData';

interface AdItem {
  id: number;
  badge: string;
  title: string;
  company: string;
  description: string;
  image: string;
  buttonText: string;
  phone: string;
}

const ADS_DATA: AdItem[] = [
  {
    id: 1,
    badge: 'অটোমেটিক ফিশ ফিডার ও এয়ারেটর মেশিন',
    company: 'সুপার এগ্রো ফিশিং টেকনোলজি',
    title: 'বিদ্যুৎ সাশ্রয়ী প্যাডেল হুইল এয়ারেটর',
    description: 'খামারে সার্বক্ষণিক অক্সিজেন সরবরাহ নিশ্চিত করুন ও মাছের বৃদ্ধি বাড়ান ৫০% পর্যন্ত। ১ বছরের ফ্রি রিপ্লেসমেন্ট।',
    image: '/images/bd_harvest_1.png',
    buttonText: 'এখনই যোগাযোগ করুন',
    phone: '০১৭৫XXXXXXX'
  },
  {
    id: 2,
    badge: '১০০% রোগমুক্ত জাতের পোনা সরবরাহ',
    company: 'রয়েল মৎস্য হ্যাচারি ও নার্সারি',
    title: 'উন্নত এফ-১ মনোসেক্স তেলাপিয়া ও থাই কই',
    description: 'অক্সিজেন ব্যাগে সারা দেশে হোম ডেলিভারি সুবিধা। মৃত্যুহার শূন্যের কাছাকাছি রাখার নিশ্চয়তা।',
    image: '/images/bd_harvest_4.png',
    buttonText: 'পোনা বুকিং করুন',
    phone: '০১৮২XXXXXXX'
  },
  {
    id: 3,
    badge: 'রপ্তানিযোগ্য প্রিমিয়াম চিংড়ি ঘের',
    company: 'সুন্দরবন একুয়া এক্সপোর্ট লিমিটেড',
    title: 'তাজা গলদা ও বাগদা চিংড়ি পাইকারি সরবরাহ',
    description: 'আন্তর্জাতিক মানের গ্রেডেড ফ্রেশ গলদা চিংড়ি সরাসরি ঘের থেকে পাইকারি মূল্যে সরবরাহ করা হচ্ছে।',
    image: '/images/bd_prawn_3.jpg',
    buttonText: 'অর্ডার করতে ক্লিক করুন',
    phone: '০১৯১XXXXXXX'
  },
  {
    id: 4,
    badge: 'উন্নত মানের ফ্লোটিং ফিশ ফিড',
    company: 'মেঘনা এগ্রো ফিড মিলস',
    title: '৩২% প্রোটিনসমৃদ্ধ প্রিমিয়াম গ্রোয়ার ফিড',
    description: 'মাছের দ্রুত শারীরিক বৃদ্ধি ও কম এফসিআর (FCR) নিশ্চিত করতে আধুনিক ফর্মুলায় প্রস্তুত খাদ্য।',
    image: '/images/bd_market_5.png',
    buttonText: 'ডিলারদের সাথে যোগাযোগ',
    phone: '০১৬৭XXXXXXX'
  }
];

interface RightSidebarProps {
  onOpenMarketPrices?: () => void;
}

export const RightSidebar: React.FC<RightSidebarProps> = ({ onOpenMarketPrices }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % ADS_DATA.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev - 1 + ADS_DATA.length) % ADS_DATA.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % ADS_DATA.length);
  };

  const ad = ADS_DATA[currentSlide];

  return (
    <aside className="w-full space-y-4">
      {/* 1. TOP SPONSORED / ADS CARD WITH MULTIPLE SLIDER */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden transition-all">
        {/* Top Header - Authority #0B5A9C */}
        <div className="px-3.5 py-2.5 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span className="font-bold text-[#0B5A9C] uppercase tracking-wider text-[11.5px] flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-[#0F9473]" /> স্পনসর্ড পার্টনার
          </span>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-slate-400 font-semibold">{currentSlide + 1}/{ADS_DATA.length}</span>
            <span className="bg-[#F4F8FA] px-2 py-0.5 rounded-full text-[10.5px] text-[#0B5A9C] font-bold border border-slate-200">বিজ্ঞাপন</span>
          </div>
        </div>
        
        {/* Ad Body with Interactive Slider */}
        <div className="p-3.5 space-y-2.5">
          {/* Slide Image with Overlay */}
          <div className="relative rounded-xl overflow-hidden group cursor-pointer aspect-video bg-slate-100 select-none">
            <img 
              key={ad.id}
              src={ad.image} 
              alt={ad.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex items-end p-2.5">
              <span className="text-white text-[12px] font-bold drop-shadow-md leading-tight line-clamp-1">
                {ad.badge}
              </span>
            </div>

            {/* Slider navigation arrows */}
            <button 
              onClick={handlePrev}
              className="absolute left-1.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-black/50 hover:bg-[#0B5A9C] text-white flex items-center justify-center transition"
              title="পূর্ববর্তী বিজ্ঞাপন"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={handleNext}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-black/50 hover:bg-[#0B5A9C] text-white flex items-center justify-center transition"
              title="পরবর্তী বিজ্ঞাপন"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Slide Indicator Dots */}
            <div className="absolute bottom-1 right-2 flex gap-1 z-10">
              {ADS_DATA.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentSlide(idx);
                  }}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === currentSlide ? 'w-4 bg-[#0F9473]' : 'w-1.5 bg-white/70'
                  }`}
                />
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[14px] font-bold text-[#0B5A9C] hover:text-[#00A3E0] cursor-pointer transition line-clamp-1">
              {ad.company}
            </h4>
            <p className="text-[12.5px] text-[#1A2530]/80 line-clamp-2 mt-0.5 leading-relaxed">
              {ad.description}
            </p>
          </div>

          {/* Secondary Conversion CTA Button: #0F9473 */}
          <a 
            href={`tel:${ad.phone}`} 
            className="w-full py-2 px-3 bg-[#0F9473] hover:bg-[#0c7c60] text-white text-[13px] font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-xs active:scale-98"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>{ad.buttonText}</span>
          </a>
        </div>
      </div>

      {/* 2. FISH MARKET UPDATE / QUICK STATS */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <h4 className="text-[14.5px] font-extrabold text-[#0B5A9C] flex items-center gap-1.5">
            <Award className="w-4.5 h-4.5 text-[#00A3E0]" />
            <span>দৈনিক পাইকারি বাজার দর (কেজি)</span>
          </h4>
        </div>
        <div className="mt-2.5 space-y-2 text-[13px]">
          <div className="flex justify-between items-center py-1 border-b border-slate-50">
            <span className="text-[#1A2530] font-medium">রুই (১.৫ - ২ কেজি)</span>
            <span className="font-extrabold text-[#0F9473]">৳২৮০ - ৩২০</span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-slate-50">
            <span className="text-[#1A2530] font-medium">পাঙ্গাশ (১ কেজি+)</span>
            <span className="font-extrabold text-[#0F9473]">৳১৬০ - ১৮০</span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-slate-50">
            <span className="text-[#1A2530] font-medium">তেলাপিয়া (বড়)</span>
            <span className="font-extrabold text-[#0F9473]">৳২০০ - ২২০</span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-slate-50">
            <span className="text-[#1A2530] font-medium">শিং ও মাগুর</span>
            <span className="font-extrabold text-[#0F9473]">৳৪৫০ - ৫৫০</span>
          </div>
        </div>

        {/* See More Link Button */}
        <div className="pt-2.5 mt-1 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">আপডেট: ২৬ অক্টোবর</span>
          <button
            onClick={onOpenMarketPrices}
            className="text-[12px] font-bold text-[#0B5A9C] hover:text-[#0F9473] flex items-center gap-1 transition group"
          >
            <span>See More / বিস্তারিত দেখুন</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* 3. RECENT ACTIVITIES (সাম্প্রতিক কার্যক্রম) */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <h4 className="text-[14.5px] font-extrabold text-[#0B5A9C] flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-[#0F9473]" />
            <span>সাম্প্রতিক কার্যক্রম</span>
          </h4>
          <span className="text-[11px] font-bold text-[#0B5A9C] hover:text-[#00A3E0] cursor-pointer">সব দেখুন</span>
        </div>

        <div className="mt-3 space-y-3">
          {RECENT_ACTIVITIES.map((act) => (
            <div key={act.id} className="flex items-start gap-2.5 text-[12.5px] group cursor-pointer">
              <img 
                src={act.avatar} 
                alt={act.user} 
                className="w-7 h-7 rounded-full object-cover shrink-0 mt-0.5 border border-sky-100"
              />
              <div className="flex-1 min-w-0">
                <p className="text-[#1A2530] leading-snug">
                  <span className="font-bold text-[#0B5A9C] hover:underline transition">{act.user}</span>{' '}
                  <span className="text-slate-500">{act.action}:</span>{' '}
                  <span className="text-[#1A2530] font-semibold line-clamp-1 group-hover:text-[#00A3E0]">{act.target}</span>
                </p>
                <span className="text-[10.5px] text-slate-400 mt-0.5 block">{act.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};
