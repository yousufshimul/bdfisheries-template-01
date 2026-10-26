import React from 'react';
import { 
  GraduationCap, 
  Users, 
  Award, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  MessageSquare, 
  ShieldCheck,
  PlayCircle
} from 'lucide-react';

interface HeroProps {
  onExploreCourses: () => void;
  onJoinCommunity: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreCourses, onJoinCommunity }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0B5A9C] via-[#094d86] to-[#0B5A9C] text-white pt-8 pb-10 sm:pt-12 sm:pb-14 px-4 sm:px-6 mb-6 rounded-2xl shadow-md border border-[#084577]">
      {/* Background Decorative subtle waves */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0,50 Q25,30 50,50 T100,50 L100,100 L0,100 Z" fill="#00A3E0" />
        </svg>
      </div>

      <div className="max-w-[1240px] mx-auto relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
        
        {/* Left Content Column */}
        <div className="max-w-[680px] text-center lg:text-left">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-3.5 py-1.5 rounded-full mb-4 text-[13px] font-semibold text-[#00A3E0] backdrop-blur-xs">
            <span className="w-2 h-2 rounded-full bg-[#0F9473] animate-ping" />
            <span className="text-white">বাংলাদেশের ১ নম্বর আধুনিক মৎস্য প্রশিক্ষণ ও সামাজিক ফোরাম</span>
          </div>

          {/* Primary H1 */}
          <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight leading-[1.25] text-white mb-4">
            বৈজ্ঞানিক পদ্ধতিতে মাছ চাষ শিখুন, <br className="hidden sm:inline" />
            <span className="text-[#00A3E0]">বিশেষজ্ঞ খামারি কমিউনিটিতে</span> যুক্ত হোন
          </h1>

          {/* Subtitle */}
          <p className="text-white/85 text-base sm:text-[17px] leading-relaxed mb-6 max-w-[620px]">
            পুকুর প্রস্তুতি, পোনা নার্সিং, আধুনিক বায়োফ্লক ও রোগ নিয়ন্ত্রণের ব্যবহারিক প্রশিক্ষণ নিন। দেশের হাজারো সফল চাষী ও বিজ্ঞানীদের সাথে সরাসরি প্রশ্নোত্তর ও অভিজ্ঞতা বিনিময় করুন।
          </p>

          {/* Dual Action Buttons */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4">
            {/* Primary CTA (Secondary Conversion Color: #0F9473) */}
            <button
              onClick={onExploreCourses}
              className="bg-[#0F9473] hover:bg-[#0c7c60] text-white text-[15.5px] font-bold px-6 py-3 rounded-xl shadow-md flex items-center gap-2 transition-all hover:scale-103 active:scale-98"
            >
              <GraduationCap className="w-5 h-5 text-white" />
              <span>প্রশিক্ষণ কোর্স ও ব্যাচ দেখুন</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Secondary CTA (Accent or Pure White outline) */}
            <button
              onClick={onJoinCommunity}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/30 hover:border-[#00A3E0] text-[15.5px] font-semibold px-5 py-3 rounded-xl backdrop-blur-xs flex items-center gap-2 transition-all"
            >
              <Users className="w-5 h-5 text-[#00A3E0]" />
              <span>কমিউনিটিতে যোগ দিন</span>
            </button>
          </div>

          {/* Key Trust Points */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-8 pt-6 border-t border-white/15 text-xs sm:text-[13px] font-medium text-white/80">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#0F9473] shrink-0" />
              <span>বিএফআরআই বিশেষজ্ঞ মেন্টর</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#00A3E0] shrink-0" />
              <span>প্র্যাকটিক্যাল খামার পরিদর্শন</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 text-[#0F9473] shrink-0" />
              <span>সার্বক্ষণিক লাইভ ফোরাম সহায়তা</span>
            </div>
          </div>

        </div>

        {/* Right Feature Card Strip / Video Teaser */}
        <div className="w-full lg:w-[440px] shrink-0 bg-white rounded-2xl p-4 shadow-xl border border-slate-100 text-[#1A2530]">
          <div className="relative rounded-xl overflow-hidden aspect-video mb-3.5 group cursor-pointer bg-slate-900">
            <img 
              src="/images/bd_harvest_2.png" 
              alt="প্রশিক্ষণ টিজার"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent flex items-center justify-center">
              <div className="w-13 h-13 rounded-full bg-[#0F9473] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <PlayCircle className="w-8 h-8 fill-white text-[#0F9473]" />
              </div>
            </div>
            <span className="absolute bottom-2.5 left-3 text-white text-[12px] font-bold drop-shadow-md">
              🎥 লাইভ ক্লাস ও খামারের ভিডিও প্র্যাকটিক্যাল
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="bg-[#0F9473]/10 text-[#0F9473] px-2.5 py-0.5 rounded-full">নতুন ব্যাচ রেজিস্ট্রেশন চলছে</span>
              <span className="text-slate-500">ব্যাচ #১৪</span>
            </div>
            <h3 className="font-bold text-[16px] text-[#0B5A9C] leading-snug">
              বাণিজ্যিক কার্প ও ক্যাটফিশ নিবিড় চাষ মাস্টারক্লাস
            </h3>
            <p className="text-xs text-slate-600 line-clamp-2">
              পুকুরের পানির গুণমান পরীক্ষা, কম খরচে খাবার তৈরি ও রোগ প্রতিরোধে ৩ সপ্তাহের হ্যান্ডস-অন কোর্স।
            </p>
            <div className="pt-2 flex items-center justify-between border-t border-slate-100">
              <div>
                <span className="text-[11px] text-slate-400 block">কোর্স ফি</span>
                <span className="font-extrabold text-[#0F9473] text-[16px]">৳১,৯৫০ <span className="line-through text-slate-400 text-xs font-normal">৳৩,৫০০</span></span>
              </div>
              <button 
                onClick={onExploreCourses}
                className="bg-[#0B5A9C] hover:bg-[#094d86] text-white font-bold text-xs px-4 py-2 rounded-xl transition shadow-xs"
              >
                বিস্তারিত দেখুন
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
