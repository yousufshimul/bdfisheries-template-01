import React, { useState, useMemo } from 'react';
import { 
  GraduationCap, 
  MapPin, 
  Search, 
  CheckCircle2, 
  Users, 
  Building2, 
  Phone, 
  Award, 
  Calendar,
  Filter,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { 
  INSTITUTES_DATA, 
  DISTRICTS_UPAZILAS_DATA, 
  Institute, 
  StudentProfile 
} from '../data/studentsBatchData';

interface StudentsBatchPageProps {
  onBackToHome?: () => void;
}

export const StudentsBatchPage: React.FC<StudentsBatchPageProps> = () => {
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [selectedUpazila, setSelectedUpazila] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProfileModal, setSelectedProfileModal] = useState<StudentProfile | null>(null);

  // Available upazilas based on chosen district
  const availableUpazilas = useMemo(() => {
    if (selectedDistrict === 'all') return [];
    return DISTRICTS_UPAZILAS_DATA[selectedDistrict] || [];
  }, [selectedDistrict]);

  // Handle District change
  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDistrict(e.target.value);
    setSelectedUpazila('all'); // reset upazila when district changes
  };

  // Filter institutes & batches
  const filteredInstitutes = useMemo(() => {
    return INSTITUTES_DATA.filter((inst) => {
      // District filter
      if (selectedDistrict !== 'all' && inst.district !== selectedDistrict) {
        return false;
      }
      // Upazila filter
      if (selectedUpazila !== 'all' && inst.upazila !== selectedUpazila) {
        return false;
      }
      // Search query (matches institute name, batch name, student name, or specialty)
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesInstitute = 
          inst.name.toLowerCase().includes(query) || 
          inst.banglaName.toLowerCase().includes(query);

        const matchesBatchOrStudent = inst.batches.some(batch => 
          batch.batchName.toLowerCase().includes(query) ||
          batch.students.some(st => 
            st.name.toLowerCase().includes(query) ||
            st.specialty.toLowerCase().includes(query) ||
            st.role.toLowerCase().includes(query)
          )
        );

        return matchesInstitute || matchesBatchOrStudent;
      }

      return true;
    });
  }, [selectedDistrict, selectedUpazila, searchQuery]);

  // Reset filters
  const resetFilters = () => {
    setSelectedDistrict('all');
    setSelectedUpazila('all');
    setSearchQuery('');
  };

  // Calculate total counts
  const totalInstitutes = filteredInstitutes.length;
  const totalBatches = filteredInstitutes.reduce((acc, curr) => acc + curr.batches.length, 0);
  const totalStudents = filteredInstitutes.reduce(
    (acc, curr) => acc + curr.batches.reduce((bAcc, b) => bAcc + b.students.length, 0), 
    0
  );

  return (
    <div className="w-full pb-16 animate-in fade-in duration-200">
      
      {/* 1. HERO / BANNER HEADER */}
      <div className="bg-gradient-to-r from-[#0B5A9C] via-[#0D72A5] to-[#0F9473] rounded-2xl p-5 sm:p-7 text-white shadow-md mb-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold mb-3 border border-white/20">
            <GraduationCap className="w-4 h-4 text-[#00A3E0]" />
            <span>শিক্ষার্থী ও ব্যাচ ডিরেক্টরি</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            বাংলাদেশের মাৎস্যবিজ্ঞান শিক্ষার্থী ও গ্র্যাজুয়েট নেটওয়ার্ক
          </h1>
          <p className="text-sky-100 text-sm sm:text-[15px] max-w-2xl leading-relaxed">
            জেলা ও উপজেলা ভিত্তিক শিক্ষা প্রতিষ্ঠান, বিশ্ববিদ্যালয় এবং গবেষণা কেন্দ্রের শিক্ষার্থী, তাদের ব্যাচ ও পেশাদার প্রোফাইল খুঁজে নিন।
          </p>

          {/* Quick Counter Badges */}
          <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-white/20 text-xs">
            <div className="bg-white/10 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-white/15 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-amber-300" />
              <span>প্রতিষ্ঠান: <strong>{totalInstitutes}</strong> টি</span>
            </div>
            <div className="bg-white/10 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-white/15 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-emerald-300" />
              <span>নিবন্ধিত ব্যাচ: <strong>{totalBatches}</strong> টি</span>
            </div>
            <div className="bg-white/10 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-white/15 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              <span>তালিকাভুক্ত শিক্ষার্থী: <strong>{totalStudents}</strong> জন</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. FILTER & SEARCH SECTION */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs mb-6">
        <div className="flex items-center justify-between gap-2 mb-3 pb-2.5 border-b border-slate-100">
          <div className="flex items-center gap-2 text-slate-800 font-bold text-sm sm:text-base">
            <Filter className="w-4 h-4 text-[#0B5A9C]" />
            <span>ফিল্টার নির্বাচন করুন</span>
          </div>
          {(selectedDistrict !== 'all' || selectedUpazila !== 'all' || searchQuery !== '') && (
            <button
              onClick={resetFilters}
              className="text-xs text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>ফিল্টার মুছুন</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          
          {/* District Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1.5">
              জেলা নির্বাচন করুন (District)
            </label>
            <div className="relative">
              <select
                value={selectedDistrict}
                onChange={handleDistrictChange}
                className="w-full bg-[#F4F8FA] border border-slate-200 text-slate-800 text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#0B5A9C]/20 focus:border-[#0B5A9C] transition cursor-pointer appearance-none"
              >
                <option value="all">সকল জেলা (All Districts)</option>
                {Object.keys(DISTRICTS_UPAZILAS_DATA).map((dist) => (
                  <option key={dist} value={dist}>{dist}</option>
                ))}
              </select>
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                ▼
              </div>
            </div>
          </div>

          {/* Upazila Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1.5">
              উপজেলা নির্বাচন করুন (Upazila)
            </label>
            <div className="relative">
              <select
                value={selectedUpazila}
                onChange={(e) => setSelectedUpazila(e.target.value)}
                disabled={selectedDistrict === 'all'}
                className={`w-full border text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#0B5A9C]/20 focus:border-[#0B5A9C] transition cursor-pointer appearance-none ${
                  selectedDistrict === 'all'
                    ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
                    : 'bg-[#F4F8FA] border-slate-200 text-slate-800'
                }`}
              >
                <option value="all">
                  {selectedDistrict === 'all' ? 'আগে জেলা নির্বাচন করুন' : 'সকল উপজেলা'}
                </option>
                {availableUpazilas.map((up) => (
                  <option key={up} value={up}>{up}</option>
                ))}
              </select>
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                ▼
              </div>
            </div>
          </div>

          {/* Search by Keyword */}
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1.5">
              প্রতিষ্ঠান বা শিক্ষার্থীর নাম খুঁজুন
            </label>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="নাম, বিশেষজ্ঞতা বা ব্যাচ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#F4F8FA] border border-slate-200 text-slate-800 text-sm rounded-xl pl-9 pr-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#0B5A9C]/20 focus:border-[#0B5A9C] transition placeholder:text-slate-400"
              />
            </div>
          </div>

        </div>
      </div>

      {/* 3. INSTITUTES & STUDENT BATCHES HIERARCHICAL LIST */}
      <div className="space-y-6">
        {filteredInstitutes.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200/90 p-10 text-center">
            <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-700 mb-1">কোনো প্রতিষ্ঠান বা ব্যাচ পাওয়া যায়নি</h3>
            <p className="text-xs text-slate-500 mb-4">আপনার নির্বাচিত জেলা বা উপজেলার ফিল্টার পরিবর্তন করে পুনরায় চেষ্টা করুন।</p>
            <button
              onClick={resetFilters}
              className="bg-[#0B5A9C] text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-[#09477d] transition"
            >
              সব ফিল্টার রিসেট করুন
            </button>
          </div>
        ) : (
          filteredInstitutes.map((inst: Institute) => (
            <div 
              key={inst.id}
              className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs hover:border-slate-300 transition"
            >
              {/* Institute Name & Location Header */}
              <div className="bg-slate-50/80 border-b border-slate-200/80 px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0B5A9C]/10 text-[#0B5A9C] flex items-center justify-center shrink-0 mt-0.5 border border-[#0B5A9C]/15">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-base sm:text-lg font-extrabold text-[#1A2530]">
                        {inst.banglaName}
                      </h2>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {inst.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-500 mt-1 flex-wrap">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#0F9473]" />
                        <span>{inst.upazila}, {inst.district}</span>
                      </span>
                      {inst.established && (
                        <span>প্রতিষ্ঠা: {inst.established} খ্রি.</span>
                      )}
                      <span>•</span>
                      <span className="text-[#0B5A9C] font-semibold">{inst.batches.length} টি সেশন/ব্যাচ</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Batches under this Institute */}
              <div className="p-4 sm:p-6 space-y-6">
                {inst.batches.map((batch) => (
                  <div 
                    key={batch.id}
                    className="border border-slate-200/80 rounded-xl bg-[#F8FAFC]/50 p-4 sm:p-5"
                  >
                    {/* Batch Name Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3.5 mb-4 border-b border-slate-200/70 gap-2">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-[#0F9473]/15 text-[#0F9473] flex items-center justify-center shrink-0">
                          <GraduationCap className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="text-[15px] font-bold text-slate-900">
                            {batch.batchName}
                          </h3>
                          <p className="text-xs text-slate-500">
                            শিক্ষাবর্ষ/সেশন: {batch.session}
                            {batch.coordinator && ` • সমন্বয়ক: ${batch.coordinator}`}
                          </p>
                        </div>
                      </div>

                      <div className="inline-flex items-center gap-1.5 text-xs text-slate-600 bg-white px-2.5 py-1 rounded-full border border-slate-200 shadow-2xs self-start sm:self-auto">
                        <Users className="w-3.5 h-3.5 text-[#0B5A9C]" />
                        <span>মোট গ্র্যাজুয়েট: <strong>{batch.totalStudents}</strong> জন</span>
                      </div>
                    </div>

                    {/* Students Profiles Grid under this Batch */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                      {batch.students.map((st) => (
                        <div 
                          key={st.id}
                          className="bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-2xs hover:shadow-md hover:border-[#0B5A9C]/40 transition group flex flex-col justify-between"
                        >
                          <div>
                            {/* Profile top with Avatar */}
                            <div className="flex items-center gap-3 mb-2.5">
                              <img 
                                src={st.avatar} 
                                alt={st.name} 
                                className="w-12 h-12 rounded-full object-cover border-2 border-slate-100 shadow-xs shrink-0 group-hover:scale-105 transition-transform" 
                              />
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-1">
                                  <h4 className="font-bold text-[14px] text-slate-900 truncate">
                                    {st.name}
                                  </h4>
                                  {st.isVerified && (
                                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 shrink-0 fill-sky-50" />
                                  )}
                                </div>
                                <p className="text-[11.5px] font-medium text-[#0F9473] truncate">
                                  {st.role}
                                </p>
                              </div>
                            </div>

                            {/* Specialty / Work details */}
                            <div className="space-y-1.5 text-xs text-slate-600 mb-3 bg-[#F4F8FA] p-2.5 rounded-lg border border-slate-100">
                              <div className="flex items-start gap-1.5">
                                <Award className="w-3.5 h-3.5 text-[#0B5A9C] shrink-0 mt-0.5" />
                                <span className="line-clamp-1"><strong className="text-slate-700">বিশেষজ্ঞতা:</strong> {st.specialty}</span>
                              </div>
                              {st.farmOrOrg && (
                                <div className="flex items-start gap-1.5">
                                  <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                                  <span className="line-clamp-1 text-slate-600">{st.farmOrOrg}</span>
                                </div>
                              )}
                              <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                                <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                                <span>{st.location}</span>
                              </div>
                            </div>
                          </div>

                          {/* Action Button */}
                          <button
                            onClick={() => setSelectedProfileModal(st)}
                            className="w-full mt-1 bg-slate-50 hover:bg-[#0B5A9C] hover:text-white text-[#0B5A9C] text-xs font-bold py-2 rounded-lg border border-slate-200/80 hover:border-[#0B5A9C] transition flex items-center justify-center gap-1.5 shadow-2xs"
                          >
                            <Users className="w-3.5 h-3.5" />
                            <span>সম্পূর্ণ প্রোফাইল দেখুন</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* 4. STUDENT DETAIL MODAL */}
      {selectedProfileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div 
            className="bg-white rounded-2xl w-full max-w-[480px] overflow-hidden shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header / Avatar banner */}
            <div className="bg-gradient-to-r from-[#0B5A9C] to-[#0F9473] p-5 text-white relative">
              <button 
                onClick={() => setSelectedProfileModal(null)}
                className="absolute right-4 top-4 text-white/80 hover:text-white p-1 rounded-full bg-black/20 hover:bg-black/40 transition"
              >
                ✕
              </button>
              <div className="flex items-center gap-4">
                <img 
                  src={selectedProfileModal.avatar} 
                  alt={selectedProfileModal.name} 
                  className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-lg font-bold">{selectedProfileModal.name}</h3>
                    {selectedProfileModal.isVerified && (
                      <CheckCircle2 className="w-4 h-4 text-white fill-sky-400" />
                    )}
                  </div>
                  <p className="text-xs text-sky-100">{selectedProfileModal.role}</p>
                  <p className="text-[11px] text-white/80 mt-0.5">{selectedProfileModal.batch} ({selectedProfileModal.passingYear})</p>
                </div>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-5 space-y-3.5 text-xs text-slate-700">
              <div className="bg-[#F4F8FA] p-3 rounded-xl border border-slate-200/70">
                <div className="font-bold text-slate-800 text-[13px] mb-1 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#0B5A9C]" />
                  <span>বিশেষজ্ঞতা ও অভিজ্ঞতা</span>
                </div>
                <p className="text-slate-600 leading-relaxed">{selectedProfileModal.specialty}</p>
              </div>

              {selectedProfileModal.farmOrOrg && (
                <div className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-100">
                  <Building2 className="w-4 h-4 text-slate-500 shrink-0" />
                  <div>
                    <div className="text-[11px] text-slate-400">প্রতিষ্ঠান / প্রকল্প</div>
                    <div className="font-semibold text-slate-800">{selectedProfileModal.farmOrOrg}</div>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-100">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0" />
                <div>
                  <div className="text-[11px] text-slate-400">বর্তমান অবস্থান</div>
                  <div className="font-semibold text-slate-800">{selectedProfileModal.location}</div>
                </div>
              </div>

              {selectedProfileModal.contact && (
                <div className="flex items-center gap-2.5 p-2 rounded-lg bg-emerald-50 border border-emerald-100">
                  <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <div className="text-[11px] text-emerald-600">পরামর্শ ও যোগাযোগ</div>
                    <div className="font-bold text-emerald-800">{selectedProfileModal.contact}</div>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-100">
                <Calendar className="w-4 h-4 text-slate-500 shrink-0" />
                <div>
                  <div className="text-[11px] text-slate-400">পাসিং সন / অভিজ্ঞতা</div>
                  <div className="font-semibold text-slate-800">{selectedProfileModal.passingYear} খ্রি.</div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-end">
              <button
                onClick={() => setSelectedProfileModal(null)}
                className="bg-[#0B5A9C] text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-[#09477d] transition"
              >
                বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
