import React from 'react';
import { 
  GraduationCap, 
  Calendar, 
  Clock, 
  Users, 
  ArrowRight, 
  CheckCircle, 
  Sparkles,
  Tag
} from 'lucide-react';

interface Course {
  id: string;
  title: string;
  batch: string;
  category: string;
  instructor: string;
  instructorTitle: string;
  duration: string;
  startDate: string;
  seatsLeft: number;
  originalPrice: string;
  discountPrice: string;
  image: string;
  highlights: string[];
}

const COURSES: Course[] = [
  {
    id: 'course-1',
    title: 'বাণিজ্যিক কার্প ও ক্যাটফিশ (শিং-মাগুর-পাবদা) আধুনিক চাষ',
    batch: 'ব্যাচ-১৫ (শীতকালীন স্পেশাল)',
    category: 'বাণিজ্যিক চাষ',
    instructor: 'ড. মোস্তাফিজুর রহমান',
    instructorTitle: 'সিনিয়র মৎস্য বিজ্ঞানী, বিএফআরআই',
    duration: '৪ সপ্তাহ (১২টি লাইভ ক্লাস + খামার পরিদর্শন)',
    startDate: '১ ডিসেম্বর, ২০২৬',
    seatsLeft: 5,
    originalPrice: '৪,৫০০',
    discountPrice: '২,২০০',
    image: '/images/bd_harvest_1.png',
    highlights: ['পানির গুণমান ও ডিও ব্যবস্থাপনা', 'কম খরচে ব্যালেন্সড খাদ্য তৈরি', 'রোগ নির্ণয় ও প্রেসক্রিপশন']
  },
  {
    id: 'course-2',
    title: 'আধুনিক বায়োফ্লক ও আরএএস (RAS) প্রযুক্তিতে মাছ চাষ',
    batch: 'ব্যাচ-০৮ (উন্নত টেকনোলজি)',
    category: 'বায়োফ্লক ও আরএএস',
    instructor: 'ড. আবুল কাশেম',
    instructorTitle: 'পিএইচডি গবেষক ও একুয়াকালচার কনসালটেন্ট',
    duration: '৩ সপ্তাহ (৮টি সেশন + প্র্যাকটিক্যাল কিট)',
    startDate: '৫ ডিসেম্বর, ২০২৬',
    seatsLeft: 8,
    originalPrice: '৫,০০০',
    discountPrice: '২,৫০০',
    image: '/images/bd_harvest_2.png',
    highlights: ['সি/এন রেশিও ও প্রোবায়োটিক ডোজ', 'অ্যামোনিয়া লক টেকনিক', 'বিদ্যুৎ সাশ্রয়ী সেটআপ']
  },
  {
    id: 'course-3',
    title: 'হ্যাচারি ব্যবস্থাপনা ও উন্নত জাতের রেণু-পোনা উৎপাদন',
    batch: 'ব্যাচ-১২ (প্রফেশনাল ব্রিডার)',
    category: 'হ্যাচারি ও পোনা',
    instructor: 'মো. রফিকুল ইসলাম',
    instructorTitle: 'হ্যাচারি বিশেষজ্ঞ ও জেলা মৎস্য কর্মকর্তা',
    duration: '৪ সপ্তাহ (হ্যান্ডস-অন প্র্যাকটিক্যাল)',
    startDate: '১০ ডিসেম্বর, ২০২৬',
    seatsLeft: 4,
    originalPrice: '৩,৮০০',
    discountPrice: '১,৯৫০',
    image: '/images/bd_harvest_4.png',
    highlights: ['হরমোন ইনজেকশন ও ব্রুড ব্যাংক', 'ডিম্বস্ফোটন ও লার্ভা কেয়ার', 'অক্সিজেন ব্যাগে লাইভ ট্রান্সপোর্ট']
  }
];

interface CourseGridProps {
  onEnroll: (courseTitle: string) => void;
}

export const CourseGrid: React.FC<CourseGridProps> = ({ onEnroll }) => {
  return (
    <section id="courses-section" className="mb-8 scroll-mt-20">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-4 gap-2">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F9473] bg-[#0F9473]/10 px-3 py-1 rounded-full mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>প্রশিক্ষণ কেন্দ্র ও সার্টিফিকেশন কোর্স</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#0B5A9C] tracking-tight">
            চলমান ও আসন্ন প্রশিক্ষণ ব্যাচসমূহ
          </h2>
          <p className="text-xs sm:text-[13.5px] text-[#1A2530]/70 mt-0.5">
            বাস্তবধর্মী ফিল্ড প্রশিক্ষণ, ল্যাব টেস্ট কিট গাইডেন্স ও সফল মৎস্য খামারি সনদপত্র লাভ করুন।
          </p>
        </div>

        <span className="text-xs font-bold text-[#0B5A9C] hover:text-[#00A3E0] cursor-pointer flex items-center gap-1 transition">
          সব ব্যাচ ও সময়সূচী দেখুন <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>

      {/* Grid of Courses */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {COURSES.map((course) => (
          <div 
            key={course.id}
            className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden group hover:-translate-y-0.5"
          >
            {/* Card Image Banner */}
            <div className="relative aspect-video overflow-hidden bg-slate-100">
              <img 
                src={course.image} 
                alt={course.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-2.5 left-2.5 bg-[#0B5A9C] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                {course.batch}
              </span>
              <span className="absolute bottom-2.5 right-2.5 bg-black/60 text-white backdrop-blur-xs text-[11px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#00A3E0]" /> {course.duration}
              </span>
            </div>

            {/* Card Content Body */}
            <div className="p-4 sm:p-4.5 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[11.5px] font-bold text-[#0F9473] tracking-wide uppercase">
                  {course.category}
                </span>

                <h3 className="font-bold text-[16px] text-[#0B5A9C] leading-snug mt-1 hover:text-[#00A3E0] transition cursor-pointer">
                  {course.title}
                </h3>

                <p className="text-xs text-slate-500 mt-1">
                  প্রশিক্ষক: <span className="font-semibold text-slate-800">{course.instructor}</span> ({course.instructorTitle})
                </p>

                {/* Key Bullet Highlights */}
                <div className="mt-3 pt-2.5 border-t border-slate-100 space-y-1 text-xs text-slate-600">
                  {course.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-[#0F9473] shrink-0" />
                      <span className="truncate">{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing & Enrollment CTA */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-slate-400">
                    আসন বাকি: <span className="text-[#0B5A9C] font-bold">{course.seatsLeft}টি</span>
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-lg font-extrabold text-[#0F9473]">৳{course.discountPrice}</span>
                    <span className="text-xs line-through text-slate-400">৳{course.originalPrice}</span>
                  </div>
                </div>

                {/* Secondary Conversion Color CTA: #0F9473 */}
                <button
                  onClick={() => onEnroll(course.title)}
                  className="bg-[#0F9473] hover:bg-[#0c7c60] text-white font-bold text-xs sm:text-[13px] px-4 py-2 rounded-xl shadow-xs transition-all hover:scale-102 active:scale-98 flex items-center gap-1"
                >
                  <span>রেজিস্ট্রেশন করুন</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
