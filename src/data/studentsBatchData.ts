export interface StudentProfile {
  id: string;
  name: string;
  avatar: string;
  role: string;
  specialty: string;
  batch: string;
  passingYear: string;
  location: string;
  farmOrOrg?: string;
  contact?: string;
  email?: string;
  isVerified?: boolean;
}

export interface StudentBatch {
  id: string;
  batchName: string;
  session: string;
  totalStudents: number;
  coordinator?: string;
  students: StudentProfile[];
}

export interface Institute {
  id: string;
  name: string;
  banglaName: string;
  type: 'বিশ্ববিদ্যালয়' | 'ইনস্টিটিউট' | 'প্রশিক্ষণ কেন্দ্র';
  district: string;
  upazila: string;
  logo?: string;
  established?: string;
  batches: StudentBatch[];
}

export const DISTRICTS_UPAZILAS_DATA: Record<string, string[]> = {
  'ময়মনসিংহ': ['ময়মনসিংহ সদর', 'ত্রিশাল', 'মুক্তাগাছা', 'ফুলপুর', 'গৌরীপুর'],
  'ঢাকা': ['ঢাকা উত্তর', 'ঢাকা দক্ষিণ', 'সাভার', 'ধামরাই', 'কেরানীগঞ্জ'],
  'সিলেট': ['সিলেট সদর', 'দক্ষিণ সুরমা', 'গোলাপগঞ্জ', 'বিয়ানীবাজার'],
  'চট্টগ্রাম': ['চট্টগ্রাম সদর', 'হাটহাজারী', 'সীতাকুণ্ড', 'পটিয়া', 'মীরসরাই'],
  'খুলনা': ['খুলনা সদর', 'ডুমুরিয়া', 'বটিয়াঘাটা', 'পাইকগাছা', 'কয়রা'],
  'রাজশাহী': ['রাজশাহী সদর', 'পবা', 'বাগমারা', 'চারঘাট', 'পুঠিয়া'],
  'বরিশাল': ['বরিশাল সদর', 'বাবুগঞ্জ', 'উজিরপুর', 'বাকেরগঞ্জ'],
  'রংপুর': ['রংপুর সদর', 'মিঠাপুকুর', 'পীরগঞ্জ', 'কাউনিয়া'],
  'কিশোরগঞ্জ': ['কিশোরগঞ্জ সদর', 'নিকলী', 'করিমগঞ্জ', 'বাজিতপুর', 'হোসেনপুর'],
  'চাঁদপুর': ['চাঁদপুর সদর', 'হাইমচর', 'মতলব উত্তর', 'মতলব দক্ষিণ']
};

