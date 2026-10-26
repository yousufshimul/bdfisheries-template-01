import { Post } from './mockData';

// Generates 50 realistic, diverse fishery posts using actual Bangladesh pond harvesting & wholesale fish market images
export const generate50FisheryPosts = (): Post[] => {
  const authors = [
    { name: 'মো. রফিকুল ইসলাম', tagline: 'সিনিয়র মৎস্য কর্মকর্তা, ময়মনসিংহ', isVerified: true, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
    { name: 'সততা মৎস্য হ্যাচারি ও নার্সারি', tagline: 'ত্রিশাল, ময়মনসিংহ • পোনা উৎপাদনকারী', isVerified: true, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
    { name: 'ড. আবুল কাশেম', tagline: 'পিএইচডি গবেষক ও বায়োফ্লক বিশেষজ্ঞ', isVerified: true, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
    { name: 'তানভীর আহমেদ', tagline: 'উদ্যোক্তা ও কার্প খামারি, যশোর', isVerified: false, avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80' },
    { name: 'গ্রীন একুয়া এগ্রো', tagline: 'সাভার, ঢাকা • আধুনিক মৎস্য প্রকল্প', isVerified: true, avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80' },
    { name: 'কামরুল হাসান', tagline: 'মৎস্য ফিড ও মেডিসিন পরিবেশক, বগুড়া', isVerified: true, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80' },
    { name: 'মাসুদ রানা', tagline: 'পাবনা এগ্রো ফিশারিজ ও আড়তদার', isVerified: false, avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80' },
    { name: 'শামীম ওসমান', tagline: 'চাঁদপুর মেঘনা রিভার ফিশিং প্রজেক্ট', isVerified: true, avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80' },
    { name: 'আরিফুল ইসলাম', tagline: 'ব্রাহ্মণবাড়িয়া ক্যাটফিশ ও পোনা ব্রিডার', isVerified: false, avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80' },
    { name: 'ফারজানা ইয়াসমিন', tagline: 'মৎস্য পুষ্টিবিদ, বাংলাদেশ কৃষি বিশ্ববিদ্যালয়', isVerified: true, avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80' }
  ];

  // Authentic Bangladesh images: local harvesting, team catching, wholesale markets & hatcheries
  const authenticBDImages = [
    '/images/bd_harvest_1.png', // Team holding big silver carp / katla in water
    '/images/bd_harvest_2.png', // Harvesters in helmets & life jackets holding massive Rui/Katla
    '/images/bd_prawn_3.jpg',   // Freshly caught giant freshwater prawns / গলদা চিংড়ি
    '/images/bd_harvest_4.png', // Team pulling large fishing dragnet with huge catch
    '/images/bd_market_5.png',  // Local fish wholesale market (আড়ত) with piles of fresh carp
    'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1584467735871-8e85353a8413?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=800&auto=format&fit=crop&q=80'
  ];

  // 15 rich topic templates mapping directly to authentic Bangladesh fish harvesting & wholesale markets
  const rawPostsData: Array<{
    type: Post['type'];
    category: string;
    title?: string;
    question?: string;
    content: string;
    image: string;
    tags?: string[];
    price?: string;
    location?: string;
    phone?: string;
    salary?: string;
    deadline?: string;
    expertAnswer?: Post['expertAnswer'];
  }> = [
    // 1. Team harvesting big carp from pond
    {
      type: 'image',
      category: 'মাছ চাষি',
      title: 'মাশাল্লাহ! আজ আমাদের ৫ বিঘা পুকুরে দলবেঁধে বিশাল সাইজের কাতল ও সিলভার কার্প হার্ভেস্টিং হলো',
      content: 'পুরো টিম মিলে সকাল ৬টা থেকে জাল টানা শুরু করেছিলাম। প্রতিটি বিগহেড ও কাতল মাছের গড় ওজন ৪ থেকে ৫.৫ কেজি এবং সিলভার কার্প ৩ কেজি প্লাস। সঠিক খৈল, রাইস পলিশ এবং নিয়মিত পানির অক্সিজেন ও পিএইচ (pH) বজায় রাখার সুফল এই ফলন। সব মাছ বাছাই করে তাজা অবস্থায় পাইকারি আড়তে পাঠানো হয়েছে।',
      image: '/images/bd_harvest_1.png',
      tags: ['মাছধরা', 'রুইকাতল', 'বাম্পারফলন', 'খামারি'],
      location: 'ত্রিশাল, ময়মনসিংহ'
    },
    // 2. High-safety commercial harvest team
    {
      type: 'image',
      category: 'ট্রেনিং সেশন',
      title: 'আধুনিক ও নিরাপদ পদ্ধতিতে বড় সাইজের ব্রিডার রুই মাছ পুকুর থেকে উত্তোলন (লাইভ হার্ভেস্টিং)',
      content: 'মাছ তোলার সময় লাফিয়ে মাছের আইঁশ যাতে নষ্ট না হয় এবং চাষী ও জেলেদের কোনো আঘাত না লাগে সেজন্য সেফটি লাইফ জ্যাকেট ও হেলমেট পরিধান করে প্রশিক্ষণপ্রাপ্ত টিম দিয়ে জাল টানা হয়েছে। প্রতিটি রুই মাছের ওজন প্রায় ৫ থেকে ৭ কেজি।',
      image: '/images/bd_harvest_2.png',
      tags: ['নিরাপদমাছধরা', 'ব্রিডাররুই', 'আধুনিকপদ্ধতি'],
      location: 'যশোর সদর'
    },
    // 3. Giant tiger prawns / freshwater prawns
    {
      type: 'sale',
      category: 'বিক্রয়',
      title: 'ঘের থেকে সদ্য ধরা রপ্তানিযোগ্য বিশাল সাইজের তাজা গলদা ও বাগদা চিংড়ি বিক্রয় চলছে',
      content: 'আমাদের নিজস্ব মিষ্টি পানির ঘের থেকে আজ ভোরেই এই প্রিমিয়াম সাইজের গলদা চিংড়ি তোলা হয়েছে। সরাসরি পাইকারি ক্রেতা, রেস্তোরাঁ ও আড়তদারদের জন্য উন্মুক্ত। বরফ ছাড়া বা লাইভ ডেলিভারি সম্ভব।',
      image: '/images/bd_prawn_3.jpg',
      price: '৮৫০ - ৯৫০ টাকা / কেজি',
      location: 'ডুমুরিয়া, খুলনা',
      phone: '০১৭৫XXXXXXX',
      tags: ['গলদাচিংড়ি', 'ঘেরেরমাছ', 'পাইকারিবিক্রয়']
    },
    // 4. Large net team catch
    {
      type: 'image',
      category: 'মাছ চাষি',
      title: 'এক টানেই জালে উঠলো শত শত মণ তাজা রুই, মৃগেল ও কাতল মাছ - শীতকালীন হার্ভেস্টিং উৎসব',
      content: 'গ্রামের অভিজ্ঞ জেলে দল যখন পুকুরের এক মাথা থেকে ধীরে ধীরে জাল গুটিয়ে আনলো, তখন চারদিকে কেবল রুপালি মাছের ঝিলিক! পুকুর পুরোপুরি না শুকিয়েও বেড়জালের মাধ্যমে শতভাগ বড় মাছ তুলে নেওয়া সম্ভব।',
      image: '/images/bd_harvest_4.png',
      tags: ['বেড়জাল', 'মাছউৎসব', 'গ্রামবাংলা'],
      location: 'পাবনা এগ্রো প্রজেক্ট'
    },
    // 5. Wholesale fish market / Arat
    {
      type: 'sale',
      category: 'বিক্রয়',
      title: 'যাত্রাবাড়ী ও কাওরানবাজারের পাইকারি আড়তে আজকের তাজা মাছের স্তূপ ও নিলাম দর',
      content: 'ময়মনসিংহ, নাটোর ও কুমিল্লা থেকে মধ্যরাতে পৌঁছানো রুই ও কাতল মাছের ডাক শুরু হয়েছে ভোর ৪টায়। আড়তে সরাসরি ওজন অনুযায়ী ড্রামে ড্রামে তাজা মাছ পাইকারদের কাছে নিলামে বিক্রি হচ্ছে। আজকের বাজারে রুই ও মৃগেলের চাহিদা প্রচুর।',
      image: '/images/bd_market_5.png',
      price: '২২০ - ২৮০ টাকা / কেজি (সাইজ অনুযায়ী)',
      location: 'যাত্রাবাড়ী পাইকারি মৎস্য আড়ত, ঢাকা',
      phone: '০১৯XXXXXXXX',
      tags: ['মৎস্যআড়ত', 'যাত্রাবাড়ী', 'পাইকারিদর', 'নিলাম']
    },
    // 6. Preparing the pond primary stage
    {
      type: 'image',
      category: 'খামারবাড়ি',
      title: 'পুকুর প্রস্তুতির প্রথম ধাপ: তলা শুকিয়ে মাটি ফাটানো এবং শতাংশ প্রতি ১ কেজি চুন প্রয়োগ',
      content: 'নতুন সিজনে পোনা ছাড়ার আগে পুকুরের তলদেশ অন্তত ১৫ দিন কড়া রোদে শুকিয়ে মাটি ফাটাতে হবে। এতে তলার ক্ষতিকর মিথেন ও হাইড্রোজেন সালফাইড গ্যাস উবে যায়। চুন প্রয়োগের ফলে মাটির অম্লতা কেটে যায় এবং স্বাস্থ্যকর পরিবেশ তৈরি হয়।',
      image: authenticBDImages[7],
      tags: ['পুকুরপ্রস্তুতি', 'চুনপ্রয়োগ', 'মাটিফাটা'],
      location: 'বগুড়া শেরপুর'
    },
    // 7. Baby fishes nursery
    {
      type: 'sale',
      category: 'পোনা সংগ্রহ',
      title: 'উন্নত জাতের এফ-১ থাই কৈ ও মনোসেক্স তেলাপিয়ার সুইমিং পোনা নার্সারি থেকে সরবরাহ',
      content: 'আমাদের নিজস্ব হ্যাচারিতে বৈজ্ঞানিক উপায়ে ডিম্বস্ফোটন ঘটিয়ে উৎপাদিত পোনা। সুস্থ, সবল এবং রোগমুক্ত। বিশেষ অক্সিজেন ব্যাগে করে ২৪ ঘণ্টার গ্যারান্টি সহ দেশের যেকোনো প্রান্তে পৌঁছে দেওয়া হচ্ছে।',
      image: authenticBDImages[6],
      price: '১.১৫ টাকা / পিস',
      location: 'মুক্তাগাছা, ময়মনসিংহ',
      phone: '০১৮XXXXXXXX',
      tags: ['তেলাপিয়াপোনা', 'থায়কৈ', 'হ্যাচারি']
    },
    // 8. Fisheries shop / Aerator equipment
    {
      type: 'sale',
      category: 'যন্ত্রপাতি',
      title: 'মৎস্য সামগ্রী শপ: ৪-প্যাডেল হুইল এয়ারেটর ও অটোমেটিক ফিশ ফিডার সুলভ মূল্যে',
      content: 'মাঝরাতে বা ভোরে পুকুরে অক্সিজেনের ঘাটতি দূর করতে বিদ্যুৎ সাশ্রয়ী তাইওয়ান কপার মোটর এয়ারেটর। সাথে পাবেন মাস্টার ওয়াটার টেস্টিং কিট ও ডিজিটাল পিএইচ মিটার।',
      image: authenticBDImages[8],
      price: '২১,৫০০ টাকা (পূর্ণাঙ্গ সেট)',
      location: 'মতিঝিল, ঢাকা',
      phone: '০১৭২XXXXXXX',
      tags: ['এয়ারেটর', 'যন্ত্রপাতি', 'মৎস্যশপ']
    },
    // 9. Expert FAQ on Winter harvest
    {
      type: 'faq',
      category: 'এক্সপার্ট FAQ',
      question: 'শীতকালে পুকুর থেকে মাছ ধরার সঠিক সময় কোনটি এবং মাছের ক্ষতি কীভাবে এড়ানো যায়?',
      content: 'শীতকালে ভোরে কুয়াশা ও তীব্র ঠান্ডার সময় মাছ ধরা উচিত নয়, কারণ এ সময় মাছ অলস থাকে এবং গায়ে ঘা লাগলে দ্রুত ছত্রাক বা ব্যাকটেরিয়ায় আক্রান্ত হয়। সকাল ১০টার পর রোদ উঠলে জাল টানা সবচেয়ে নিরাপদ। মাছ ধরার আগের রাতে অবশ্যই সব ধরনের খাবার দেওয়া বন্ধ রাখতে হবে।',
      image: '/images/bd_harvest_1.png',
      tags: ['শীতকালীনটিপস', 'মাছসংগ্রহ', 'এক্সপার্টFAQ']
    },
    // 10. Consultation on Fish Disease
    {
      type: 'consultation',
      category: 'মাছের রোগ সমূহ',
      question: 'বড় কার্প ও রুই মাছের ফুলকা পচা ও গায়ে লালচে দাগ দেখা যাচ্ছে, দ্রুত করণীয় কী?',
      content: 'আমার ৩ বিঘা পুকুরে প্রায় ৩০০০ পিস বড় রুই-কাতল আছে। হঠাৎ করে দেখছি কিছু মাছের ফুলকা ফ্যাকাশে হয়ে পচনের মতো হচ্ছে এবং মাছ খাবার খাচ্ছে না। জরুরী প্রতিকার দরকার।',
      image: '/images/bd_harvest_2.png',
      expertAnswer: {
        expertName: 'ডাঃ মোস্তাফিজুর রহমান',
        expertTitle: 'প্রধান মৎস্য বৈজ্ঞানিক কর্মকর্তা, বিএফআরআই',
        expertAvatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&auto=format&fit=crop&q=80',
        answer: 'এটি মূলত ব্যাকটেরিয়াল গিল রট (Gill Rot) রোগ। অবিলম্বে প্রতি শতাংশে ২৫০ গ্রাম চুন ও ৫০ গ্রাম পটাশিয়াম পারম্যাঙ্গানেট গুলে পুকুরে প্রয়োগ করুন। খাবারে সিপ্রোফ্লক্সাসিন বা অক্সিটূট্রাসাইক্লিন মিশিয়ে ৭ দিন খাওয়ান।',
        date: '৩ ঘণ্টা আগে'
      },
      tags: ['ফুলকাপচা', 'জরুরীপরামর্শ', 'রোগনিরাময়']
    },
    // 11. Wholesale Arat Auction
    {
      type: 'image',
      category: 'বিক্রয়',
      title: 'শোয়ারীঘাট ও চাঁদপুর ঘাটে ভোরবেলার তাজা ইলিশ ও কার্পের পাইকারি নিলাম',
      content: 'সারারাত মেঘনা ও পদ্মা নদী থেকে ট্রলারে করে আসা বড় সাইজের মাছ সরাসরি শোয়ারীঘাটের আড়তে তোলা হচ্ছে। সকাল ৭টার মধ্যেই শত শত পাইকার ও খুচরা বিক্রেতা তাজা মাছ সংগ্রহ করছেন।',
      image: '/images/bd_market_5.png',
      tags: ['শোয়ারীঘাট', 'আড়ত', 'পাইকারিবিক্রয়', 'তাজামাছ']
    },
    // 12. Rotenone pond clearing
    {
      type: 'faq',
      category: 'রোটেনন পাউডার',
      question: 'পুকুর শুকানো ছাড়া রাক্ষুসে মাছ (শোল, বোয়াল, টাকি) নিধনে রোটেনন পাউডারের সঠিক ডোজ কত?',
      content: 'পুকুরে পানি থাকা অবস্থায় শতাংশ প্রতি প্রতি ফুট গভীরতায় ২০-২৫ গ্রাম রোটেনন পাউডার ব্যবহার করতে হয়। রোটেনন হালকা গরম পানিতে গুলে রোদের সময় ছিটিয়ে দিলে ৩-৪ ঘণ্টার মধ্যে সব রাক্ষুসে মাছ ভেসে উঠবে। ৭-১০ দিন পর বিষক্রিয়া পুরোপুরি কেটে গেলে নতুন পোনা ছাড়া নিরাপদ।',
      image: authenticBDImages[5],
      tags: ['রোটেননপাউডার', 'পুকুরশোধন', 'রাক্ষুসেমাছ']
    },
    // 13. Pond lease post
    {
      type: 'sale',
      category: 'পুকুর লিজ',
      title: 'নাটোর সিংড়ায় ৪ বিঘার বাণিজ্যিক ডাবল পুকুর ৩ বছরের জন্য লিজ দেওয়া হবে',
      content: 'সারাবছর পানি থাকার নিশ্চয়তা, নিজস্ব সাবমারসিবল পাম্প ও পাকা খামার ঘর রয়েছে। মৎস্য খামারি বা বাণিজ্যিক উদ্যোক্তারা সরাসরি যোগাযোগ করুন।',
      image: authenticBDImages[7],
      price: '১,২০,০০০ টাকা / বছর',
      location: 'সিংড়া, নাটোর',
      phone: '০১৭৩XXXXXXX',
      tags: ['পুকুরলিজ', 'বাণিজ্যিকখামার', 'সিংড়া']
    },
    // 14. Transportation with oxygen tanks
    {
      type: 'image',
      category: 'মাছ ও পোনা পরিবহন',
      title: 'অক্সিজেন ট্যাংক পিকআপে লাইভ তাজা মাছ ও রেণু পোনা পরিবহন - শূন্য মৃত্যুহার',
      content: 'ময়মনসিংহ ও খুলনা থেকে রাজধানী ঢাকার বাজারগুলোতে জ্যান্ত শিং, মাগুর ও কই মাছ পরিবহনের জন্য ইনসুলেটেড পানির ট্যাংক ও লাইভ অক্সিজেন সিলিন্ডার ব্যবহার করা হচ্ছে। এতে মাছ সতেজ থাকে ও সর্বোচ্চ দাম পাওয়া যায়।',
      image: '/images/bd_harvest_4.png',
      tags: ['পরিবহন', 'লাইভমাছ', 'অক্সিজেনট্যাংক']
    },
    // 15. Job post for fisheries manager
    {
      type: 'job',
      category: 'শিক্ষার্থী ও ব্যাচ',
      title: 'বাণিজ্যিক মৎস্য খামার ও হ্যাচারিতে ফার্ম সুপারভাইজার ও কেয়ারটেকার আবশ্যক',
      content: 'আমাদের ২৫ বিঘার কার্প ও ক্যাটফিশ প্রজেক্টে সার্বক্ষণিক তদারকি, খাবার নিয়ন্ত্রণ ও ওয়াটার কোয়ালিটি মাপার জন্য মৎস্য ডিপ্লোমা সম্পন্ন অথবা অভিজ্ঞ সুপারভাইজার নিয়োগ দেওয়া হবে। থাকা-খাওয়া ফ্রি।',
      image: '/images/bd_harvest_2.png',
      salary: '২২,০০০ - ২৮,০০০ টাকা / মাস',
      deadline: '২০ ডিসেম্বর, ২০২৬',
      location: 'ত্রিশাল, ময়মনসিংহ',
      phone: '০১৮XXXXXXXX',
      tags: ['নিয়োগবিজ্ঞপ্তি', 'চাকরি', 'খামারম্যানেজার']
    }
  ];

  const full50Posts: Post[] = [];

  for (let i = 0; i < 50; i++) {
    const template = rawPostsData[i % rawPostsData.length];
    const author = authors[i % authors.length];
    
    const daysAgo = Math.floor(i / 2) + 1;
    const dateStr = i === 0 ? '১৫ মিনিট আগে' : i === 1 ? '৫০ মিনিট আগে' : i < 6 ? `${i + 1} ঘণ্টা আগে` : `${daysAgo} দিন আগে`;
    
    const upvotes = 55 + ((i * 41 + 17) % 450);
    const commentsCount = 8 + ((i * 13 + 5) % 75);
    const shares = 4 + ((i * 9 + 2) % 40);
    const views = `${((i * 145 + 320) / 100).toFixed(1)}হাজার`;

    // Vary titles smoothly for all 50 items
    const titleVariant = template.title 
      ? (i >= rawPostsData.length ? `[লট #${Math.floor(i / rawPostsData.length) + 1}] ${template.title}` : template.title)
      : undefined;

    const questionVariant = template.question
      ? (i >= rawPostsData.length ? `[আলোচনা #${Math.floor(i / rawPostsData.length) + 1}] ${template.question}` : template.question)
      : undefined;

    full50Posts.push({
      id: `post-gen-bd-${i + 1}`,
      type: template.type,
      category: template.category,
      author: {
        ...author,
        date: dateStr
      },
      title: titleVariant,
      question: questionVariant,
      content: template.content,
      image: template.image,
      tags: template.tags,
      price: template.price,
      location: template.location,
      phone: template.phone,
      salary: template.salary,
      deadline: template.deadline,
      expertAnswer: template.expertAnswer,
      upvotes,
      commentsCount,
      shares,
      views
    });
  }

  return full50Posts;
};
