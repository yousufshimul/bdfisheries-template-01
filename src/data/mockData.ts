export interface Post {
  id: string;
  type: 'general' | 'image' | 'video' | 'faq' | 'consultation' | 'sale' | 'job';
  category: string;
  categories?: string[];
  author: {
    name: string;
    avatar: string;
    tagline: string;
    isVerified?: boolean;
    date: string;
  };
  title?: string;
  question?: string;
  content: string;
  tags?: string[];
  image?: string;
  youtubeId?: string;
  answersCount?: number;
  upvotes: number;
  downvotes?: number;
  shares: number;
  commentsCount: number;
  views?: string;
  // Sale specific
  price?: string;
  location?: string;
  phone?: string;
  // Job specific
  salary?: string;
  deadline?: string;
  // Consultation specific
  urgency?: 'জরুরী' | 'সাধারণ';
  expertAnswer?: {
    expertName: string;
    expertTitle: string;
    expertAvatar: string;
    answer: string;
    date: string;
  };
}

export interface CategoryGroup {
  groupId: string;
  groupTitle: string;
  categories: {
    id: string;
    label: string;
    icon: string;
    count: string;
  }[];
}

// Re-arranged logically into 5 clear lifecycle groups:
// 1. খামার ও পুকুর প্রস্তুতি (Pond setup)
// 2. পোনা ও মাছ চাষ (Breeding & Farming)
// 3. রোগবালাই ও বিশেষজ্ঞ সহায়তা (Health & Expert Advice)
// 4. উপকরণ, খাদ্য ও সরঞ্জাম (Supplies, Feed & Equipment)
// 5. ক্রয়-বিক্রয়, পরিবহন ও প্রশিক্ষণ (Business, Market, Training & Media)
export const CATEGORY_GROUPS: CategoryGroup[] = [
  {
    groupId: 'pond_infrastructure',
    groupTitle: 'পুকুর ও খামার প্রস্তুতি',
    categories: [
      { id: 'farmhouse', label: 'খামারবাড়ি', icon: 'Home', count: '৯৫' },
      { id: 'pond-lease', label: 'পুকুর লিজ', icon: 'MapPin', count: '১৩০' },
      { id: 'rotenone', label: 'রোটেনন পাউডার', icon: 'FlaskConical', count: '৪৫' },
    ]
  },
  {
    groupId: 'farming_community',
    groupTitle: 'চাষ ব্যবস্থাপনা ও পোনা',
    categories: [
      { id: 'fingerlings', label: 'পোনা সংগ্রহ', icon: 'Fish', count: '৪৫০' },
      { id: 'farmers', label: 'মাছ চাষি', icon: 'UserCheck', count: '১.২হাজার' },
    ]
  },
  {
    groupId: 'health_and_experts',
    groupTitle: 'স্বাস্থ্য ও বিশেষজ্ঞ সমাধান',
    categories: [
      { id: 'fish-diseases', label: 'মাছের রোগ সমূহ', icon: 'Activity', count: '২৯০' },
      { id: 'consultation', label: 'পরামর্শ', icon: 'MessageSquareText', count: '৩৪০' },
      { id: 'expert-faq', label: 'এক্সপার্ট FAQ', icon: 'HelpCircle', count: '৫২০' },
    ]
  },
  {
    groupId: 'inputs_equipment',
    groupTitle: 'খাদ্য ও যন্ত্রপাতি',
    categories: [
      { id: 'feed', label: 'মাছের খাবার', icon: 'Wheat', count: '৩১৫' },
      { id: 'equipment', label: 'যন্ত্রপাতি', icon: 'Wrench', count: '২১০' },
    ]
  },
  {
    groupId: 'commerce_and_learning',
    groupTitle: 'বাজার, শিক্ষা ও গ্যালারি',
    categories: [
      { id: 'sell', label: 'বিক্রয়', icon: 'ShoppingBag', count: '৭৬০' },
      { id: 'transport', label: 'মাছ ও পোনা পরিবহন', icon: 'Truck', count: '৭৫' },
      { id: 'training', label: 'ট্রেনিং সেশন', icon: 'GraduationCap', count: '১২৪' },
      { id: 'students', label: 'শিক্ষার্থী ও ব্যাচ', icon: 'Users', count: '৮৯' },
      { id: 'gallery', label: 'গ্যালারি', icon: 'Image', count: '১৮০' },
    ]
  }
];

// Flattened list for backwards compatibility
export const CATEGORIES = CATEGORY_GROUPS.flatMap(g => g.categories);

export const INITIAL_POSTS: Post[] = [
  {
    id: 'post-1',
    type: 'faq',
    category: 'এক্সপার্ট FAQ',
    author: {
      name: 'মো. রফিকুল ইসলাম',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      tagline: 'সিনিয়র মৎস্য কর্মকর্তা, ময়মনসিংহ',
      isVerified: true,
      date: '৩ ঘণ্টা আগে'
    },
    question: 'শীতকালে পাঙ্গাশ ও তেলাপিয়া মাছের পুকুরে গ্যাস ও ক্ষতিকারক অ্যামোনিয়া নিয়ন্ত্রণের সবচেয়ে কার্যকর উপায় কী?',
    content: 'শীতকালে কম তাপমাত্রার কারণে পুকুরের তলদেশে তলানি পচতে শুরু করে। এ সময় নিয়মিত গ্যাস ড্র্যাগিং (চুন ও জিওলাইট প্রয়োগ) করা উচিত। প্রতি শতাংশে ২৫০ গ্রাম চুন ও ডলোমাইট ব্যবহারে পানির পিএইচ (pH) স্বাভাবিক থাকে এবং অ্যামোনিয়া ক্ষতিকর পর্যায়ে পৌঁছাতে পারে না।',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop&q=80',
    tags: ['শীতকালীন পরিচর্যা', 'অ্যামোনিয়া নিয়ন্ত্রণ', 'পুকুর ব্যবস্থাপনা'],
    upvotes: 245,
    shares: 42,
    commentsCount: 38,
    answersCount: 14,
    views: '১.৮হাজার'
  }
];

export const RECENT_ACTIVITIES = [
  {
    id: 1,
    user: 'মাহবুব আলম',
    action: 'একটি নতুন প্রশ্ন করেছেন',
    target: 'বায়োফ্লকে নাইট্রেট টেস্ট কিট কোনটি ভালো?',
    time: '৫ মিনিট আগে',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'
  },
  {
    id: 2,
    user: 'ডাঃ মোস্তাফিজুর রহমান',
    action: 'একটি উত্তর দিয়েছেন',
    target: 'রুই মাছের ফুলকা পচা রোগের সমাধান',
    time: '১৫ মিনিট আগে',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=100&auto=format&fit=crop&q=80'
  },
  {
    id: 3,
    user: 'পদ্মা হ্যাচারি',
    action: 'বিক্রয় পোস্ট যুক্ত করেছেন',
    target: 'গুলশা ট্যাংরার পোনা বিক্রি হবে',
    time: '৩২ মিনিট আগে',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80'
  },
  {
    id: 4,
    user: 'আরিফুল হক',
    action: 'একটি প্রশিক্ষণ সেশন শুরু করেছেন',
    target: 'শীতকালীন মৎস্য খামার পরিচর্যা ব্যাচ-৪',
    time: '১ ঘণ্টা আগে',
    avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&auto=format&fit=crop&q=80'
  }
];