export const INSTITUTES_DATA: Institute[] = [
  {
    id: 'bau-fish',
    name: 'Bangladesh Agricultural University (BAU)',
    banglaName: 'বাংলাদেশ কৃষি বিশ্ববিদ্যালয় (বাকৃবি) - মাৎস্যবিজ্ঞান অনুষদ',
    type: 'বিশ্ববিদ্যালয়',
    district: 'ময়মনসিংহ',
    upazila: 'ময়মনসিংহ সদর',
    established: '১৯৬৭',
    batches: [
      {
        id: 'bau-b52',
        batchName: '৫২তম ব্যাচ (ফিশারিজ গ্র্যাজুয়েটস)',
        session: '২০২০-২০২১',
        totalStudents: 120,
        coordinator: 'অধ্যাপক ড. মোস্তফা কামাল',
        students: [
          {
            id: 's-101',
            name: 'মোঃ তানভীর আহমেদ',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
            role: 'মাৎস্য বিজ্ঞানী ও গবেষক',
            specialty: 'কার্প ও পাবদা হ্যাচারি প্রজনন',
            batch: '৫২তম ব্যাচ',
            passingYear: '২০২৪',
            location: 'ময়মনসিংহ সদর',
            farmOrOrg: 'ব্লু-অ্যাকুয়া হ্যাচারি অ্যান্ড রিসার্স',
            contact: '০১৭১১-২২৩৩৪৪',
            isVerified: true
          },
          {
            id: 's-102',
            name: 'নুসরাত জাহান লিমা',
            avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
            role: 'মৎস্য পুষ্টিবিদ (Nutritionist)',
            specialty: 'উন্নত ফিশ ফিড ফর্মুলেশন',
            batch: '৫২তম ব্যাচ',
            passingYear: '২০২৪',
            location: 'ময়মনসিংহ',
            farmOrOrg: 'কোয়ালিটি ফিডস লিমিটেড',
            isVerified: true
          },
          {
            id: 's-103',
            name: 'আব্দুল করিম',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
            role: 'বাণিজ্যিক খামারি ও কনসালট্যান্ট',
            specialty: 'বায়োফ্লক ও আরএএস (RAS)',
            batch: '৫২তম ব্যাচ',
            passingYear: '২০২৪',
            location: 'মুক্তাগাছা, ময়মনসিংহ',
            farmOrOrg: 'করিম বায়োটেক ফিশ ফার্ম',
            isVerified: true
          }
        ]
      },
      {
        id: 'bau-b51',
        batchName: '৫১তম ব্যাচ (ফিশারিজ মাস্টার্স ও পিএইচডি)',
        session: '২০১৯-২০২০',
        totalStudents: 95,
        coordinator: 'ড. সাদিয়া আফরোজ',
        students: [
          {
            id: 's-104',
            name: 'মেহরাব হোসেন সৌমিক',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
            role: 'সিনিয়র উপজেলা মৎস্য কর্মকর্তা (বিসিএস)',
            specialty: 'মাঠ পর্যায়ের মৎস্য সম্প্রসারণ ও রোগ নিয়ন্ত্রণ',
            batch: '৫১তম ব্যাচ',
            passingYear: '২০২৩',
            location: 'ত্রিশাল, ময়মনসিংহ',
            farmOrOrg: 'উপজেলা মৎস্য দপ্তর',
            isVerified: true
          },
          {
            id: 's-105',
            name: 'ফারহানা ইসলাম তন্বী',
            avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
            role: 'গবেষণা সহকারী',
            specialty: 'মাছের জিনোম ও ভাইরাস সংক্রমণ',
            batch: '৫১তম ব্যাচ',
            passingYear: '২০২৩',
            location: 'ময়মনসিংহ সদর',
            farmOrOrg: 'বিএফআরআই (BFRI)',
            isVerified: true
          }
        ]
      }
    ]
  },
  {
    id: 'bfri-inst',
    name: 'Bangladesh Fisheries Research Institute (BFRI)',
    banglaName: 'বাংলাদেশ মৎস্য গবেষণা ইনস্টিটিউট (বিএফআরআই) প্রশিক্ষণ সেল',
    type: 'প্রশিক্ষণ কেন্দ্র',
    district: 'ময়মনসিংহ',
    upazila: 'ময়মনসিংহ সদর',
    established: '১৯৮৪',
    batches: [
      {
        id: 'bfri-b14',
        batchName: '১৪তম উন্নত মাছ চাষ প্রশিক্ষণ ব্যাচ',
        session: '২০২৪ (৬ মাস মেয়াদী)',
        totalStudents: 45,
        coordinator: 'প্রধান বৈজ্ঞানিক কর্মকর্তা',
        students: [
          {
            id: 's-201',
            name: 'মোঃ শাকিল মাহমুদ',
            avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
            role: 'উদ্যোক্তা ও হ্যাচারি মালিক',
            specialty: 'গুলশা, শিং ও মাগুর কৃত্রিম প্রজনন',
            batch: '১৪তম প্রশিক্ষণ ব্যাচ',
            passingYear: '২০২৪',
            location: 'ময়মনসিংহ সদর',
            farmOrOrg: 'সমৃদ্ধি এগ্রো ফিশারিজ',
            contact: '০১৭৫২-৯৯৮৮৭৭',
            isVerified: true
          },
          {
            id: 's-202',
            name: 'হাসিবুল হাসান',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
            role: 'পুকুর ব্যবস্থাপনা বিশেষজ্ঞ',
            specialty: 'ওয়াটার কোয়ালিটি প্যারামিটার ম্যানেজমেন্ট',
            batch: '১৪তম প্রশিক্ষণ ব্যাচ',
            passingYear: '২০২৪',
            location: 'ফুলপুর, ময়মনসিংহ',
            farmOrOrg: 'গ্রিন ওয়াটার অ্যাকুয়া সলিউশন',
            isVerified: false
          }
        ]
      }
    ]
  },
  {
    id: 'du-zoology',
    name: 'University of Dhaka - Department of Fisheries',
    banglaName: 'ঢাকা বিশ্ববিদ্যালয় - মৎস্যবিজ্ঞান বিভাগ',
    type: 'বিশ্ববিদ্যালয়',
    district: 'ঢাকা',
    upazila: 'ঢাকা দক্ষিণ',
    established: '১৯৯৮',
    batches: [
      {
        id: 'du-b25',
        batchName: '২৫তম প্রফেশনাল ব্যাচ',
        session: '২০২১-২০২২',
        totalStudents: 80,
        coordinator: 'ড. মাহমুদুর রহমান',
        students: [
          {
            id: 's-301',
            name: 'আসিফ আল মামুন',
            avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
            role: 'রিসার্চ ফেলো',
            specialty: 'ইলিশ সংরক্ষণ ও মোহনা বাস্তুসংস্থান',
            batch: '২৫তম প্রফেশনাল ব্যাচ',
            passingYear: '২০২৪',
            location: 'ঢাকা দক্ষিণ',
            farmOrOrg: 'মেরিন অ্যান্ড কোস্টাল রিসার্চ ল্যাব',
            isVerified: true
          },
          {
            id: 's-302',
            name: 'সাবরিনা আক্তার',
            avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
            role: 'কোয়ালিটি কন্ট্রোল অফিসার',
            specialty: 'রপ্তানিমুখী হিমায়িত চিংড়ি প্রক্রিয়াজাতকরণ',
            batch: '২৫তম প্রফেশনাল ব্যাচ',
            passingYear: '২০২৪',
            location: 'সাভার, ঢাকা',
            farmOrOrg: 'অ্যাপেক্স ফুডস লিঃ',
            isVerified: true
          }
        ]
      }
    ]
  },
  {
    id: 'sust-fish',
    name: 'Shahjalal University of Science and Technology',
    banglaName: 'শাহজালাল বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয় (শাবিপ্রবি) - এফইটি বিভাগ',
    type: 'বিশ্ববিদ্যালয়',
    district: 'সিলেট',
    upazila: 'সিলেট সদর',
    established: '২০১০',
    batches: [
      {
        id: 'sust-b12',
        batchName: '১২তম ব্যাচ (হাওর মৎস্য ও জলবায়ু সহনশীল অ্যাকুয়াকালচার)',
        session: '২০২০-২০২১',
        totalStudents: 60,
        coordinator: 'ড. ফারুক উদ্দিন',
        students: [
          {
            id: 's-401',
            name: 'জাহিদুল ইসলাম শামীম',
            avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
            role: 'হাওর মৎস্য সম্প্রসারণবিদ',
            specialty: 'খাঁচায় মাছ চাষ (Cage Aquaculture)',
            batch: '১২তম ব্যাচ',
            passingYear: '২০২৪',
            location: 'গোলাপগঞ্জ, সিলেট',
            farmOrOrg: 'সুরমা রিভার কেজ প্রজেক্ট',
            isVerified: true
          }
        ]
      }
    ]
  },
  {
    id: 'cu-marine',
    name: 'University of Chittagong - IMSF',
    banglaName: 'চট্টগ্রাম বিশ্ববিদ্যালয় - ইনস্টিটিউট অব মেরিন সায়েন্সেস অ্যান্ড ফিশারিজ',
    type: 'বিশ্ববিদ্যালয়',
    district: 'চট্টগ্রাম',
    upazila: 'হাটহাজারী',
    established: '১৯৭১',
    batches: [
      {
        id: 'cu-b38',
        batchName: '৩৮তম মেরিন ব্যাচ',
        session: '২০১৯-২০২০',
        totalStudents: 70,
        coordinator: 'অধ্যাপক ড. এম এ আউয়াল',
        students: [
          {
            id: 's-501',
            name: 'কাজী শাহেদ হোসেন',
            avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
            role: 'মেরিন অ্যাকুয়াকালচারিস্ট',
            specialty: 'ভ্যানামেই ও বাগদা চিংড়ি নিবিড় চাষ',
            batch: '৩৮তম মেরিন ব্যাচ',
            passingYear: '২০২৩',
            location: 'পটিয়া, চট্টগ্রাম',
            farmOrOrg: 'কোস্টাল অ্যাকুয়া লিমিটেড',
            isVerified: true
          }
        ]
      }
    ]
  },
  {
    id: 'ku-fwt',
    name: 'Khulna University - Fisheries and Marine Resource Technology',
    banglaName: 'খুলনা বিশ্ববিদ্যালয় - ফিশারিজ অ্যান্ড মেরিন রিসোর্স টেকনোলজি (FMRT)',
    type: 'বিশ্ববিদ্যালয়',
    district: 'খুলনা',
    upazila: 'খুলনা সদর',
    established: '১৯৯১',
    batches: [
      {
        id: 'ku-b28',
        batchName: '২৮তম এফএমআরটি ব্যাচ',
        session: '২০১৯-২০২০',
        totalStudents: 65,
        coordinator: 'ড. ওয়ালীউল্লাহ খাঁন',
        students: [
          {
            id: 's-601',
            name: 'সোহেল রানা',
            avatar: 'https://images.unsplash.com/photo-1521119989659-a83eee488004?w=150&auto=format&fit=crop&q=80',
            role: 'ঘের প্রযুক্তিবিদ ও রোগ গবেষক',
            specialty: 'চিংড়ির হোয়াইট স্পট সিন্ড্রোম (WSSV) প্রতিরোধ',
            batch: '২৮তম এফএমআরটি ব্যাচ',
            passingYear: '২০২৩',
            location: 'পাইকগাছা, খুলনা',
            farmOrOrg: 'সুন্দরবন অ্যাকুয়া কেয়ার',
            isVerified: true
          }
        ]
      }
    ]
  }
];
