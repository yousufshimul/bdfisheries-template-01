export interface MarketFishItem {
  id: string;
  name: string;
  category: 'কার্প জাতীয়' | 'ক্যাটফিশ' | 'চিংড়ি' | 'দেশি ও অন্যান্য' | 'সামুদ্রিক';
  gradeOrWeight: string;
  wholesalePrice: string;
  previousPrice?: string;
  trend: 'up' | 'down' | 'stable';
  changeAmount?: string;
  marketLocation: string;
  district: string;
  supplyStatus: 'স্বাভাবিক' | 'প্রচুর' | 'স্বল্প সরবরাহ';
  lastUpdatedDate: string; // e.g. "২৬ অক্টোবর, ২০২৪"
  lastUpdatedTime: string; // e.g. "সকাল ০৮:৩০"
}

export const WHOLESALE_FISH_PRICES: MarketFishItem[] = [
  {
    id: 'f-1',
    name: 'রুই মাছ (স্থানীয় চাষ)',
    category: 'কার্প জাতীয়',
    gradeOrWeight: '১.৫ - ২.০ কেজি',
    wholesalePrice: '৳ ২৮০ - ৩২০',
    previousPrice: '৳ ২৭০ - ৩১০',
    trend: 'up',
    changeAmount: '+৳ ১০',
    marketLocation: 'যাত্রাবাড়ী আড়ৎ, ঢাকা',
    district: 'ঢাকা',
    supplyStatus: 'স্বাভাবিক',
    lastUpdatedDate: '২৬ অক্টোবর, ২০২৪',
    lastUpdatedTime: 'সকাল ০৭:১৫'
  },
  {
    id: 'f-2',
    name: 'রুই মাছ (বড় সাইজ)',
    category: 'কার্প জাতীয়',
    gradeOrWeight: '২.৫ - ৩.০ কেজি+',
    wholesalePrice: '৳ ৩৫০ - ৪০০',
    previousPrice: '৳ ৩৫০ - ৪০০',
    trend: 'stable',
    changeAmount: 'অপরিবর্তিত',
    marketLocation: 'ময়মনসিংহ মেছুয়া বাজার',
    district: 'ময়মনসিংহ',
    supplyStatus: 'প্রচুর',
    lastUpdatedDate: '২৬ অক্টোবর, ২০২৪',
    lastUpdatedTime: 'সকাল ০৬:৪৫'
  },
  {
    id: 'f-3',
    name: 'কাতলা মাছ',
    category: 'কার্প জাতীয়',
    gradeOrWeight: '২.০ - ২.৫ কেজি',
    wholesalePrice: '৳ ৩২০ - ৩৬০',
    previousPrice: '৳ ৩১০ - ৩৫০',
    trend: 'up',
    changeAmount: '+৳ ১০',
    marketLocation: 'কারওয়ান বাজার পাইকারি আড়ৎ',
    district: 'ঢাকা',
    supplyStatus: 'স্বাভাবিক',
    lastUpdatedDate: '২৬ অক্টোবর, ২০২৪',
    lastUpdatedTime: 'সকাল ০৭:০০'
  },
  {
    id: 'f-4',
    name: 'মৃগেল মাছ',
    category: 'কার্প জাতীয়',
    gradeOrWeight: '১.০ - ১.৫ কেজি',
    wholesalePrice: '৳ ২২০ - ২৫০',
    previousPrice: '৳ ২৩০ - ২৫০',
    trend: 'stable',
    changeAmount: 'অপরিবর্তিত',
    marketLocation: 'রাজশাহী সাহেব বাজার',
    district: 'রাজশাহী',
    supplyStatus: 'স্বাভাবিক',
    lastUpdatedDate: '২৬ অক্টোবর, ২০২৪',
    lastUpdatedTime: 'সকাল ০৭:৩০'
  },
  {
    id: 'f-5',
    name: 'পাঙ্গাশ মাছ (বাণিজ্যিক চাষ)',
    category: 'ক্যাটফিশ',
    gradeOrWeight: '১.০ কেজি+',
    wholesalePrice: '৳ ১৬০ - ১৮০',
    previousPrice: '৳ ১৬৫ - ১৮৫',
    trend: 'down',
    changeAmount: '-৳ ৫',
    marketLocation: 'ত্রিশাল মাছের আড়ৎ, ময়মনসিংহ',
    district: 'ময়মনসিংহ',
    supplyStatus: 'প্রচুর',
    lastUpdatedDate: '২৬ অক্টোবর, ২০২৪',
    lastUpdatedTime: 'সকাল ০৬:৩০'
  },
  {
    id: 'f-6',
    name: 'তেলাপিয়া (মনোসেক্স গ্রেড-১)',
    category: 'কার্প জাতীয়',
    gradeOrWeight: '৩-৪ পিস/কেজি',
    wholesalePrice: '৳ ২০০ - ২২০',
    previousPrice: '৳ ১৯০ - ২১০',
    trend: 'up',
    changeAmount: '+৳ ১০',
    marketLocation: 'যাত্রাবাড়ী আড়ৎ, ঢাকা',
    district: 'ঢাকা',
    supplyStatus: 'স্বাভাবিক',
    lastUpdatedDate: '২৬ অক্টোবর, ২০২৪',
    lastUpdatedTime: 'সকাল ০৭:১৫'
  },
  {
    id: 'f-7',
    name: 'দেশি শিং মাছ (জীবন্ত)',
    category: 'ক্যাটফিশ',
    gradeOrWeight: '৮-১০ পিস/কেজি',
    wholesalePrice: '৳ ৫৫০ - ৬৫০',
    previousPrice: '৳ ৫৫০ - ৬৫০',
    trend: 'stable',
    changeAmount: 'অপরিবর্তিত',
    marketLocation: 'মুক্তাগাছা আড়ৎ, ময়মনসিংহ',
    district: 'ময়মনসিংহ',
    supplyStatus: 'স্বল্প সরবরাহ',
    lastUpdatedDate: '২৬ অক্টোবর, ২০২৪',
    lastUpdatedTime: 'সকাল ০৬:১৫'
  },
  {
    id: 'f-8',
    name: 'চাষের শিং ও মাগুর',
    category: 'ক্যাটফিশ',
    gradeOrWeight: '১০-১৫ পিস/কেজি',
    wholesalePrice: '৳ ৪৫০ - ৫৫০',
    previousPrice: '৳ ৪৪০ - ৫৩০',
    trend: 'up',
    changeAmount: '+৳ ১৫',
    marketLocation: 'কারওয়ান বাজার পাইকারি আড়ৎ',
    district: 'ঢাকা',
    supplyStatus: 'স্বাভাবিক',
    lastUpdatedDate: '২৬ অক্টোবর, ২০২৪',
    lastUpdatedTime: 'সকাল ০৭:০০'
  },
  {
    id: 'f-9',
    name: 'পাবদা মাছ',
    category: 'ক্যাটফিশ',
    gradeOrWeight: '১৫-২০ পিস/কেজি',
    wholesalePrice: '৳ ৩৮০ - ৪৫০',
    previousPrice: '৳ ৪০০ - ৪৭০',
    trend: 'down',
    changeAmount: '-৳ ২০',
    marketLocation: 'ময়মনসিংহ মেছুয়া বাজার',
    district: 'ময়মনসিংহ',
    supplyStatus: 'প্রচুর',
    lastUpdatedDate: '২৬ অক্টোবর, ২০২৪',
    lastUpdatedTime: 'সকাল ০৬:৪৫'
  },
  {
    id: 'f-10',
    name: 'গলদা চিংড়ি (গ্রেড এ)',
    category: 'চিংড়ি',
    gradeOrWeight: '৭৫-১০০ গ্রাম/পিস',
    wholesalePrice: '৳ ৭৫০ - ৯০০',
    previousPrice: '৳ ৭৫০ - ৯০০',
    trend: 'stable',
    changeAmount: 'অপরিবর্তিত',
    marketLocation: 'খুলনা ৫ নম্বর ঘাট আড়ৎ',
    district: 'খুলনা',
    supplyStatus: 'স্বাভাবিক',
    lastUpdatedDate: '২৬ অক্টোবর, ২০২৪',
    lastUpdatedTime: 'সকাল ০৭:১০'
  },
  {
    id: 'f-11',
    name: 'বাগদা চিংড়ি (হিমায়িত ও তাজা)',
    category: 'চিংড়ি',
    gradeOrWeight: '৩০-৪০ কাউন্ট/কেজি',
    wholesalePrice: '৳ ৬৫০ - ৭৫০',
    previousPrice: '৳ ৬৪০ - ৭৩০',
    trend: 'up',
    changeAmount: '+৳ ১৫',
    marketLocation: 'পাইকগাছা মৎস্য ডিপো',
    district: 'খুলনা',
    supplyStatus: 'স্বাভাবিক',
    lastUpdatedDate: '২৬ অক্টোবর, ২০২৪',
    lastUpdatedTime: 'সকাল ০৬:৫০'
  },
  {
    id: 'f-12',
    name: 'ভ্যানামেই চিংড়ি (বাণিজ্যিক চাষ)',
    category: 'চিংড়ি',
    gradeOrWeight: '৪০-৫০ কাউন্ট/কেজি',
    wholesalePrice: '৳ ৪৮০ - ৫৫০',
    previousPrice: '৳ ৪৮০ - ৫৫০',
    trend: 'stable',
    changeAmount: 'অপরিবর্তিত',
    marketLocation: 'কক্সবাজার ফিশারি ঘাট',
    district: 'কক্সবাজার',
    supplyStatus: 'স্বাভাবিক',
    lastUpdatedDate: '২৬ অক্টোবর, ২০২৪',
    lastUpdatedTime: 'সকাল ০৭:২০'
  },
  {
    id: 'f-13',
    name: 'পদ্মার তাজা ইলিশ',
    category: 'দেশি ও অন্যান্য',
    gradeOrWeight: '৮০০ গ্রাম - ১.০ কেজি',
    wholesalePrice: '৳ ১২৫০ - ১৪০০',
    previousPrice: '৳ ১৩০০ - ১৪৫০',
    trend: 'down',
    changeAmount: '-৳ ৫০',
    marketLocation: 'চাঁদপুর বড় স্টেশন আড়ৎ',
    district: 'চাঁদপুর',
    supplyStatus: 'স্বাভাবিক',
    lastUpdatedDate: '২৬ অক্টোবর, ২০২৪',
    lastUpdatedTime: 'সকাল ০৮:০০'
  },
  {
    id: 'f-14',
    name: 'গুলশা ট্যাংরা',
    category: 'দেশি ও অন্যান্য',
    gradeOrWeight: '২০-২৫ পিস/কেজি',
    wholesalePrice: '৳ ৫৫০ - ৬২০',
    previousPrice: '৳ ৫৫০ - ৬২০',
    trend: 'stable',
    changeAmount: 'অপরিবর্তিত',
    marketLocation: 'যাত্রাবাড়ী আড়ৎ, ঢাকা',
    district: 'ঢাকা',
    supplyStatus: 'স্বল্প সরবরাহ',
    lastUpdatedDate: '২৬ অক্টোবর, ২০২৪',
    lastUpdatedTime: 'সকাল ০৭:১৫'
  },
  {
    id: 'f-15',
    name: 'সামুদ্রিক কোরাল / ভেটকি',
    category: 'সামুদ্রিক',
    gradeOrWeight: '২.০ - ৩.০ কেজি',
    wholesalePrice: '৳ ৬৮০ - ৭৮০',
    previousPrice: '৳ ৬৫০ - ৭৫০',
    trend: 'up',
    changeAmount: '+৳ ৩০',
    marketLocation: 'চট্টগ্রাম ফিশারি ঘাট',
    district: 'চট্টগ্রাম',
    supplyStatus: 'স্বাভাবিক',
    lastUpdatedDate: '২৬ অক্টোবর, ২০২৪',
    lastUpdatedTime: 'সকাল ০৭:৪৫'
  }
];
