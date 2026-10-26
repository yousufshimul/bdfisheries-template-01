import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  ShieldCheck, 
  Award,
  ArrowUpRight,
  Globe,
  Share2
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0B5A9C] text-white pt-10 pb-6 border-t border-[#084577] mt-12">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-8 border-b border-white/15">
          
          {/* Col 1: Brand Info & Tagline */}
          <div className="space-y-3">
            <a 
              href="/" 
              className="bg-white p-2 rounded-xl inline-block shadow-xs transition-transform hover:scale-102"
              title="বিডি ফিশারিজ হোম"
            >
              <img 
                src="/images/bdfisheries_logo_tight.png" 
                alt="বিডি ফিশারিজ লোগো" 
                className="h-10 w-auto object-contain"
              />
            </a>
            <p className="text-xs text-white/80 leading-relaxed">
              বিডি ফিশারিজ বাংলাদেশের সর্ববৃহৎ মৎস্য প্রশিক্ষণ কেন্দ্র ও উন্মুক্ত সামাজিক প্ল্যাটফর্ম। আধুনিক প্রযুক্তিনির্ভর মাছ চাষের প্রসার ও চাষীদের ক্ষমতায়ন আমাদের মূল লক্ষ্য।
            </p>
            <div className="flex items-center gap-2 pt-1 text-white/80">
              <a href="#" className="w-8 h-8 rounded-lg bg-white/10 hover:bg-[#00A3E0] hover:text-white flex items-center justify-center transition" title="ওয়েবসাইট">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-white/10 hover:bg-[#0F9473] hover:text-white flex items-center justify-center transition" title="মেসেঞ্জার ও চ্যাট">
                <MessageCircle className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-white/10 hover:bg-[#00A3E0] hover:text-white flex items-center justify-center transition" title="শেয়ার">
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Training Courses */}
          <div>
            <h4 className="text-[15px] font-bold text-white mb-3 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-[#00A3E0]" />
              <span>প্রশিক্ষণ কোর্সসমূহ</span>
            </h4>
            <ul className="space-y-2 text-xs text-white/80">
              <li><a href="#courses-section" className="hover:text-[#00A3E0] transition flex items-center justify-between">বাণিজ্যিক কার্প ও ক্যাটফিশ চাষ <ArrowUpRight className="w-3 h-3 text-white/40" /></a></li>
              <li><a href="#courses-section" className="hover:text-[#00A3E0] transition flex items-center justify-between">আধুনিক বায়োফ্লক ও আরএএস সেটআপ <ArrowUpRight className="w-3 h-3 text-white/40" /></a></li>
              <li><a href="#courses-section" className="hover:text-[#00A3E0] transition flex items-center justify-between">হ্যাচারি ও উন্নত রেণু-পোনা উৎপাদন <ArrowUpRight className="w-3 h-3 text-white/40" /></a></li>
              <li><a href="#courses-section" className="hover:text-[#00A3E0] transition flex items-center justify-between">মাছের রোগ নিয়ন্ত্রণ ও মেডিসিন <ArrowUpRight className="w-3 h-3 text-white/40" /></a></li>
              <li><a href="#courses-section" className="hover:text-[#00A3E0] transition flex items-center justify-between">ঘেরে গলদা ও বাগদা চিংড়ি চাষ <ArrowUpRight className="w-3 h-3 text-white/40" /></a></li>
            </ul>
          </div>

          {/* Col 3: Community & Categories */}
          <div>
            <h4 className="text-[15px] font-bold text-white mb-3 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#0F9473]" />
              <span>কমিউনিটি ও ফোরাম</span>
            </h4>
            <ul className="space-y-2 text-xs text-white/80">
              <li><a href="#" className="hover:text-[#00A3E0] transition">এক্সপার্ট FAQ ও প্রশ্নসমূহ</a></li>
              <li><a href="#" className="hover:text-[#00A3E0] transition">দৈনিক পাইকারি বাজার দর</a></li>
              <li><a href="#" className="hover:text-[#00A3E0] transition">পোনা সংগ্রহ ও নার্সারি ডিরেক্টরি</a></li>
              <li><a href="#" className="hover:text-[#00A3E0] transition">খামারবাড়ি ও পুকুর লিজ বিজ্ঞাপন</a></li>
              <li><a href="#" className="hover:text-[#00A3E0] transition">যন্ত্রপাতি ও ফিশ ফিড শপ</a></li>
            </ul>
          </div>

          {/* Col 4: Contact & Support */}
          <div>
            <h4 className="text-[15px] font-bold text-white mb-3">
              যোগাযোগ ও হেল্পডেস্ক
            </h4>
            <div className="space-y-2.5 text-xs text-white/80">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#00A3E0] shrink-0 mt-0.5" />
                <span>মৎস্য ভবন রোড, কাকরাইল, ঢাকা - ১০০০, বাংলাদেশ</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#0F9473] shrink-0" />
                <span>হেল্পলাইন: +৮৮০ ১৭XXXXXXXXX</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#00A3E0] shrink-0" />
                <span>ইমেইল: info@bdfisheries.com</span>
              </div>
              <div className="pt-2">
                <span className="inline-block bg-[#0F9473] text-white font-bold text-[11px] px-3 py-1 rounded-full">
                  সকাল ৯টা - রাত ৮টা (সপ্তাহের ৭ দিন খোলা)
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/70">
          <p>© ২০২৬ বিডি ফিশারিজ প্ল্যাটফর্ম। সর্বস্বত্ব সংরক্ষিত।</p>
          <div className="flex items-center gap-4 text-white/70">
            <a href="#" className="hover:text-white transition">শর্তাবলী ও নীতিমালা</a>
            <span>•</span>
            <a href="#" className="hover:text-white transition">গোপনীয়তা নীতি</a>
            <span>•</span>
            <a href="#" className="hover:text-white transition">সাইটম্যাপ</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
